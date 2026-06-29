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




app.listen(PORT, () => console.log(`Server on port ${PORT}`));