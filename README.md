# Lume — cliente mobile

## Privacidade por padrão

- Imagens de clientes são preparadas, guardadas e visualizadas no diretório privado do aplicativo.
- O cliente transmite uma imagem ao backend apenas para solicitar a edição. O resultado é baixado por rota autenticada, validado e salvo atomicamente no dispositivo antes do `ack`.
- Catálogo, capas e exemplos são assets públicos do produto; imagens pessoais não devem ser enviadas ao R2.
- Tokens de sessão são guardados no Keychain/Keystore via `expo-secure-store`. O `AsyncStorage` é usado somente para dados não sensíveis (onboarding e cache de catálogo).
- A desinstalação pode remover as imagens e o banco local. Fotos não são sincronizadas automaticamente para backup.

## Contrato esperado do backend

`POST /auth/login`, `POST /auth/signup`, `POST /auth/refresh`, `GET /catalog/categories`, `GET /catalog/effects`, `POST /generations`, `GET /generations/:id`, `GET /generations/:id/result` e `POST /generations/:id/ack`.

`POST /generations` recebe `multipart/form-data` com `effectId` e `image`, mais o cabeçalho `Idempotency-Key`. A resposta de resultado deve permanecer privada, exigir bearer token e fornecer `resultChecksum` (SHA-256) no status.

## Desenvolvimento

1. Copie `.env.example` para `.env` e ajuste `EXPO_PUBLIC_API_URL`.
2. Rode `npm install` e `npm start`.
3. Rode `npm run typecheck` antes de enviar alterações.

Pagamentos in-app, login Apple/Google e publicação precisam da configuração final de produtos/contas nas lojas e das rotas de validação do backend.
