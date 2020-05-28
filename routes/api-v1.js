const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const expensesController = require('../controllers/expenses.js');

router.get('/expenses', expensesController.getAll);
router.get('/expenses/count', expensesController.count);
router.get('/expenses/:id', expensesController.getById);
router.post('/expenses/', expensesController.create);
router.put('/expenses/:id', expensesController.updateById);
router.delete('/expenses/:id', expensesController.deleteById);

module.exports = router;