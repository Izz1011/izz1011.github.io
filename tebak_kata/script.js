'use strict';

/* ===========================
   DATA – Clues & Answers
=========================== */
const ALL_QUESTIONS = [
  { clue: "Suara langkah kaki di lorong kosong saat tengah malam", answer: "HANTU" },
  { clue: "Senyuman seseorang yang menyembunyikan niat jahat", answer: "PSIKOPAT" },
  { clue: "Darah yang menetes di lantai tanpa sumber jelas", answer: "MISTERI" },
  { clue: "Perasaan diawasi padahal sendirian", answer: "PARANOIA" },
  { clue: "Sosok tanpa wajah di cermin", answer: "BAYANGAN" },
  { clue: "Pembunuhan berantai tanpa motif jelas", answer: "SERIAL KILLER" },
  { clue: "Tawa kecil di balik pintu terkunci", answer: "TEROR" },
  { clue: "Pikiran yang memanipulasi kenyataan", answer: "ILUSI" },
  { clue: "Ketakutan tanpa sebab yang rasional", answer: "FOBIA" },
  { clue: "Suara bisikan yang hanya kamu dengar", answer: "HALUSINASI" },
  { clue: "Rumah kosong penuh kejadian aneh", answer: "ANGKER" },
  { clue: "Keinginan menyakiti tanpa rasa bersalah", answer: "SADISME" },
  { clue: "Orang yang hidup kembali setelah mati", answer: "ZOMBIE" },
  { clue: "Permainan pikiran yang membuat korban ragu realita", answer: "GASLIGHTING" },
  { clue: "Sosok tinggi kurus tanpa wajah", answer: "SLENDERMAN" },
  { clue: "Perasaan senang melihat penderitaan orang lain", answer: "CRUELTY" },
  { clue: "Bayangan yang bergerak sendiri", answer: "ENTITAS" },
  { clue: "Pembunuhan yang direncanakan dengan rapi", answer: "PREMEDITASI" },
  { clue: "Ketakutan akan gelap", answer: "NYCTOPHOBIA" },
  { clue: "Sosok yang muncul dalam mimpi buruk", answer: "NIGHTMARE" },
  { clue: "Pikiran gelap yang terus menghantui", answer: "OBSESI" },
  { clue: "Ruangan terkunci dengan rahasia mengerikan", answer: "BASEMENT" },
  { clue: "Tangan dingin menyentuh dari belakang", answer: "SPIRIT" },
  { clue: "Seseorang yang memiliki dua kepribadian", answer: "DISSOSIASI" },
  { clue: "Mata yang mengawasi dari kegelapan", answer: "PENGINTAI" },
  { clue: "Tubuh tanpa jiwa yang bergerak", answer: "MAYAT HIDUP" },
  { clue: "Perasaan bersalah yang berubah jadi kegilaan", answer: "GUILT" },
  { clue: "Suara jeritan dari tempat sepi", answer: "JERIT" },
  { clue: "Orang yang suka mengontrol orang lain", answer: "MANIPULATOR" },
  { clue: "Wajah yang berubah menjadi menyeramkan", answer: "DISTORSI" },
  { clue: "Rasa takut berlebihan terhadap sesuatu yang kecil", answer: "ANXIETY" },
  { clue: "Sosok hitam berdiri di ujung jalan", answer: "SILUET" },
  { clue: "Pikiran untuk menyakiti diri sendiri karena tekanan mental", answer: "DESPAIR" },
  { clue: "Bau busuk dari sesuatu yang tersembunyi", answer: "PEMBUSUKAN" },
  { clue: "Perasaan dingin tiba-tiba tanpa sebab", answer: "AURA" },
  { clue: "Orang yang berpura-pura baik demi tujuan jahat", answer: "HIPOKRIT" },
  { clue: "Bayangan mengikuti ke mana pun kamu pergi", answer: "SHADOW" },
  { clue: "Ketakutan yang terus menghantui masa lalu", answer: "TRAUMA" },
  { clue: "Sosok yang muncul hanya saat lampu mati", answer: "KEGELAPAN" },
  { clue: "Senyuman lebar yang tidak wajar", answer: "CREEPY" },
  { clue: "Perasaan tidak nyata terhadap dunia sekitar", answer: "DEREALISASI" },
  { clue: "Tawa keras di tengah kesunyian", answer: "MANIAK" },
  { clue: "Seseorang yang menikmati kekacauan", answer: "ANARKI" },
  { clue: "Tubuh yang bergerak tanpa kendali", answer: "POSSESSION" },
  { clue: "Suara detak jam yang terasa mengancam", answer: "TEGANG" },
  { clue: "Sosok yang meniru wajah orang lain", answer: "DOPPELGANGER" },
  { clue: "Ketakutan akan kematian yang berlebihan", answer: "THANATOPHOBIA" },
  { clue: "Pikiran jahat yang muncul tanpa kontrol", answer: "INTRUSIVE THOUGHT" },
  { clue: "Sosok yang bersembunyi di bawah tempat tidur", answer: "MONSTER" },
  { clue: "Tatapan kosong penuh niat jahat", answer: "VOID" },
];

