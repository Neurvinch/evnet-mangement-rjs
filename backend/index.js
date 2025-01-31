const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authroutes');

const app = express()

app.use(express.json());
app.use(cors());

mongoose.connect('' )
.then ( ()=> console.log('db connected'))
.catch(err => console.log(err));

app.use('/api/auth', authRoutes);

app.listen(5000, () => console.log('server started'));
