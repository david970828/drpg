/* ============================================================
   BOMBA DEL CONOCIMIENTO — script.js  v2.0
   ============================================================
   CAMBIOS v2.0:
   • Sin cronómetro — la bomba es física, el moderador controla el tiempo
   • Sin carga de documentos — contenido fijo de las 9 Guías de Administración
   • Inversión de roles al explotar la bomba (2 fases por ronda)
   • Ganador se decide solo después de completar ambas fases
   • Juegos continuos: al terminar una instancia, arranca otra automáticamente
   • Sonido tic-tac real con Web Audio API (sin archivos externos)
   ============================================================ */

'use strict';

/* ============================================================
   1. BASE DE CONOCIMIENTO — 9 Guías de Fundamentos de Administración
   ============================================================ */
const KB = {

  /* ── PREGUNTAS (40 en total, mezcladas por ronda) ── */
  questions: [
    // Guía 1 — Orígenes
    { q:'¿Cuál civilización antigua usó principios administrativos en la construcción de pirámides?',
      opts:['Grecia','Egipto','Roma','China'], correct:1, source:'Guía 1' },
    { q:'¿Qué evento del siglo XVIII impulsó el nacimiento de la administración moderna?',
      opts:['La Revolución Francesa','La Revolución Industrial','La Revolución Americana','El Renacimiento'], correct:1, source:'Guía 1' },
    { q:'¿Qué aportó la Iglesia Católica a la administración?',
      opts:['La contabilidad de costos','Jerarquía y estructura organizacional','El trabajo en cadena','La motivación laboral'], correct:1, source:'Guía 1' },
    { q:'¿Qué organización militar influyó en los principios de mando y control administrativo?',
      opts:['La ONU','El Ejército Romano','La Cruz Roja','La OTAN'], correct:1, source:'Guía 1' },
    // Guía 2 — Teorías Científicas y Clásica
    { q:'¿Quién es el padre de la Administración Científica?',
      opts:['Henri Fayol','Frederick Taylor','Elton Mayo','Max Weber'], correct:1, source:'Guía 2' },
    { q:'¿Cuántos principios de administración definió Henri Fayol?',
      opts:['10','14','7','21'], correct:1, source:'Guía 2' },
    { q:'¿Qué estudió Taylor con su método científico?',
      opts:['Relaciones humanas','Tiempos y movimientos en el trabajo','Estructuras burocráticas','Motivación del empleado'], correct:1, source:'Guía 2' },
    { q:'¿Cuál es el principio de Fayol que dice que un empleado debe recibir órdenes de un solo jefe?',
      opts:['División del trabajo','Unidad de mando','Jerarquía','Centralización'], correct:1, source:'Guía 2' },
    { q:'¿Qué aportó Henry Ford a la administración?',
      opts:['La teoría de sistemas','La línea de ensamblaje y producción en serie','El modelo burocrático','La gestión de calidad'], correct:1, source:'Guía 2' },
    { q:'¿Cuál es la función principal de la Teoría Clásica de Fayol?',
      opts:['Estudiar al trabajador individual','Definir principios universales de la organización','Analizar grupos de trabajo','Medir productividad'], correct:1, source:'Guía 2' },
    // Guía 3 — Teorías Humanistas y Burocrática
    { q:'¿Qué experimento realizó Elton Mayo para estudiar la productividad?',
      opts:['Experimento Ford','Experimento Hawthorne','Experimento Taylor','Experimento Weber'], correct:1, source:'Guía 3' },
    { q:'¿Cuál fue el aporte principal de Max Weber a la administración?',
      opts:['Administración científica','Modelo burocrático','Teoría de sistemas','Relaciones humanas'], correct:1, source:'Guía 3' },
    { q:'¿Qué descubrió Elton Mayo en sus experimentos sobre productividad?',
      opts:['Que la iluminación es el factor más importante','Que las relaciones sociales impactan la productividad','Que el salario es el único motivador','Que la jerarquía aumenta la eficiencia'], correct:1, source:'Guía 3' },
    { q:'¿Cuál es la característica principal del modelo burocrático de Weber?',
      opts:['Informalidad y flexibilidad','Reglas claras, jerarquía y especialización','Enfoque en el cliente','Trabajo en equipo horizontal'], correct:1, source:'Guía 3' },
    // Guía 4 — Teorías Modernas
    { q:'¿Qué es la Teoría de Sistemas en administración?',
      opts:['Ver la organización como partes aisladas','Ver la organización como un conjunto de partes interrelacionadas','Automatizar todos los procesos','Solo enfocarse en producción'], correct:1, source:'Guía 4' },
    { q:'¿Qué plantea el enfoque situacional o contingencial?',
      opts:['Hay una sola forma correcta de administrar','La mejor forma de administrar depende del contexto','La tecnología define la organización','El liderazgo no importa'], correct:1, source:'Guía 4' },
    { q:'¿Cuál es el aporte de la Teoría Neoclásica?',
      opts:['Moderniza los principios clásicos enfocándose en resultados','Elimina la jerarquía','Prioriza la automatización','Define la burocracia ideal'], correct:0, source:'Guía 4' },
    { q:'¿Qué caracteriza a la Teoría del Desarrollo Organizacional (DO)?',
      opts:['Control estricto de procesos','Cambio planeado y mejora continua de la organización','Reducción de personal','Centralización del poder'], correct:1, source:'Guía 4' },
    // Guía 5 — Calidad
    { q:'¿Qué significa TQM?',
      opts:['Total Quality Management','Tactical Quality Model','Total Quantity Method','Technical Quality Management'], correct:0, source:'Guía 5' },
    { q:'¿Qué gurú de la calidad propuso los 14 puntos para la gestión?',
      opts:['Joseph Juran','Philip Crosby','W. Edwards Deming','Kaoru Ishikawa'], correct:2, source:'Guía 5' },
    { q:'¿Qué es el kaizen?',
      opts:['Una norma ISO','Mejoramiento continuo de origen japonés','Un tipo de empresa','Un modelo burocrático'], correct:1, source:'Guía 5' },
    { q:'¿Para qué sirven las normas ISO?',
      opts:['Medir ventas','Estandarizar procesos y garantizar calidad','Contratar personal','Diseñar productos'], correct:1, source:'Guía 5' },
    { q:'¿Qué es el ciclo PDCA o Deming?',
      opts:['Plan, Do, Check, Act','Plan, Design, Control, Audit','Process, Develop, Create, Analyze','Produce, Distribute, Control, Assess'], correct:0, source:'Guía 5' },
    { q:'¿Cuál es el objetivo principal de la gestión de calidad total?',
      opts:['Reducir costos a toda costa','Satisfacer las necesidades del cliente de forma continua','Aumentar la producción sin importar defectos','Eliminar supervisores'], correct:1, source:'Guía 5' },
    // Guía 6 — Empresa y Gerentes
    { q:'¿Cuál de los siguientes NO es un tipo de empresa según su tamaño?',
      opts:['Microempresa','Mediana empresa','Macro empresa','Grande empresa'], correct:2, source:'Guía 6' },
    { q:'¿Qué es una empresa?',
      opts:['Un grupo de amigos','Unidad económica que combina recursos para producir bienes o servicios','Solo una tienda física','Un departamento del gobierno'], correct:1, source:'Guía 6' },
    { q:'¿Cuáles son los tres niveles organizacionales de una empresa?',
      opts:['Directivo, mandante y operario','Estratégico, táctico y operativo','Alto, medio y bajo','Gerencial, técnico y manual'], correct:1, source:'Guía 6' },
    { q:'¿Qué habilidad es más importante en el nivel estratégico de la empresa?',
      opts:['Habilidad técnica','Habilidad conceptual','Habilidad manual','Habilidad física'], correct:1, source:'Guía 6' },
    // Guía 7 — Proceso Adm. I — Planeación
    { q:'¿Cuál es la primera función del proceso administrativo?',
      opts:['Organización','Dirección','Planeación','Control'], correct:2, source:'Guía 7' },
    { q:'¿Qué es la misión de una empresa?',
      opts:['Lo que quiere ser en el futuro','La razón de ser actual de la empresa','El objetivo financiero del año','El plan de ventas'], correct:1, source:'Guía 7' },
    { q:'¿Qué es la visión de una empresa?',
      opts:['La razón de ser actual','La proyección futura de lo que quiere ser la empresa','El organigrama','El presupuesto anual'], correct:1, source:'Guía 7' },
    { q:'¿Qué tipo de plan tiene un horizonte de más de 5 años?',
      opts:['Plan operativo','Plan táctico','Plan estratégico','Plan de contingencia'], correct:2, source:'Guía 7' },
    // Guía 8 — Proceso Adm. II — Organización y Dirección
    { q:'¿Qué es el organigrama?',
      opts:['Un plan financiero','Representación gráfica de la estructura organizacional','Un listado de empleados','Un reglamento interno'], correct:1, source:'Guía 8' },
    { q:'¿Qué es la departamentalización?',
      opts:['Despedir personal por departamentos','Agrupar actividades similares en unidades o departamentos','Controlar cada departamento con un supervisor','Reducir el número de áreas de la empresa'], correct:1, source:'Guía 8' },
    { q:'¿Qué implica la función de dirección en el proceso administrativo?',
      opts:['Definir la estructura','Liderar, motivar y comunicar para alcanzar objetivos','Medir resultados','Diseñar los cargos'], correct:1, source:'Guía 8' },
    { q:'¿Cuál es el principal reto del liderazgo en las organizaciones?',
      opts:['Reducir salarios','Influir positivamente en el comportamiento del equipo','Controlar todos los procesos manualmente','Eliminar la comunicación informal'], correct:1, source:'Guía 8' },
    // Guía 9 — Proceso Adm. III — Control
    { q:'¿Cuál es la última etapa del proceso administrativo?',
      opts:['Planeación','Organización','Dirección','Control'], correct:3, source:'Guía 9' },
    { q:'¿Qué etapa verifica que los resultados coincidan con los planes?',
      opts:['Planeación','Organización','Dirección','Control'], correct:3, source:'Guía 9' },
    { q:'¿Cuáles son los tipos de control según el momento de aplicación?',
      opts:['Anterior, presente, posterior','Previo, concurrente y posterior','Antes, durante y revisión','Inicial, intermedio y final'], correct:1, source:'Guía 9' },
    { q:'¿Para qué sirven los indicadores de gestión en el control administrativo?',
      opts:['Solo para reportes contables','Medir el desempeño y compararlo con los objetivos planeados','Diseñar la estructura organizacional','Calcular los salarios'], correct:1, source:'Guía 9' },
  ],

  /* ── AHORCADO (20 palabras) ── */
  hangmanWords: [
    { word:'ADMINISTRACION', hint:'Proceso de planear, organizar, dirigir y controlar recursos (Guía 1)' },
    { word:'PLANEACION',     hint:'Primera función del proceso administrativo (Guía 7)' },
    { word:'ORGANIZACION',  hint:'Estructurar y coordinar los recursos de la empresa (Guía 8)' },
    { word:'DIRECCION',     hint:'Función que implica liderazgo y motivación (Guía 8)' },
    { word:'CONTROL',       hint:'Verificar que los resultados coincidan con los planes (Guía 9)' },
    { word:'LIDERAZGO',     hint:'Capacidad de influir positivamente en el equipo (Guía 8)' },
    { word:'BUROCRACIA',    hint:'Modelo racional de organización propuesto por Weber (Guía 3)' },
    { word:'EFICIENCIA',    hint:'Hacer bien las cosas usando el mínimo de recursos (Guía 2)' },
    { word:'CALIDAD',       hint:'Satisfacer necesidades del cliente de forma continua (Guía 5)' },
    { word:'ESTRATEGIA',    hint:'Plan de acción para alcanzar objetivos a largo plazo (Guía 7)' },
    { word:'MISION',        hint:'Razón de ser actual de la organización (Guía 7)' },
    { word:'VISION',        hint:'Proyección futura de lo que quiere ser la empresa (Guía 7)' },
    { word:'JERARQUIA',     hint:'Niveles de autoridad dentro de una organización (Guía 2)' },
    { word:'MOTIVACION',    hint:'Fuerza interna que impulsa a actuar al trabajador (Guía 8)' },
    { word:'PRODUCTIVIDAD', hint:'Relación entre resultados obtenidos y recursos utilizados (Guía 2)' },
    { word:'KAIZEN',        hint:'Filosofía japonesa de mejoramiento continuo (Guía 5)' },
    { word:'ORGANIGRAMA',   hint:'Representación gráfica de la estructura empresarial (Guía 8)' },
    { word:'INDICADOR',     hint:'Medida que permite evaluar el desempeño organizacional (Guía 9)' },
    { word:'DELEGACION',    hint:'Transferencia de autoridad a un subordinado (Guía 8)' },
    { word:'BENCHMARK',     hint:'Comparación de prácticas con empresas líderes (Guía 5)' },
  ],

  /* ── PAREJAS (14 pares) ── */
  memoryPairs: [
    [{ label:'Frederick Taylor' },   { label:'Administración Científica' }],
    [{ label:'Henri Fayol' },        { label:'14 Principios Administrativos' }],
    [{ label:'Max Weber' },          { label:'Modelo Burocrático' }],
    [{ label:'Elton Mayo' },         { label:'Experimento Hawthorne' }],
    [{ label:'W. Edwards Deming' },  { label:'14 Puntos de la Calidad' }],
    [{ label:'TQM' },                { label:'Total Quality Management' }],
    [{ label:'FODA' },               { label:'Fortalezas, Oportunidades, Debilidades, Amenazas' }],
    [{ label:'PDCA' },               { label:'Planear → Hacer → Verificar → Actuar' }],
    [{ label:'Planeación' },         { label:'Definir objetivos y estrategias' }],
    [{ label:'Control' },            { label:'Medir resultados vs. planes' }],
    [{ label:'Misión' },             { label:'Razón de ser actual de la empresa' }],
    [{ label:'Organigrama' },        { label:'Representación gráfica de la estructura' }],
    [{ label:'Kaizen' },             { label:'Mejoramiento continuo japonés' }],
    [{ label:'Benchmarking' },       { label:'Comparación con mejores prácticas del sector' }],
  ],

  /* ── SECUENCIAS (6 ejercicios) ── */
  sequences: [
    { title:'Proceso Administrativo',
      items:['Planeación','Organización','Dirección','Control'],
      desc:'Ordena las 4 etapas del proceso administrativo en orden correcto' },
    { title:'Evolución del Pensamiento Administrativo',
      items:['Administración Científica (Taylor)','Teoría Clásica (Fayol)','Relaciones Humanas (Mayo)','Teoría de Sistemas'],
      desc:'Ordena cronológicamente las escuelas del pensamiento administrativo' },
    { title:'Ciclo PDCA de Deming',
      items:['Planear (Plan)','Hacer (Do)','Verificar (Check)','Actuar (Act)'],
      desc:'Ordena las fases del ciclo de mejora continua de Deming' },
    { title:'Proceso de Toma de Decisiones',
      items:['Identificar el problema','Generar alternativas','Evaluar opciones','Seleccionar e implementar'],
      desc:'Ordena los pasos correctos para tomar una decisión gerencial' },
    { title:'Pirámide Organizacional',
      items:['Nivel Estratégico (Alta Dirección)','Nivel Táctico (Mandos Medios)','Nivel Operativo (Supervisores)','Nivel de Ejecución (Operarios)'],
      desc:'Ordena los niveles de la pirámide organizacional de mayor a menor jerarquía' },
    { title:'Pasos del Control Administrativo',
      items:['Establecer estándares','Medir el desempeño real','Comparar resultados con estándares','Aplicar acciones correctivas'],
      desc:'Ordena las etapas del proceso de control administrativo' },
  ],

  /* ── TIPOS DE DESAFÍO ── */
  challengeTypes: [
    { id:'questions', icon:'❓', name:'Preguntas',           desc:'Preguntas de opción múltiple sobre las 9 guías del curso' },
    { id:'hangman',   icon:'🎯', name:'Ahorcado',            desc:'Adivina palabras clave del curso antes de agotar los intentos' },
    { id:'memory',    icon:'🃏', name:'Parejas',             desc:'Encuentra los pares: persona ↔ aporte, sigla ↔ significado' },
    { id:'sequence',  icon:'🔢', name:'Ordena la Secuencia', desc:'Arrastra y ordena los pasos o etapas correctamente' },
  ]
};

