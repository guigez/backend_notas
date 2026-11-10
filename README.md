# API de Notas (live coding da aula)

Backend construído **junto com a turma** na parte teórica. Ele serve de modelo para a prática:
o Mural usa a mesma arquitetura, só que com outro recurso.

## Etapas do live coding

| Etapa | Arquivo | O que mostra |
|---|---|---|
| 1 | `etapas/01-node-http.ts` | Servidor só com Node (`node:http`): rota, status e JSON feitos à mão |
| 2 | `etapas/02-express-memoria.ts` | Express com GET/POST/DELETE num array. Reinicie o servidor: as notas somem |
| 3 | `etapas/03-mongo.ts` | As mesmas rotas gravando no MongoDB, ainda num arquivo só |
| 4 | `src/` | A etapa 3 separada em camadas (versão final, mostrada na Parte 4) |

Antes, copie `.env.example` para `.env` e cole a connection string do Atlas (banco `notas`).

```bash
npm install
npx tsx watch etapas/01-node-http.ts       # etapa 1
npx tsx watch etapas/02-express-memoria.ts # etapa 2
npx tsx watch etapas/03-mongo.ts           # etapa 3 (precisa do MongoDB)
npm run dev                                # versão final em camadas
```

Quem se perder no meio do live coding pode abrir o arquivo da etapa e continuar dali.

## Rotas (versão final)

| Rota | Corpo | Sucesso | Erros |
|---|---|---|---|
| `GET /notas` (`?busca=` no título) | | 200 + lista, mais recentes primeiro | |
| `GET /notas/:id` | | 200 + nota | 404 |
| `POST /notas` | `{"titulo","conteudo"}` | 201 + nota | 400 (título 1-80, conteúdo até 2000) |
| `PATCH /notas/:id` | `{"titulo"?, "conteudo"?}` | 200 + nota | 400, 404 |
| `DELETE /notas/:id` | | 204 | |

## Testando

O arquivo `notas.http` tem uma requisição pronta para cada rota. Para usá-lo, instale a extensão
**REST Client** no VS Code e clique em *Send Request*. Sem a extensão, use curl:

```bash
curl localhost:3000/notas
curl -X POST localhost:3000/notas -H "Content-Type: application/json" -d '{"titulo":"Mercado","conteudo":"pão"}'
curl -X PATCH localhost:3000/notas/<id> -H "Content-Type: application/json" -d '{"conteudo":"pão, leite"}'
curl -i -X DELETE localhost:3000/notas/<id>
```

> Windows PowerShell: use `curl.exe` (o `curl` do PowerShell é outro comando).
