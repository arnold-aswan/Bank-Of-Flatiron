import React, { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import SearchBar from "./components/SearchBar";
import TransactionForm from "./components/TransactionForm";
import TransactionTable from "./components/TransactionTable";
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

  return (
    <div className="App">
      <h1>FlatIron Bank</h1>

      <SearchBar
        setFiltered={setFiltered}
        search={search}
        setSearch={setSearch}
        transaction={transaction}
      />

      <TransactionForm
        setFormData={setFormData}
        formData={formData}
        transaction={transaction}
        setTransaction={setTransaction}
      />

      <TransactionTable
        search={search}
        transaction={transaction}
        setTransaction={setTransaction}
        filtered={filtered}
        FiTrash2={FiTrash2}
      />
    </div>
  );
}

export default App;
