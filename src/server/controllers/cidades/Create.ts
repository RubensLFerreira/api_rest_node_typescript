import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as yup from 'yup';
interface ICidade { // tipando dados
  nome: string;
  estado: string;
}

const bodyValidation: yup.Schema<ICidade> = yup.object().shape({
  nome: yup.string().required().min(3),
  estado: yup.string().required().min(3),
});

export const createBodyValidator: RequestHandler = async (req, res, next) => {
  try {
    await bodyValidation.validate(req.body, { abortEarly: false});
    next();
  } catch (err) {
    const yupError = err as yup.ValidationError;
    const errors: Record<string, string> = { };

    yupError.inner.forEach(error => {
      if (!error.path) return;

      errors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({ errors });
  }
};


// Filter
interface IFilter { // tipando dados
  filter: string;
}

const queryValidation: yup.Schema<IFilter> = yup.object().shape({
  filter: yup.string().required().min(3),
});

export const createQueryValidator: RequestHandler = async (req, res, next) => {
  try {
    await queryValidation.validate(req.query, { abortEarly: false});
    next();
  } catch (err) {
    const yupError = err as yup.ValidationError;
    const errors: Record<string, string> = { };

    yupError.inner.forEach(error => {
      if (!error.path) return;

      errors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({ errors });
  }
};



export const Create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  // let validatedData: ICidade | undefined = undefined;
  console.log(req.body);

  return res.send('Create');
}; 