// =============================================================================
// routes/nota.routes.ts — método + caminho → função do controller
// =============================================================================

import { Router } from 'express';

import * as controller from '../controllers/nota.controller';

export const notaRoutes = Router();

notaRoutes.get('/', controller.listar); //          GET    /notas  (?busca=)
notaRoutes.get('/:id', controller.buscar); //       GET    /notas/:id
notaRoutes.post('/', controller.criar); //          POST   /notas
notaRoutes.patch('/:id', controller.editar); //     PATCH  /notas/:id
notaRoutes.delete('/:id', controller.apagar); //    DELETE /notas/:id
