import { useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
    placeholder?: string;
}

const SearchBar = ({ onSearch, placeholder = 'Search...' }: SearchBarProps) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder={placeholder}
            />
            <i className="fas fa-search search-icon"></i>
        </div>
    );
};

export default SearchBar; 