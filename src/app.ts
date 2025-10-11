import express, { Application, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();
import path from 'path';
import globalErrHandler from './app/middlewares/golballErrorHandler';
import notFoundRoute from './app/middlewares/notFoundRoute';
import rounter from './app/routes';

app.use(express.json());
app.use(cors());

app.use('/api/v1/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/v1', rounter);

app.get('/', (req: Request, res: Response) => {
  res.send('titasweb server is running');
});

//global error handler
app.use(globalErrHandler);

// not found route
app.use(notFoundRoute);

export default app;
