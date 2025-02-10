import { FC, useState } from 'react';
import { Lead } from '../../types';
import './LeadList.css';
import DocumentManager from './DocumentManager';

interface LeadListProps {
    leads: Lead[];
    currentPage: number;
    leadsPerPage: number;
    onEditLead: (lead: Lead) => void;
    setCurrentPage: (page: number) => void;
    isLoading?: boolean;
}

interface LeadItemProps {
    lead: Lead;
    onEditLead: (lead: Lead) => void;
}

const LeadList: FC<LeadListProps> = ({
    leads,
    currentPage,
    leadsPerPage,
    onEditLead,
    setCurrentPage,
    isLoading = false
}) => {
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

    if (isLoading) {
        return <div className="loading">Loading leads...</div>;
    }

    // Calculate pagination
    const indexOfLastLead = currentPage * leadsPerPage;
    const indexOfFirstLead = indexOfLastLead - leadsPerPage;
    const currentLeads = leads.slice(indexOfFirstLead, indexOfLastLead);
    const totalPages = Math.ceil(leads.length / leadsPerPage);

    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`pagination-btn ${currentPage === i ? 'active' : ''}`}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    const handleDocuments = (lead: Lead) => {
        setSelectedLead(lead);
    };

    const LeadItem: FC<LeadItemProps> = ({ lead, onEditLead }) => (
        <div className="lead-item">
            <div className="lead-info">
                <h3>{lead.name}</h3>
                <p>{lead.phoneNumber}</p>
                <div className="documents-count">
                    {lead.documents?.length || 0} Documents
                </div>
            </div>
            <div className="lead-actions">
                <button className="edit-btn" onClick={() => onEditLead(lead)}>
                    Edit
                </button>
                <button className="docs-btn" onClick={() => handleDocuments(lead)}>
                    Manage Docs
                </button>
            </div>
        </div>
    );

    return (
        <div className="lead-list-container">
            {currentLeads.length === 0 ? (
                <div className="no-leads">No leads found</div>
            ) : (
                <>
                    <div className="lead-list">
                        {currentLeads.map((lead) => (
                            <LeadItem key={lead.id} lead={lead} onEditLead={onEditLead} />
                        ))}
                    </div>
                    <div className="pagination">
                        {renderPagination()}
                    </div>
                </>
            )}
            {selectedLead && (
                <DocumentManager
                    lead={selectedLead}
                    onClose={() => setSelectedLead(null)}
                />
            )}
        </div>
    );
};

export default LeadList; 