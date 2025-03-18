import express from 'express';
import bodyParser from 'body-parser';
import { setOrderRoutes } from './routes/orderRoutes';
import { authenticate } from './middlewares/authMiddleware';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(authenticate);

setOrderRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});