import { ETableNames } from '../../database/ETableName';
import { Knex } from '../../database/knex';
import { IPessoa } from '../../database/models';


export const getAll = async (page: number, limit: number, filter: string): Promise<IPessoa[] | Error> => {
  // passando a tipagem dos parametros
  // Recebe uma promessa de uma pessoa ou um erro
  try {
    const result = await Knex(ETableNames.pessoa)
      .select('*') // seleciona tudo
      .where('nomeCompleto', 'like', `%${filter}%`) // vai buscar algum nome qe contenha em filter 
      .offset((page - 1) * limit) // vai pegar o número de páginas e o limit
      .limit(limit); // limite de páginas

    return result; // Vai retorna os registro
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros!');
    // caso aconteça algum erro
  }
};