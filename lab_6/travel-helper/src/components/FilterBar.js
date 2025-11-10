import { useState } from "react";
import PrimaryButton from "./PrimaryButton";

function FilterBar({ onFilterChange }) {
  const [filters, setFilters] = useState({
    search: "",
    price: "all",
    duration: "all",
    country: "all",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    onFilterChange(filters);
  };

  return (
    <div className="filter-bar">
      <input
        type="text"
        name="search"
        placeholder="Search by name or country..."
        value={filters.search}
        onChange={handleChange}
        className="filter-select"
      />

      <select name="price" value={filters.price} onChange={handleChange} className="filter-select">
        <option value="all">All prices</option>
        <option value="0-500">Under $500</option>
        <option value="500-700">$500 – $700</option>
        <option value="700-999">Above $700</option>
      </select>

      <select name="duration" value={filters.duration} onChange={handleChange} className="filter-select">
        <option value="all">All durations</option>
        <option value="1-3">1 – 3 days</option>
        <option value="4-6">4 – 6 days</option>
        <option value="7-99">7 + days</option>
      </select>

      <select name="country" value={filters.country} onChange={handleChange} className="filter-select">
        <option value="all">All countries</option>
        <option value="France">France</option>
        <option value="Japan">Japan</option>
        <option value="Indonesia">Indonesia</option>
        <option value="Ukraine">Ukraine</option>
        <option value="Greece">Greece</option>
      </select>

      <PrimaryButton label="Apply" onClick={handleApply} />
    </div>
  );
}

export default FilterBar;
