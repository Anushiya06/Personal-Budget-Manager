import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";
import "../styles/style.css";

const BudgetPage = ({ budget, setBudget }) => {
  const [localBudget, setLocalBudget] = useState(budget);
  const [message, setMessage] = useState("");

  const saveBudget = async () => {
    try {
      const response = await axios.post("http://localhost:3004/addbudget", {
        budget: localBudget
      });
      setMessage(response.data.message);
      setBudget(localBudget);
    } catch (error) { 
      setMessage("Error saving budget");
      console.error(error); 
    }
  };

  return (
    <div className="container">
      <h1>Set Your Budget</h1>
      <input
        type="number"
        value={localBudget}
        onChange={(e) => setLocalBudget(Number(e.target.value))}
      />
      <button onClick={saveBudget}>Save Budget</button>
      {message && <p>{message}</p>}
    </div>
  );
};

BudgetPage.propTypes = {
  budget: PropTypes.number.isRequired,
  setBudget: PropTypes.func.isRequired,
};

export default BudgetPage;
