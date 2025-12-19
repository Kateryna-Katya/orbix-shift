document.addEventListener('DOMContentLoaded', () => {

  // 1. ИНИЦИАЛИЗАЦИЯ ИКОНОК
  if (typeof lucide !== 'undefined') {
      lucide.createIcons();
  }

  // 2. АНИМАЦИИ HERO (GSAP + SplitType)
  // Проверка, что библиотеки загружены, чтобы избежать ошибок в консоли
  if (typeof gsap !== 'undefined' && typeof SplitType !== 'undefined') {
      const heroTitle = new SplitType('#hero-title', { types: 'words, chars' });

      const tl = gsap.timeline();

      tl.from(heroTitle.chars, {
          opacity: 0,
          y: 50,
          rotateX: -90,
          stagger: 0.03,
          duration: 1,
          ease: "power4.out"
      })
      .from('.hero__description', {
          opacity: 0,
          y: 20,
          duration: 0.8
      }, "-=0.5")
      .from('.hero__btns .btn', {
          opacity: 0,
          x: -20,
          stagger: 0.2,
          duration: 0.8
      }, "-=0.5");
  }

  // 3. МОБИЛЬНОЕ МЕНЮ (Вертикальный оверлей)
  const burger = document.getElementById('burger-menu');
  const nav = document.getElementById('nav-menu');
  const body = document.body;

  if (burger && nav) {
      const toggleMenu = () => {
          burger.classList.toggle('is-active');
          nav.classList.toggle('is-active');
          body.classList.toggle('lock-scroll');
      };

      burger.addEventListener('click', toggleMenu);

      // Закрываем при клике на ссылки
      nav.querySelectorAll('.nav__link').forEach(link => {
          link.addEventListener('click', toggleMenu);
      });
  }

  // 4. ВАЛИДАЦИЯ ТЕЛЕФОНА (Только цифры)
  const phoneInput = document.getElementById('phone-input');
  if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
          // Удаляем всё, кроме цифр и знака +
          e.target.value = e.target.value.replace(/[^\d+]/g, '');
      });
  }

  // 5. МАТЕМАТИЧЕСКАЯ КАПЧА
  const captchaQ = document.getElementById('captcha-question');
  const captchaInp = document.getElementById('captcha-answer');
  let secretResult = 0;

  if (captchaQ) {
      const val1 = Math.floor(Math.random() * 10) + 2;
      const val2 = Math.floor(Math.random() * 10) + 1;
      secretResult = val1 + val2;
      captchaQ.innerText = `${val1} + ${val2}`;
  }

  // 6. ОБРАБОТКА ФОРМЫ (AJAX Simulation)
  const contactForm = document.getElementById('ai-form');
  const statusMsg = document.getElementById('form-message');

  if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
          e.preventDefault();

          // Проверка капчи
          if (parseInt(captchaInp.value) !== secretResult) {
              alert('Неверный результат капчи. Попробуйте снова.');
              return;
          }

          const submitBtn = contactForm.querySelector('button');
          submitBtn.disabled = true;
          submitBtn.innerText = 'Связь с сервером...';

          setTimeout(() => {
              contactForm.reset();
              submitBtn.disabled = false;
              submitBtn.innerText = 'Отправить запрос';

              statusMsg.innerText = 'Ваша заявка принята! Наши эксперты в Германии свяжутся с вами.';
              statusMsg.classList.add('success');
              statusMsg.style.display = 'block';
          }, 1800);
      });
  }

  // 7. COOKIE POPUP (Local Storage)
  const cookieBox = document.getElementById('cookie-popup');
  const cookieBtn = document.getElementById('accept-cookies');

  if (cookieBox && !localStorage.getItem('orbix_cookies_accepted')) {
      setTimeout(() => {
          cookieBox.classList.add('active');
      }, 3000);
  }

  if (cookieBtn) {
      cookieBtn.addEventListener('click', () => {
          localStorage.setItem('orbix_cookies_accepted', 'true');
          cookieBox.classList.remove('active');
      });
  }

  // 8. ПЛАВНЫЙ СКРОЛЛ
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const targetID = this.getAttribute('href');
          const targetElement = document.querySelector(targetID);

          if (targetElement) {
              targetElement.scrollIntoView({
                  behavior: 'smooth'
              });
          }
      });
  });

  // 9. ЭФФЕКТ СКРОЛЛА ХЕДЕРА
  window.addEventListener('scroll', () => {
      const header = document.querySelector('.header');
      if (window.scrollY > 100) {
          header.style.padding = '10px 0';
          header.style.background = 'rgba(12, 12, 14, 0.95)';
      } else {
          header.style.padding = '24px 0';
          header.style.background = 'rgba(12, 12, 14, 0.8)';
      }
  });
});