/* ============================================================
   2. STORAGE MANAGER
   ============================================================ */
class StorageManager {
  static KEY_SCORES  = 'bdc_scores';
  static KEY_HISTORY = 'bdc_history';
  static KEY_CONFIG  = 'bdc_config';

  static get(key, fallback = null) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch { return fallback; }
  }
  static set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }
  static remove(key) { try { localStorage.removeItem(key); } catch {} }
  static clearAll() {
    [this.KEY_SCORES, this.KEY_HISTORY, this.KEY_CONFIG].forEach(k => this.remove(k));
  }
}

/* ============================================================
   3. CONFIG MANAGER
   ============================================================ */
const Config = (() => {
  const DEFAULTS = { teams:['Visión Estrategia','Versity','Glasses'], sounds:true, theme:'dark' };
  let cfg = { ...DEFAULTS };

  function load() {
    const s = StorageManager.get(StorageManager.KEY_CONFIG);
    if (s) cfg = { ...DEFAULTS, ...s };
    _applyTheme();
  }
  function save(partial) {
    cfg = { ...cfg, ...partial };
    StorageManager.set(StorageManager.KEY_CONFIG, cfg);
    _applyTheme();
  }
  function reset() {
    cfg = { ...DEFAULTS };
    StorageManager.remove(StorageManager.KEY_CONFIG);
    _applyTheme();
  }
  function _applyTheme() { document.body.setAttribute('data-theme', cfg.theme); }
  function get() { return { ...cfg }; }

  return { load, save, reset, get };
})();

