import express from 'express';
import bodyParser from 'body-parser';
import routes from './route';

const app = express();
const port = 8000 || ENV['PORT']

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

routes(app);
//listening to the port
app.listen(port, () => {
  console.log("Listening on port", port)
});