const header = document.querySelector('.site-header');
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  if (header) header.classList.toggle('scrolled', window.scrollY > 20);
});

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open menu');
  }));
}

document.querySelectorAll('[data-whatsapp]').forEach(button => {
  button.addEventListener('click', () => {
    const message = button.dataset.message || 'Hello Tidyhaul, I would like to request a quote for your cleaning services.';
    window.open(`https://wa.me/2349167689657?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  });
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  revealItems.forEach(element => revealObserver.observe(element));
} else {
  revealItems.forEach(element => element.classList.add('visible'));
}


const form = document.querySelector('#contactForm');

if (form) {
  // Preselect a service when a visitor follows a service-specific link.
  const serviceSelect = form.querySelector('[name="service-required"]');
  const requestedService = new URLSearchParams(window.location.search).get('service');

  if (serviceSelect && requestedService) {
    const matchingOption = Array.from(serviceSelect.options).find(
      option => option.text.toLowerCase() === requestedService.toLowerCase()
    );

    if (matchingOption) {
      serviceSelect.value = matchingOption.value;
    }
  }

  // Send quote enquiries directly through WhatsApp.
  form.addEventListener('submit', event => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const values = new FormData(form);

    const lines = [
      'Hello Tidyhaul, I would like to request a cleaning quote.',
      `Full name: ${values.get('full-name') || ''}`,
      `Company / organisation: ${values.get('organisation') || 'Not provided'}`,
      `Email: ${values.get('email') || ''}`,
      `Phone: ${values.get('phone') || ''}`,
      `Facility location: ${values.get('facility-location') || ''}`,
      `Service required: ${values.get('service-required') || ''}`,
      `Number of branches / facilities: ${values.get('number-of-facilities') || 'Not provided'}`,
      `Cleaning frequency: ${values.get('cleaning-frequency') || ''}`,
      `Additional information: ${values.get('additional-information') || 'None'}`
    ];

    const whatsappUrl =
      `https://wa.me/2349167689657?text=${encodeURIComponent(lines.join('\n'))}`;

    window.location.href = whatsappUrl;
  });
}

document.querySelectorAll('[data-year]').forEach(element => {
  element.textContent = new Date().getFullYear();
});
