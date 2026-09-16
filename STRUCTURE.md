# STRUCTURE

- `client/src/pages/Home.tsx`: experiência completa do jogo, estudantes, questões, estado das respostas, validação, score e POST do payload.
- `client/src/index.css`: identidade visual, responsividade, impressão e estado de alto relevo/afundamento das alternativas.
- `client/src/App.tsx`: shell de tema, toaster e rota única.
- `apps-script/Code.gs`: Web App Google Apps Script para gravar uma submissão em uma aba da planilha e aplicar formatação condicional.
- `APPS_SCRIPT_README.md`: instalação, implantação e configuração.
- `ALINHAMENTO_PEDAGOGICO.md`: mapeamento das questões para as aulas e habilidades.

## Fluxo

1. Estudante escolhe `3ª Série F`.
2. O seletor de nome é habilitado e filtra a lista local derivada do anexo.
3. O RA é preenchido automaticamente.
4. O estudante responde questões 1–10.
5. O frontend calcula apenas o score das 7 objetivas; discursivas ficam para correção manual.
6. O payload é salvo localmente e enviado ao Web App do Apps Script, quando `APPS_SCRIPT_URL` estiver configurada.
