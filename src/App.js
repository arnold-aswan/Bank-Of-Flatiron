import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [transaction, setTransaction] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    category: "",
    amount: "",
  });

  useEffect(() => {
    fetch("http://localhost:3000/transactions")
      .then((response) => response.json())
      .then((data) => setTransaction(data));
  }, []);

  const handleDelete = (id) => {
    const remTransactions = transaction.filter((item) => id !== item.id);
    console.log(remTransactions);
    setTransaction(remTransactions);
  };

  const handleChange = (search) => {
    setSearch(search);
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

  const handleFormData = (e) => {
    const { name, value } = e.target;
    const newValue = name === "amount" ? Number(value) : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = [...transaction, formData];
    setTransaction(newTransaction);
    // try {
    //   fetch("http://localhost:3000/transactions", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(newTransaction),
    //   })
    //     .then((r) => r.json())
    //     .then((data) => setTransaction(newTransaction));
    // } catch (error) {
    //   console.log(error + "something went wrong");
    // }
  };

  const filteredData = filtered.map((trans) => {
    return (
      <tr key={trans.id} style={{ marginBottom: "1rem" }}>
        <td>{trans.date}</td>
        <td>{trans.description}</td>
        <td>{trans.category}</td>
        <td>{trans.amount}</td>
        <td>
          <button className="delete-btn" onClick={() => handleDelete(trans.id)}>
            Delete
          </button>
        </td>
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
        <td>
          <button className="delete-btn" onClick={() => handleDelete(trans.id)}>
            Delete
          </button>
        </td>
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
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleFormData}
          />
        </div>

        <div className="form-control">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            placeholder="description..."
            value={formData.description}
            onChange={handleFormData}
          />
        </div>
        <div className="form-control">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleFormData}
          />
        </div>

        <div className="form-control">
          <label htmlFor="amount">Amount</label>
          <input
            className="amount"
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleFormData}
          />
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
