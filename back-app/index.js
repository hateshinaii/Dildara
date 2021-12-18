const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express()
const mongoDB = 'mongodb+srv://hateshinaii:Anuras54@cluster0.3cgp0.mongodb.net/todo?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var UserShema = new mongoose.Schema({
	email: String,
	password: String
})

var UserModel = mongoose.model('UserModel', UserShema)

const port = 3001

var jsonParser = bodyParser.json()

app.use(cors());

app.get('/', (res) => {
	res.send('hello world')
})

app.post('/auth', jsonParser, (req, res) => {
	res.json(req.body)
	console.log(req.body)

	const user = new UserModel({email: req.body.email, password: req.body.password})

	user.save((err) => {
		console.log(err);
	})
})

app.listen(port, () => {
	console.log('Listening');
})
