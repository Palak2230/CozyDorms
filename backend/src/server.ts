const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const bodyParser = require('body-parser');
import PgRouter from './router/pg.router';
import UserRouter from './router/user.router';

import { sample_pgs } from "./data";
import { sample_localities } from "./data";
import { sample_users } from "./data";
import { dbConnect } from './configs/database.config';
dbConnect();
const app = express();
app.use(bodyParser.json());
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"],
}))
app.use('/api/pgs', PgRouter)
app.use('/api/users', UserRouter)
// app.use('/api/locality', LocalityRouter)


const port = 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})