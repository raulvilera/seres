# Integração com Google Sheets

O arquivo `apps-script/Code.gs` é um Web App do Google Apps Script. Ele grava cada envio na aba **Respostas Bio 3B** da planilha indicada no pedido, preserva respostas discursivas para correção manual e colore diretamente as células de respostas: **azul-claro para correta**, **vermelho-claro para incorreta** e amarelo suave para correção manual.

## Configuração

Abra a planilha [Google Sheets da turma](https://docs.google.com/spreadsheets/d/1Vg23jd8ma4-ow2YmHYZjLcSBOVGHYWD96V3ycYws9W0/edit), entre em **Extensões → Apps Script**, apague o conteúdo inicial e cole o conteúdo de `apps-script/Code.gs`. Salve e execute a função `setupSheet` uma vez, autorizando o acesso à planilha. A aba de respostas e seus cabeçalhos serão criados automaticamente.

Depois, escolha **Implantar → Nova implantação → Aplicativo da Web**. Em “Executar como”, selecione sua conta. Em “Quem tem acesso”, escolha **Qualquer pessoa com o link**. Copie a URL que termina em `/exec`.

No projeto web, abra `client/src/pages/Home.tsx` e substitua:

```ts
const APPS_SCRIPT_URL = "";
```

por:

```ts
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/SEU_ID/exec";
```

Salve e publique o projeto novamente. O frontend envia um objeto JSON com `turma`, `nome`, `ra`, as dez respostas, os status das sete objetivas e a indicação **Correção manual** nas discursivas.

## Estrutura da aba

A aba é criada com as colunas de identificação, pontuação e duas colunas por questão: `Qn — resposta` e `Qn — status`. A formatação é aplicada na própria célula que recebeu a resposta, permitindo filtrar visualmente o desempenho. As regras de formatação condicional também são recriadas para as linhas existentes quando um novo envio chega.

## Cuidados de uso

A lista de estudantes é derivada do arquivo `3ªSérieF.xlt` e fica no frontend para permitir o preenchimento automático do RA. Se a lista mudar, atualize o array `students` em `client/src/pages/Home.tsx`. O RA deve ser tratado como dado escolar restrito: compartilhe a atividade apenas com a turma e não publique a planilha.
