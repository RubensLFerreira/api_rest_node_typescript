import { Request, Response } from 'express';
interface ICidade { // tipando dado
  nome: string;
}

export const Create = (req: Request<{}, {}, ICidade>, res: Response) => {
  // O dado passado no req é o dado passando na interface
  console.log(req.body);

  return res.send('Create');
}; 