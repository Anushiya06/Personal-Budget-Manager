import PropTypes from "prop-types";
import "../styles/style.css";

const ExpenseListPage = ({ expenses }) => {
  return (
    <div className="container">
      <h1>Your Expenses</h1>
      {expenses.length > 0 ? (
        <ul>
          {expenses.map((expense, index) => (
            <li key={index}>
              <span>{expense.name}</span>
              <span>${expense.amount}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No expenses added yet.</p>
      )}
    </div>
  );
};

ExpenseListPage.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ExpenseListPage;
