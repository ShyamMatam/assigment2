import { useState, useEffect } from 'react';
import { Lead } from '../../types';
import './LeadForm.css';

interface LeadFormProps {
    onSubmit: (lead: Lead) => void;
    onClose: () => void;
    initialData?: Lead | null;
}

const LeadForm = ({ onSubmit, onClose, initialData }: LeadFormProps) => {
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
    });
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                phoneNumber: initialData.phoneNumber,
            });
        }
    }, [initialData]);

    const validateForm = () => {
        if (!formData.name.trim()) {
            setError('Name is required');
            return false;
        }
        if (!formData.phoneNumber.trim()) {
            setError('Phone number is required');
            return false;
        }
        // Basic phone number validation
        if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
            setError('Please enter a valid 10-digit phone number');
            return false;
        }
        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) return;

        const newLead: Lead = {
            id: initialData?.id || Date.now().toString(),
            ...formData,
            documents: initialData?.documents || [],
            createdAt: initialData?.createdAt || new Date(),
            updatedAt: new Date(),
        };
        onSubmit(newLead);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{initialData ? 'Edit Lead' : 'Add New Lead'}</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit">
                            {initialData ? 'Update' : 'Add'} Lead
                        </button>
                        <button type="button" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LeadForm;