import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import routes from './routes';
import configs from './configs/configs';

mongoose.connect(
  configs.mongoHost(), 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

const app = express();

app.use(bodyParser.json());

app.use('/', routes);

app.listen(3000, () => {
  console.log(`server listening`);
})