/* ============================================================
   4. SOUND MANAGER — Tic-tac con Web Audio API (sin archivos)
   ============================================================ */
const SoundManager = (() => {
  let ctx = null;
  let tickInterval = null;
  let enabled = true;

  /* Crea el contexto AudioContext la primera vez */
  function _getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    return ctx;
  }

  /* Genera un "tick" mecánico con dos osciladores cortos */
  function _tick(loud = false) {
    if (!enabled) return;
    try {
      const ac  = _getCtx();
      const now = ac.currentTime;

      // Click agudo corto
      const osc  = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.type = 'square';
      osc.frequency.setValueAtTime(loud ? 1200 : 900, now);
      osc.frequency.exponentialRampToValueAtTime(loud ? 300 : 200, now + 0.04);
      gain.gain.setValueAtTime(loud ? 0.6 : 0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.07);

      // Segundo click suave (el "tac")
      const osc2  = ac.createOscillator();
      const gain2 = ac.createGain();
      osc2.connect(gain2);
      gain2.connect(ac.destination);
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(loud ? 600 : 400, now + 0.12);
      gain2.gain.setValueAtTime(loud ? 0.4 : 0.2, now + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc2.start(now + 0.12);
      osc2.stop(now + 0.22);
    } catch {}
  }

  /* Sonido de explosión */
  function explosion() {
    if (!enabled) return;
    try {
      const ac  = _getCtx();
      const buf = ac.createBuffer(1, ac.sampleRate * 1.5, ac.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 3);
      }
      const src  = ac.createBufferSource();
      const gain = ac.createGain();
      const filter = ac.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 300;
      src.buffer = buf;
      src.connect(filter);
      filter.connect(gain);
      gain.connect(ac.destination);
      gain.gain.setValueAtTime(1.5, ac.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 1.4);
      src.start();
    } catch {}
  }

  /* Sonido de aplauso / éxito */
  function success() {
    if (!enabled) return;
    try {
      const ac = _getCtx();
      [0, 0.1, 0.2].forEach((delay, i) => {
        const osc  = ac.createOscillator();
        const gain = ac.createGain();
        osc.connect(gain); gain.connect(ac.destination);
        osc.type = 'sine';
        osc.frequency.value = 523 + i * 130; // Do, Mi, Sol
        gain.gain.setValueAtTime(0.3, ac.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + delay + 0.3);
        osc.start(ac.currentTime + delay);
        osc.stop(ac.currentTime + delay + 0.35);
      });
    } catch {}
  }

  /* Inicia el loop de tic-tac */
  function startTicking(fast = false) {
    stopTicking();
    if (!enabled) return;
    _tick();
    tickInterval = setInterval(() => _tick(fast), fast ? 400 : 800);
  }

  function setFast(fast) {
    stopTicking();
    startTicking(fast);
  }

  function stopTicking() {
    if (tickInterval) { clearInterval(tickInterval); tickInterval = null; }
  }

  function toggle() {
    enabled = !enabled;
    const btn = document.getElementById('btnSound');
    if (btn) btn.textContent = enabled ? '🔊' : '🔇';
    if (!enabled) stopTicking();
    Config.save({ sounds: enabled });
    Toast.show(enabled ? '🔊 Sonido activado' : '🔇 Sonido silenciado', 'info', 1800);
  }

  function setEnabled(val) { enabled = val; }

  return { startTicking, setFast, stopTicking, toggle, setEnabled, explosion, success };
})();

/* ============================================================
   5. SCOREBOARD MANAGER
   ============================================================ */
const ScoreboardManager = (() => {
  let scores = {};

  function init() {
    const saved = StorageManager.get(StorageManager.KEY_SCORES);
    if (saved) scores = saved;
    else Config.get().teams.forEach(t => { scores[t] = 0; });
    render();
  }

  function syncTeams() {
    Config.get().teams.forEach(t => { if (scores[t] === undefined) scores[t] = 0; });
    render();
  }

  function addPoints(team, pts) {
    if (scores[team] === undefined) scores[team] = 0;
    scores[team] += pts;
    StorageManager.set(StorageManager.KEY_SCORES, scores);
    render();
    _confetti();
    SoundManager.success();
  }

  function getScores() { return { ...scores }; }

  function render() {
    const el = document.getElementById('scoreboardList');
    if (!el) return;
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const maxPts = sorted[0]?.[1] || 1;
    const medals = ['🥇', '🥈', '🥉'];
    el.innerHTML = sorted.map(([team, pts], i) => `
      <div class="score-item ${i === 0 && pts > 0 ? 'leader' : ''}">
        <div class="score-bar" style="width:${maxPts > 0 ? (pts / maxPts * 100) : 0}%"></div>
        <span class="rank">${medals[i] || (i + 1)}</span>
        <span class="team-name">${team}</span>
        <span class="points">${pts}</span>
      </div>`).join('');
  }

  function reset() {
    Config.get().teams.forEach(t => { scores[t] = 0; });
    StorageManager.remove(StorageManager.KEY_SCORES);
    render();
  }

  function _confetti() {
    const colors = ['#f97316','#facc15','#22d3ee','#22c55e','#a855f7'];
    for (let i = 0; i < 35; i++) {
      const p = document.createElement('div');
      p.className = 'confetti-particle';
      p.style.cssText = `left:${Math.random()*100}vw;top:0;
        background:${colors[Math.floor(Math.random()*colors.length)]};
        animation-delay:${Math.random()*.5}s;
        animation-duration:${1.5+Math.random()*1.5}s;
        transform:rotate(${Math.random()*360}deg)`;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 3000);
    }
  }

  return { init, syncTeams, addPoints, getScores, render, reset };
})();

/* ============================================================
   6. HISTORY MANAGER
   ============================================================ */
const HistoryManager = (() => {
  let history = [];

  function load() { history = StorageManager.get(StorageManager.KEY_HISTORY, []); render(); }

  function add(entry) {
    history.unshift({
      round: entry.round, date: new Date().toLocaleString('es-CO'),
      bomba: entry.bomba, challenge: entry.challenge,
      type: entry.type, winner: entry.winner,
      points: entry.points, notes: entry.notes || ''
    });
    StorageManager.set(StorageManager.KEY_HISTORY, history);
    render();
  }

  function render() {
    const el = document.getElementById('historyList');
    if (!el) return;
    if (!history.length) {
      el.innerHTML = '<p style="color:var(--text-secondary);font-size:.8rem;text-align:center;padding:.5rem">Sin historial aún</p>';
      return;
    }
    el.innerHTML = history.slice(0, 15).map(h => `
      <div class="history-item">
        <div class="hist-round">R${h.round} — ${h.date}</div>
        <div class="hist-detail">💣 ${h.bomba} vs 🎯 ${h.challenge} · ${h.type}</div>
        <div class="hist-detail">🏆 ${h.winner} (+${h.points}pts)${h.notes ? ' · ' + h.notes : ''}</div>
      </div>`).join('');
  }

  function getAll() { return [...history]; }

  function reset() { history = []; StorageManager.remove(StorageManager.KEY_HISTORY); render(); }

  return { load, add, render, getAll, reset };
})();

/* ============================================================
   7. WHEEL MANAGER — Ruletas animadas con Canvas
   ============================================================ */
