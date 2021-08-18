import express from 'express';
import router from './src/router/person.router.js';
const app = express();

app.use(express.json());
app.use('/person',router);


app.listen(3030,()=>{ console.log('API IS RUNNING')});