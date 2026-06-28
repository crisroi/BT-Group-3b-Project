import express from 'express';
import dotenv from 'dotenv';
import expenseRoute from "./routes/expenseRoute.js"

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/expenses", expenseRoute)

const PORT = process.env.PORT || 5000;

app.get('/health', (req, res) => {
  res.send('Server is running!');
});


app.listen(PORT, () => console.log(`Server on port ${PORT}`));