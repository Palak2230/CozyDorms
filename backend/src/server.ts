const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

import { sample_pgs } from "./data";
import { sample_localities } from "./data";
import { sample_users } from "./data";

const app = express();
app.use(bodyParser.json());
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"],
}))

app.get('/api/pgs', (req: any, res: any) => {
    res.json(sample_pgs);
});
app.get('/api/localities', (req: any, res: any) => {
    res.json(sample_localities);
});
app.get('/api/users', (req: any, res: any) => {
    res.json(sample_users);
});
app.get('/api/pgs/search', (req: any, res: any) => {
    const searchTerm = req.query.q;
    const result = sample_pgs.filter(pg => pg.city.toLowerCase().includes(searchTerm.toLowerCase()));
    res.json(result);
});


app.get('/api/localities/search', (req: any, res: any) => {
    const searchTerm = req.query.q;
    const result = sample_localities.filter(locality => locality.city.toLowerCase() == searchTerm.toLowerCase());
    res.json(result);
});

app.post('/api/users/login', (req: any, res: any) => {
    // console.log(req.body);
    const { email, password } = req.body;
    const user = sample_users.find(user => user.email === email && user.password === password);

    if (user) {
        console.log('you are user palak!');
        res.send(user);
    } else {
        console.log('you are not a user palak!');
        res.status(400).send("not successful");
    }
});



const port = 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})