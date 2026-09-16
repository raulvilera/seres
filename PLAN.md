# PLAN — Missão Vida & Equilíbrio

## Objetivo
Criar uma atividade avaliativa web responsiva para a 3ª Série F, com 10 questões contextualizadas, seleção dependente de turma → nome, RA automático, imagens didáticas e envio para Google Sheets via Apps Script.

## Critérios de verificação

- [x] 7 questões objetivas e 3 dissertativas.
- [x] Questões alinhadas às aulas 1–10 do guia.
- [x] Imagem visível em cada questão.
- [x] Alternativas com alto relevo; clique produz estado afundado, verde escuro, texto branco e negrito.
- [x] Nome bloqueado até turma ser selecionada.
- [x] RA preenchido automaticamente a partir do nome.
- [x] Progresso, validação, score objetivo e impressão.
- [x] Payload preparado para o Web App do Apps Script.
- [ ] O professor deve colar a URL publicada do Apps Script na constante `APPS_SCRIPT_URL` em `client/src/pages/Home.tsx` antes do uso real.

## Decisões

O conteúdo foi mantido como 3º bimestre do guia anexado, mesmo o documento identificar a sequência como 1ª série; a identificação visual e a lista de estudantes seguem o pedido para a 3ª Série F.
