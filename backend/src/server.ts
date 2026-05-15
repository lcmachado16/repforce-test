import express from 'express'
import { productsRouter } from './routes/products'

const app = express()


// app.use(cors());

// usado para ler o body da requisição
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use(productsRouter);


app.listen(3333, () => {
  console.log('Server is running on http://localhost:3333')
})