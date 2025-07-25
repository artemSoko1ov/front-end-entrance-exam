document.querySelectorAll('[contenteditable][data-id]').forEach(el => {
  const id = el.dataset.id;
  const saved = localStorage.getItem(id);
  if (saved) el.innerText = saved;

  el.addEventListener('input', () => {
    localStorage.setItem(id, el.innerText.trim());
  });
});