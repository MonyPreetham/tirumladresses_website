const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
  menuToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    document.querySelectorAll('.collection-card').forEach(card => {
      const categories = card.dataset.category.split(' ');
      const show = filter === 'all' || categories.includes(filter);
      card.classList.toggle('hidden', !show);
    });
  });
});

const modal = document.getElementById('quickModal');
const modalText = document.getElementById('modalText');
const modalClose = document.querySelector('.modal-close');
const modalBackdrop = document.querySelector('.modal-backdrop');

document.querySelectorAll('[data-modal]').forEach(trigger => {
  trigger.addEventListener('click', () => {
    modalText.textContent = trigger.dataset.modal;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  });
});

const closeModal = () => {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
};

modalClose?.addEventListener('click', closeModal);
modalBackdrop?.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

const testimonials = document.querySelectorAll('.testimonial');
let testimonialIndex = 0;
setInterval(() => {
  if (!testimonials.length) return;
  testimonials[testimonialIndex].classList.remove('active');
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  testimonials[testimonialIndex].classList.add('active');
}, 3500);

document.querySelector('.quote-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thank you! Your inquiry has been noted. Connect this form to email, Formspree, or WhatsApp next.');
});
