import express from 'express';
import routes from './route'

const app = express();
const port = 8000 || ENV['PORT']

routes(app);
//listening to the port
app.listen(port, () => {
  console.log("Listening on port", port)
});