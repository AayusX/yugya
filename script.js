// ===== YUGYA — Script.js =====
// Vanilla JS for interactivity, animations, and theme toggle

document.addEventListener('DOMContentLoaded', () => {

  // ===== THEME TOGGLE =====
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('yugya-theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('yugya-theme', next);
    themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
  });

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // ===== MOBILE NAVIGATION =====
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== SCROLL REVEAL ANIMATIONS =====
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ===== COUNTER ANIMATION =====
  const counters = document.querySelectorAll('[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-count'));
        const suffix = el.textContent.replace(/[\d.]/g, '').trim();
        const isDecimal = target % 1 !== 0;
        const duration = 2000;
        const startTime = performance.now();

        function animate(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = target * eased;

          if (isDecimal) {
            el.textContent = current.toFixed(1) + suffix;
          } else {
            el.textContent = Math.floor(current) + suffix;
          }

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            el.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
          }
        }

        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  // ===== FAQ ACCORDION =====
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          other.querySelector('.faq-answer').style.maxHeight = '0';
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = '0';
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // ===== CONTACT FORM =====
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('.btn');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<span class="btn-icon">✅</span> Message Sent!';
    btn.style.pointerEvents = 'none';
    btn.style.opacity = '0.8';

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.pointerEvents = '';
      btn.style.opacity = '';
      contactForm.reset();
    }, 3000);
  });

  // ===== TYPING EFFECT FOR HERO TAGLINES =====
  const taglines = [
    'Powering Your Digital Era',
    'Infrastructure That Scales With You',
    'Build. Secure. Scale.',
    'Your Digital Future, Engineered'
  ];

  const heroSubtitle = document.querySelector('.hero-badge');
  if (heroSubtitle) {
    let taglineIndex = 0;
    const badgeText = heroSubtitle.querySelector('span:not(.pulse-dot)') || heroSubtitle.childNodes[1];

    // Only run typing if we find the text node
    if (heroSubtitle.childNodes.length > 1) {
      setInterval(() => {
        taglineIndex = (taglineIndex + 1) % taglines.length;
        // Fade out
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(-5px)';
        setTimeout(() => {
          heroSubtitle.childNodes[heroSubtitle.childNodes.length - 1].textContent = '\n        ' + taglines[taglineIndex] + '\n      ';
          heroSubtitle.style.opacity = '1';
          heroSubtitle.style.transform = 'translateY(0)';
        }, 300);
      }, 4000);

      heroSubtitle.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    }
  }

  // ===== ACTIVE NAV LINK ON SCROLL =====
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.querySelectorAll('a').forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + id) {
            link.style.color = 'var(--brand-primary)';
          }
        });
      }
    });
  }, { passive: true });

});
