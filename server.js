import express from 'express';
import routes from './routes';
import { APP_PORT } from './config';

const app = express();

// Used All routes
app.use('/api', routes);

app.listen(APP_PORT, ()=> {
    console.log(`This application is running on port${APP_PORT}`);
});