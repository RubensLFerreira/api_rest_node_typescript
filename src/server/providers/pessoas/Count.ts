import { ETableNames } from '../../database/ETableName';
import { Knex } from '../../database/knex';

export const count = async (filter = ''): Promise<number | Error> => {
  // passa como parâmetro de filter vázio
  // Passa uma promessa de number ou erro 
  // quantidade total de registro qe tiverem esse filtro
  try {
    const [{ count }] = await Knex(ETableNames.pessoa)
      .where('nome', 'like', `%${filter}%`) // vai buscar algum nome qe contenha em filter 
      .orWhere('sobrenome', 'like', `%${filter}%`) // vai buscar algum nome qe contenha em filter 
      .count<[{ count: number }]>('* as count');

    if (Number.isInteger(Number(count))) return Number(count);
    // verifica se é númerico e inteiro 

    return new Error('Erro ao consultar a quantidade total de registros!');
    // caso aconteça algum erro
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar a quantidade total de registros!');
    // caso aconteça algum erro
  }
};