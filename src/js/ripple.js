document.querySelectorAll('.ripple').forEach(el => {
    el.style.position = 'relative';
    el.style.overflow = 'hidden';

    el.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');

        const rect = el.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size * 2}px`;

        const x = e.clientX - rect.left - size;
        const y = e.clientY - rect.top - size;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        el.appendChild(ripple);

        ripple.addEventListener('animationend', () => ripple.remove());
    });
});
