// =============================================================================
// middlewares/erro.ts — tratamento central de erros
// =============================================================================
// Um middleware de erro tem QUATRO parâmetros (err, req, res, next). Com três,
// o Express acha que é um middleware comum e nunca o chama para erros.
// =============================================================================

import type { NextFunction, Request, Response } from 'express';

import { HttpError } from '../errors';

export function rotaNaoEncontrada(req: Request, res: Response) {
  res.status(404).json({ erro: `rota nao encontrada: ${req.method} ${req.path}` });
}

export function tratarErro(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof HttpError) {
    res.status(err.status).json({ erro: err.message });
    return;
  }
  // express.json() lança um erro com status 400 quando o corpo não é JSON válido.
  if (err instanceof SyntaxError && 'status' in err && err.status === 400) {
    res.status(400).json({ erro: 'JSON invalido' });
    return;
  }
  console.error(err); // erro inesperado: registra no terminal (o "CloudWatch" daqui)
  res.status(500).json({ erro: 'erro interno' });
}
