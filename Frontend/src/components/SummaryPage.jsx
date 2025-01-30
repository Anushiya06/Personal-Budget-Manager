import PropTypes from "prop-types";
import "../style.css";

const SummaryPage = ({ budget, expenses }) => {
  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const remainingBudget = budget - totalExpenses;

  return (
    <div className="container">
      <h1>Budget Summary</h1>
      <p>Total Budget: ${budget}</p>
      <p>Total Expenses: ${totalExpenses}</p>
      <p>Remaining Budget: ${remainingBudget}</p>
    </div>
  );
};

SummaryPage.propTypes = {
  budget: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default SummaryPage;
