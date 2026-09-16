import { useMemo, useState } from "react";
import { CheckCircle2, ChevronRight, ClipboardCheck, CloudUpload, GraduationCap, Leaf, RotateCcw, Send, Sparkles, Trophy } from "lucide-react";
import { toast } from "sonner";

type Student = { name: string; ra: string };
type Question = {
  id: number;
  lesson: string;
  tag: string;
  type: "multiple" | "essay";
  title: string;
  prompt: string;
  image: string;
  imageAlt: string;
  options?: string[];
  correct?: number;
  placeholder?: string;
};

const APPS_SCRIPT_URL = "";
const SHEET_ID = "1Vg23jd8ma4-ow2YmHYZjLcSBOVGHYWD96V3ycYws9W0";
const ASSET = "/manus-storage/";

const students: Student[] = [
  { name: "EVELYN LUANE DE SENA ALVES", ra: "112219637-4" },
  { name: "GABRIEL RONDINI DA SILVA", ra: "112208931-4" },
  { name: "GUSTAVO HENRIQUE FIGUEREDO CARVALHO", ra: "120369358-8" },
  { name: "JOAO MARCOS DANTAS DA SILVA", ra: "112212796-0" },
  { name: "MIGUEL DE OLIVEIRA AQUINO", ra: "112228039-7" },
  { name: "PEDRO HENRIQUE FAGUNDES DE LIMA", ra: "112221851-5" },
  { name: "PEDRO MIGUEL ALMEIDA DO NASCIMENTO", ra: "111128972-4" },
  { name: "WILLIAN ROBERTO DUARTE", ra: "111401688-3" },
  { name: "YGOR BRYAN SILVA OLIVEIRA", ra: "121492670-8" },
  { name: "ANA JÚLLIA LIMA CLAUDIO", ra: "112220804-2" },
  { name: "AYSHILLA PEREIRA DOS SANTOS", ra: "112039230-5" },
  { name: "HYAGO SANTOS XAVIER", ra: "113206434-X" },
  { name: "JULIA DARRIBA CESTARI", ra: "113207466-6" },
  { name: "JULIANA CRISTINA ARAUJO OLIVEIRA", ra: "113216426-6" },
  { name: "KAUANY COSTA HELUANY", ra: "110458664-2" },
  { name: "LUDIMILA NEVES DA SILVA", ra: "112217185-7" },
  { name: "MATHEUS CRISTHOFER OLIVEIRA DE SOUZA RAMOS", ra: "114156387-3" },
  { name: "PABLO HENRIQUE DA PAIXÃO TEIXEIRA", ra: "120994167-3" },
  { name: "YAGO COLDI BELI AZEVEDO DA SILVA", ra: "112049371-7" },
  { name: "JOÃO MANOEL DO NASCIMENTO MENEZES", ra: "112096075-7" },
  { name: "IAGO FELIPE SANDRIN BERTIN", ra: "114186470-8" },
  { name: "ANDRE FRANCESCHINI SOARES", ra: "113059025-2" },
  { name: "ANA JULIA ROCHA DE JESUS", ra: "111403521-X" },
  { name: "JULIA DE CASTRO CARDOSO", ra: "113209355-7" },
  { name: "MANUELA TELES DE OLIVEIRA", ra: "110498132-4" },
  { name: "RAISSA VITORIA LENARES SANTOS", ra: "114151501-5" },
  { name: "BRENO APARECIDO DE SOUSA NASCIMENTO", ra: "114146626-0" },
  { name: "YASMIN CABRAL KELER DOMINGUES", ra: "112213900-7" },
  { name: "MARIA CLARA COSTA MARTINS", ra: "113208116-6" },
  { name: "JOAO VICTOR DE CARVALHO SANTOS", ra: "109485196-6" },
  { name: "MYLLENA CARDOZO FERREIRA", ra: "113212612-5" },
  { name: "LUDMILA SILVA FELICIANO", ra: "112496089-2" },
  { name: "LEONARDO RIKELME NUNES", ra: "113208776-4" },
  { name: "GABRIEL FELIPO DE MORAIS", ra: "112219357-9" },
  { name: "MIKAELLI PARMEGIANI MATHIAS", ra: "112222661-5" },
  { name: "EMILLY FERNANDES", ra: "111713689-9" },
  { name: "LOHAYNI VICTORIA TAVARES DOS SANTOS", ra: "113851262-X" },
  { name: "EMILLY STEPHANIE CAMARGO DE JESUS", ra: "111847068-0" },
  { name: "MAISSA QUERCIA GALLO", ra: "112131726-1" },
  { name: "MANUELA LEDIER DE ABREU", ra: "115125705-9" },
  { name: "IASMIN DE SOUZA ALBERTO", ra: "111571604-9" },
];

