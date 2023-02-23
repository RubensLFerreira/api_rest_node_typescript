import { Request, Response } from 'express';
// import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
interface ICidade { // tipando dado
  nome: string;
}

const bodyValidation: yup.Schema<ICidade> = yup.object().shape({
  nome: yup.string().required().min(3),
});


export const Create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  let validatedData: ICidade | undefined = undefined;

  try {
    validatedData = await bodyValidation.validate(req.body);
    // recebendo os dados validados
  } catch (error) {
    const yupError = error as yup.ValidationError;

    return res.json({
      errors: {
        default: yupError.message
      }
    });
  }

  console.log(validatedData);

  return res.send('Create');
}; 