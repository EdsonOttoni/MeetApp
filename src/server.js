require('dotenv-load')();

// eslint-disable-next-line import/first
import app from './app';

app.listen(process.env.PORT);