const MAX_LIVES = 5;
const HEART_FULL   = '💔'; // broken heart display when lost
const HEART_ALIVE  = '❤️';
const KEYBOARD_ROWS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

/* ===========================
   STATE
=========================== */
let lives        = MAX_LIVES;
let score        = 0;
let guessed      = new Set();   // letters guessed this round
let wrongLetters = [];
let currentAnswer= '';
let currentClue  = '';
let remainingQs  = [];          // shuffled pool for this session

/* ===========================
   DOM REFS
=========================== */
const $hearts       = document.getElementById('hearts');
const $clueText     = document.getElementById('clueText');
const $letterSlots  = document.getElementById('letterSlots');
const $keyboard     = document.getElementById('keyboard');
const $wrongLetters = document.getElementById('wrongLetters');
const $scoreDisplay = document.getElementById('scoreDisplay');
const $overlayWin   = document.getElementById('overlayWin');
const $overlayLose  = document.getElementById('overlayLose');
const $overlayGO    = document.getElementById('overlayGameOver');
const $winMsg       = document.getElementById('winMsg');
const $loseMsg      = document.getElementById('loseMsg');
const $finalScore   = document.getElementById('finalScore');
const $btnNext      = document.getElementById('btnNext');
const $btnRetry     = document.getElementById('btnRetry');
const $btnRestart   = document.getElementById('btnRestart');

/* ===========================
   INIT
=========================== */
function init() {
  spawnBloodDrips();
  buildKeyboard();
  bindButtons();
  startNewSession();
}

function startNewSession() {
  lives = MAX_LIVES;
  score = 0;
  remainingQs = shuffle([...ALL_QUESTIONS]);
  updateScore();
  renderHearts();
  loadNextQuestion();
}

/* ===========================
   QUESTION MANAGEMENT
=========================== */
function loadNextQuestion() {
  if (remainingQs.length === 0) {
    remainingQs = shuffle([...ALL_QUESTIONS]); // refill when exhausted
  }
  const q = remainingQs.pop();
  currentClue   = q.clue;
  currentAnswer = q.answer.toUpperCase();
  guessed       = new Set();
  wrongLetters  = [];

  $clueText.textContent = currentClue;
  $wrongLetters.textContent = '';
  renderSlots();
  resetKeyboard();
  hideAllOverlays();
}

/* ===========================
   RENDERING
=========================== */
function renderHearts() {
  $hearts.innerHTML = '';
  for (let i = 0; i < MAX_LIVES; i++) {
    const span = document.createElement('span');
    span.className = 'heart' + (i >= lives ? ' broken' : '');
    span.textContent = i < lives ? '❤️' : '🖤';
    $hearts.appendChild(span);
  }
}

function renderSlots() {
  $letterSlots.innerHTML = '';
  // Split answer by spaces into word groups
  const words = currentAnswer.split(' ');
  words.forEach((word, wi) => {
    const group = document.createElement('div');
    group.className = 'slot-group';
    for (const ch of word) {
      const slot = document.createElement('div');
      slot.className = 'slot';
      slot.dataset.char = ch;
      if (guessed.has(ch)) {
        slot.textContent = ch;
        slot.classList.add('revealed');
      }
      group.appendChild(slot);
    }
    $letterSlots.appendChild(group);
    // Add a space placeholder between words
    if (wi < words.length - 1) {
      const sp = document.createElement('div');
      sp.className = 'slot space';
      $letterSlots.appendChild(sp);
    }
  });
}

