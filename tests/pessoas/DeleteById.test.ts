import { testServer } from '../jest.setup';
import { StatusCodes } from 'http-status-codes';


describe('Pessoas - DeleteById', () => {
  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer
      .post('/cidades')
      .send({ nome: 'Cedro' });

    cidadeId = resCidade.body;
  });

  it('Deletar registro', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({
        cidadeId,
        email: 'rubensDeleteById@gmail.com',
        nome: 'Rubens',
        sobrenome: 'Lima'
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resDelete = await testServer
      .delete(`/pessoa/${res1.body}`)
      .send();

    expect(resDelete.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('Tentar apagar registro que não existe', async () => {
    const res1 = await testServer
      .delete('/pessoa/999999')
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});