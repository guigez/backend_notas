// =============================================================================
// controllers/nota.controller.ts — lê a requisição, chama o service, escolhe o status
// =============================================================================

import type { Request, Response } from 'express';

import * as service from '../services/nota.service';

export async function listar(req: Request, res: Response) {
  const busca = typeof req.query.busca === 'string' ? req.query.busca : undefined;
  res.status(200).json(await service.listar(busca));
}

export async function buscar(req: Request<{ id: string }>, res: Response) {
  res.status(200).json(await service.buscar(req.params.id));
}

export async function criar(req: Request, res: Response) {
  const { titulo, conteudo } = req.body ?? {};
  res.status(201).json(await service.criar(titulo, conteudo));
}

export async function editar(req: Request<{ id: string }>, res: Response) {
  const { titulo, conteudo } = req.body ?? {};
  res.status(200).json(await service.editar(req.params.id, titulo, conteudo));
}

export async function apagar(req: Request<{ id: string }>, res: Response) {
  await service.apagar(req.params.id);
  res.status(204).end();
}