const WheelManager = (() => {
  const COLORS = ['#f97316','#22d3ee','#a855f7','#22c55e','#ef4444','#facc15','#3b82f6','#ec4899'];
  let bombaTeam = null;
  let challengeTeam = null;
  let spinning = false;

  function _draw(canvasId, segments) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cx = canvas.width / 2, cy = canvas.height / 2, r = cx - 8;
    const arc = (2 * Math.PI) / segments.length;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    segments.forEach((seg, i) => {
      const s = i * arc - Math.PI / 2, e = s + arc;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, s, e); ctx.closePath();
      ctx.fillStyle = COLORS[i % COLORS.length]; ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = 2; ctx.stroke();
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(s + arc / 2);
      ctx.textAlign = 'right'; ctx.fillStyle = '#fff';
      ctx.font = `bold ${Math.min(15, 240 / seg.length)}px Segoe UI,sans-serif`;
      ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 4;
      ctx.fillText(seg, r - 14, 5); ctx.restore();
    });
    ctx.beginPath(); ctx.arc(cx, cy, 26, 0, 2 * Math.PI);
    ctx.fillStyle = '#0d1117'; ctx.fill();
    ctx.strokeStyle = '#facc15'; ctx.lineWidth = 3; ctx.stroke();
    ctx.fillStyle = '#facc15'; ctx.font = 'bold 18px Segoe UI,sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('💣', cx, cy);
  }

  function _spin(canvasId, segments, onDone) {
    if (spinning) return;
    spinning = true;
    document.getElementById(canvasId)?.classList.add('spinning');

    // Elegir ganador real al azar
    const winIdx = Math.floor(Math.random() * segments.length);
    const arc    = (2 * Math.PI) / segments.length;

    /*
     * El puntero está fijo en la parte SUPERIOR (12 o'clock, ángulo = -PI/2 en coords canvas).
     * Cada segmento i ocupa el rango de ángulo [i*arc - PI/2 , (i+1)*arc - PI/2] en el dibujo
     * estático (antes de rotar).
     * Para que el segmento winIdx quede centrado bajo el puntero tras la rotación:
     *   ángulo_rotación_final = 2π*vueltas - centro_del_segmento_ganador
     * donde centro_del_segmento_ganador = winIdx * arc + arc/2  (contado desde 0)
     * Añadimos un offset aleatorio dentro del sector (±35%) para que no pare siempre
     * exactamente en el centro — parece más natural.
     */
    const jitter      = (Math.random() * 0.7 - 0.35) * arc;   // variación dentro del sector
    const sectorCenter = winIdx * arc + arc / 2;               // centro del sector ganador
    const extraSpins   = 5 + Math.floor(Math.random() * 3);    // 5–7 vueltas completas
    const targetAngle  = 2 * Math.PI * extraSpins - sectorCenter + jitter;

    const totalFrames  = 220 + Math.floor(Math.random() * 80);
    let frame = 0;
    const easeOut = t => 1 - Math.pow(1 - t, 4);

    function _drawFrame(ctx, angle) {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return;
      const cx = canvas.width / 2, cy = canvas.height / 2, r = cx - 8;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(angle); ctx.translate(-cx, -cy);
      segments.forEach((seg, i) => {
        const s = i * arc - Math.PI / 2, e = s + arc;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, s, e); ctx.closePath();
        ctx.fillStyle = COLORS[i % COLORS.length]; ctx.fill();
        ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = 2; ctx.stroke();
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(s + arc / 2);
        ctx.textAlign = 'right'; ctx.fillStyle = '#fff';
        ctx.font = `bold ${Math.min(15, 240 / seg.length)}px Segoe UI,sans-serif`;
        ctx.shadowColor = 'rgba(0,0,0,.7)'; ctx.shadowBlur = 4;
        ctx.fillText(seg, r - 14, 5); ctx.restore();
      });
      ctx.restore();
      // Centro fijo (no rota)
      ctx.beginPath(); ctx.arc(cx, cy, 26, 0, 2 * Math.PI);
      ctx.fillStyle = '#0d1117'; ctx.fill();
      ctx.strokeStyle = '#facc15'; ctx.lineWidth = 3; ctx.stroke();
      ctx.fillStyle = '#facc15'; ctx.font = 'bold 18px Segoe UI,sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('💣', cx, cy);
    }

    function animate() {
      frame++;
      const canvas = document.getElementById(canvasId);
      if (!canvas) { spinning = false; return; }
      const ctx = canvas.getContext('2d');
      _drawFrame(ctx, targetAngle * easeOut(frame / totalFrames));
      if (frame < totalFrames) {
        requestAnimationFrame(animate);
      } else {
        spinning = false;
        document.getElementById(canvasId)?.classList.remove('spinning');
        // Dibujar estado final con el ganador centrado bajo el puntero
        _drawFrame(ctx, targetAngle);
        onDone(segments[winIdx]);
      }
    }
    requestAnimationFrame(animate);
  }

  function initBomba() { _draw('wheelBomba', Config.get().teams); }

  function initChallenge() { _draw('wheelChallenge', Config.get().teams.filter(t => t !== bombaTeam)); }

  function spinBomba() {
    document.getElementById('btnSpinBomba').disabled = true;
    SoundManager.startTicking();
    _spin('wheelBomba', Config.get().teams, winner => {
      SoundManager.stopTicking();
      bombaTeam = winner;
      const el = document.getElementById('resultBomba');
      el.innerHTML = `<div class="result-label">💣 Equipo que infla la bomba</div>
                      <div class="result-team">${winner}</div>
                      <div class="result-countdown" id="cdBomba"></div>`;
      el.classList.remove('hidden');
      Toast.show(`💣 ${winner} infla la bomba — avanzando en 7 segundos…`, 'info', 6500);
      _startCountdown('cdBomba', 7, () => { App.goToStep(2); initChallenge(); });
    });
  }

  function spinChallenge() {
    document.getElementById('btnSpinChallenge').disabled = true;
    SoundManager.startTicking();
    const teams = Config.get().teams.filter(t => t !== bombaTeam);
    _spin('wheelChallenge', teams, winner => {
      SoundManager.stopTicking();
      challengeTeam = winner;
      const el = document.getElementById('resultChallenge');
      el.innerHTML = `<div class="result-label">🎯 Equipo que responde el desafío</div>
                      <div class="result-team">${winner}</div>
                      <div class="result-countdown" id="cdChallenge"></div>`;
      el.classList.remove('hidden');
      Toast.show(`🎯 ${winner} responde el desafío — avanzando en 7 segundos…`, 'info', 6500);
      _startCountdown('cdChallenge', 7, () => App.goToStep(3));
    });
  }

  /* Cuenta regresiva visual dentro del resultado */
  function _startCountdown(elId, seconds, onDone) {
    let s = seconds;
    const el = document.getElementById(elId);
    if (el) el.textContent = `Avanzando en ${s}s…`;
    const iv = setInterval(() => {
      s--;
      const e = document.getElementById(elId);
      if (e) e.textContent = s > 0 ? `Avanzando en ${s}s…` : '';
      if (s <= 0) { clearInterval(iv); onDone(); }
    }, 1000);
  }

  function getSelections() { return { bomba: bombaTeam, challenge: challengeTeam }; }
  function reset() { bombaTeam = null; challengeTeam = null; }

  return { initBomba, initChallenge, spinBomba, spinChallenge, getSelections, reset };
})();

/* ============================================================
   8. CHALLENGE MANAGER — Tarjetas con volteo 3D
   ============================================================ */
