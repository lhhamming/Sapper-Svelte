import express from 'express';
import compression from 'compression';
import bodyParser from "body-parser";
import api from './REST/api.js'
import login from './login.js'
import register from './register.js'
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

express()
	.use(
		compression({threshold: 0}),
		bodyParser.json(),
		express.json()
	)
	.use(express.static('static'))
	.use('/api', api)
	.put('/credentials', login)
	.put('/registration', register)
	.use(sapper.middleware())
	.all('/', function (req,res,next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next()
	})
	.listen(PORT, err =>{
		if(err) console.log('Error: ', err)
	})