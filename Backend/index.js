const express = require('express');
const mdb = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const cors = require('cors');
const Signup = require('./models/signupSchema');
const Expense = require('./models/expenseSchema');
const Budget = require('./models/Budget');

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

mdb.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB Connection Successful");
  })
  .catch((err) => {
    console.log("MongoDB Connection Unsuccessful", err);
  });

app.get("/", (req, res) => {
  res.send("Welcome to the Budget Manager API!");
});

app.post('/signup', async (req, res) => {
  const { firstName, lastName, userName, email, password } = req.body;
  const hashedpassword = await bcrypt.hash(password, 10);
  try {
    const newSignup = new Signup({
      firstName,
      lastName,
      userName,
      email,
      password: hashedpassword
    });

    await newSignup.save();
    res.status(201).send("SignUp Successful");
  } catch (err) {
    res.status(400).send({ message: "SignUp Unsuccessful", error: err.message });
  }
});

app.get('/getsignupdet', async (req, res) => {
  try {
    const signUpdet = await Signup.find();
    res.status(200).json(signUpdet);
  } catch (err) {
    res.status(500).send({ message: "Error Fetching Data", error: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Signup.findOne({ email });
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (isPasswordCorrect) {
        res.status(200).json({ message: "Login Successful", IsLoggedIn: true });
      } else {
        res.status(200).json({ message: "Login Unsuccessful", IsLoggedIn: false });
      }
    } else {
      res.status(401).json({ message: "User not found please signup!", IsLoggedIn: false });
    }
  } catch (err) {
    res.status(500).json({ message: "Error during login" });
  }
});

app.post('/addbudget', async (req, res) => {
  try {
    const { budget } = req.body;
    if (!budget) {
      return res.status(400).json({ message: "Budget is required" });
    }

    const newBudget = new Budget({ budget });
    await newBudget.save();

    res.status(201).json({ message: "Budget added successfully", budget: newBudget });
  } catch (err) {
    res.status(500).json({ message: "Error adding budget", error: err.message });
  }
});

app.post('/addexpense', async (req, res) => {
  try {
    const { name, amount } = req.body;
    if (!name || !amount) {
      return res.status(400).json({ message: "Expense name and amount are required" });
    }

    const budget = await Budget.findOne();
    const totalExpenses = await Expense.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]);
    const totalExpenseAmount = totalExpenses.length > 0 ? totalExpenses[0].total : 0;
    const remainingBudget = budget.budget - totalExpenseAmount;

    if (amount > remainingBudget) {
      return res.status(400).json({ message: "Expense exceeds budget" });
    }

    const newExpense = new Expense({ name, amount });
    await newExpense.save();

    res.status(201).json({ message: "Expense added successfully", expense: newExpense });
  } catch (err) {
    res.status(500).json({ message: "Error adding expense", error: err.message });
  }
});

app.get('/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching expenses", error: err.message });
  }
});

app.get('/budget', async (req, res) => {
  try {
    const budget = await Budget.findOne();
    res.status(200).json(budget);
  } catch (err) {
    res.status(500).json({ message: "Error fetching budget", error: err.message });
  }
});

app.listen(3004, () => {
  console.log("Server Started");
});
