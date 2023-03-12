import { ETableNames } from '../../database/ETableName';
import { ICidade } from '../../database/models';
import { Knex } from '../../database/knex';

export const updateById = async (id: number, cidade: Omit<ICidade, 'id'>): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames)
      .update(cidade)
      .where('id', '=', id);

    if(result > 0) return;

    return new Error('Erro ao atualizar registro!');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar registro!');
  }
};