const header = document.querySelector('[data-header]');
const nav = document.querySelector('[data-nav]');
const toggle = document.querySelector('[data-nav-toggle]');
const revealItems = document.querySelectorAll('.reveal');

const setHeaderState = () => {
  header.classList.toggle('is-scrolled', window.scrollY > 12);
};

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

toggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
const whatsappForm = document.querySelector('[data-whatsapp-form]');

if (whatsappForm) {
  whatsappForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(whatsappForm);
    const nome = String(formData.get('nome') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const projeto = String(formData.get('projeto') || '').trim();
    const message = [
      'Olá, Studio L4! Quero iniciar um projeto.',
      '',
      `Nome: ${nome}`,
      `E-mail: ${email}`,
      `Projeto: ${projeto}`,
    ].join('\n');

    const url = `https://wa.me/5521984287457?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener');
  });
}
