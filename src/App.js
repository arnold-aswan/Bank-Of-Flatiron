import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [transaction, setTransaction] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [submittedData, setSubmittedData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/transactions")
      .then((response) => response.json())
      .then((data) => setTransaction(data));
  }, []);

  const handleChange = (search) => {
    // setSearch(event.target.value);
    setSearch(search);
    // console.log(search);
    const updatedList = [...transaction];
    if (search !== "") {
      const filter = updatedList.filter(
        (item) =>
          // item.category.toLowerCase() ||
          item.description.toLowerCase() === search
      );
      setFiltered(filter);
    } else if (search === "") {
      setFiltered(updatedList);
    }
  };

  const handleFormData = (e) => {};

  const handleSubmit = (e) => {};

  const filteredData = filtered.map((trans) => {
    return (
      <tr key={trans.id} style={{ marginBottom: "1rem" }}>
        <td>{trans.date}</td>
        <td>{trans.description}</td>
        <td>{trans.category}</td>
        <td>{trans.amount}</td>
      </tr>
    );
  });

  const nonFilteredData = transaction.map((trans) => {
    return (
      <tr key={trans.id} style={{ marginBottom: "1rem" }}>
        <td>{trans.date}</td>
        <td>{trans.description}</td>
        <td>{trans.category}</td>
        <td>{trans.amount}</td>
      </tr>
    );
  });

  return (
    <div className="App">
      <h1>FlatIron Bank</h1>
      <input
        className="search"
        type="text"
        onChange={(e) => handleChange(e.target.value)}
        value={search}
        placeholder="search description ..."
      />
      <h1>{search}</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="date">Date</label>
          <input type="date" name="date" onChange={handleFormData} />
        </div>

        <div className="form-control">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            placeholder="description..."
            onChange={handleFormData}
          />
        </div>
        <div className="form-control">
          <label htmlFor="category">Category</label>
          <select name="category" onChange={handleFormData}>
            {transaction.map((item) => {
              return <option key={item.id}>{item.category}</option>;
            })}
          </select>
        </div>
        <input className="btn" type="submit" />
      </form>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>{search.length > 1 ? filteredData : nonFilteredData}</tbody>
      </table>
    </div>
  );
}

export default App;
