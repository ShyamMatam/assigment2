import { FC } from 'react';
import { Property } from '../../types';
import './PropertyList.css';

interface PropertyListProps {
    properties: Property[];
    currentPage: number;
    propertiesPerPage: number;
    onEditProperty: (property: Property) => void;
    setCurrentPage: (page: number) => void;
}

const PropertyList: FC<PropertyListProps> = ({
    properties,
    currentPage,
    propertiesPerPage,
    onEditProperty,
    setCurrentPage
}) => {
    const indexOfLastProperty = currentPage * propertiesPerPage;
    const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
    const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);
    const totalPages = Math.ceil(properties.length / propertiesPerPage);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

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

    return (
        <div className="property-list-container">
            {currentProperties.length === 0 ? (
                <div className="no-properties">No properties found</div>
            ) : (
                <>
                    <div className="property-grid">
                        {currentProperties.map((property) => (
                            <div key={property.id} className="property-card">
                                <div className="property-type-badge">{property.type}</div>
                                <div className="property-details">
                                    <h3>{property.location}</h3>
                                    <div className="property-info">
                                        <span>{property.size} sq ft</span>
                                        <span>{formatCurrency(property.budget)}</span>
                                    </div>
                                    <div className="property-status">
                                        <span className={`status-badge ${property.isAvailable ? 'available' : 'unavailable'}`}>
                                            {property.isAvailable ? 'Available' : 'Not Available'}
                                        </span>
                                    </div>
                                    {property.description && (
                                        <p className="property-description">{property.description}</p>
                                    )}
                                    {property.amenities && (
                                        <div className="amenities-list">
                                            {property.amenities.map((amenity, index) => (
                                                <span key={index} className="amenity-tag">{amenity}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <button
                                    className="edit-btn"
                                    onClick={() => onEditProperty(property)}
                                >
                                    Edit
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="pagination">
                        {renderPagination()}
                    </div>
                </>
            )}
        </div>
    );
};

export default PropertyList; 