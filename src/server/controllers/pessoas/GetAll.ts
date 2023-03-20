import { validation } from '../../shared/middleware';
import { Request, Response } from 'express';

import * as yup from 'yup';

import { PessoaProvider } from '../../providers/pessoas';
import { StatusCodes } from 'http-status-codes';


interface IQueryProps {
  id?: number;
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    id: yup.number().integer().notRequired().default(0),
    page: yup.number().notRequired().moreThan(0),
    limit: yup.number().notRequired().moreThan(0),
    filter: yup.string().notRequired(),
  })),
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
  const result = await PessoaProvider.getAll(req.query.page || 1, req.query.limit || 1, req.query.filter || '');
  const count = await PessoaProvider.count(req.query.filter);

  if ( result instanceof Error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: result.message
      }
    });
  } else if ( count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: count.message
      }
    });
  }

  res.setHeader('access-control-expose-heanders', 'x-total-count');
  res.setHeader('x-total-count', count);
};