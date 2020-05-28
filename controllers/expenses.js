const createError = require('http-errors');

const Expenses = require('../models/Expense.js');

module.exports.count = async function(req, res, next) {
    try {
        const count = await Expenses.countDocuments();
        return res.json({ count });
    } catch (err) {
        return next(createError(500, err.message));
    }
}

module.exports.getAll = async function(req, res, next) {
    try {
        const expenses = await Expenses.find();
        return res.json(expenses);
    } catch (err) {
        return next(createError(500, err.message));
    }
}

module.exports.getById = async function(req, res, next) {
    try {
        const { id } = req.params;
        if (!id) {
            return next(createError(400, 'Incorrect id'));
        }
        const expense = await Expenses.findById({ _id: id });
        if (!expense) {
            return next(createError(404, 'Expense not found'));
        }
        return res.json(expense);
    } catch (err) {
        return next(createError(500, err.message));
    }
}

module.exports.create = async function(req, res, next) {
    try {
        const { name } = req.body;
        if (!name || !name.length) {
            return next(createError(400, 'Incorrect expense name'));
        }
        const expense = await Expenses.create({ name: name });
        if (!expense) {
            return next(createError(500, 'Can\'t create expense.'));
        }
        return res.json(expense);
    } catch (err) {
        return next(createError(500, err.message));
    }
}

module.exports.updateById = async function(req, res, next) {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!id) { return next(createError(400, 'Incorrect expense id')); }
        if (!name || !name.length) { return next(createError(400, 'Incorrect expense name')); }

        const expense = await Expenses.findByIdAndUpdate(id, { name: name }, { new: true });

        if (!expense) {
            return next(createError(500, 'Can\' update expense'));
        }

        return res.json(expense);
    } catch (err) {
        return next(createError(500, err.message));
    }
}

module.exports.deleteById = async function(req, res, next) {
    try {
        const { id } = req.params;
        
        if (!id) {
            return next(createError(400, 'Incorrect expense id'));
        }

        const result = await Expenses.findByIdAndDelete(id);

        if (!result) {
            return next(createError(404, 'Can\'t find expense.'));
        }

        return res.json(result);
    } catch (err) {
        return next(createError(500, err.message));
    }
}