import express from 'express';
import './db/connection.js';
//import MongoStore from 'connect-mongo'; // session store for passport
import cors from 'cors';
import { join } from 'path';
import { Skin } from './models/skin.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(join(import.meta.dirname, '../public')));
app.set('views', join(import.meta.dirname, '../views'));
app.set('view engine', 'ejs');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// read cookie
app.use((req, res, next) => {
    const { headers: { cookie } } = req;
    if (cookie) {
        const values = cookie.split(';').reduce((res, item) => {
            const data = item.trim().split('=');
            return { ...res, [data[0]]: data[1] };
        }, {});
        res.locals.cookie = values;
    }
    else res.locals.cookie = {};
    next();
});
let codes = ['12345'];

app.get('/', auth, (req, res) => {
	res.render('index');
});

app.post('/subscribe', (req, res) => {
	const { body: { code } } = req;
	if (code) {
		if (codes.includes(code)) return res.send({ success: 'Access granted' });
	}
	res.send({ fail: 'Invalid code' });
});

// app.get('/parsing', auth, async (req, res) => {
// 	res.send({ message: 'Authorized' });
// });

app.get('/skins', async (req, res) => {
    console.log('Request for skins received');
    let skins = await Skin.find();
    res.send(skins);
});

async function auth(req, res, next) {
	const { auth } = res.locals.cookie;
	if (auth && codes.includes(auth)) {
		return next();
	}
	res.render('auth');
}

export default app