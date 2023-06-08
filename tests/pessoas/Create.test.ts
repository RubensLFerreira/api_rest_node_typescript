import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';

describe('Pessoas - Create', () => {
  let cidadeId: number | undefined = undefined;

  beforeAll(async () => {
    const resCidade = await testServer
      .post('/cidades')
      .send({ nome: 'Teste' });

    cidadeId = resCidade.body;
  });

  it('Cria registro', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({
        cidadeId,
        email: 'rubens@gmail.com',
        nome: 'Rubens',
        sobrenome: 'Lima'
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');
  });

  it('Cria registro 2', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({
        cidadeId,
        email: 'rubens2@gmail.com',
        nome: 'Rubens',
        sobrenome: 'Lima'
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');
  });

  it('Tenta criar registro com email duplicado', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({
        cidadeId,
        nomeCompleto: 'Juca silva',
        email: 'jucaduplicado@gmail.com',
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');

    const res2 = await testServer
      .post('/pessoas')
      .send({
        cidadeId,
        email: 'jucaduplicado@gmail.com',
        nomeCompleto: 'duplicado',
      });
    expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res2.body).toHaveProperty('errors.default');
  });

  // it('Tenta criar registro sem nome', async () => {
  //   const res1 = await testServer
  //     .post('/pessoas')
  //     .send({
  //       cidadeId,
  //       email: 'rubens@gmail.com',
  //       sobrenome: 'Lima'
  //     });

  //   expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  //   expect(res1.body).toHaveProperty('errors.body.nome');
  // });

  // it('Tenta criar registro sem sobrenome', async () => {
  //   const res1 = await testServer
  //     .post('/pessoas')
  //     .send({
  //       cidadeId,
  //       email: 'rubens@gmail.com',
  //       nome: 'Rubens'
  //     });

  //   expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  //   expect(res1.body).toHaveProperty('errors.body.sobrenome');
  // });

  // it('Tenta criar registro sem email', async () => {
  //   const res1 = await testServer
  //     .post('/pessoas')
  //     .send({
  //       cidadeId,
  //       nome: 'rubens',
  //       sobrenome: 'Lima'
  //     });

  //   expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  //   expect(res1.body).toHaveProperty('errors.body.email');
  // });

  // it('Tenta criar registro com email inválido', async () => {
  //   const res1 = await testServer
  //     .post('/pessoas')
  //     .send({
  //       cidadeId,
  //       email: 'rubens gmail.com',
  //       nome: 'Rubens',
  //       sobrenome: 'Lima'
  //     });

  //   expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  //   expect(res1.body).toHaveProperty('errors.body.email');
  // });

  // it('Tenta criar registro sem cidadeId', async () => {
  //   const res1 = await testServer
  //     .post('/pessoas')
  //     .send({
  //       email: 'rubens@gmail.com',
  //       sobrenome: 'Lima'
  //     });

  //   expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  //   expect(res1.body).toHaveProperty('errors.body.cidadeId');
  // });

  // it('Tenta criar registro com cidadeId inválido', async () => {
  //   const res1 = await testServer
  //     .post('/pessoas')
  //     .send({
  //       cidadeId: 'teste',
  //       email: 'rubens@gmail.com',
  //       sobrenome: 'Lima'
  //     });

  //   expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  //   expect(res1.body).toHaveProperty('errors.body.cidadeId');
  // });

  // it('Tenta criar registro sem propriedades', async () => {
  //   const res1 = await testServer
  //     .post('/pessoas')
  //     .send({});

  //   expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  //   expect(res1.body).toHaveProperty('errors.body.cidadeId');
  //   expect(res1.body).toHaveProperty('errors.body.email');
  //   expect(res1.body).toHaveProperty('errors.body.nome');
  //   expect(res1.body).toHaveProperty('errors.body.sobrenome');
  // });
});