import { ETableNames } from '../../database/ETableName';
import { ICidade } from '../../database/models';
import { Knex } from '../../database/knex';

export const getById = async (id: number): Promise<ICidade | Error> => {
  try {
    const result = await Knex(ETableNames.cidade)
      .select('*')
      .where('id', '=', id)
      .first();

    if (result) return result;

    return new Error('Erro ao consultar o registro!');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar o registro!');
  }
};