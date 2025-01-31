import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BudgetPage from "./components/BudgetPage";
import ExpenseInputPage from "./components/ExpenseInputPage";
import ExpenseListPage from "./components/ExpenseListPage";
import SummaryPage from "./components/SummaryPage";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import "./styles/navbar.css";
import "./styles/style.css";
function App() {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  return (
    <Router>
     
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
       
        <Route path="/home" element={<><Navbar/><Home /></>} />
        <Route path="/budget" element={<><Navbar/><BudgetPage budget={budget} setBudget={setBudget} /></>} />
        <Route path="/expense-input" element={<><Navbar/><ExpenseInputPage addExpense={addExpense} /></>} />
        <Route path="/expense-list" element={<><Navbar/><ExpenseListPage expenses={expenses} /></>} />
        <Route path="/summary" element={<><Navbar/><SummaryPage budget={budget} expenses={expenses} /></>} />
      </Routes>
    </Router>
  );
}

export default App;
