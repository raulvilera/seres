/**
 * Missão Vida & Equilíbrio — Web App para Google Sheets.
 * Planilha: https://docs.google.com/spreadsheets/d/1Vg23jd8ma4-ow2YmHYZjLcSBOVGHYWD96V3ycYws9W0/edit
 *
 * Implantação: publicar como aplicativo da web, executar como você e permitir acesso
 * a qualquer pessoa com o link. Depois, copie a URL /exec para APPS_SCRIPT_URL no frontend.
 */
const SPREADSHEET_ID = '1Vg23jd8ma4-ow2YmHYZjLcSBOVGHYWD96V3ycYws9W0';
const SHEET_NAME = 'Respostas Bio 3B';
const QUESTION_COUNT = 10;

function doGet() {
  return jsonOutput_({ ok: true, message: 'Endpoint ativo para a atividade de Biologia.' });
}

function doPost(e) {
  try {
    const raw = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    const payload = JSON.parse(raw);
    validatePayload_(payload);

    const sheet = getSheet_();
    const row = buildRow_(payload);
    sheet.appendRow(row);
    const rowNumber = sheet.getLastRow();
    formatAnswerCells_(sheet, rowNumber);

    return jsonOutput_({ ok: true, row: rowNumber });
  } catch (error) {
    console.error(error);
    return jsonOutput_({ ok: false, error: String(error && error.message ? error.message : error) });
  }
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);
  ensureHeaders_(sheet);
  return sheet;
}

function ensureHeaders_(sheet) {
  const headers = ['Data/hora', 'Turma', 'Nome', 'RA', 'Pontuação objetiva', 'Total objetivas'];
  for (let i = 1; i <= QUESTION_COUNT; i += 1) {
    headers.push(`Q${i} — resposta`, `Q${i} — status`);
  }
  const current = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  const needsHeader = headers.some((header, index) => current[index] !== header);
  if (needsHeader) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length)
      .setBackground('#0d3c38')
      .setFontColor('#ffffff')
      .setFontWeight('bold');
    sheet.autoResizeColumns(1, headers.length);
  }
}

function validatePayload_(payload) {
  if (!payload || !payload.nome || !payload.ra || !payload.turma) {
    throw new Error('Identificação incompleta: turma, nome e RA são obrigatórios.');
  }
  if (!payload.respostas || !payload.resultados) {
    throw new Error('O payload precisa conter respostas e resultados.');
  }
}

function buildRow_(payload) {
  const row = [
    new Date(),
    payload.turma,
    payload.nome,
    payload.ra,
    Number(payload.pontuacaoObjetiva || 0),
    Number(payload.totalObjetivas || 7),
  ];
  for (let i = 1; i <= QUESTION_COUNT; i += 1) {
    row.push(payload.respostas[`q${i}`] || '', payload.resultados[`q${i}`] || '');
  }
  return row;
}

function formatAnswerCells_(sheet, rowNumber) {
  // Cada resposta fica ao lado do seu status. A formatação condicional colore
  // diretamente a célula que recebeu a resposta, conforme o status calculado.
  for (let i = 0; i < QUESTION_COUNT; i += 1) {
    const answerColumn = 7 + i * 2;
    const statusColumn = answerColumn + 1;
    const answerCell = sheet.getRange(rowNumber, answerColumn);
    const statusCell = sheet.getRange(rowNumber, statusColumn);
    const status = String(statusCell.getValue());

    if (status === 'Correta') {
      answerCell.setBackground('#c7e6ff').setFontColor('#12456d').setFontWeight('bold');
    } else if (status === 'Incorreta') {
      answerCell.setBackground('#ffddd7').setFontColor('#8e3027').setFontWeight('bold');
    } else {
      answerCell.setBackground('#fff4cf').setFontColor('#73551c');
    }
    statusCell.setFontColor('#617675').setFontStyle('italic');
  }

  // Mantém regras de CF para edições posteriores na aba, além da cor aplicada ao enviar.
  const answerRanges = [];
  for (let i = 0; i < QUESTION_COUNT; i += 1) answerRanges.push(sheet.getRange(2, 7 + i * 2, Math.max(sheet.getLastRow() - 1, 1), 1));
  const rules = sheet.getConditionalFormatRules().filter((rule) => !String(rule.getRanges()[0].getA1Notation()).match(/G|I|K|M|O|Q|S|U|W|Y/));
  answerRanges.forEach((range, index) => {
    const answerColumnLetter = columnLetter_(7 + index * 2);
    const statusColumnLetter = columnLetter_(8 + index * 2);
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(`$${statusColumnLetter}2="Correta"`).setBackground('#c7e6ff').setFontColor('#12456d').setBold(true).setRanges([range]).build());
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(`$${statusColumnLetter}2="Incorreta"`).setBackground('#ffddd7').setFontColor('#8e3027').setBold(true).setRanges([range]).build());
  });
  sheet.setConditionalFormatRules(rules);
}

function columnLetter_(column) {
  let letter = '';
  let number = column;
  while (number > 0) {
    const remainder = (number - 1) % 26;
    letter = String.fromCharCode(65 + remainder) + letter;
    number = Math.floor((number - 1) / 26);
  }
  return letter;
}

function jsonOutput_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function setupSheet() {
  const sheet = getSheet_();
  sheet.getRange('A:A').setNumberFormat('dd/mm/yyyy hh:mm');
  sheet.getRange(1, 1, 1, 26).setWrap(true);
  sheet.autoResizeColumns(1, 26);
}
