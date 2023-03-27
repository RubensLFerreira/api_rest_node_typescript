import { validation } from '../../shared/middleware';
import { Request, Response } from 'express';

import * as yup from 'yup';

import { PessoaProvider } from '../../providers/pessoas';
import { StatusCodes } from 'http-status-codes';


interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    filter: yup.string().notRequired().default(''),
    page: yup.number().integer().notRequired().moreThan(0).default(1),
    limit: yup.number().integer().notRequired().moreThan(0).default(1),
  })),
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
  const result = await PessoaProvider.getAll(req.query.page || 1, req.query.limit || 1, req.query.filter || '');
  const count = await PessoaProvider.count(req.query.filter);

  if (result instanceof Error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: result.message
      }
    });
  } else if (count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: count.message
      }
    });
  }

  res.setHeader('access-control-expose-heanders', 'x-total-count');
  res.setHeader('x-total-count', count);

  return res.status(StatusCodes.OK).json(result);
};