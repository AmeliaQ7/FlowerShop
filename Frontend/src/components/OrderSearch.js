import { useState } from "react";

function OrderSearch({ onSearch }) {
  const [clientName, setClientName] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setClientName(value);
    onSearch(value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Szukaj po kliencie..."
        value={clientName}
        onChange={handleChange}
      />
    </div>
  );
}

export default OrderSearch;
