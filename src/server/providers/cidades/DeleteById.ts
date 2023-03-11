import { ETableNames } from '../../database/ETableName';
import { Knex } from '../../database/knex';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.cidade)
      .where('id', '=', id)
      .del();

    if (result > 0) return;

    return new Error('Erro ao apagar o registro!');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao apagar o registro!');
  }
};