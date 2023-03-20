import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CidadesController, PessoasController } from './../controllers';

const router = Router();

router.get('/', (_, res) => {
  return res.status(StatusCodes.ACCEPTED).send('Hello world! Página inicial');
});

router.get('/cidades', CidadesController.getAllValidation, CidadesController.getAll);
router.post('/cidades', CidadesController.createValidation, CidadesController.create);
router.get('/cidades/:id', CidadesController.getByIdValidation, CidadesController.getById);
router.put('/cidades/:id', CidadesController.updateByIdValidation, CidadesController.updateById);
router.delete('/cidades/:id', CidadesController.deleteByIdValidation, CidadesController.deleteById);


router.get('/pessoas', PessoasController.getAllValidation, PessoasController.getAll);
router.post('/pessoas', PessoasController.createValidation, PessoasController.create);
router.get('/pessoa/:id', PessoasController.getByIdValidation, PessoasController.getById);
router.put('/pessoa/:id', PessoasController.updateByIdValidation, PessoasController.updateById);
router.delete('/pessoa/:id', PessoasController.deleteByIdValidation, PessoasController.deleteById);

export { router };