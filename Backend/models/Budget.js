const mdb = require("mongoose");
const budgetSchema = mdb.Schema({
  budget: Number,
});
const Budget = mdb.model("Budget", budgetSchema);
module.exports = Budget;