const ChallengeManager = (() => {
  let selectedType = null;

  function renderCards() {
    const container = document.getElementById('challengeCards');
    const types = [...KB.challengeTypes].sort(() => Math.random() - .5);
    container.innerHTML = types.map((t, i) => `
      <div class="challenge-card" id="chCard${i}" onclick="ChallengeManager.selectCard(${i},'${t.id}')">
        <div class="challenge-card-inner">
          <div class="challenge-card-front">🎴 <span>Tap para revelar</span></div>
          <div class="challenge-card-back">
            <div class="ch-icon">${t.icon}</div>
            <div class="ch-name">${t.name}</div>
            <div class="ch-desc">${t.desc}</div>
          </div>
        </div>
      </div>`).join('');
    selectedType = null;
  }

  function selectCard(idx, typeId) {
    const card = document.getElementById(`chCard${idx}`);
    if (card.classList.contains('selected')) return;

    // ── EFECTO DRAMÁTICO: voltear rápidamente TODAS las cartas antes de revelar la elegida ──
    const allCards = document.querySelectorAll('.challenge-card');
    selectedType = typeId;

    // Fase 1: Barajeo rápido — todas las cartas se sacuden
    allCards.forEach(c => c.classList.add('shuffling'));

    // Fase 2 (tras 1.5s): Las no seleccionadas se ocultan, la elegida se voltea con brillo
    setTimeout(() => {
      allCards.forEach(c => c.classList.remove('shuffling'));
      allCards.forEach((c, i) => {
        if (i === idx) {
          c.classList.add('flipped', 'selected', 'reveal-glow');
        } else {
          c.classList.add('dimmed');
        }
      });

      const t = KB.challengeTypes.find(x => x.id === typeId);

      // Mostrar countdown
      const back = card.querySelector('.challenge-card-back');
      if (back) {
        const cd = document.createElement('div');
        cd.className = 'ch-countdown';
        cd.id = 'cdCard';
        cd.textContent = 'Comenzando en 7s…';
        back.appendChild(cd);
      }

      Toast.show(`${t.icon} ¡Desafío seleccionado: ${t.name}!`, 'success', 6500);
      SoundManager.success();

      let s = 7;
      const iv = setInterval(() => {
        s--;
        const e = document.getElementById('cdCard');
        if (e) e.textContent = s > 0 ? `Comenzando en ${s}s…` : '';
        if (s <= 0) { clearInterval(iv); App.goToStep(4); }
      }, 1000);
    }, 1500);
  }  function getSelected() { return selectedType; }
  function reset() { selectedType = null; }

  return { renderCards, selectCard, getSelected, reset };
})();

/* ============================================================
   9. JUEGOS — Continuos + reportan estadísticas al panel
   ============================================================ */

/* Utilidad compartida: actualiza el marcador de progreso en el panel moderador */
function _reportStats(label, completed, total) {
  const el = document.getElementById('modGameStats');
  if (el) el.innerHTML =
    `<span class="stats-icon">📊</span> ${label}: <strong>${completed}</strong> completadas` +
    (total ? ` de ${total}` : '');
}

/* ─── 9a. PREGUNTAS ─── */
class QuestionGame {
  constructor(container) {
    this.container  = container;
    this._pool      = [...KB.questions].sort(() => Math.random() - .5);
    this._used      = new Set();
    this._completed = 0;   // cuántas preguntas respondidas en esta sesión
    this.round      = 0;
    this._next();
  }

  _next() {
    let q = this._pool.find(x => !this._used.has(x));
    if (!q) { this._used.clear(); q = this._pool[0]; }
    this._used.add(q);
    this.current = q;
    this.round++;
    this.answered = false;
    _reportStats('Preguntas respondidas', this._completed, null);
    this._render();
  }

  _render() {
    const q = this.current;
    const shuffled = q.opts.map((o, i) => ({ text: o, orig: i })).sort(() => Math.random() - .5);
    this._correctIdx = shuffled.findIndex(x => x.orig === q.correct);
    this.container.innerHTML = `
      <div class="question-game">
        <div class="question-counter">
          Pregunta #${this.round} — ${q.source}
          <span class="game-progress-badge">✅ ${this._completed} respondidas</span>
        </div>
        <div class="question-text">${q.q}</div>
        <div class="question-options">
          ${shuffled.map((o, i) => `
            <button class="option-btn" id="qOpt${i}" onclick="window._qGame.answer(${i})">
              ${String.fromCharCode(65 + i)}) ${o.text}
            </button>`).join('')}
        </div>
        <div id="qFeedback" class="hidden"></div>
        <div class="question-nav">
          <button class="btn-secondary hidden" id="nextQBtn" onclick="window._qGame._next()">
            Siguiente pregunta →
          </button>
        </div>
      </div>`;
    window._qGame = this;
  }

  answer(idx) {
    if (this.answered) return;
    this.answered = true;
    this._completed++;
    _reportStats('Preguntas respondidas', this._completed, null);
    const btns = this.container.querySelectorAll('.option-btn');
    btns.forEach(b => (b.disabled = true));
    const fb = document.getElementById('qFeedback');
    if (idx === this._correctIdx) {
      btns[idx].classList.add('correct');
      fb.className = 'question-feedback feedback-correct';
      fb.textContent = '✅ ¡Correcto!';
    } else {
      btns[idx].classList.add('wrong');
      btns[this._correctIdx].classList.add('correct');
      fb.className = 'question-feedback feedback-wrong';
      fb.textContent = `❌ Incorrecto. Era: ${this.current.opts[this.current.correct]}`;
    }
    fb.classList.remove('hidden');
    // Actualizar badge sin re-render completo
    const badge = this.container.querySelector('.game-progress-badge');
    if (badge) badge.textContent = `✅ ${this._completed} respondidas`;
    document.getElementById('nextQBtn').classList.remove('hidden');
  }
}

/* ─── 9b. AHORCADO ─── */
class HangmanGame {
  constructor(container) {
    this.container  = container;
    this._pool      = [...KB.hangmanWords].sort(() => Math.random() - .5);
    this._used      = new Set();
    this._maxErrors = 6;
    this._figures   = ['😐','😟','😨','😰','😱','🥵','💀'];
    this._won       = 0;   // palabras adivinadas
    this._lost      = 0;   // palabras fallidas
    this._newWord();
  }

  _newWord() {
    let w = this._pool.find(x => !this._used.has(x.word));
    if (!w) { this._used.clear(); w = this._pool[0]; }
    this._used.add(w.word);
    this._data    = w;
    this._word    = w.word.toUpperCase();
    this._guessed = new Set();
    this._errors  = 0;
    _reportStats(`Ahorcado — ✅ ${this._won} adivinadas / ❌ ${this._lost} fallidas`, this._won + this._lost, null);
    this._render();
    window._hangman = this;
  }

  _render() {
    const won  = [...this._word].every(c => this._guessed.has(c));
    const lost = this._errors >= this._maxErrors;
    const wordHTML = [...this._word].map(c =>
      `<div class="letter-box ${this._guessed.has(c) ? 'revealed' : ''}">${this._guessed.has(c) ? c : '&nbsp;'}</div>`
    ).join('');
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    this.container.innerHTML = `
      <div class="hangman-game">
        <div class="hangman-scoreline">
          <span class="game-progress-badge">✅ ${this._won} adivinadas &nbsp;❌ ${this._lost} fallidas</span>
        </div>
        <div class="hangman-figure">${this._figures[this._errors]}</div>
        <div class="error-counter">Errores: ${this._errors}/${this._maxErrors}</div>
        <div class="hangman-word">${wordHTML}</div>
        <div class="hangman-hint">💡 ${this._data.hint}</div>
        ${won ? `<div class="question-feedback feedback-correct">
                   🎉 ¡Correcto! La palabra era <strong>${this._word}</strong>
                   <button class="btn-primary" style="margin-top:.5rem" onclick="window._hangman._finishWord(true)">
                     Siguiente palabra →
                   </button>
                 </div>` : ''}
        ${lost ? `<div class="question-feedback feedback-wrong">
                    💀 La palabra era <strong>${this._word}</strong>
                    <button class="btn-secondary" style="margin-top:.5rem" onclick="window._hangman._finishWord(false)">
                      Siguiente →
                    </button>
                  </div>` : ''}
        ${!won && !lost ? `
          <div class="hangman-keyboard">
            ${letters.map(l => `
              <button class="key-btn ${this._guessed.has(l) ? (this._word.includes(l) ? 'used-correct' : 'used-wrong') : ''}"
                      ${this._guessed.has(l) ? 'disabled' : ''}
                      onclick="window._hangman._guess('${l}')">${l}</button>`).join('')}
          </div>` : ''}
      </div>`;
  }

  _guess(letter) {
    if (this._guessed.has(letter)) return;
    this._guessed.add(letter);
    if (!this._word.includes(letter)) this._errors++;
    this._render();
  }

  _finishWord(wasCorrect) {
    if (wasCorrect) this._won++; else this._lost++;
    _reportStats(`Ahorcado — ✅ ${this._won} adivinadas / ❌ ${this._lost} fallidas`, this._won + this._lost, null);
    this._newWord();
  }
}

/* ─── 9c. PAREJAS / MEMORY ─── */
class MemoryGame {
  constructor(container) {
    this.container   = container;
    this._allPairs   = [...KB.memoryPairs];
    this._pairCount  = 6;
    this._roundNum   = 0;
    this._totalPairs = 0;  // total de parejas encontradas entre todos los tableros
    this._newBoard();
  }

