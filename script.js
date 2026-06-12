// ── STATE ──
const INCOME = 120000;
let transactions = [
  { desc: 'transport', amount: 200 },
  { desc: 'food', amount: -50 },
  { desc: 'petrol', amount: 5000 },
  { desc: 'vegetables', amount: -1500 },
];

const today = new Date();
let selectedDay = today.getDate();
let windowStart = selectedDay - 2; // keeps selected day centered

// ── CAROUSEL ──
function buildCarousel() {
  const track = document.getElementById('carousel-track');
  track.innerHTML = '';

  const month = today.toLocaleString('default', { month: 'long' });
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  for (let i = 0; i < 5; i++) {
    let d = windowStart + i;
    if (d < 1) d = daysInMonth + d;
    if (d > daysInMonth) d = d - daysInMonth;

    const btn = document.createElement('button');
    btn.className = 'day-btn' + (d === selectedDay ? ' active' : '');
    btn.textContent = d;
    btn.addEventListener('click', () => {
      selectedDay = d;
      buildCarousel();
    });
    track.appendChild(btn);
  }

  document.getElementById('month-label').textContent = month;
}

document.getElementById('prev-week').addEventListener('click', () => {
  windowStart -= 1;
  buildCarousel();
});

document.getElementById('next-week').addEventListener('click', () => {
  windowStart += 1;
  buildCarousel();
});

// ── RENDER ──
function renderAll() {
  const list = document.getElementById('history-list');
  list.innerHTML = '';

  transactions.forEach(t => {
    const item = document.createElement('div');
    item.className = 'history-item';
    const positive = t.amount >= 0;
    item.innerHTML = `
      <span class="desc">${t.desc}</span>
      <span class="amount ${positive ? 'positive' : 'negative'}">
        ${positive ? '+' : ''}${t.amount.toLocaleString()}
      </span>`;
    list.appendChild(item);
  });

  const total   = transactions.reduce((s, t) => s + t.amount, 0);
  const balance = INCOME + total;

  document.getElementById('income-display').textContent  = `Income: Rs.${INCOME.toLocaleString()}`;
  document.getElementById('balance-display').textContent = `Balance: Rs.${balance.toLocaleString()}`;
  document.getElementById('history-total').textContent   = `Rs.${total.toLocaleString()}`;
}

// ── ADD ──
document.getElementById('add-btn').addEventListener('click', () => {
  const amount = parseFloat(document.getElementById('amount-input').value);
  const desc   = document.getElementById('desc-input').value.trim();
  if (isNaN(amount) || !desc) return;
  transactions.push({ desc, amount: Math.abs(amount) });
  clearInputs();
  renderAll();
});

// ── REMOVE ──
document.getElementById('remove-btn').addEventListener('click', () => {
  const amount = parseFloat(document.getElementById('amount-input').value);
  const desc   = document.getElementById('desc-input').value.trim();
  if (isNaN(amount) || !desc) return;
  transactions.push({ desc, amount: -Math.abs(amount) });
  clearInputs();
  renderAll();
});

function clearInputs() {
  document.getElementById('amount-input').value = '';
  document.getElementById('desc-input').value   = '';
}

// ── INIT ──
buildCarousel();
renderAll();
