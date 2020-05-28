const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const ExpenseSchema = new Schema({
    _id: {type: String, default: shortid.generate},
    name: {type: String, required: true}
});

const Expense = mongoose.model('Expense', ExpenseSchema);

module.exports = Expense;