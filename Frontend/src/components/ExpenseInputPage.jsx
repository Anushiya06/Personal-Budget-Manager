import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";
import "../styles/style.css";

const ExpenseInputPage = ({ addExpense }) => {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!expenseName || !expenseAmount) return;

    try {
      const response = await axios.post("https://personal-budget-manager-mkml.onrender.com/addexpense", {
        name: expenseName,
        amount: Number(expenseAmount),
      });
      setMessage(response.data.message);
      addExpense({ name: expenseName, amount: Number(expenseAmount) });
    } catch (error) {
      setMessage(error.response.data.message || "Error adding expense");
    }
    setExpenseName("");
    setExpenseAmount("");
  };

  return (
    <div className="container">
      <h1>Add New Expense</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Expense Name"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Expense Amount"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
        />
        <button type="submit">Add Expense</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

ExpenseInputPage.propTypes = {
  addExpense: PropTypes.func.isRequired,
};

export default ExpenseInputPage;
