// =============================================================================
// server.ts — ponto de entrada: conecta no MongoDB e abre a porta HTTP
// =============================================================================
// Diferença para a Lambda: este processo fica LIGADO o tempo todo, esperando
// requisições. A conexão com o banco é aberta uma vez e reaproveitada.
// =============================================================================

import mongoose from 'mongoose';

import { app } from './app';
import { MONGODB_URI, PORT } from './config';

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log('MongoDB conectado');

  // '0.0.0.0' aceita conexões de outras máquinas da rede (ex.: celular no
  // mesmo Wi-Fi), não só de localhost.
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor ouvindo em http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error('Falha ao iniciar:', err);
  process.exit(1);
});
