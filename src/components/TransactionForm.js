import React from "react";

function TransactionForm({
  setFormData,
  formData,
  transaction,
  setTransaction,
}) {
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
    setFormData({
      date: "",
      description: "",
      category: "",
      amount: "",
    });
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleFormData}
          required
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
          required
        />
      </div>
      <div className="form-control">
        <label htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleFormData}
          required
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
          required
        />
      </div>
      <input className="btn" type="submit" />
    </form>
  );
}

export default TransactionForm;