function buildKeyboard() {
  $keyboard.innerHTML = '';
  KEYBOARD_ROWS.forEach(row => {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'key-row';
    for (const letter of row) {
      const btn = document.createElement('button');
      btn.className = 'key';
      btn.textContent = letter;
      btn.dataset.letter = letter;
      btn.addEventListener('click', () => handleGuess(letter));
      rowDiv.appendChild(btn);
    }
    $keyboard.appendChild(rowDiv);
  });
}

function resetKeyboard() {
  document.querySelectorAll('.key').forEach(btn => {
    btn.disabled = false;
    btn.classList.remove('correct', 'wrong');
  });
}

function updateScore() {
  $scoreDisplay.textContent = score;
}

/* ===========================
   GAME LOGIC
=========================== */
function handleGuess(letter) {
  if (guessed.has(letter)) return;
  guessed.add(letter);

  const btn = document.querySelector(`.key[data-letter="${letter}"]`);
  if (btn) btn.disabled = true;

  if (currentAnswer.includes(letter)) {
    // Correct
    if (btn) btn.classList.add('correct');
    revealLetters(letter);
    if (isWon()) onWin();
  } else {
    // Wrong
    if (btn) btn.classList.add('wrong');
    wrongLetters.push(letter);
    $wrongLetters.textContent = wrongLetters.join(' · ');
    lives--;
    renderHearts();
    shakeCard();
    if (lives <= 0) {
      setTimeout(onGameOver, 600);
    }
  }
}

function revealLetters(letter) {
  document.querySelectorAll(`.slot[data-char="${letter}"]`).forEach(slot => {
    slot.textContent = letter;
    slot.classList.add('revealed');
  });
}

function isWon() {
  for (const ch of currentAnswer) {
    if (ch !== ' ' && !guessed.has(ch)) return false;
  }
  return true;
}

function onWin() {
  const pointsEarned = 10 + (lives * 5);
  score += pointsEarned;
  updateScore();
  $winMsg.textContent = `Jawaban: "${currentAnswer}" — +${pointsEarned} poin!`;
  showOverlay($overlayWin);
}

function onGameOver() {
  $finalScore.textContent = score;
  showOverlay($overlayGO);
}

function shakeCard() {
  const card = document.getElementById('clueCard');
  card.classList.remove('shake');
  void card.offsetWidth; // reflow
  card.classList.add('shake');
}

/* ===========================
   KEYBOARD INPUT
=========================== */
document.addEventListener('keydown', e => {
  const letter = e.key.toUpperCase();
  if (/^[A-Z]$/.test(letter)) {
    const btn = document.querySelector(`.key[data-letter="${letter}"]`);
    if (btn && !btn.disabled) handleGuess(letter);
  }
});

/* ===========================
   OVERLAYS
=========================== */
function showOverlay(el) {
  hideAllOverlays();
  el.classList.add('active');
}

function hideAllOverlays() {
  [$overlayWin, $overlayLose, $overlayGO].forEach(o => o.classList.remove('active'));
}

function bindButtons() {
  $btnNext.addEventListener('click', () => {
    hideAllOverlays();
    loadNextQuestion();
  });
  $btnRetry.addEventListener('click', () => {
    hideAllOverlays();
    loadNextQuestion();
  });
  $btnRestart.addEventListener('click', () => {
    hideAllOverlays();
    startNewSession();
  });
}

/* ===========================
   BLOOD DRIPS
=========================== */
function spawnBloodDrips() {
  const container = document.getElementById('bloodDrips');
  const count = 18;
  for (let i = 0; i < count; i++) {
    const drip = document.createElement('div');
    drip.className = 'drip';
    const gap   = Math.random() * 60 + 20;
    const dur   = Math.random() * 4  + 3;
    const delay = Math.random() * 8;
    const h     = Math.random() * 80 + 30;
    const w     = Math.random() * 4 + 3;
    drip.style.cssText = `
      --drip-gap: ${gap}px;
      --drip-dur: ${dur}s;
      --drip-delay: ${delay}s;
      --drip-h: ${h}px;
      width: ${w}px;
      margin-right: ${gap}px;
    `;
    container.appendChild(drip);
  }
}

/* ===========================
   UTILITY
=========================== */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* ===========================
   START
=========================== */
init();
