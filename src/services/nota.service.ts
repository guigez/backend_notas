// =============================================================================
// services/nota.service.ts — regras + acesso ao banco (nada de req/res aqui)
// =============================================================================

import { isValidObjectId } from 'mongoose';

import { HttpError } from '../errors';
import { NotaModel } from '../models/nota.model';

/** Lista as notas, mais recentes primeiro. Com busca, filtra pelo título. */
export async function listar(busca?: string) {
  const filtro = busca ? { titulo: { $regex: escaparRegex(busca), $options: 'i' } } : {};
  return NotaModel.find(filtro).sort({ criadoEm: -1 });
}

/** Busca uma nota pelo id. Não achou (ou id inválido) → 404. */
export async function buscar(id: string) {
  if (!isValidObjectId(id)) throw new HttpError(404, 'nota nao encontrada');
  const nota = await NotaModel.findById(id);
  if (!nota) throw new HttpError(404, 'nota nao encontrada');
  return nota;
}

export async function criar(titulo: unknown, conteudo: unknown) {
  const t = typeof titulo === 'string' ? titulo.trim() : '';
  const c = typeof conteudo === 'string' ? conteudo.trim() : '';
  if (t.length < 1 || t.length > 80 || c.length > 2000) {
    throw new HttpError(400, 'titulo (1-80) e obrigatorio; conteudo ate 2000');
  }
  return NotaModel.create({ titulo: t, conteudo: c });
}

/** Atualiza só os campos enviados. */
export async function editar(id: string, titulo: unknown, conteudo: unknown) {
  const mudancas: { titulo?: string; conteudo?: string } = {};
  if (titulo !== undefined) {
    const t = typeof titulo === 'string' ? titulo.trim() : '';
    if (t.length < 1 || t.length > 80) throw new HttpError(400, 'titulo deve ter 1-80 caracteres');
    mudancas.titulo = t;
  }
  if (conteudo !== undefined) {
    const c = typeof conteudo === 'string' ? conteudo.trim() : '';
    if (c.length > 2000) throw new HttpError(400, 'conteudo ate 2000 caracteres');
    mudancas.conteudo = c;
  }
  if (!isValidObjectId(id)) throw new HttpError(404, 'nota nao encontrada');
  const nota = await NotaModel.findByIdAndUpdate(id, mudancas, { returnDocument: 'after' });
  if (!nota) throw new HttpError(404, 'nota nao encontrada');
  return nota;
}

export async function apagar(id: string) {
  if (!isValidObjectId(id)) return; // apagar o que não existe não é erro
  await NotaModel.findByIdAndDelete(id);
}

// O termo vem do usuário: sem escapar, "(" quebraria a consulta e um padrão
// malicioso poderia deixar o banco lento.
function escaparRegex(texto: string) {
  return texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
