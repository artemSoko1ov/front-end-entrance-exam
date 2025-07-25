document.querySelectorAll('[contenteditable][data-id]').forEach(el => {
  const id = el.dataset.id;
  const saved = localStorage.getItem(id);
  if (saved) el.innerText = saved;

  el.addEventListener('input', () => {
    el.classList.add('animated-change');
    localStorage.setItem(id, el.innerText.trim());

    // Удаляем класс после окончания анимации, чтобы можно было повторить
    el.addEventListener('animationend', () => {
      el.classList.remove('animated-change');
    }, { once: true });
  });
});