document.addEventListener('DOMContentLoaded', () => {
  // 1. Инициализация иконок Lucide
  if (typeof lucide !== 'undefined') {
      lucide.createIcons();
  }

  // 2. Инициализация Lenis (плавный скролл)
  const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
  });

  function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // 3. Логика мобильного меню
  const burger = document.getElementById('burger-menu');
  const nav = document.getElementById('nav-menu');
  const body = document.body;
  const navLinks = document.querySelectorAll('.nav__link');

  const toggleMenu = () => {
      burger.classList.toggle('burger--active');
      nav.classList.toggle('nav--active');
      body.classList.toggle('no-scroll');
  };

  burger?.addEventListener('click', toggleMenu);

  // Закрытие меню при клике на ссылку
  navLinks.forEach(link => {
      link.addEventListener('click', () => {
          if (nav.classList.contains('nav--active')) {
              toggleMenu();
          }
      });
  });

  // 4. Плавный скролл по якорям (через Lenis)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);

          if (targetElement) {
              lenis.scrollTo(targetElement, {
                  offset: -80, // Оффсет из-за фиксированного хедера
                  lerp: 0.1
              });
          }
      });
  });

  // 5. Эффект изменения хедера при скролле
  window.addEventListener('scroll', () => {
      const header = document.querySelector('.header');
      if (window.scrollY > 50) {
          header.style.padding = '10px 0';
          header.style.boxShadow = '10px 10px 0px rgba(0,0,0,0.1)';
      } else {
          header.style.padding = '20px 0';
          header.style.boxShadow = 'none';
      }
  });
});