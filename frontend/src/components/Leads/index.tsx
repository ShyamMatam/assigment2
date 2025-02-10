import { useState, useEffect } from 'react';
import LeadList from '../Leads/LeadList';
import LeadForm from '../Leads/LeadForm';
import SearchBar from '../common/SearchBar';
import { Lead } from '../../types';
import './Leads.css';

const Leads = () => {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editLead, setEditLead] = useState<Lead | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const leadsPerPage = 10;

    useEffect(() => {
        setFilteredLeads(leads);
    }, [leads]);

    const handleSearch = (searchTerm: string) => {
        const filtered = leads.filter(lead =>
            lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.phoneNumber.includes(searchTerm)
        );
        setFilteredLeads(filtered);
        setCurrentPage(1);
    };

    const handleAddLead = (newLead: Lead) => {
        setLeads(prev => [...prev, newLead]);
        setIsFormOpen(false);
    };

    const handleEditLead = (lead: Lead) => {
        setEditLead(lead);
        setIsFormOpen(true);
    };

    const handleUpdateLead = (updatedLead: Lead) => {
        setLeads(prev =>
            prev.map(lead => lead.id === updatedLead.id ? updatedLead : lead)
        );
        setIsFormOpen(false);
        setEditLead(null);
    };

    return (
        <div className="leads-container">
            <div className="leads-header">
                <h1>Leads Management</h1>
                <button
                    className="add-lead-btn"
                    onClick={() => setIsFormOpen(true)}
                >
                    Add New Lead
                </button>
            </div>

            <SearchBar onSearch={handleSearch} placeholder="Search by name or phone..." />

            <LeadList
                leads={filteredLeads}
                currentPage={currentPage}
                leadsPerPage={leadsPerPage}
                onEditLead={handleEditLead}
                setCurrentPage={setCurrentPage}
            />

            {isFormOpen && (
                <LeadForm
                    onSubmit={editLead ? handleUpdateLead : handleAddLead}
                    onClose={() => {
                        setIsFormOpen(false);
                        setEditLead(null);
                    }}
                    initialData={editLead}
                />
            )}
        </div>
    );
};

export default Leads; 