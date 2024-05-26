'use client'

const FilterButton = () => {

    const handleSelectChange = (event) => {
        // setSelectedOption(event.target.value);
    };

    return (
        <div>
            <select id="dropdown" value="price" onChange={handleSelectChange}>
                {/* Default option */}
                <option value="">Select...</option>
                {/* Dropdown options */}
                <option value="priceAsc">Price (Ascending)</option>
                <option value="priceDesc">Price (Descending)</option>
                <option value="tagAsc">Tag (Ascending)</option>
                <option value="tagDesc">Tag (Descending)</option>
                <option value="salesAsc">Sales (Ascending)</option>
                <option value="salesDesc">Sales (Descending)</option>
            </select>
        </div>
    )
}

export default FilterButton