import express from 'express';
import dotenv from 'dotenv';


const app = express();
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 5000;

app.get('/health', (req, res) => {
  res.send('Server is running!');
});


app.listen(PORT, () => console.log(`Server on port ${PORT}`));