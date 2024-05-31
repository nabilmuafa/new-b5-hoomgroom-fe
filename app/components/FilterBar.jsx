const CATEGORIES = [
    {
        name: "Price",
        value: "price"
    },
    {
        name: "Tags (a-z)",
        value: "tag"
    },
    {
        name: "Sales",
        value: "sales"
    }
]

const SORT_ORDER = [
    {
        name: "Ascending",
        value: "asc",
    },
    {
        name: "Descending",
        value: "desc"
    }
]

const FilterBar = ({ setSortCategory, setSortOrder, handleSort }) => {
    return (
        <aside className="flex-grow w-full max-w-xs">
            <div className="flex flex-col rounded-md border text-sm p-8">
                <div className="mb-4">
                    <h2 className="text-base font-bold no-wrap">Sort products by...</h2>
                    <ul className="font-medium py-2">
                        {CATEGORIES.map((el) => 
                            <li key={el.value}>
                                <div className="flex items-center gap-2 py-1">
                                    <input id={el.value} value={el.value} onChange={(e) => setSortCategory(e.target.value)} type="radio" name="sort" className="w-4 h-4 rounded accent-emerald-600" />
                                    <label htmlFor={el.value}>{el.name}</label>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="mb-8">
                    <h2 className="text-base font-bold">Order by...</h2>
                    <ul className="font-medium py-2">
                        {SORT_ORDER.map((el) => 
                            <li key={el.value}>
                                <div className="flex items-center gap-2 py-1">
                                    <input id={el.value} value={el.value} onChange={(e) => setSortOrder(e.target.value)} type="radio" name="order" className="w-4 h-4 rounded accent-emerald-600" />
                                    <label htmlFor={el.value}>{el.name}</label>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
                <button onClick={handleSort} className="border bg-emerald-500 font-medium rounded-md text-white py-2 px-3 hover:bg-emerald-600">Apply Sort</button>
            </div>
        </aside>
    )
}

export default FilterBar;