// Erro "esperado", que já sabe qual status HTTP deve virar.
// O middleware de erro (middlewares/erro.ts) transforma em resposta JSON.
export class HttpError extends Error {
  status: number;

  constructor(status: number, mensagem: string) {
    super(mensagem);
    this.status = status;
  }
}
