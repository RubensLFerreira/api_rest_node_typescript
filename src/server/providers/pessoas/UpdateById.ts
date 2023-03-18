import { ETableNames } from '../../database/ETableName';
import { Knex } from '../../database/knex';
import { IPessoa } from '../../database/models';


export const updateById = async (id: number, pessoa: Omit<IPessoa, 'id'>): Promise<void | Error> => {
  // vamos omitir o id qe é passado
  // vamos passar como promessa um númerico ou erro
  try {
    const [{ count }] = await Knex(ETableNames.pessoa)
      .where('id', '=', pessoa.cidadeId) // id é igual ao id da cidade
      .count<[{ count: number }]>('* as count'); // pega a quantidade do tipo numerico

    // se a quantidade for maior qe 0 ele continua
    if ( count === 0) {
      return new Error('A cidade usada no cadastro não foi encontrado!');
    }


    const result = await Knex(ETableNames.pessoa)
      .update(pessoa) // atualiza pessoa
      .where('id', '=', id); // valida de id é igual ao do banco

    if (result > 0) return;

    return new Error('Erro ao atualizar registro!');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar registro!');
  }
};