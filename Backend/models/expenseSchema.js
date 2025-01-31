const mdb = require("mongoose");
const expenseSchema = mdb.Schema({
  name: String,
  amount: Number,
});
const Expense = mdb.model("Expense", expenseSchema);
module.exports = Expense;
