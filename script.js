const cursorGlow = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});

const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('boutique-theme');
if (savedTheme === 'dark') document.body.classList.add('dark');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('boutique-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');
mobileToggle.addEventListener('click', () => mobileMenu.classList.toggle('open'));
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    productCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hide', !match);
    });
  });
});

const quickViewModal = document.getElementById('quickViewModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('.quick-view').forEach(btn => {
  btn.addEventListener('click', () => {
    modalTitle.textContent = btn.dataset.title;
    modalDescription.textContent = btn.dataset.desc;
    quickViewModal.classList.add('open');
    quickViewModal.setAttribute('aria-hidden', 'false');
  });
});

function closeModal() {
  quickViewModal.classList.remove('open');
  quickViewModal.setAttribute('aria-hidden', 'true');
}
modalClose.addEventListener('click', closeModal);
quickViewModal.addEventListener('click', (e) => {
  if (e.target === quickViewModal) closeModal();
});

const suggestions = {
  festive: {
    elegant: 'Recommended: premium silk saree or pastel embroidered salwar with refined border work.',
    minimal: 'Recommended: soft-tone cotton silk kurta set with subtle finishing and lightweight dupatta.',
    luxury: 'Recommended: zari-detailed festive lehenga or handcrafted designer saree with boutique blouse styling.',
    vibrant: 'Recommended: bright festive anarkali with contrast dupatta and statement sleeve detailing.'
  },
  office: {
    elegant: 'Recommended: clean-cut formal kurti set in muted tones with tailored fit and easy movement.',
    minimal: 'Recommended: solid cotton co-ord or simple stitched office salwar set with soft texture.',
    luxury: 'Recommended: structured office ethnic fusion wear with premium fabric blend and signature finish.',
    vibrant: 'Recommended: printed workwear kurti set with polished color accents and breathable fabric.'
  },
  wedding: {
    elegant: 'Recommended: embroidered guest-wear saree with graceful drape and boutique fall finishing.',
    minimal: 'Recommended: understated wedding outfit in rich tone with elegant silhouette and delicate detailing.',
    luxury: 'Recommended: couture bridal or reception ensemble with premium embellishments and custom fitting.',
    vibrant: 'Recommended: bold lehenga or designer gown with standout festive colors and detailed craftsmanship.'
  },
  daily: {
    elegant: 'Recommended: soft daily wear cotton set with boutique neck patterns and comfortable fit.',
    minimal: 'Recommended: breathable pastel lounge or casual wear set with simple premium stitching.',
    luxury: 'Recommended: elevated daily wear with soft rayon blend, custom finishing, and polished tailoring.',
    vibrant: 'Recommended: cheerful printed cotton dress or kurti set for all-day comfort and color.'
  }
};

const occasionSelect = document.getElementById('occasionSelect');
const moodSelect = document.getElementById('moodSelect');
const suggestionBox = document.getElementById('suggestionBox');
document.getElementById('styleSuggestBtn').addEventListener('click', () => {
  const occasion = occasionSelect.value;
  const mood = moodSelect.value;
  suggestionBox.textContent = suggestions[occasion][mood];
});

const testimonials = [
  {
    quote: '“The fitting, finishing, and fabric quality were excellent. They understood exactly what style I wanted and delivered it beautifully.”',
    name: 'Shreya R.',
    role: 'Bridal Client'
  },
  {
    quote: '“We placed a bulk order for uniforms and the consistency in quality, sizing, and delivery was very impressive.”',
    name: 'Aarav Institutions',
    role: 'School Administration'
  },
  {
    quote: '“Their boutique suggestions were practical and stylish. I loved the customization options and quick alterations.”',
    name: 'Nitya S.',
    role: 'Regular Customer'
  }
];
let testimonialIndex = 0;
const testimonialCard = document.getElementById('testimonialCard');

function renderTestimonial() {
  const item = testimonials[testimonialIndex];
  testimonialCard.innerHTML = `
    <p class="quote">${item.quote}</p>
    <div class="author">
      <strong>${item.name}</strong>
      <span>${item.role}</span>
    </div>
  `;
}

document.getElementById('prevTestimonial').addEventListener('click', () => {
  testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
  renderTestimonial();
});
document.getElementById('nextTestimonial').addEventListener('click', () => {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  renderTestimonial();
});
setInterval(() => {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  renderTestimonial();
}, 6000);

const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  item.querySelector('.faq-question').addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    faqItems.forEach(faq => faq.classList.remove('active'));
    if (!isActive) item.classList.add('active');
  });
});

const bookingForm = document.getElementById('bookingForm');
const formStatus = document.getElementById('formStatus');
bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(bookingForm);
  const name = data.get('name');
  const service = data.get('service');
  formStatus.textContent = `Thank you, ${name}. Your ${service} request has been captured. You can now connect this form to EmailJS, Formspree, or a backend API.`;
  bookingForm.reset();
});
