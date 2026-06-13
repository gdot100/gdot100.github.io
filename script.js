const toggle = document.getElementById('themeToggle');
const html = document.documentElement;

const saved = localStorage.getItem('theme');
if (saved) html.setAttribute('data-theme', saved);

toggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-card, .project-card, .about-content, .contact-text').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Calculator
let calcExpr = '';
const calcDisplay = document.getElementById('calcDisplay');

function calcInput(val) {
  calcExpr += val;
  calcDisplay.textContent = calcExpr;
}

function calcClear() {
  calcExpr = '';
  calcDisplay.textContent = '0';
}

function calcBackspace() {
  calcExpr = calcExpr.slice(0, -1);
  calcDisplay.textContent = calcExpr || '0';
}

function calcEquals() {
  try {
    const result = Function('"use strict";return (' + calcExpr + ')')();
    calcDisplay.textContent = result;
    calcExpr = String(result);
  } catch {
    calcDisplay.textContent = 'Error';
    calcExpr = '';
  }
}

// Todo
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const todoEmpty = document.getElementById('todoEmpty');

function updateTodoEmpty() {
  todoEmpty.style.display = todoList.children.length ? 'none' : 'block';
}

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (!text) return;

  const li = document.createElement('li');
  li.innerHTML = `<span class="todo-text">${text}</span><button class="todo-del">&times;</button>`;

  li.querySelector('.todo-text').addEventListener('click', () => {
    li.classList.toggle('done');
  });

  li.querySelector('.todo-del').addEventListener('click', () => {
    li.remove();
    updateTodoEmpty();
  });

  todoList.appendChild(li);
  todoInput.value = '';
  updateTodoEmpty();
});

// Color Palette
function generatePalette() {
  const palette = document.getElementById('colorPalette');
  palette.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    const hue = Math.floor(Math.random() * 360);
    const sat = 50 + Math.floor(Math.random() * 40);
    const light = 40 + Math.floor(Math.random() * 30);
    const hex = hslToHex(hue, sat, light);

    const swatch = document.createElement('div');
    swatch.className = 'color-swatch';
    swatch.style.background = hex;
    swatch.title = hex;
    swatch.addEventListener('click', () => {
      navigator.clipboard.writeText(hex).then(() => {
        swatch.style.outline = '2px solid var(--accent)';
        setTimeout(() => swatch.style.outline = 'none', 600);
      });
    });
    palette.appendChild(swatch);
  }
}

function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

generatePalette();
