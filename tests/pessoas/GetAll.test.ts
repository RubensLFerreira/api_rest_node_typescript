
import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Pessoas - GetAll', () => {
  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer
      .post('/cidades')
      .send({ nome: 'cedro'});

    cidadeId = resCidade.body;
  });

  it('Buscar todos os registros', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({
        cidadeId,
        email: 'rubensGetAll@gmail.com',
        nome: 'Rubens',
        sobrenome: 'Lima'
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resGetAll = await testServer
      .get('/pessoas')
      .send();
    expect(Number(resGetAll.header['x-total-count'])).toBeGreaterThan(0);
    expect(resGetAll.statusCode).toEqual(StatusCodes.OK);
    expect(resGetAll.body.length).toBeGreaterThan(0);
  });
});