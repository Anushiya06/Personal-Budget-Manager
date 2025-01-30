import PropTypes from "prop-types";
import { useState } from "react";
import "../style.css";

const ExpenseInputPage = ({ addExpense }) => {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!expenseName || !expenseAmount) return;
    addExpense({ name: expenseName, amount: Number(expenseAmount) });
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
    </div>
  );
};

ExpenseInputPage.propTypes = {
  addExpense: PropTypes.func.isRequired,
};

export default ExpenseInputPage;
