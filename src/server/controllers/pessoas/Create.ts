import { Request, Response } from 'express';
import { IPessoa } from '../../database/models';
import { validation } from '../../shared/middleware';

import * as yup from 'yup';

import { StatusCodes } from 'http-status-codes';
import { PessoaProvider } from '../../providers/pessoas';


interface IBodyProps extends Omit<IPessoa, 'id'> { }

export const createValidation = validation(getSchema => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    email: yup.string().required().email(),
    cidadeId: yup.number().integer().required(),
    nome: yup.string().required().min(3),
    sobrenome: yup.string().required().min(3),
  })),
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const result = await PessoaProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};