// =============================================================================
// Etapa 2 — API de Notas com Express, guardando tudo num array em memória
// Rodar: npx tsx watch etapas/02-express-memoria.ts
// =============================================================================
// Funciona, mas reinicie o servidor e as notas somem: estavam só na memória
// do processo. Na etapa 3 (a pasta src/) o array é trocado pelo MongoDB e as
// rotas continuam iguais.
// =============================================================================

import { randomUUID } from 'node:crypto';

import cors from 'cors';
import express from 'express';

type Nota = { id: string; titulo: string; conteudo: string };

const notas: Nota[] = [];

const app = express();
app.use(cors());
app.use(express.json());

// GET /notas -> 200 com a lista
app.get('/notas', (_req, res) => {
  res.json(notas);
});

// POST /notas -> 201 com a nota criada (400 se faltar o título)
app.post('/notas', (req, res) => {
  const { titulo, conteudo } = req.body ?? {};
  if (typeof titulo !== 'string' || titulo.trim() === '') {
    res.status(400).json({ erro: 'titulo e obrigatorio' });
    return;
  }
  const nota: Nota = { id: randomUUID(), titulo: titulo.trim(), conteudo: String(conteudo ?? '') };
  notas.push(nota);
  res.status(201).json(nota);
});

// DELETE /notas/:id -> 204 sem corpo
app.delete('/notas/:id', (req, res) => {
  const i = notas.findIndex((n) => n.id === req.params.id);
  if (i >= 0) notas.splice(i, 1);
  res.status(204).end();
});

app.listen(3000, () => {
  console.log('ouvindo em http://localhost:3000');
});
