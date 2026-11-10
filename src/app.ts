// =============================================================================
// app.ts — monta a aplicação Express (sem abrir porta nem conectar no banco)
// =============================================================================
// A ordem do app.use importa: cada requisição passa pelos middlewares de cima
// para baixo, como numa esteira.
// =============================================================================

import cors from 'cors';
import express from 'express';

import { rotaNaoEncontrada, tratarErro } from './middlewares/erro';
import { notaRoutes } from './routes/nota.routes';

export const app = express();

// 1. Log simples de cada requisição no terminal.
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

// 2. CORS: libera o Flutter Web (outra origem) a ler as respostas.
//    Sem ele, um app web em outra origem não consegue ler as respostas.
app.use(cors());

// 3. Lê corpos JSON e coloca o resultado em req.body.
app.use(express.json());

// 4. Rotas
app.get('/', (_req, res) => {
  res.json({ ok: true, servico: 'notas-api' });
});
app.use('/notas', notaRoutes);

// 5. Nada casou? 404. Algo lançou erro? middleware de erro (sempre por último).
app.use(rotaNaoEncontrada);
app.use(tratarErro);
