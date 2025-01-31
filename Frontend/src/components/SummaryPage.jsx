import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/style.css";

const SummaryPage = () => {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const budgetResponse = await axios.get("http://localhost:3004/budget");
        setBudget(budgetResponse.data.budget);

        const expensesResponse = await axios.get("http://localhost:3004/expenses");
        setExpenses(expensesResponse.data);
      } catch (error) {
        setMessage("Error fetching data");
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const remainingBudget = budget - totalExpenses;

  return (
    <div className="container">
      <h1>Budget Summary</h1>
      {message && <p>{message}</p>}
      <p>Total Budget: ${budget}</p>
      <p>Total Expenses: ${totalExpenses}</p>
      <p>Remaining Budget: ${remainingBudget}</p>
    </div>
  );
};

SummaryPage.propTypes = {
  budget: PropTypes.number,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ),
};

export default SummaryPage;
