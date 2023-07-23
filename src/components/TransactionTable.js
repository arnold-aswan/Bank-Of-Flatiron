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
    setTransaction(remTransactions);
  };

  const table = (data) => {
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
  };

  const sort = (arr) => {
    arr.sort(function (a, b) {
      if (a.description < b.description) {
        return -1;
      }
      if (a.description > b.description) {
        return 1;
      }
      return 0;
    });
  };

  sort(filtered);
  const filteredData = filtered.map((data) => {
    return table(data);
  });

  sort(transaction);
  const nonFilteredData = transaction.map((data) => {
    return table(data);
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
        <tbody>{search.length > 0 ? filteredData : nonFilteredData}</tbody>
      </table>
      <h3 className="error-search">
        {/* {filteredData.length < 1 ? "Search query not found." : null} */}
      </h3>
    </div>
  );
}

export default TransactionTable;
