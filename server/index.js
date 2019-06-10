import express from 'express'
import bodyParser from 'body-parser'
import routes from '../routes/index'


const app = express();
app.use(bodyParser.json());
app.use('/api', routes);

app.listen(3000, () => {
  console.log("Listening on port 3000")
});
export default app;
