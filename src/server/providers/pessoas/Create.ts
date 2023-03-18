import { ETableNames } from '../../database/ETableName';
import { Knex } from '../../database/knex';
import { IPessoa } from '../../database/models';


export const create = async (pessoa: Omit<IPessoa, 'id'>): Promise<Number | Error> => {
  // vamos omitir o id qe é passado
  // vamos passar como promessa um númerico ou erro
  try {
    const [{ count }] = await Knex(ETableNames.pessoa)
      .where('id', '=', pessoa.cidadeId) // id é igual ao id da cidade
      .count<[{ count: number }]>('* as count'); // pega a quantidade do tipo numerico

    // se a quantidade for maior qe 0 ele continua
    if (count === 0) {
      return new Error('A cidade usada no cadastro não foi encontrado!');
    }


    const [result] = await Knex(ETableNames.pessoa)
      .insert(pessoa) // inserir pessoa
      .returning('id'); // retornar o id

    if (typeof result === 'object') {
      return result.id;
    } else if (typeof result === 'number') {
      return result;
    }

    return new Error('Erro ao registra pessoa!');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao registra pessoa!');
  }
};