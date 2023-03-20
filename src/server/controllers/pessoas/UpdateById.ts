import { Request, Response } from 'express';
import { IPessoa } from '../../database/models';
import { validation } from '../../shared/middleware';

import * as yup from 'yup';

import { StatusCodes } from 'http-status-codes';
import { PessoaProvider } from '../../providers/pessoas';

interface IParamsProps {
  id?: number;
}

interface IBodyProps extends Omit<IPessoa, 'id'> { }

export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3).max(150),
    sobrenome: yup.string().required().min(3).max(150),
    email: yup.string().required().email(),
    cidadeId: yup.number().integer().required(),
  }))
}));

export const updateById = async (req: Request<IParamsProps, IBodyProps>, res: Response) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado.'
      }
    });
  }

  const result = await PessoaProvider.updateById(req.params.id, req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      }
    });
  }
};