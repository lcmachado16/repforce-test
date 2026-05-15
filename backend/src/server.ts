import express from 'express'
import { productsRouter } from './routes/products'
import cors from 'cors';
import { config } from '@repforce/shared';

const app = express()


// app.use(cors());

// usado para ler o body da requisição
app.use(express.json());

// liberar o acesso apenas para o frontend
app.use(cors({ origin: config.frontend.url }))
// app.use(cors());

// log de todas as requisições
app.use((req, res, next) => {
  console.log(`>>>[${new Date().toISOString()}] :: ${req.method} ${req.url}`)
  next()
})


app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use(productsRouter);


app.listen(3333, () => {
  console.log('Server is running on http://localhost:3333')
})