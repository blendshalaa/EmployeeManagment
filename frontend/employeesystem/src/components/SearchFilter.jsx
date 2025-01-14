import React, { useState } from 'react';

const SearchFilter = ({ data, filterKey, onFilteredData }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);


        if (!filterKey) {
            console.error('filterKey prop is not defined');
            return;
        }


        const filteredData = data.filter((item) =>
            item[filterKey]?.toLowerCase().includes(query.toLowerCase())
        );


        onFilteredData(filteredData);
    };

    return (
        <div className="flex items-center max-w-md mx-auto mt-5 bg-white border-2 border-gray-300 rounded-full shadow-md focus-within:border-blue-500">
            <input
                type="text"
                className="flex-grow px-4 py-2 text-gray-700 rounded-full focus:outline-none focus:ring-0"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder={`Search by ${filterKey}...`}
            />
            <button className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none">
                🔍
            </button>
        </div>
    );
};

export default SearchFilter;
