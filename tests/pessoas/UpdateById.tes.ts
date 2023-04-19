import { testServer } from '../jest.setup';
import { StatusCodes } from 'http-status-codes';


describe('Atualizar - UpdateById', () => {
  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer
      .post('/cidades')
      .send({ nome: 'Cedro' });

    cidadeId = resCidade.body;
  });

  it('Atualizar registro', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({
        cidadeId,
        email: 'rubensUpdateById@gmail.com',
        nome: 'Rubens',
        sobrenome: 'Lima'
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resAtualizar = await testServer
      .put(`/pessoa/${res1}`)
      .send({
        cidadeId,
        email: 'rubensUpdateById@gmail.com',
        nome: 'Rubens 2',
        sobrenome: 'Lima 2'
      });
      
    expect(resAtualizar.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('Tentar atualizar registro inexistente', async () => {
    const res1 = await testServer
      .put('/pessoa/99999')
      .send({ nome: 'Cedro'});

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});