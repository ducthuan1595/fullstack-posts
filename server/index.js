import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import postsRoute from './routes/posts.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const URL = process.env.DATABASE_URL;

app.use(bodyParser.json({ limit: '30mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors());

app.use('/posts',postsRoute);

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('Connected to DB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log('Error', err)
  })


