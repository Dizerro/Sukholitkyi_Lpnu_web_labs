import PrimaryButton from "./PrimaryButton";

function FilterBar() {
  return (
    <div className="filter-bar">
      <select className="filter-select">
        <option>Filter 1</option>
      </select>

      <select className="filter-select">
        <option>Filter 2</option>
      </select>

      <select className="filter-select">
        <option>Filter 3</option>
      </select>

      <PrimaryButton label="Apply" />
    </div>
  );
}

export default FilterBar;
