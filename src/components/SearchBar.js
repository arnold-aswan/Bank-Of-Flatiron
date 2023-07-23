import React from "react";

function SearchBar({ search, setSearch, setFiltered, transaction }) {
  const handleChange = (search) => {
    setSearch(search);
    const updatedList = [...transaction];
    if (search !== "") {
      const filter = updatedList.filter(
        (item) =>
          item.category.toLowerCase() === search ||
          item.description.toLowerCase() === search
      );
      setFiltered(filter);
    } else if (search === "") {
      setFiltered(updatedList);
    }
  };

  return (
    <div>
      <input
        className="search"
        type="text"
        onChange={(e) => handleChange(e.target.value)}
        value={search}
        placeholder="search by description or category..."
      />
      <h1>
        {search.length > 0 && "Search for:"} {search}
      </h1>
    </div>
  );
}

export default SearchBar;
