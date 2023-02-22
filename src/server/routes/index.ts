import { Router } from 'express';
import {StatusCodes} from 'http-status-codes';

const router = Router();

router.get('/', (req, res) => {
  return res.send('Hello world!');
});

router.post('/enviar', (req, res) => {
  console.log(req.query.teste);
  return res.status(StatusCodes.ACCEPTED).json('POST');
});

export { router };