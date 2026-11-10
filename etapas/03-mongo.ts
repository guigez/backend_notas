// =============================================================================
// Etapa 3 — as mesmas rotas, agora gravando no MongoDB (ainda num arquivo só)
// Rodar: npx tsx watch etapas/03-mongo.ts   (precisa do .env com a string do Atlas)
// =============================================================================
// Compare com a etapa 2: as rotas, os status e o JSON são os mesmos.
// Só muda ONDE a nota é guardada, e as funções viram async.
// Na Parte 4, este arquivo é separado em camadas: é a pasta src/.
// =============================================================================

import cors from 'cors';
import express from 'express';
import mongoose, { Schema, isValidObjectId, model } from 'mongoose';

// Lê o arquivo .env (nativo do Node >= 21.7). A connection string do Atlas
// tem senha: ela fica no .env, que está no .gitignore, nunca no código.
process.loadEnvFile();
const MONGODB_URI = process.env.MONGODB_URI ?? '';
if (!MONGODB_URI) throw new Error('Defina MONGODB_URI no arquivo .env');

// 1. Schema + model: a forma da nota e o objeto que fala com a coleção "notas"
const notaSchema = new Schema(
  {
    titulo: { type: String, required: true, trim: true, maxlength: 80 },
    conteudo: { type: String, trim: true, default: '' },
  },
  {
    timestamps: { createdAt: 'criadoEm', updatedAt: 'atualizadoEm' },
    versionKey: false,
    toJSON: {
      transform: (_doc, ret: Record<string, unknown>) => {
        ret.id = String(ret._id); // _id (ObjectId) → id (texto)
        delete ret._id;
        return ret;
      },
    },
  },
);
const NotaModel = model('Nota', notaSchema);

const app = express();
app.use(cors());
app.use(express.json());

// 2. As rotas da etapa 2, trocando o array pelo model
app.get('/notas', async (_req, res) => {
  const notas = await NotaModel.find().sort({ criadoEm: -1 });
  res.json(notas);
});

app.post('/notas', async (req, res) => {
  const { titulo, conteudo } = req.body ?? {};
  if (typeof titulo !== 'string' || titulo.trim() === '') {
    res.status(400).json({ erro: 'titulo e obrigatorio' });
    return;
  }
  const nota = await NotaModel.create({ titulo, conteudo });
  res.status(201).json(nota);
});

app.delete('/notas/:id', async (req, res) => {
  if (isValidObjectId(req.params.id)) {
    await NotaModel.findByIdAndDelete(req.params.id);
  }
  res.status(204).end();
});

// 3. Conecta no banco ANTES de abrir a porta
async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log('MongoDB conectado');
  app.listen(3000, () => console.log('ouvindo em http://localhost:3000'));
}

main().catch((err) => {
  console.error('Falha ao iniciar:', err);
  process.exit(1);
});
