import React from "react";

function TransactionTable({
  search,
  transaction,
  setTransaction,
  filtered,
  FiTrash2,
}) {
  const handleDelete = (id) => {
    const remTransactions = transaction.filter((item) => id !== item.id);
    // console.log(remTransactions);
    setTransaction(remTransactions);
  };

  const filteredData = filtered.map((data) => {
    return (
      <tr key={data.id} style={{ marginBottom: "1rem" }}>
        <td>{data.date}</td>
        <td>{data.description}</td>
        <td>{data.category}</td>
        <td>{data.amount}</td>
        <td>
          <button className="delete-btn" onClick={() => handleDelete(data.id)}>
            <FiTrash2 style={{ fontSize: "1.2rem" }} />
          </button>
        </td>
      </tr>
    );
  });

  const nonFilteredData = transaction.map((data) => {
    return (
      <tr key={data.id} style={{ marginBottom: "1rem" }}>
        <td>{data.date}</td>
        <td>{data.description}</td>
        <td>{data.category}</td>
        <td>{data.amount}</td>
        <td>
          <button className="delete-btn" onClick={() => handleDelete(data.id)}>
            <FiTrash2 style={{ fontSize: "1.2rem" }} />
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{search.length > 1 ? filteredData : nonFilteredData}</tbody>
      </table>
    </div>
  );
}

export default TransactionTable;
