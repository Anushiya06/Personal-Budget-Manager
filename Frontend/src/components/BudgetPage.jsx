import PropTypes from "prop-types";
import { useState } from "react";
import "../style.css";

const BudgetPage = ({ budget, setBudget }) => {
  const [localBudget, setLocalBudget] = useState(budget);
  const saveBudget = () => {
    setBudget(localBudget);
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
    </div>
  );
};

BudgetPage.propTypes = {
  budget: PropTypes.number.isRequired,
  setBudget: PropTypes.func.isRequired,
};

export default BudgetPage;
