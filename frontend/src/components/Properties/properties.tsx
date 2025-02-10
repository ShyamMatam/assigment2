import { useState, useEffect } from 'react';
import { Property } from '../../types';
import PropertyList from './PropertyList';
import PropertyForm from './PropertyForm';
import SearchBar from '../common/SearchBar';
import './Properties.css';
import { propertyApi } from '../../services/api';


const Properties = () => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editProperty, setEditProperty] = useState<Property | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const propertiesPerPage = 8;
    const [filters, setFilters] = useState({
        type: 'all',
        priceRange: { min: 0, max: Infinity },
        sizeRange: { min: 0, max: Infinity },
        availability: 'all'
    });

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const data = await propertyApi.getAll();
                setProperties(data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };
        fetchProperties();
    }, []);

    useEffect(() => {
        const filtered = properties.filter(property => {
            if (filters.type !== 'all' && property.type !== filters.type) return false;
            if (filters.availability !== 'all' && property.isAvailable !== (filters.availability === 'available')) return false;
            return true;
        });
        setFilteredProperties(filtered);
    }, [properties, filters]);

    const handleSearch = (searchTerm: string) => {
        const filtered = properties.filter(property =>
            property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.budget.toString().includes(searchTerm) ||
            property.size.toString().includes(searchTerm) ||
            property.amenities?.some(amenity =>
                amenity.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setFilteredProperties(filtered);
        setCurrentPage(1);
    };

    const handleAddProperty = async (newProperty: Property) => {
        try {
            const created = await propertyApi.create(newProperty);
            setProperties(prev => [...prev, created]);
            setIsFormOpen(false);
        } catch (error) {
            console.error('Error creating property:', error);
        }
    };

    const handleEditProperty = (property: Property) => {
        setEditProperty(property);
        setIsFormOpen(true);
    };

    const handleUpdateProperty = async (updatedProperty: Property) => {
        try {
            const updated = await propertyApi.update(updatedProperty.id, updatedProperty);
            setProperties(prev =>
                prev.map(property => property.id === updated.id ? updated : property)
            );
            setIsFormOpen(false);
            setEditProperty(null);
        } catch (error) {
            console.error('Error updating property:', error);
        }
    };

    const FilterSection = () => (
        <div className="filter-section">
            <select onChange={e => setFilters(prev => ({ ...prev, type: e.target.value }))}>
                <option value="all">All Types</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Land">Land</option>
            </select>
        </div>
    );

    return (
        <div className="properties-container">
            <div className="properties-header">
                <h1>Properties Management</h1>
                <button
                    className="add-property-btn"
                    onClick={() => setIsFormOpen(true)}
                >
                    Add New Property
                </button>
            </div>

            <SearchBar
                onSearch={handleSearch}
                placeholder="Search by location, type, or budget..."
            />

            <FilterSection />

            <PropertyList
                properties={filteredProperties}
                currentPage={currentPage}
                propertiesPerPage={propertiesPerPage}
                onEditProperty={handleEditProperty}
                setCurrentPage={setCurrentPage}
            />

            {isFormOpen && (
                <PropertyForm
                    onSubmit={editProperty ? handleUpdateProperty : handleAddProperty}
                    onClose={() => {
                        setIsFormOpen(false);
                        setEditProperty(null);
                    }}
                    initialData={editProperty}
                />
            )}
        </div>
    );
};

export default Properties; 