const questions: Question[] = [
  {
    id: 1,
    lesson: "Aula 1",
    tag: "Ciclos do carbono e do oxigênio",
    type: "multiple",
    title: "Uma troca invisível que sustenta a vida",
    prompt: "Em uma área de mata próxima à escola, as plantas retiram gás carbônico do ar durante a fotossíntese, enquanto plantas e animais devolvem gás carbônico ao ambiente pela respiração. Considerando também a relação com o oxigênio, qual alternativa descreve corretamente essa dinâmica?",
    image: `${ASSET}ciclo-carbono-oxigenio_953a55a0.png`,
    imageAlt: "Ilustração dos ciclos do carbono e do oxigênio em um ecossistema",
    options: [
      "A fotossíntese libera gás carbônico e a respiração absorve oxigênio da atmosfera.",
      "A fotossíntese fixa gás carbônico em matéria orgânica e libera oxigênio; a respiração faz o movimento oposto.",
      "A respiração transforma oxigênio em matéria orgânica sem participação do carbono.",
      "A queima de combustíveis retira gás carbônico do ar e aumenta a produção de oxigênio.",
    ],
    correct: 1,
  },
  {
    id: 2,
    lesson: "Aula 2",
    tag: "Ciclo do nitrogênio",
    type: "multiple",
    title: "O trabalho das bactérias do solo",
    prompt: "Em uma horta comunitária, estudantes observam que algumas bactérias associadas ao solo e às raízes participam da transformação de compostos nitrogenados. Por que esses microrganismos são essenciais para o ciclo do nitrogênio?",
    image: `${ASSET}ciclo-nitrogenio_8cae7a76.png`,
    imageAlt: "Ilustração do ciclo do nitrogênio com plantas e bactérias do solo",
    options: [
      "Porque convertem formas de nitrogênio em compostos que podem ser assimilados pelas plantas.",
      "Porque produzem oxigênio e substituem a fotossíntese das plantas.",
      "Porque retiram todo o nitrogênio do ambiente e impedem sua circulação.",
      "Porque transformam diretamente gás carbônico em proteínas nos animais.",
    ],
    correct: 0,
  },
  {
    id: 3,
    lesson: "Aula 3",
    tag: "Fertilizantes e interferência humana",
    type: "multiple",
    title: "Escolhas para adubar sem desequilibrar",
    prompt: "Uma propriedade rural precisa corrigir rapidamente a deficiência de nitrogênio no solo, mas também quer reduzir impactos ambientais. A equipe compara um fertilizante inorgânico de liberação rápida com composto orgânico de liberação gradual. Qual análise é cientificamente adequada?",
    image: `${ASSET}fertilizantes-agricultura_668e03c7.png`,
    imageAlt: "Comparação visual entre fertilizantes orgânicos e inorgânicos em um campo agrícola",
    options: [
      "Fertilizantes orgânicos sempre são imediatamente absorvidos e não alteram a vida do solo.",
      "Fertilizantes inorgânicos não possuem nutrientes e por isso nunca produzem impactos.",
      "O fertilizante inorgânico pode disponibilizar nutrientes rapidamente, mas o uso excessivo pode favorecer perdas e impactos ambientais.",
      "Os dois tipos são idênticos quanto à origem, composição química e velocidade de liberação.",
    ],
    correct: 2,
  },
  {
    id: 4,
    lesson: "Aula 4",
    tag: "Eutrofização e maré vermelha",
    type: "multiple",
    title: "Quando o excesso de nutrientes sufoca a água",
    prompt: "Após chuvas intensas, uma lagoa recebe esgoto e nutrientes carregados de uma área agrícola. Dias depois, há uma grande proliferação de algas, a água fica esverdeada e peixes aparecem mortos. Qual cadeia de eventos explica melhor o caso?",
    image: `${ASSET}eutrofizacao_76c99926.png`,
    imageAlt: "Comparação entre um lago equilibrado e um lago eutrofizado",
    options: [
      "Aumento de nutrientes → proliferação de algas → decomposição intensa → redução do oxigênio dissolvido.",
      "Diminuição de nutrientes → redução de algas → aumento de oxigênio → morte dos peixes.",
      "Aumento de oxigênio → decomposição interrompida → água sem microrganismos.",
      "Evaporação da água → aumento da salinidade → fotossíntese dos peixes.",
    ],
    correct: 0,
  },
  {
    id: 5,
    lesson: "Aula 5",
    tag: "Ações mitigatórias",
    type: "multiple",
    title: "Planejando uma agricultura regenerativa",
    prompt: "Para diminuir a entrada de nutrientes em um rio, uma escola agrícola propõe combinar adubação verde, rotação de culturas, manutenção de mata ciliar e reflorestamento. Por que esse conjunto de ações é coerente com a mitigação dos impactos nos ciclos biogeoquímicos?",
    image: `${ASSET}mitigacao-ciclos_5227aa3f.png`,
    imageAlt: "Ações ecológicas de mitigação protegendo o solo e um rio",
    options: [
      "Porque elimina completamente os ciclos naturais e impede qualquer decomposição.",
      "Porque aumenta a erosão e leva mais nutrientes para os corpos d’água.",
      "Porque substitui todos os fertilizantes por água, sem considerar a necessidade das plantas.",
      "Porque protege o solo, favorece a ciclagem de nutrientes e reduz o escoamento de compostos para os rios.",
    ],
    correct: 3,
  },
  {
    id: 6,
    lesson: "Aula 6",
    tag: "Hipóteses e método científico",
    type: "multiple",
    title: "Da curiosidade à investigação",
    prompt: "Uma estudante percebe que mudas próximas à janela crescem mais rápido e decide investigar a influência da luz. Ela formula uma hipótese, mantém água e tipo de solo constantes, varia a luminosidade e mede o crescimento durante duas semanas. Qual aspecto torna esse procedimento científico?",
    image: `${ASSET}pasteur-fraco-real_ac338ce6.jpg`,
    imageAlt: "Fotografia real de um frasco de pescoço de cisne usado nos experimentos de Pasteur",
    options: [
      "A conclusão é definida antes da observação para evitar resultados inesperados.",
      "A investigação organiza uma hipótese testável, controla variáveis e coleta evidências para analisar a explicação.",
      "O senso comum substitui as medidas porque experiências não precisam ser registradas.",
      "Uma hipótese só é científica quando não pode ser testada ou revisada.",
    ],
    correct: 1,
  },
  {
    id: 7,
    lesson: "Aula 7",
    tag: "Teorias sobre a origem da vida",
    type: "multiple",
    title: "Hipóteses para uma Terra antiga",
    prompt: "Ao comparar explicações históricas para a origem da vida, a turma encontra panspermia cósmica, evolução química, abiogênese e biogênese. Qual alternativa diferencia corretamente esses conceitos?",
    image: `${ASSET}teorias-origem-vida_eff93ade.png`,
    imageAlt: "Representação simbólica de diferentes hipóteses sobre a origem da vida",
    options: [
      "A biogênese afirma que a vida surge sempre de matéria sem vida, sem organismos preexistentes.",
      "A abiogênese é a teoria atual que comprova a origem extraterrestre de todos os seres vivos.",
      "A evolução química propõe a formação gradual de moléculas orgânicas na Terra primitiva; a biogênese defende vida a partir de vida preexistente.",
      "A panspermia cósmica e a evolução química são exatamente a mesma explicação e não podem ser comparadas.",
    ],
    correct: 2,
  },
  {
    id: 8,
    lesson: "Aula 8",
    tag: "Redi, Spallanzani e Pasteur",
    type: "essay",
    title: "Evidências contra a geração espontânea",
    prompt: "Imagine que você precisa explicar para uma comunidade por que alimentos protegidos de contaminação não desenvolvem microrganismos da mesma forma que alimentos expostos. Compare, em ordem cronológica, as contribuições dos experimentos de Redi, Spallanzani e Pasteur para a consolidação da biogênese.",
    image: `${ASSET}redi-spallanzani-pasteur_401a9e97.png`,
    imageAlt: "Experimentos históricos de Redi, Spallanzani e Pasteur contra a geração espontânea",
    placeholder: "Organize sua resposta mencionando o controle experimental, a contaminação e a conclusão de cada pesquisador...",
  },
  {
    id: 9,
    lesson: "Aula 9",
    tag: "Terra primitiva e origem da vida",
    type: "essay",
    title: "A experiência que simulou um cenário antigo",
    prompt: "Explique como a teoria de Oparin e Haldane e o experimento de Urey e Miller se relacionam. Em sua resposta, descreva as condições simuladas da Terra primitiva e o que a formação de moléculas orgânicas indicou — sem afirmar que o experimento criou seres vivos.",
    image: `${ASSET}oparin-miller_b847cf00.png`,
    imageAlt: "Terra primitiva e aparato experimental de Urey e Miller",
    placeholder: "Relacione atmosfera, fontes de energia, moléculas orgânicas e os limites da evidência experimental...",
  },
  {
    id: 10,
    lesson: "Aula 10",
    tag: "Lamarck e Darwin",
    type: "essay",
    title: "Duas explicações históricas para a evolução",
    prompt: "Em uma população de aves, indivíduos com bicos de formatos diferentes encontram alimentos distintos após uma mudança ambiental. Compare como Lamarck e Darwin poderiam explicar a transformação da população ao longo das gerações. Use os conceitos de uso e desuso, caracteres adquiridos, variação e seleção natural.",
    image: `${ASSET}origem-vida_cb337b55.png`,
    imageAlt: "Ilustração conceitual sobre evolução, ambiente e investigação da vida",
    placeholder: "Construa uma comparação cuidadosa entre as duas teorias e indique qual mecanismo é aceito pela ciência atual...",
  },
];

