const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema({
  budget: Number
});

module.exports = mongoose.model("Budget", BudgetSchema);
