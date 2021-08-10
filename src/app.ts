import express, { Request } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import routes from './routes';
import configs from './configs/configs';
import Logger from './utils/logger.util';

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

app.use((req: Request, _, next) => {
  const { path, params, body, headers, method } = req;
  
  Logger.info(`[Incoming Request]`, {
    path,
    params,
    method,
    body,
    headers
  });
  
  next();
})

app.use('/', routes);

app.listen(configs.port(), () => {
  Logger.info(`server listening on port ${configs.port()}`);
})