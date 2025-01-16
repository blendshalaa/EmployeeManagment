import React from "react";

function SearchFilter({ query, onSearchChange, placeholder = "Search..." }) {
    return (
        <div className="mb-6">
            <input
                type="text"
                value={query}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full border border-gray-600 bg-gray-900 text-white rounded-md p-2"
                placeholder={placeholder}
            />
        </div>
    );

}

export default SearchFilter;
