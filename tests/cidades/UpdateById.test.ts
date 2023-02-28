import { testServer } from '../jest.setup';
import { StatusCodes } from 'http-status-codes';

describe('Cidades - UpdateById', () => {
  it('Atualizar registro', async () => {
    const res1 = await testServer
      .post('/cidades')
      .send({ nome: 'Springfield' });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resUpdate = await testServer
      .put(`/cidades/${res1.body}`)
      .send({ nome: 'Cedro' });

    expect(resUpdate.status).toEqual(StatusCodes.NO_CONTENT);
  });

  it('Tentar atualizar registro inexistente', async () => {
    const res1 = await testServer
      .put('/cidades/99999')
      .send({ nome: 'Cedro'});
    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});