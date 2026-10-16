# Testes E2E — Android e iOS

Execute estes cenários em builds de desenvolvimento conectados a um backend de homologação. Eles não devem usar dados pessoais ou produção.

1. Cadastro/login e restauração de sessão após reiniciar o app.
2. Catálogo: paginação, busca por nome/tag, filtro de categoria e favoritos offline.
3. Permissões: negar e permitir galeria/câmera; validar que microfone nunca é solicitado.
4. Foto: JPG/PNG/WEBP válido, MIME adulterado, orientação EXIF, imagem maior que o limite e modo avião.
5. Geração: envio idempotente, fila, processamento, conclusão, erro OpenAI, conteúdo bloqueado, saldo insuficiente, 429, cancelamento e resultado expirado.
6. Download: interromper a rede, retomar, validar checksum, confirmar `ack`, salvar na galeria e compartilhar.
7. Histórico: antes/depois, remoção local e ausência de backup automático após reinstalação.
8. Compras: pendente, aprovada, recusada e restauração, usando produtos de teste da App Store e Google Play.
