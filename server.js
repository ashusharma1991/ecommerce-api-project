import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import { APP_PORT, DB_URL  } from './config';
import errorHandler from './middlewares/errorHandler';

const app = express();
app.use(express.json()); 

// Database connection
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB connected...');
});

// Used All routes
app.use('/api', routes);
app.use('/', (req, res) => {
    res.send(`
  <h1>Welcome to E-commerce Rest APIs</h1>
  You may reach out to me for any question related to this Apis: ashutoshsharma.048@gmail.com
  `);
});
app.use(errorHandler);



app.listen(APP_PORT, ()=> {
    console.log(`This application is running on port${APP_PORT}`);
});