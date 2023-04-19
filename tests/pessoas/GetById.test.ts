import { testServer } from '../jest.setup';
import { StatusCodes } from 'http-status-codes';


describe('Pessoas - GetById', () => {
  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer
      .post('/cidades')
      .send({ nome: 'Cedro'});
    cidadeId = resCidade.body;
  });

  it('Buscar registro por ID', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({
        cidadeId,
        email: 'rubensGetById/@gmail.com',
        nome: 'Rubens',
        sobrenome: 'Lima'
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resGetById = await testServer
      .get(`/pessoa/${res1.body}`)
      .send();

    expect(resGetById.statusCode).toEqual(StatusCodes.OK);
  });

  it('Registro inexistente', async () => {
    const res1 = await testServer
      .get('/pessoa/99999')
      .send();
    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});