# MEMORY

A atividade foi implementada em React + TypeScript com CSS próprio, sem backend no projeto estático. O jogo usa imagens privadas em `/manus-storage/`, carregadas a partir de cinco ilustrações geradas para o conteúdo.

A integração com a planilha é opcional até que o professor publique o Apps Script: o frontend já monta o payload, salva a última tentativa em `localStorage` e exibe uma mensagem orientando a configuração quando a URL ainda está vazia. Depois da publicação, basta preencher `APPS_SCRIPT_URL`.

A checagem TypeScript e o build de produção foram concluídos sem erros. A inspeção visual desktop mostrou a página completa com 10 cartões; a inspeção mobile mostrou o formulário inicial responsivo. O arquivo `apps-script/Code.gs` deve ser colado no editor do Apps Script para conectar a planilha real.
