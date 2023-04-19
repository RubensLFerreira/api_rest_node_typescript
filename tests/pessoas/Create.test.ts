// import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';

describe('Pessoas - Create', () => {
  it('Cria registro', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({
        email: 'rubens@gmail.com',
        cidadeId: 1,
        nome: 'Rubens',
        sobrenome: 'Lima'
      });
  });
});