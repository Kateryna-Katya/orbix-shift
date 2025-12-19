document.addEventListener('DOMContentLoaded', () => {

  // 1. ИНИЦИАЛИЗАЦИЯ ИКОНОК (LUCIDE)
  if (typeof lucide !== 'undefined') {
      lucide.createIcons();
  }

  // 2. АНИМАЦИЯ HERO (GSAP + SplitType)
  // Мы используем Timeline для контроля последовательности
  if (typeof gsap !== 'undefined' && typeof SplitType !== 'undefined') {
      const heroTitle = new SplitType('#hero-title', { types: 'words, chars' });

      const tl = gsap.timeline();

      // Анимация заголовка по буквам
      tl.from(heroTitle.chars, {
          opacity: 0,
          y: 50,
          rotateX: -90,
          stagger: 0.03,
          duration: 1,
          ease: "power4.out",
          delay: 0.5
      });

      // Появление описания
      tl.from('.hero__description', {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power2.out"
      }, "-=0.6");

      // Появление кнопок (с фиксом видимости)
      tl.from('.hero__btns', {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "back.out(1.7)",
          clearProps: "all" // ОЧЕНЬ ВАЖНО: удаляет инлайновые стили GSAP после анимации
      }, "-=0.4");
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

      burger.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleMenu();
      });

      // Закрываем при клике на ссылки
      nav.querySelectorAll('.nav__link').forEach(link => {
          link.addEventListener('click', () => {
              if (nav.classList.contains('is-active')) {
                  toggleMenu();
              }
          });
      });

      // Закрытие при клике вне меню (опционально)
      document.addEventListener('click', (e) => {
          if (nav.classList.contains('is-active') && !nav.contains(e.target) && !burger.contains(e.target)) {
              toggleMenu();
          }
      });
  }

  // 4. ВАЛИДАЦИЯ ТЕЛЕФОНА (Только цифры и плюс)
  const phoneInput = document.getElementById('phone-input');
  if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
          e.target.value = e.target.value.replace(/[^\d+]/g, '');
      });
  }

  // 5. МАТЕМАТИЧЕСКАЯ КАПЧА
  const captchaQ = document.getElementById('captcha-question');
  const captchaInp = document.getElementById('captcha-answer');
  let secretResult = 0;

  const generateCaptcha = () => {
      if (captchaQ) {
          const val1 = Math.floor(Math.random() * 8) + 2;
          const val2 = Math.floor(Math.random() * 9) + 1;
          secretResult = val1 + val2;
          captchaQ.innerText = `${val1} + ${val2}`;
      }
  };

  generateCaptcha();

  // 6. ОБРАБОТКА ФОРМЫ (AJAX Simulation)
  const contactForm = document.getElementById('ai-form');
  const statusMsg = document.getElementById('form-message');

  if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
          e.preventDefault();

          // Проверка капчи
          if (parseInt(captchaInp.value) !== secretResult) {
              alert('Ошибка в расчетах! Пожалуйста, решите пример правильно.');
              generateCaptcha();
              captchaInp.value = '';
              return;
          }

          const submitBtn = contactForm.querySelector('button');
          submitBtn.disabled = true;
          const originalBtnText = submitBtn.innerText;
          submitBtn.innerText = 'Обработка данных...';

          // Имитация задержки сервера
          setTimeout(() => {
              contactForm.reset();
              submitBtn.disabled = false;
              submitBtn.innerText = originalBtnText;

              statusMsg.innerText = 'Запрос успешно отправлен! Наши специалисты в Берлине свяжутся с вами.';
              statusMsg.classList.add('success');
              statusMsg.style.display = 'block';

              // Генерируем новую капчу для следующего раза
              generateCaptcha();

              // Убираем сообщение через 5 секунд
              setTimeout(() => {
                  statusMsg.style.display = 'none';
              }, 5000);
          }, 2000);
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
          const targetID = this.getAttribute('href');
          if (targetID !== '#') {
              e.preventDefault();
              const targetElement = document.querySelector(targetID);
              if (targetElement) {
                  targetElement.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                  });
              }
          }
      });
  });

  // 9. ЭФФЕКТ СКРОЛЛА ХЕДЕРА
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
          header.style.padding = '12px 0';
          header.style.background = 'rgba(12, 12, 14, 0.98)';
          header.style.borderBottomColor = 'var(--primary-color)';
      } else {
          header.style.padding = '24px 0';
          header.style.background = 'rgba(12, 12, 14, 0.8)';
          header.style.borderBottomColor = 'var(--border-color)';
      }
  });
});