import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function TransactionForm({
  setFormData,
  formData,
  transaction,
  setTransaction,
}) {
  const [formErrors, setFormErrors] = useState({});

  const handleFormData = (e) => {
    const { name, value } = e.target;
    const newValue = name === "amount" ? Number(value) : value;
    setFormData({
      ...formData,
      id: uuidv4(),
      [name]: newValue,
    });
  };

  const formValidation = () => {
    const errors = {};
    if (formData.date === "") {
      errors.date = "Enter Transaction Date.";
    }
    if (formData.description === "") {
      errors.description = "Enter Transaction Description";
    }
    if (formData.category === "") {
      errors.category = "Enter Category Description.";
    }
    if (formData.amount === "") {
      errors.amount = "Enter Transaction Amount";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // formValidation();
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
        {/* {formErrors.date && <p className="error">{formErrors.date}</p>} */}
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
        {/* {formErrors.description && (<p className="error">{formErrors.description}</p>)} */}
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
        {/* {formErrors.category && <p className="error">{formErrors.category}</p>} */}
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
        {/* {formErrors.amount && <p className="error">{formErrors.amount}</p>} */}
      </div>
      <input className="btn" type="submit" />
    </form>
  );
}

export default TransactionForm;
