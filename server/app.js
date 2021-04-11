const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
global.db = mongoose.createConnection('mongodb://localhost/juboProject');

const patientRoutes = require('./route/patientRoute');
const orderRoutes = require('./route/orderRoute');

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({}));

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.get('/patient', patientRoutes.get);
app.post('/patient', patientRoutes.insert);

app.get('/order:id', orderRoutes.get);
app.get('/getPatientOrder/:patientId', orderRoutes.getPatientOrder);
app.post('/order', orderRoutes.insert);
app.put('/order/:orderId', orderRoutes.update);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})