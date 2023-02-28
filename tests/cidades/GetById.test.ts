import { testServer } from '../jest.setup';
import { StatusCodes } from 'http-status-codes';


describe('Cidades - GetById', () => {
  it('Buscar um registro', async () => {
    const res1 = await testServer
      .post('/cidades')
      .send({ nome: 'Springfield'});

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resGetById = await testServer
      .get(`/cidades/${res1.body}`)
      .send();

    expect(resGetById.statusCode).toEqual(StatusCodes.OK);
  });

  it('Registro inexistente', async () => {
    const res1 = await testServer
      .get('/cidades/99999')
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});