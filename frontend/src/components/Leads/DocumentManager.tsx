import { useState } from 'react';
import { Document, Lead } from '../../types';

interface DocumentManagerProps {
    lead: Lead;
    onClose: () => void;
}

const DocumentManager = ({ lead, onClose }: DocumentManagerProps) => {
    const [documents, setDocuments] = useState<Document[]>(lead.documents || []);

    const handleDeleteDocument = (docId: string) => {
        setDocuments(documents.filter(doc => doc.id !== docId));
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Here you would implement actual file upload logic
        // For now, we'll just simulate it
        const newDoc: Document = {
            id: Date.now().toString(),
            name: file.name,
            url: URL.createObjectURL(file),
            uploadedAt: new Date(),
            type: file.type
        };

        setDocuments([...documents, newDoc]);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Documents for {lead.name}</h2>

                <div className="upload-section">
                    <input
                        type="file"
                        onChange={handleFileUpload}
                        accept=".pdf,.doc,.docx,.txt"
                    />
                </div>

                <div className="documents-list">
                    {documents.map(doc => (
                        <div key={doc.id} className="document-item">
                            <span>{doc.name}</span>
                            <div className="document-actions">
                                <a href={doc.url} target="_blank" rel="noopener noreferrer">
                                    View
                                </a>
                                <button onClick={() => handleDeleteDocument(doc.id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="modal-actions">
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default DocumentManager; 