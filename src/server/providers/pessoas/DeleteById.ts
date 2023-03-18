import { ETableNames } from '../../database/ETableName';
import { Knex } from '../../database/knex';


export const deleteById = async (id: number): Promise<void | Error> => {
  // Recebe um ID numerico
// Recebe uma promessa de uma vázio ou um erro
  try {
    const result = await Knex(ETableNames.pessoa)
      .where('id', '=', id) // onde o id é igual ao id
      .del(); // deleta o id

    if (result > 0) return; // se result foi maior qe zero retorna vázio
  
    return new Error('Erro ao deletar pessoa!');
    // caso aconteça algum erro
  } catch (error) {
    return new Error('Erro ao deletar pessoa!');
    // caso aconteça algum erro
  }
};