  _newBoard() {
    this._roundNum++;
    this._pairs   = [...this._allPairs].sort(() => Math.random() - .5).slice(0, this._pairCount);
    this._cards   = this._buildCards();
    this._flipped = [];
    this._matched = new Set();
    this._moves   = 0;
    this._locked  = false;
    this._start   = Date.now();
    _reportStats(`Parejas — Tableros: ${this._roundNum - 1} completos · Parejas totales encontradas`, this._totalPairs, null);
    this._render();
    window._memGame = this;
  }

  _buildCards() {
    const cards = [];
    this._pairs.forEach((pair, pi) => {
      cards.push({ id:`p${pi}a`, pairId:pi, text:pair[0].label });
      cards.push({ id:`p${pi}b`, pairId:pi, text:pair[1].label });
    });
    return cards.sort(() => Math.random() - .5);
  }

  _render() {
    const elapsed = Math.floor((Date.now() - this._start) / 1000);
    const cols    = Math.min(4, Math.ceil(Math.sqrt(this._cards.length)));
    const done    = this._matched.size === this._cards.length;

    this.container.innerHTML = `
      <div class="memory-game">
        <div class="memory-stats">
          <span>Tablero #${this._roundNum}</span>
          <span>Movimientos: <strong>${this._moves}</strong></span>
          <span>Parejas: <strong>${this._matched.size/2}/${this._pairs.length}</strong></span>
          <span class="game-progress-badge">Total: ${this._totalPairs + this._matched.size/2} parejas</span>
        </div>
        <div class="memory-grid" style="grid-template-columns:repeat(${cols},minmax(90px,120px))">
          ${this._cards.map(c => `
            <div class="memory-card ${this._flipped.includes(c.id)||this._matched.has(c.id)?'flipped':''} ${this._matched.has(c.id)?'matched':''}"
                 id="mc_${c.id}" onclick="window._memGame._flip('${c.id}')">
              <div class="memory-card-inner">
                <div class="memory-card-front">🃏</div>
                <div class="memory-card-back">${c.text}</div>
              </div>
            </div>`).join('')}
        </div>
        ${done ? `<div class="question-feedback feedback-correct" style="margin-top:.75rem">
                    🎉 ¡Tablero #${this._roundNum} completo en ${this._moves} movimientos!
                    <button class="btn-primary" style="margin-top:.5rem" onclick="window._memGame._completeBoard()">
                      Nuevo tablero →
                    </button>
                  </div>` : ''}
      </div>`;
  }

  _flip(id) {
    if (this._locked || this._flipped.includes(id) || this._matched.has(id)) return;
    if (this._flipped.length >= 2) return;
    this._flipped.push(id);
    this._render();
    if (this._flipped.length === 2) {
      this._moves++;
      this._locked = true;
      const [a, b] = this._flipped.map(fid => this._cards.find(c => c.id === fid));
      if (a.pairId === b.pairId) {
        this._matched.add(a.id); this._matched.add(b.id);
        this._flipped = []; this._locked = false;
        this._render();
      } else {
        setTimeout(() => { this._flipped = []; this._locked = false; this._render(); }, 900);
      }
    }
  }

  _completeBoard() {
    this._totalPairs += this._pairs.length;
    _reportStats(`Parejas — Tableros: ${this._roundNum} completos · Parejas totales encontradas`, this._totalPairs, null);
    this._newBoard();
  }
}

/* ─── 9d. SECUENCIA ─── */
class SequenceGame {
  constructor(container) {
    this.container = container;
    this._pool     = [...KB.sequences].sort(() => Math.random() - .5);
    this._used     = new Set();
    this._dragIdx  = null;
    this._solved   = 0;   // secuencias resueltas correctamente
    this._attempts = 0;   // intentos totales
    this._newSeq();
  }

  _newSeq() {
    let s = this._pool.find(x => !this._used.has(x.title));
    if (!s) { this._used.clear(); s = this._pool[0]; }
    this._used.add(s.title);
    this._data    = s;
    this._items   = [...s.items].sort(() => Math.random() - .5);
    this._correct = s.items;
    this._checked = false;
    _reportStats(`Secuencias — ✅ ${this._solved} resueltas / ${this._attempts} intentos`, this._solved, null);
    this._render();
    window._seqGame = this;
  }

  _render() {
    const allOk = this._checked && this._items.every((item, i) => item === this._correct[i]);
    this.container.innerHTML = `
      <div class="sequence-game">
        <h3 style="font-weight:700;color:var(--accent2);margin-bottom:.25rem">${this._data.title}</h3>
        <p class="sequence-hint">${this._data.desc}</p>
        <div class="game-progress-badge" style="align-self:center;margin:.25rem 0">
          ✅ ${this._solved} resueltas · ${this._attempts} intentos
        </div>
        <div class="sequence-list" id="seqList">
          ${this._items.map((item, i) => `
            <div class="seq-item ${this._checked ? (item === this._correct[i] ? 'correct' : 'incorrect') : ''}"
                 draggable="true" id="si_${i}"
                 ondragstart="window._seqGame._dragStart(${i})"
                 ondragover="event.preventDefault();window._seqGame._dragOver(${i})"
                 ondrop="window._seqGame._drop(${i})"
                 ondragend="window._seqGame._dragEnd()">
              <span class="seq-handle">⠿</span>
              <span class="seq-num">${i + 1}</span>
              <span>${item}</span>
            </div>`).join('')}
        </div>
        <div style="display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap;margin-top:.5rem">
          ${!this._checked
            ? `<button class="btn-primary" onclick="window._seqGame._check()">✅ Verificar Orden</button>`
            : allOk
              ? `<button class="btn-secondary" onclick="window._seqGame._newSeq()">Nueva secuencia →</button>`
              : `<button class="btn-secondary" onclick="window._seqGame._reset()">🔄 Intentar de nuevo</button>
                 <button class="btn-primary" onclick="window._seqGame._newSeq()">Siguiente →</button>`}
        </div>
        ${this._checked ? `<div class="sequence-hint" style="margin-top:.4rem;color:var(--accent3)">
          Orden correcto: ${this._correct.join(' → ')}
        </div>` : ''}
      </div>`;
  }

  _dragStart(i) { this._dragIdx = i; document.getElementById(`si_${i}`)?.classList.add('dragging'); }
  _dragOver(i)  { if (i !== this._dragIdx) document.getElementById(`si_${i}`)?.classList.add('drag-over'); }
  _dragEnd()    { document.querySelectorAll('.seq-item').forEach(el => el.classList.remove('dragging','drag-over')); }
  _drop(i) {
    if (this._dragIdx === null || this._dragIdx === i) return;
    [this._items[this._dragIdx], this._items[i]] = [this._items[i], this._items[this._dragIdx]];
    this._dragIdx = null; this._checked = false; this._render();
  }
  _check() {
    this._checked = true;
    this._attempts++;
    const ok = this._items.every((item, i) => item === this._correct[i]);
    if (ok) this._solved++;
    _reportStats(`Secuencias — ✅ ${this._solved} resueltas / ${this._attempts} intentos`, this._solved, null);
    this._render();
    Toast.show(ok ? '🎉 ¡Orden correcto!' : '❌ Orden incorrecto, revisa el resultado', ok ? 'success' : 'error');
  }
  _reset() { this._items = [...this._data.items].sort(() => Math.random() - .5); this._checked = false; this._render(); }
}

/* ============================================================
   10. MODERATOR PANEL — 2 Fases por ronda (sin cronómetro)
   ============================================================
   Lógica de ronda:
   FASE 1: equipoA infla bomba, equipoB responde desafío
   → moderador presiona "💥 BOMBA EXPLOTÓ"
   FASE 2: roles invertidos — equipoB infla bomba, equipoA responde
   → cuando el moderador termina la FASE 2 → abre modal ganador
   ============================================================ */
