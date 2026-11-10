// =============================================================================
// config.ts — configurações vindas do ambiente (.env)
// =============================================================================
// Senha de banco e porta NÃO ficam no código: ficam no arquivo .env (que não
// vai para o Git). process.loadEnvFile() é nativo do Node (>= 21.7) e lê o .env
// para dentro de process.env, sem precisar do pacote dotenv.
// =============================================================================

try {
  process.loadEnvFile();
} catch {
  // Sem .env: seguimos com os valores padrão abaixo.
}

export const PORT = Number(process.env.PORT ?? 3000);
const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Defina MONGODB_URI no arquivo .env (connection string do MongoDB Atlas)');
}
export const MONGODB_URI = uri;
