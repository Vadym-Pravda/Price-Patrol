import express from 'express';
import bodyParser from 'body-parser';
import { getAllLinks, addLink } from './db.js';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    const links = await getAllLinks();
    res.render('../views/index', { links });
});

app.post('/add', async (req, res) => {
    const { url } = req.body;
    await addLink(url);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
