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

const lessonRecipes = {
  croissant: {
    title: 'クロワッサン',
    image: 'images/lesson-croissant.jpg',
    price: '料金: 7000円',
    capacity: '人数: 6人',
    charm: '外はパリッと中はふんわり。焼きたてならではの香りと層の食感を楽しめる、満足感の高いレッスンです。'
  },
  canele: {
    title: 'カヌレ',
    image: 'images/lesson-canele.jpg',
    price: '料金: 7000円',
    capacity: '人数: 6人',
    charm: '香ばしい薄い外皮と、とろけるような中身の対比が魅力。焼成のコツをつかむと仕上がりが一気に変わります。'
  },
  'orange-tart': {
    title: 'オレンジタルト',
    image: 'images/lesson-orange-tart.jpg',
    price: '料金: 7000円',
    capacity: '人数: 6人',
    charm: '柑橘の爽やかさとクリームのコクが重なる上品な味わい。見た目も華やかで、贈り物にも喜ばれる一品です。'
  },
  macaron: {
    title: 'マカロン',
    image: 'images/lesson-macaron.jpg',
    price: '料金: 7000円',
    capacity: '人数: 6人',
    charm: '繊細な食感と口どけのよいクリームのバランスが魅力。色や風味を変える楽しさもあり、応用が広がります。'
  },
  eclair: {
    title: 'エクレア',
    image: 'images/lesson-eclair.jpg',
    price: '料金: 7000円',
    capacity: '人数: 6人',
    charm: '軽い生地にたっぷり詰まったクリームが主役。仕上げのチョコで味も見た目も引き締まり、満足度の高いレッスンです。'
  },
  'baked-cheesecake': {
    title: 'ベイクドチーズケーキ',
    image: 'images/lesson-baked-cheesecake.jpg',
    price: '料金: 7000円',
    capacity: '人数: 6人',
    charm: '濃厚なのに重すぎない、後味のよさが魅力。焼き色となめらかさを両立した、定番だからこそ差が出るメニューです。'
  }
};

const recipeModal = document.querySelector('.recipe-modal');
const recipeImage = document.getElementById('recipe-modal-image');
const recipeTitle = document.getElementById('recipe-modal-title');
const recipePrice = document.getElementById('recipe-modal-price');
const recipeCapacity = document.getElementById('recipe-modal-capacity');
const recipeCharm = document.getElementById('recipe-modal-charm');

function closeRecipeModal() {
  if (!recipeModal) return;
  recipeModal.classList.remove('is-open');
  recipeModal.setAttribute('aria-hidden', 'true');
}

function openRecipeModal(recipeKey) {
  const recipe = lessonRecipes[recipeKey];
  if (!recipe || !recipeModal || !recipeImage || !recipeTitle || !recipePrice || !recipeCapacity || !recipeCharm) return;

  recipeImage.src = recipe.image;
  recipeImage.alt = recipe.title;
  recipeTitle.textContent = recipe.title;
  recipePrice.textContent = recipe.price;
  recipeCapacity.textContent = recipe.capacity;
  recipeCharm.textContent = recipe.charm;
  recipeModal.classList.add('is-open');
  recipeModal.setAttribute('aria-hidden', 'false');
}

document.querySelectorAll('.lesson-recipe-btn').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    const recipeKey = button.getAttribute('data-recipe');
    if (recipeKey) openRecipeModal(recipeKey);
  });
});

document.querySelectorAll('.sweet-card[data-recipe]').forEach((card) => {
  card.addEventListener('click', () => {
    const recipeKey = card.getAttribute('data-recipe');
    if (recipeKey) openRecipeModal(recipeKey);
  });
});

document.querySelectorAll('[data-close-recipe-modal]').forEach((element) => {
  element.addEventListener('click', closeRecipeModal);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeRecipeModal();
});

const lessonMarquee = document.querySelector('.lesson-marquee');
const lessonTrack = document.querySelector('.lesson-track');

if (lessonMarquee && lessonTrack) {
  let isDragging = false;
  let startX = 0;
  let startScrollLeft = 0;
  let loopWidth = 0;
  const autoSpeed = 0.55;

  const syncLoopWidth = () => {
    loopWidth = lessonTrack.scrollWidth / 2;
  };

  const normalizeScroll = () => {
    if (!loopWidth) return;
    if (lessonMarquee.scrollLeft >= loopWidth) {
      lessonMarquee.scrollLeft -= loopWidth;
    } else if (lessonMarquee.scrollLeft < 0) {
      lessonMarquee.scrollLeft += loopWidth;
    }
  };

  const tickAutoScroll = () => {
    if (!isDragging) {
      lessonMarquee.scrollLeft += autoSpeed;
      normalizeScroll();
    }
    window.requestAnimationFrame(tickAutoScroll);
  };

  const dragStart = (clientX) => {
    isDragging = true;
    startX = clientX;
    startScrollLeft = lessonMarquee.scrollLeft;
    lessonMarquee.classList.add('is-dragging');
  };

  const dragMove = (clientX) => {
    if (!isDragging) return;
    const move = clientX - startX;
    lessonMarquee.scrollLeft = startScrollLeft - move;
    normalizeScroll();
  };

  const dragEnd = () => {
    isDragging = false;
    lessonMarquee.classList.remove('is-dragging');
  };

  lessonMarquee.addEventListener('mousedown', (event) => {
    dragStart(event.clientX);
  });

  window.addEventListener('mousemove', (event) => {
    dragMove(event.clientX);
  });

  window.addEventListener('mouseup', dragEnd);
  lessonMarquee.addEventListener('mouseleave', dragEnd);

  lessonMarquee.addEventListener('touchstart', (event) => {
    const touch = event.touches[0];
    if (!touch) return;
    dragStart(touch.clientX);
  }, { passive: true });

  lessonMarquee.addEventListener('touchmove', (event) => {
    const touch = event.touches[0];
    if (!touch) return;
    dragMove(touch.clientX);
  }, { passive: true });

  lessonMarquee.addEventListener('touchend', dragEnd);
  lessonMarquee.addEventListener('scroll', normalizeScroll, { passive: true });
  window.addEventListener('resize', syncLoopWidth);

  syncLoopWidth();
  window.requestAnimationFrame(tickAutoScroll);
}
