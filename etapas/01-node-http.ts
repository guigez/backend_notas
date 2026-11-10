// =============================================================================
// Etapa 1 — servidor só com o Node (módulo node:http), sem framework
// Rodar: npx tsx watch etapas/01-node-http.ts
// =============================================================================
// Tudo é feito à mão: escolher a rota pelo método + caminho, escrever o
// status, o cabeçalho Content-Type e transformar o objeto em texto JSON.
// =============================================================================

import { createServer } from 'node:http';

const server = createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true }));
    return;
  }
  res.writeHead(404).end();
});

server.listen(3000, () => {
  console.log('ouvindo em http://localhost:3000');
});
