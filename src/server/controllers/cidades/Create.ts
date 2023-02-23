import { Request, Response } from 'express';
// import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
interface ICidade { // tipando dado
  nome: string;
  estado: string;
}

const bodyValidation: yup.Schema<ICidade> = yup.object().shape({
  nome: yup.string().required().min(3),
  estado: yup.string().required().min(3),
});


export const Create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  let validatedData: ICidade | undefined = undefined;

  try {
    validatedData = await bodyValidation.validate(req.body, { abortEarly: false});
    // recebendo os dados validados
  } catch (error) {
    const yupError = error as yup.ValidationError;
    const errors: Record<string, string> = { };

    yupError.inner.forEach(error => {
      if (!error.path) return;

      errors[error.path] = error.message;
    });

    return res.json({ errors });
  }

  console.log(validatedData);

  return res.send('Create');
}; 