const ModeratorPanel = (() => {
  let currentRound  = 1;
  let phase         = 0;        // 1 o 2
  let roundBomba    = null;     // equipo que infla en FASE 1
  let roundChallenge= null;     // equipo que responde en FASE 1
  let challengeType = null;
  let activeGame    = null;

  /* ── Helpers UI ── */
  function _upd(fields) {
    Object.entries(fields).forEach(([id, val]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    });
  }

  function _setStatus(s) {
    const el = document.getElementById('modStatus');
    if (!el) return;
    const map   = { waiting:'status-waiting', active:'status-active', paused:'status-paused', finished:'status-finished' };
    const label = { waiting:'En espera', active:'Activa', paused:'Pausada', finished:'Finalizada' };
    el.className = `status-badge ${map[s] || 'status-waiting'}`;
    el.textContent = label[s] || s;
  }

  function _updatePhaseIndicator() {
    const badge = document.getElementById('phaseBadge');
    const teams = document.getElementById('phaseTeams');
    if (!badge || !teams) return;

    const bombaEq     = phase === 1 ? roundBomba     : roundChallenge;
    const challengeEq = phase === 1 ? roundChallenge : roundBomba;

    badge.textContent = `FASE ${phase}`;
    badge.className   = `phase-badge phase-${phase}`;
    teams.innerHTML = `
      <span><span class="role-label">💣 Infla: </span><span class="team-role">${bombaEq}</span></span>
      <span style="color:var(--border)">|</span>
      <span><span class="role-label">🎯 Responde: </span><span class="team-role">${challengeEq}</span></span>`;
  }

  function _launchGame() {
    const area = document.getElementById('activeGameArea');
    if (!area) return;
    if      (challengeType === 'questions') activeGame = new QuestionGame(area);
    else if (challengeType === 'hangman')   activeGame = new HangmanGame(area);
    else if (challengeType === 'memory')    activeGame = new MemoryGame(area);
    else if (challengeType === 'sequence')  activeGame = new SequenceGame(area);
  }

  /* ── INICIAR RONDA (Fase 1) ── */
  function startRound() {
    const sel = WheelManager.getSelections();
    challengeType = ChallengeManager.getSelected();
    roundBomba    = sel.bomba;
    roundChallenge= sel.challenge;
    phase = 1;

    // Actualizar resúmenes UI
    document.getElementById('summaryBomba').textContent      = roundBomba;
    document.getElementById('summaryChallenge').textContent  = roundChallenge;
    document.getElementById('summaryChallengetype').textContent =
      KB.challengeTypes.find(t => t.id === challengeType)?.name || challengeType;

    const typeName = KB.challengeTypes.find(t => t.id === challengeType)?.name || challengeType;
    _upd({ modRound: currentRound, modBomba: roundBomba, modChallenge: roundChallenge,
           modDesafio: typeName, modFase: 'Fase 1 de 2' });
    _setStatus('active');
    document.getElementById('currentRoundBadge').textContent = currentRound;

    // Ocultar banner fase 2 y resetear botón
    document.getElementById('phase2Indicator')?.classList.add('hidden');
    const btnBomb = document.getElementById('btnBombExplode');
    if (btnBomb) {
      btnBomb.disabled = false;
      btnBomb.textContent = '💥 ¡BOMBA EXPLOTÓ!';
      btnBomb.style.background = '';
      btnBomb.style.animation = '';
    }

    App.goToStep(5);
    _updatePhaseIndicator();
    _launchGame();
    SoundManager.startTicking();
  }

  /* ── BOMBA EXPLOTÓ → Fase 2 (roles invertidos) ── */
  function bombExploded() {
    if (phase === 2) {
      // Ya estamos en fase 2 — la segunda bomba explotó → terminar ronda
      SoundManager.stopTicking();
      SoundManager.explosion();
      _flashExplosion();
      Toast.show('💥 ¡Segunda bomba explotó! Ambas fases completadas.', 'error', 3500);
      _upd({ modFase: '✅ Ambas fases completadas' });
      _setStatus('finished');
      // Cambiar botón a deshabilitado
      const btn = document.getElementById('btnBombExplode');
      if (btn) { btn.disabled = true; btn.textContent = '✅ Ronda Completa'; btn.style.animation = 'none'; }
      return;
    }

    if (phase !== 1) return;
    phase = 2;

    SoundManager.stopTicking();
    SoundManager.explosion();
    _flashExplosion();

    Toast.show('💥 ¡BOMBA EXPLOTÓ! Cambiando roles para Fase 2…', 'error', 4000);

    // Mostrar banner de fase 2
    const banner = document.getElementById('phase2Indicator');
    const desc   = document.getElementById('phase2Desc');
    if (banner && desc) {
      desc.textContent = `Ahora: ${roundChallenge} infla la bomba · ${roundBomba} responde`;
      banner.classList.remove('hidden');
    }

    // Cambiar el botón de bomba para fase 2
    const btn = document.getElementById('btnBombExplode');
    if (btn) {
      btn.textContent = '💥 ¡SEGUNDA BOMBA EXPLOTÓ!';
      btn.style.background = 'linear-gradient(135deg, #7c3aed, #4c1d95)';
    }

    _upd({ modFase: 'Fase 2 de 2 (roles invertidos)' });
    _updatePhaseIndicator();

    // Mostrar pantalla intermedia con botón START en vez de arrancar directo
    const area = document.getElementById('activeGameArea');
    if (area) {
      area.innerHTML = `
        <div class="phase2-start-screen">
          <div class="phase2-start-icon">🔄</div>
          <h3>¡Roles Invertidos!</h3>
          <p><strong>${roundChallenge}</strong> ahora infla la bomba</p>
          <p><strong>${roundBomba}</strong> ahora responde el desafío</p>
          <p class="phase2-start-hint">Presiona INICIAR cuando la bomba esté lista</p>
          <button class="btn-primary btn-large btn-glow" onclick="ModeratorPanel.startPhase2()">
            🚀 INICIAR FASE 2
          </button>
        </div>`;
    }
  }

  /* ── INICIAR FASE 2 (llamado desde el botón) ── */
  function startPhase2() {
    _launchGame();
    SoundManager.startTicking(true);
    Toast.show('🎯 ¡Fase 2 en juego! Tic-tac acelerado…', 'info', 2500);
  }

  function _flashExplosion() {
    const flash = document.createElement('div');
    flash.style.cssText = `position:fixed;inset:0;background:rgba(239,68,68,.35);
      z-index:9990;pointer-events:none;animation:flashOut .6s ease forwards`;
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 700);
  }

  /* ── FINALIZAR RONDA ── */
  function finishRound() {
    SoundManager.stopTicking();
    _setStatus('finished');
    App.openWinnerModal();
  }

  /* ── SIGUIENTE RONDA ── */
  function nextRound() {
    currentRound++;
    phase = 0;
    _upd({ modRound: currentRound, modBomba:'—', modChallenge:'—', modDesafio:'—', modFase:'—' });
    _setStatus('waiting');
    document.getElementById('currentRoundBadge').textContent = currentRound;
    document.getElementById('phase2Indicator')?.classList.add('hidden');
    _resetBombButton();
    const gs = document.getElementById('modGameStats');
    if (gs) gs.textContent = '—';
  }

  /* ── RESET COMPLETO ── */
  function reset() {
    SoundManager.stopTicking();
    currentRound = 1; phase = 0;
    roundBomba = null; roundChallenge = null; challengeType = null; activeGame = null;
    _upd({ modRound:1, modBomba:'—', modChallenge:'—', modDesafio:'—', modFase:'—' });
    _setStatus('waiting');
    document.getElementById('currentRoundBadge').textContent = 1;
    document.getElementById('phase2Indicator')?.classList.add('hidden');
    _resetBombButton();
    const gs = document.getElementById('modGameStats');
    if (gs) gs.textContent = '—';
  }

  function _resetBombButton() {
    const btn = document.getElementById('btnBombExplode');
    if (btn) {
      btn.disabled = false;
      btn.textContent = '💥 ¡BOMBA EXPLOTÓ!';
      btn.style.background = '';
      btn.style.animation = '';
    }
  }

  function getRound()    { return currentRound; }
  function getPhase()    { return phase; }
  function getTeams()    { return { bomba: roundBomba, challenge: roundChallenge }; }

  return { startRound, bombExploded, startPhase2, finishRound, nextRound, reset, getRound, getPhase, getTeams };
})();

/* ============================================================
   11. TOAST NOTIFICATIONS
   ============================================================ */
const Toast = (() => {
  const icons = { success:'✅', error:'💥', info:'ℹ️' };
  function show(msg, type = 'info', duration = 3500) {
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `<span>${icons[type]||'ℹ️'}</span><span>${msg}</span>`;
    document.getElementById('toastContainer').appendChild(el);
    setTimeout(() => {
      el.style.animation = 'toastOut .3s ease forwards';
      setTimeout(() => el.remove(), 310);
    }, duration);
  }
  return { show };
})();

/* ============================================================
   12. APP — Controlador Principal
   ============================================================ */
