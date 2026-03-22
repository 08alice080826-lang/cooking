const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.global-nav');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('is-open');
  });
}

const form = document.querySelector('.contact-form');
const note = document.querySelector('.form-note');

if (form && note) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    note.textContent = 'お申し込みありがとうございます。2営業日以内にご連絡いたします。';
    form.reset();
  });
}

document.querySelectorAll('.thumb img').forEach((img) => {
  img.addEventListener('error', () => {
    const thumb = img.closest('.thumb');
    if (thumb) thumb.classList.add('is-empty');
  });
});

const heroSlides = document.querySelectorAll('.hero-bg-slide');

if (heroSlides.length > 1) {
  let activeIndex = 0;

  setInterval(() => {
    heroSlides[activeIndex].classList.remove('is-active');
    activeIndex = (activeIndex + 1) % heroSlides.length;
    heroSlides[activeIndex].classList.add('is-active');
  }, 3000);
}
