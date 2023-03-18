import { ETableNames } from '../../database/ETableName';
import { Knex } from '../../database/knex';
import { IPessoa } from '../../database/models';


export const getById = async (id: number): Promise<IPessoa | Error> => {
// Recebe um ID numerico
// Recebe uma promessa de uma pessoa ou um erro
  try {
    const result = await Knex(ETableNames.pessoa)
      .select('*') // seleciona tudo
      .where('id', '=', id) // onde o id é igual ao id
      .first(); // primeiro resultado

    if (result) return result;
    // se o registro existir, ele retorna o registro

    return new Error('Erro ao consultar registro!');
    // caso aconteça algum erro
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar registro!');
    // caso aconteça algum erro
  }
};