const App = (() => {

  function init() {
    // Pantalla de carga
    setTimeout(() => {
      const ls = document.getElementById('loadingScreen');
      ls.style.transition = 'opacity .4s';
      ls.style.opacity = '0';
      setTimeout(() => {
        ls.classList.add('hidden');
        document.getElementById('app').classList.remove('hidden');
        _postInit();
      }, 420);
    }, 1800);
  }

  function _postInit() {
    Config.load();
    // Sincronizar estado de sonido
    const cfg = Config.get();
    SoundManager.setEnabled(cfg.sounds);
    const btnS = document.getElementById('btnSound');
    if (btnS) btnS.textContent = cfg.sounds ? '🔊' : '🔇';

    ScoreboardManager.init();
    HistoryManager.load();
    WheelManager.initBomba();
    _renderContentStats();
  }

  function _renderContentStats() {
    const el = document.getElementById('contentStats');
    if (el) el.textContent =
      `${KB.questions.length} preguntas · ${KB.hangmanWords.length} palabras · ` +
      `${KB.memoryPairs.length} pares · ${KB.sequences.length} secuencias`;
  }

  /* ── Navegación de pasos ── */
  function goToStep(n) {
    for (let i = 1; i <= 5; i++) {
      const el = document.getElementById(`step${i}`);
      if (!el) continue;
      el.classList.toggle('active-step', i === n);
      el.classList.toggle('hidden', i !== n);
    }
    if (n === 3) ChallengeManager.renderCards();
    if (n === 4) _fillStep4();
  }

  function _fillStep4() {
    const sel = WheelManager.getSelections();
    const type = KB.challengeTypes.find(t => t.id === ChallengeManager.getSelected());
    document.getElementById('summaryBomba').textContent         = sel.bomba || '—';
    document.getElementById('summaryChallenge').textContent     = sel.challenge || '—';
    document.getElementById('summaryChallengetype').textContent = type?.name || '—';
  }

  /* ── Nueva ronda ── */
  function newRound() {
    SoundManager.stopTicking();
    ModeratorPanel.nextRound();
    WheelManager.reset();
    ChallengeManager.reset();
    const b1 = document.getElementById('btnSpinBomba');
    const b2 = document.getElementById('btnSpinChallenge');
    if (b1) b1.disabled = false;
    if (b2) b2.disabled = false;
    document.getElementById('resultBomba')?.classList.add('hidden');
    document.getElementById('resultChallenge')?.classList.add('hidden');
    WheelManager.initBomba();
    goToStep(1);
    Toast.show('🔄 Nueva ronda lista', 'info');
  }

  /* ── Reiniciar campeonato ── */
  function resetChampionship() {
    openConfirm('¿Reiniciar el campeonato? Se eliminarán puntuaciones e historial.', () => {
      ScoreboardManager.reset();
      HistoryManager.reset();
      ModeratorPanel.reset();
      WheelManager.reset();
      ChallengeManager.reset();
      newRound();
      closeModal('modalConfirm');
      Toast.show('🗑️ Campeonato reiniciado', 'info');
    });
  }

  /* ── Modal ganador ── */
  function openWinnerModal() {
    const teams = Config.get().teams;
    const sel   = WheelManager.getSelections();
    const type  = KB.challengeTypes.find(t => t.id === ChallengeManager.getSelected());
    const phase = ModeratorPanel.getPhase();

    // Panel resumen de la ronda
    const panel = document.getElementById('roundSummaryPanel');
    if (panel) panel.innerHTML = `
      <div class="rsp-row"><span>Ronda</span><span>${ModeratorPanel.getRound()}</span></div>
      <div class="rsp-row"><span>Desafío</span><span>${type?.name || '—'}</span></div>
      <div class="rsp-row"><span>Fases completadas</span><span>${phase === 2 ? '✅ Ambas fases' : '⚠️ Solo Fase 1'}</span></div>
      <div class="rsp-row"><span>💣 Equipo Bomba (F1)</span><span>${sel.bomba || '—'}</span></div>
      <div class="rsp-row"><span>🎯 Equipo Challenge (F1)</span><span>${sel.challenge || '—'}</span></div>`;

    // Selector equipos
    const select = document.getElementById('winnerTeam');
    select.innerHTML = teams.map(t => `<option value="${t}">${t}</option>`).join('');
    if (sel.challenge) select.value = sel.challenge;

    document.getElementById('winnerPoints').value = 1;
    document.getElementById('winnerNotes').value  = '';
    document.querySelectorAll('.pts-btn').forEach((b, i) => b.classList.toggle('selected', i === 0));

    document.getElementById('modalWinner').classList.remove('hidden');
  }

  function selectPoints(pts) {
    document.getElementById('winnerPoints').value = pts;
    document.querySelectorAll('.pts-btn').forEach(b =>
      b.classList.toggle('selected', parseInt(b.textContent) === pts));
  }

  function saveWinner() {
    const team  = document.getElementById('winnerTeam').value;
    const pts   = parseInt(document.getElementById('winnerPoints').value) || 1;
    const notes = document.getElementById('winnerNotes').value.trim();
    const sel   = WheelManager.getSelections();
    const type  = KB.challengeTypes.find(t => t.id === ChallengeManager.getSelected());

    ScoreboardManager.addPoints(team, pts);
    HistoryManager.add({
      round: ModeratorPanel.getRound(),
      bomba: sel.bomba || '—', challenge: sel.challenge || '—',
      type: type?.name || '—', winner: team, points: pts, notes
    });
    closeModal('modalWinner');
    Toast.show(`🏆 ${team} +${pts} puntos`, 'success');
  }

  /* ── Configuración ── */
  function openConfig() {
    const cfg = Config.get();
    document.getElementById('configTeam1').value    = cfg.teams[0] || '';
    document.getElementById('configTeam2').value    = cfg.teams[1] || '';
    document.getElementById('configTeam3').value    = cfg.teams[2] || '';
    document.getElementById('configTheme').value    = cfg.theme;
    document.getElementById('configSounds').checked = cfg.sounds;
    document.getElementById('modalConfig').classList.remove('hidden');
  }

  function saveConfig() {
    const t1 = document.getElementById('configTeam1').value.trim() || 'Equipo 1';
    const t2 = document.getElementById('configTeam2').value.trim() || 'Equipo 2';
    const t3 = document.getElementById('configTeam3').value.trim() || 'Equipo 3';
    const theme  = document.getElementById('configTheme').value;
    const sounds = document.getElementById('configSounds').checked;
    Config.save({ teams:[t1,t2,t3], theme, sounds });
    SoundManager.setEnabled(sounds);
    document.getElementById('btnSound').textContent = sounds ? '🔊' : '🔇';
    ScoreboardManager.syncTeams();
    closeModal('modalConfig');
    Toast.show('✅ Configuración guardada', 'success');
  }

  function resetConfig() {
    Config.reset();
    SoundManager.setEnabled(true);
    document.getElementById('btnSound').textContent = '🔊';
    ScoreboardManager.syncTeams();
    closeModal('modalConfig');
    Toast.show('🔄 Configuración restablecida', 'info');
  }

  /* ── Confirm ── */
  function openConfirm(msg, cb) {
    document.getElementById('confirmMessage').textContent = msg;
    document.getElementById('confirmBtn').onclick = cb;
    document.getElementById('modalConfirm').classList.remove('hidden');
  }

  function closeModal(id) { document.getElementById(id)?.classList.add('hidden'); }

  /* ── Exportar ── */
  function exportResults() {
    const data = {
      exportDate: new Date().toISOString(),
      config: Config.get(),
      scores: ScoreboardManager.getScores(),
      history: HistoryManager.getAll()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type:'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = Object.assign(document.createElement('a'), { href:url,
      download:`bomba-conocimiento-${new Date().toLocaleDateString('es-CO').replace(/\//g,'-')}.json` });
    a.click();
    URL.revokeObjectURL(url);
    Toast.show('📥 Resultados exportados', 'success');
  }

  /* ── Cerrar modales al click fuera ── */
  document.addEventListener('click', e => {
    ['modalWinner','modalConfig','modalConfirm'].forEach(id => {
      const el = document.getElementById(id);
      if (el && e.target === el) el.classList.add('hidden');
    });
  });

  return {
    init, goToStep, newRound, resetChampionship,
    openWinnerModal, selectPoints, saveWinner,
    openConfig, saveConfig, resetConfig,
    openConfirm, closeModal, exportResults
  };
})();

/* ============================================================
   13. CSS DINÁMICO — animación flash explosión
   ============================================================ */
const _style = document.createElement('style');
_style.textContent = `@keyframes flashOut { 0%{opacity:1} 100%{opacity:0} }`;
document.head.appendChild(_style);

/* ============================================================
   14. ARRANQUE
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => App.init());
