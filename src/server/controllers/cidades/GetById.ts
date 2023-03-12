import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

import * as yup from 'yup';

import { CidadesProvider } from '../../providers/cidades';
import { validation } from '../../shared/middleware';

interface IParamsProps {
  id?: number;
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

export const getById = async (req: Request<IParamsProps>, res: Response) => {

  if(!req.params.id) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: 'Nenhum IF foi selecionado',
      }
    });
  }

  const result = await CidadesProvider.getById(req.params.id);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.OK).send();
};