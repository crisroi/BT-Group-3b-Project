import { Router } from "express";
import { expenses } from "../server.js";

const router = Router();

router.post("/", (req, res) => {
    const { title, amount, category } = req.body;
    if (!title || amount == null || !category) {
        return res.status(400).json({ success: false, message: "Some fields are missing" });
    }

    const expenditure = {
        id: expenses.length+1,
        title,
        amount,
        date: new Date(),
        category
    };

    expenses.push(expenditure);

    return res.status(201).json({ success: true, message: "Expense created successfully", data: expenditure })
})

export default router;