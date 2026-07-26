const header = document.querySelector('[data-header]');
const nav = document.querySelector('[data-nav]');
const toggle = document.querySelector('[data-nav-toggle]');
const revealItems = document.querySelectorAll('.reveal');
const whatsappForm = document.querySelector('[data-whatsapp-form]');
const whatsappButtons = document.querySelectorAll('.whatsapp-float');

const whatsappMessages = {
  'criacao-de-sites.html': 'Olá! Conheci a Studio L4 pelo website e gostaria de conversar sobre criação ou reformulação de site.',
  'sistemas-personalizados.html': 'Olá! Conheci a Studio L4 pelo website e gostaria de conversar sobre um sistema personalizado.',
  'presenca-digital.html': 'Olá! Conheci a Studio L4 pelo website e gostaria de conversar sobre presença digital.',
  'inteligencia-artificial-automacao.html': 'Olá! Conheci a Studio L4 pelo website e gostaria de conversar sobre inteligência artificial e automação.',
  'projetos.html': 'Olá! Conheci a Studio L4 pelo website e gostaria de conversar sobre um projeto.',
  'sobre.html': 'Olá! Conheci a Studio L4 pelo website e gostaria de conversar sobre uma solução digital.',
  'contato.html': 'Olá! Conheci a Studio L4 pelo website e gostaria de conversar sobre um projeto.',
  'index.html': 'Olá! Conheci a Studio L4 pelo website e gostaria de conversar sobre um projeto.',
};

const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 12);
};

const getCurrentPage = () => {
  const page = window.location.pathname.split('/').pop();
  return page || 'index.html';
};

const setStatus = (element, message, type) => {
  if (!element) return;
  element.textContent = message;
  element.classList.toggle('is-error', type === 'error');
  element.classList.toggle('is-success', type === 'success');
};

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

whatsappButtons.forEach((button) => {
  const message = whatsappMessages[getCurrentPage()] || whatsappMessages['index.html'];
  button.href = `https://wa.me/5521984287457?text=${encodeURIComponent(message)}`;
});

if (toggle && nav) {
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
}

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

if (whatsappForm) {
  whatsappForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const status = whatsappForm.querySelector('[data-form-status]');
    const formData = new FormData(whatsappForm);
    const trap = String(formData.get('website') || '').trim();

    if (trap) {
      setStatus(status, 'Não foi possível enviar a mensagem. Tente novamente em alguns instantes.', 'error');
      return;
    }

    if (!whatsappForm.checkValidity()) {
      whatsappForm.reportValidity();
      setStatus(status, 'Preencha os campos obrigatórios e aceite a Política de Privacidade.', 'error');
      return;
    }

    const nome = String(formData.get('nome') || '').trim();
    const empresa = String(formData.get('empresa') || '').trim();
    const telefone = String(formData.get('telefone') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const servico = String(formData.get('servico') || '').trim();
    const mensagem = String(formData.get('mensagem') || '').trim();
    const text = [
      'Olá! Conheci a Studio L4 pelo website e gostaria de conversar sobre um projeto.',
      '',
      `Nome: ${nome}`,
      empresa ? `Empresa: ${empresa}` : '',
      `Telefone/WhatsApp: ${telefone}`,
      `E-mail: ${email}`,
      `Serviço de interesse: ${servico}`,
      `Mensagem: ${mensagem}`,
      '',
      'Aceitei a Política de Privacidade no formulário do website.',
    ].filter(Boolean).join('\n');

    setStatus(status, 'Abrindo WhatsApp com a mensagem preparada.', 'success');
    window.open(`https://wa.me/5521984287457?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  });
}
