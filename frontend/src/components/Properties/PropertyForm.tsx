import { useState, useEffect } from 'react';
import { Property } from '../../types';
import './PropertyForm.css';

interface PropertyFormProps {
    onSubmit: (property: Property) => void;
    onClose: () => void;
    initialData?: Property | null;
}

const PropertyForm = ({ onSubmit, onClose, initialData }: PropertyFormProps) => {
    const [formData, setFormData] = useState({
        type: 'Residential',
        size: '',
        location: '',
        budget: '',
        isAvailable: true,
        description: '',
        amenities: '',
    });
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (initialData) {
            setFormData({
                type: initialData.type,
                size: initialData.size.toString(),
                location: initialData.location,
                budget: initialData.budget.toString(),
                isAvailable: initialData.isAvailable,
                description: initialData.description || '',
                amenities: initialData.amenities?.join(', ') || '',
            });
        }
    }, [initialData]);

    const validateForm = () => {
        if (!formData.location.trim()) {
            setError('Location is required');
            return false;
        }
        if (!formData.size || isNaN(Number(formData.size))) {
            setError('Valid size is required');
            return false;
        }
        if (!formData.budget || isNaN(Number(formData.budget))) {
            setError('Valid budget is required');
            return false;
        }
        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) return;

        const newProperty: Property = {
            id: initialData?.id || Date.now().toString(),
            type: formData.type as 'Residential' | 'Commercial' | 'Land',
            size: Number(formData.size),
            location: formData.location,
            budget: Number(formData.budget),
            isAvailable: formData.isAvailable,
            description: formData.description || undefined,
            amenities: formData.amenities ? formData.amenities.split(',').map(a => a.trim()) : undefined,
            createdAt: initialData?.createdAt || new Date(),
            updatedAt: new Date(),
        };

        onSubmit(newProperty);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{initialData ? 'Edit Property' : 'Add New Property'}</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="type">Property Type</label>
                        <select
                            id="type"
                            value={formData.type}
                            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                        >
                            <option value="Residential">Residential</option>
                            <option value="Commercial">Commercial</option>
                            <option value="Land">Land</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input
                            type="text"
                            id="location"
                            value={formData.location}
                            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="size">Size (sq ft)</label>
                        <input
                            type="number"
                            id="size"
                            value={formData.size}
                            onChange={(e) => setFormData(prev => ({ ...prev, size: e.target.value }))}
                            step={1000}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="budget">Budget (₹)</label>
                        <input
                            type="number"
                            id="budget"
                            value={formData.budget}
                            onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                            step={100000}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="amenities">Amenities (comma-separated)</label>
                        <input
                            type="text"
                            id="amenities"
                            value={formData.amenities}
                            onChange={(e) => setFormData(prev => ({ ...prev, amenities: e.target.value }))}
                            placeholder="e.g., Parking, Pool, Garden"
                        />
                    </div>

                    <div className="form-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={formData.isAvailable}
                                onChange={(e) => setFormData(prev => ({ ...prev, isAvailable: e.target.checked }))}
                            />
                            Available
                        </label>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="submit-btn">
                            {initialData ? 'Update' : 'Add'} Property
                        </button>
                        <button type="button" className="cancel-btn" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PropertyForm; 