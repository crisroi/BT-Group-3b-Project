import express from 'express';
import dotenv from 'dotenv';
import expenseRoute from "./routes/expenseRoute.js"
dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/add", expenseRoute);

const PORT = process.env.PORT || 5000;

export const expenses = [
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

app.get('/health', (req, res) => {
  res.send('Server is running!');
});

app.put('/update/:id', (req, res) => {
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


app.delete('/delete/:id', (req, res) => {
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


app.delete('/delete/category/:category', (req, res) => {
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
