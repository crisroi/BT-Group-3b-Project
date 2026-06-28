import { randomUUID } from "crypto";

const expenses = [
    { id: randomUUID(), title: "Breakfast", amount: 5, date: Date.now(), category: "food" }
];

const createExpense = (req, res) => {
    const { title, amount, category } = req.body;
    
    if (!title || amount == null || !category) {
        return res.status(400).json({ success: false, message: "Some fields are missing" });
    }

    const expenditure = {
        id: randomUUID(),
        title,
        amount,
        date: Date.now(),
        category
    };

    expenses.push(expenditure);

    return res.status(201).json({ success: true, message: "Expense created successfully", data: expenditure });
};

const getExpenses = (req, res) => {
    return res.status(200).json({ success: true, data: expenses });
}

export {createExpense, getExpenses};