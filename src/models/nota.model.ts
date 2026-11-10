// =============================================================================
// models/nota.model.ts — o formato da nota no MongoDB
// =============================================================================

import { Schema, model, type InferSchemaType } from 'mongoose';

const notaSchema = new Schema(
  {
    titulo: { type: String, required: true, trim: true, minlength: 1, maxlength: 80 },
    conteudo: { type: String, trim: true, maxlength: 2000, default: '' },
  },
  {
    // Cria "criadoEm" e "atualizadoEm" automaticamente.
    timestamps: { createdAt: 'criadoEm', updatedAt: 'atualizadoEm' },
    versionKey: false, // não grava o campo "__v"
    toJSON: {
      // O Mongo guarda "_id" (ObjectId). Quem consome a API recebe "id" (texto).
      transform: (_doc, ret: Record<string, unknown>) => {
        ret.id = String(ret._id);
        delete ret._id;
        return ret;
      },
    },
  },
);

export type Nota = InferSchemaType<typeof notaSchema>;

// model('Nota') => coleção "notas" no banco.
export const NotaModel = model('Nota', notaSchema);