const initialAnswers = Object.fromEntries(questions.map((q) => [`q${q.id}`, ""])) as Record<string, string>;

export default function Home() {
  const [turma, setTurma] = useState("");
  const [studentName, setStudentName] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>(initialAnswers);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [score, setScore] = useState(0);

  const student = useMemo(() => students.find((item) => item.name === studentName), [studentName]);
  const answeredCount = Object.values(answers).filter(Boolean).length;
  const progress = Math.round((answeredCount / questions.length) * 100);

  function updateAnswer(id: number, value: string) {
    setAnswers((current) => ({ ...current, [`q${id}`]: value }));
    if (submitted) setSubmitted(false);
  }

  function resetActivity() {
    setAnswers(initialAnswers);
    setSubmitted(false);
    setScore(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submitActivity() {
    if (!turma || !studentName || !student) {
      toast.error("Selecione a turma e o nome antes de enviar.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const unanswered = questions.filter((question) => !answers[`q${question.id}`]);
    if (unanswered.length > 0) {
      toast.error(`Ainda faltam responder ${unanswered.length} questão(ões).`);
      document.getElementById(`question-${unanswered[0].id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const multipleScore = questions
      .filter((question) => question.type === "multiple")
      .reduce((total, question) => total + (Number(answers[`q${question.id}`]) === question.correct ? 1 : 0), 0);
    setScore(multipleScore);
    setSending(true);

    const payload = {
      sheetId: SHEET_ID,
      turma,
      nome: student.name,
      ra: student.ra,
      pontuacaoObjetiva: multipleScore,
      totalObjetivas: 7,
      respostas: questions.reduce<Record<string, string>>((result, question) => {
        result[`q${question.id}`] = question.type === "multiple" ? String.fromCharCode(65 + Number(answers[`q${question.id}`])) : answers[`q${question.id}`];
        return result;
      }, {}),
      resultados: questions.reduce<Record<string, string>>((result, question) => {
        result[`q${question.id}`] = question.type === "essay" ? "Correção manual" : Number(answers[`q${question.id}`]) === question.correct ? "Correta" : "Incorreta";
        return result;
      }, {}),
    };

    try {
      localStorage.setItem("bio3f-last-submission", JSON.stringify(payload));
      if (APPS_SCRIPT_URL) {
        await fetch(APPS_SCRIPT_URL, { method: "POST", mode: "no-cors", body: JSON.stringify(payload) });
        toast.success("Atividade registrada na planilha.");
      } else {
        toast.success("Atividade concluída. Para registrar na planilha, configure a URL do Apps Script.");
      }
      setSubmitted(true);
      setTimeout(() => document.getElementById("resultado")?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch {
      toast.error("Não foi possível enviar agora. As respostas ficaram salvas neste dispositivo.");
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="school-mark"><span className="mark-icon"><Leaf size={18} /></span><span>E.E. PROFª WANDA MASCAGNI DE SÁ</span></div>
        <div className="topbar-meta"><span>Biologia • 3º bimestre</span><span className="secure-dot">● atividade individual</span></div>
      </header>

      <section className="hero-wrap">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={15} /> MISSÃO VIDA & EQUILÍBRIO</div>
          <h1>Uma jornada pelos ciclos da vida.</h1>
          <p className="hero-lede">Resolva situações-problema, interprete evidências e conecte fenômenos da Terra às escolhas que protegem os ecossistemas.</p>
          <div className="hero-pills"><span><ClipboardCheck size={15} /> 10 questões</span><span><GraduationCap size={15} /> 3ª Série F</span><span><Trophy size={15} /> 7 objetivas + 3 discursivas</span></div>
        </div>
        <div className="hero-orbit" aria-hidden="true"><div className="orbit-ring ring-one" /><div className="orbit-ring ring-two" /><div className="planet"><Leaf size={36} /></div><span className="orbit-chip chip-one">CO₂</span><span className="orbit-chip chip-two">N₂</span><span className="orbit-chip chip-three">O₂</span></div>
      </section>

      <section className="student-card" aria-label="Identificação do estudante">
        <div className="card-heading"><div><span className="section-kicker">IDENTIFICAÇÃO</span><h2>Antes de começar, diga quem é você.</h2></div><span className="required-note">* campos obrigatórios</span></div>
        <div className="student-grid">
          <label className="field-label">Turma <span>*</span><select value={turma} onChange={(event) => setTurma(event.target.value)}><option value="">Selecione a turma</option><option value="3ª Série F">3ª Série F</option></select></label>
          <label className="field-label">Nome <span>*</span><select value={studentName} onChange={(event) => setStudentName(event.target.value)} disabled={!turma}><option value="">{turma ? "Selecione seu nome" : "Escolha a turma primeiro"}</option>{students.map((item) => <option key={item.ra} value={item.name}>{item.name}</option>)}</select></label>
          <label className="field-label">RA <span className="optional">preenchido automaticamente</span><input value={student?.ra ?? ""} readOnly placeholder="Será exibido ao selecionar seu nome" /></label>
        </div>
        {student && <div className="student-confirm"><CheckCircle2 size={17} /> Identificação pronta para <strong>{student.name}</strong>. Confira o RA antes de seguir.</div>}
      </section>

      <section className="progress-strip"><div className="progress-label"><span>SEU PROGRESSO</span><strong>{answeredCount}/{questions.length} respondidas</strong></div><div className="progress-track"><div className="progress-value" style={{ width: `${progress}%` }} /></div><span className="progress-percent">{progress}%</span></section>

      <section className="quiz-area">
        <div className="quiz-intro"><div><span className="section-kicker">ROTA DE APRENDIZAGEM</span><h2>Observe, conecte e argumente.</h2></div><p>As situações foram elaboradas a partir das aprendizagens essenciais e da matriz da Prova Paulista. Nas objetivas, clique na alternativa que considerar mais adequada. Nas discursivas, use evidências e conceitos.</p></div>
        <div className="question-list">
          {questions.map((question) => <QuestionCard key={question.id} question={question} answer={answers[`q${question.id}`]} onChange={(value) => updateAnswer(question.id, value)} />)}
        </div>
      </section>

      <section className="submit-panel"><div><span className="section-kicker">ÚLTIMO PASSO</span><h2>Pronto para entregar sua missão?</h2><p>Revise as respostas. Ao enviar, as questões objetivas serão contabilizadas e as discursivas ficarão disponíveis para correção manual.</p></div><button className="primary-button" onClick={submitActivity} disabled={sending}>{sending ? "Enviando..." : <><Send size={18} /> Enviar atividade</>}</button></section>

      {submitted && <section id="resultado" className="result-card"><div className="result-icon"><Trophy size={30} /></div><div><span className="section-kicker">ATIVIDADE REGISTRADA</span><h2>Boa missão, {student?.name.split(" ")[0]}.</h2><p>Você acertou <strong>{score} de 7</strong> questões objetivas. As três respostas discursivas aguardam a leitura da professora.</p><div className="result-actions"><button className="secondary-button" onClick={resetActivity}><RotateCcw size={16} /> Refazer respostas</button><button className="text-button" onClick={() => window.print()}>Imprimir / salvar PDF</button></div></div></section>}

      <footer className="footer"><div><strong>E.E. PROFª WANDA MASCAGNI DE SÁ</strong><span>Biologia • 3ª Série F • 3º bimestre</span></div><div className="footer-right"><span>Aprendizagens essenciais: EM13CNT105 + EM13CNT201</span><span>Planilha vinculada por Apps Script</span></div></footer>
    </main>
  );
}

function QuestionCard({ question, answer, onChange }: { question: Question; answer: string; onChange: (value: string) => void }) {
  return <article id={`question-${question.id}`} className={`question-card ${answer ? "is-answered" : ""}`}>
    <div className="question-top"><div className="question-number">{String(question.id).padStart(2, "0")}</div><div><span className="lesson-label">{question.lesson} <i /> {question.type === "multiple" ? "múltipla escolha" : "dissertativa"}</span><h3>{question.title}</h3></div><span className="question-tag">{question.tag}</span></div>
    <img className="question-image" src={question.image} alt={question.imageAlt} />
    <div className="question-body"><p className="question-prompt">{question.prompt}</p>{question.type === "multiple" ? <div className="options" role="radiogroup" aria-label={`Alternativas da questão ${question.id}`}>{question.options?.map((option, index) => <button key={option} className={`option-button ${answer === String(index) ? "selected" : ""}`} onClick={() => onChange(String(index))} role="radio" aria-checked={answer === String(index)}><span className="option-letter">{String.fromCharCode(65 + index)}</span><span>{option}</span>{answer === String(index) && <CheckCircle2 className="option-check" size={19} />}</button>)}</div> : <textarea className="essay-input" value={answer} onChange={(event) => onChange(event.target.value)} placeholder={question.placeholder} rows={6} aria-label={`Resposta da questão ${question.id}`} />}</div>
    <div className="question-foot"><span>{question.type === "multiple" ? "Selecione uma alternativa" : "Escreva com suas palavras e use conceitos científicos"}</span>{answer && <span className="answered-mark"><CheckCircle2 size={15} /> respondida</span>}</div>
  </article>;
}

export { APPS_SCRIPT_URL };
