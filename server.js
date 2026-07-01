import express from 'express';
import dotenv from 'dotenv';
// import expenseRoute from "./routes/expenseRoute.js"
dotenv.config();

// Initialize Express app
const app = express();
// Middleware to parse JSON request bodies
app.use(express.json());
// Use the expense route for handling expense-related requests
// app.use("/api/add", expenseRoute);

// Set the port from environment variable or default to 5000
const PORT = process.env.PORT || 5000;

// Sample expenses data
export let expenses = [
    {
        id: 1,
        amount: 2000,
        description: 'Family dinner',
        category: 'Food',
        createdAt: new Date(),
    },
    {
        id: 2,
        amount: 1500,
        description: 'Movie tickets',
        category: 'Entertainment',
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

// Category options
const categories = ['Food', 'Entertainment', 'Transportation', 'Utilities', 'Healthcare', 'Education', 'Shopping', 'Travel', 'Other'];

// Health check endpoint
app.get('/health', (req, res) => {
  res.send('Server is running!');
});

// Get all expenses
app.get('/expenses/list', (req, res) => {
    res.status(200).json({
        expenses
    });
});

// Get an expense by ID
app.get('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const expense = expenses.find(exp => exp.id === id);        

    if (!expense) {
        return res.status(404).json({
            message: 'Expense not found'
        });
    }

    res.status(200).json({
        expense
    });
});

// Get all categories
app.get('/categories', (req, res) => {
    res.status(200).json({
        categories
    });
});

// Get expenses by category
app.get('/expenses/category/:category', (req, res) => {
    const category = req.params.category;
    const filteredExpenses = expenses.filter(expense => expense.category.toLowerCase() === category.toLowerCase());
    res.status(200).json({
        expenses: filteredExpenses
    });
});

// Add a new expense
app.post('/expenses/add', (req, res) => {
    const { amount, description, category } = req.body;
    if (!description) {
        return res.status(400).json({ success: false, message: "Description is required" });
    }
    if (!amount || isNaN(amount) || amount <= 0){
        return res.status(400).json({ success: false, message: "Enter a valid amount greater than 0" });
    }
    if (!category || !categories.includes(category)) {
        return res.status(400).json({ success: false, message: `Enter a valid category from ${categories.join(', ')}` });
    }

    const expenditure = {
        id: expenses.length+1,
        amount,
        description,
        category,
        createdAt: new Date(),
    };

    expenses.push(expenditure);

    return res.status(201).json({ success: true, message: "Expense created successfully", data: expenditure });
});

// Update an expense by ID
app.put('/expenses/update/:id', (req, res) => {
    const id = Number(req.params.id);
    const expense = expenses.find(exp => exp.id === id);

    if (!expense) {
        return res.status(404).json({
            message: 'Expense not found'
        });
    }

    const { amount, description, category } = req.body;

    if (category && !categories.includes(category)) {
        return res.status(400).json({
            message: 'Invalid category'
        });
    }

    expense.amount = amount ?? expense.amount;
    expense.description = description ?? expense.description;
    expense.category = category ?? expense.category;
    expense.updatedAt = new Date();

    res.status(200).json({
        message: 'Expense updated successfully',
        expense
    });
});

// Delete an expense by ID
app.delete('/expenses/delete/:id', (req, res) => {
    const id = Number(req.params.id);

    const expense = expenses.find(exp => exp.id === id);

    if (!expense) {
        return res.status(404).json({
            message: 'Expense not found'
        });
    }

    expenses = expenses.filter(exp => exp.id !== id);

    res.status(200).json({
        message: 'Expense deleted successfully'
    });
});

// Delete all expenses in a specific category
app.delete('/expenses/delete/category/:category', (req, res) => {
    const category = req.params.category;
    const deletedCount = expenses.filter(expense => expense.category.toLowerCase() === category.toLowerCase()).length;

if (deletedCount === 0) {
    return res.status(404).json({
        message: `No expenses found in '${category}' category .`
    });
}

expenses = expenses.filter(expense => expense.category.toLowerCase() !== category.toLowerCase());

res.status(200).json({
    message: `All expenses in '${category}' category deleted successfully`,deletedCount});

});



app.listen(PORT, () => console.log(`Server on port ${PORT}`));
