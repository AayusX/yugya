/**
 * Yugya — site behaviour
 * No external dependencies. Progressive enhancement only.
 */
document.addEventListener('DOMContentLoaded', () => {
  // --- Footer year -------------------------------------------------------
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // --- Sticky header state ----------------------------------------------
  const header = document.querySelector('.site-header');
  if (header) {
    const syncHeader = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    syncHeader();
    window.addEventListener('scroll', syncHeader, { passive: true });
  }

  // --- Mobile navigation -------------------------------------------------
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.querySelector('.primary-nav');

  if (navToggle && primaryNav) {
    const setNav = (open) => {
      primaryNav.classList.toggle('is-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
      document.body.classList.toggle('nav-open', open);
    };

    const isOpen = () => primaryNav.classList.contains('is-open');

    navToggle.addEventListener('click', () => setNav(!isOpen()));

    document.addEventListener('click', (event) => {
      if (
        isOpen() &&
        !primaryNav.contains(event.target) &&
        !navToggle.contains(event.target)
      ) {
        setNav(false);
      }
    });

    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && isOpen()) {
        setNav(false);
        navToggle.focus();
      }
    });

    primaryNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setNav(false));
    });

    const wideViewport = window.matchMedia('(min-width: 901px)');
    wideViewport.addEventListener('change', (event) => {
      if (event.matches) setNav(false);
    });
  }

  // --- Current page in navigation ---------------------------------------
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  // --- Reveal on scroll --------------------------------------------------
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealElements = document.querySelectorAll('.reveal');

  if (!prefersReducedMotion && 'IntersectionObserver' in window && revealElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries, instance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            instance.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  }

  // --- Contact form ------------------------------------------------------
  const contactForm = document.getElementById('enquiryForm');
  const formStatus = document.getElementById('formStatus');
  const projectDesc = document.getElementById('projectDetails');
  const charCount = document.getElementById('charCount');
  const copyBtn = document.getElementById('copyEnquiryBtn');

  if (contactForm) {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    const serviceSelect = document.getElementById('serviceCategory');

    if (serviceParam && serviceSelect) {
      const match = Array.from(serviceSelect.options).find((option) =>
        option.value.toLowerCase().includes(serviceParam.toLowerCase())
      );
      if (match) {
        serviceSelect.value = match.value;
      }
    }
  }

  if (projectDesc && charCount) {
    projectDesc.addEventListener('input', () => {
      const length = projectDesc.value.trim().length;
      charCount.textContent = `${length} / 30 characters (recommended min: 30)`;
      charCount.style.color = length >= 30 ? 'var(--color-accent)' : 'var(--color-muted)';
    });
  }

  const formatEnquiryText = (data) =>
    [
      '==========================================',
      'PROJECT ENQUIRY FOR YUGYA (hello@yugya.com)',
      '==========================================',
      `Full Name:    ${data.name}`,
      `Email:        ${data.email}`,
      `Organization: ${data.org || 'Not specified'}`,
      `Service:      ${data.service}`,
      `Timeline:     ${data.timeline || 'Flexible'}`,
      '------------------------------------------',
      'PROJECT REQUIREMENTS & DESCRIPTION:',
      data.details,
      '==========================================',
    ].join('\n');

  const getFormData = () => {
    if (!contactForm) return null;
    return {
      name: (document.getElementById('clientName')?.value || '').trim(),
      email: (document.getElementById('clientEmail')?.value || '').trim(),
      org: (document.getElementById('clientOrg')?.value || '').trim(),
      service: document.getElementById('serviceCategory')?.value || 'Not selected',
      timeline: document.getElementById('timelineGoal')?.value || 'Not specified',
      details: (document.getElementById('projectDetails')?.value || '').trim(),
    };
  };

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!contactForm.reportValidity()) return;

      const data = getFormData();
      if (!data) return;

      if (data.details.length < 25) {
        formStatus.className = 'form-status error show';
        formStatus.textContent =
          'Please provide a few more sentences describing your requirements so we can understand your project scope.';
        projectDesc?.focus();
        return;
      }

      const subject = encodeURIComponent(`Project Enquiry: ${data.service} — ${data.name}`);
      const body = encodeURIComponent(formatEnquiryText(data));
      const mailtoUrl = `mailto:hello@yugya.com?subject=${subject}&body=${body}`;

      formStatus.className = 'form-status success show';
      formStatus.innerHTML = `
        <strong>Email draft opened.</strong> This form does not submit to a remote server. Your email application has opened with your details prepared.<br>
        <strong>Please review and click Send in your email application to deliver it to <code>hello@yugya.com</code>.</strong><br>
        If your email application did not open automatically, click <a href="${mailtoUrl}">this direct email link</a> or use the <strong>Copy formatted enquiry</strong> button to paste your message into webmail.
      `;

      window.location.href = mailtoUrl;
    });
  }

  if (copyBtn && contactForm && formStatus) {
    copyBtn.addEventListener('click', async () => {
      const data = getFormData();
      if (!data || !data.name || !data.email || !data.details) {
        formStatus.className = 'form-status error show';
        formStatus.textContent =
          'Please complete the name, email, and project description fields before copying.';
        return;
      }

      const formatted = formatEnquiryText(data);

      try {
        await navigator.clipboard.writeText(formatted);
        formStatus.className = 'form-status success show';
        formStatus.innerHTML =
          '<strong>Enquiry copied to clipboard.</strong> Paste it directly into your email application and send it to <code>hello@yugya.com</code>.';
      } catch (error) {
        const textarea = document.createElement('textarea');
        textarea.value = formatted;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();

        try {
          document.execCommand('copy');
          formStatus.className = 'form-status success show';
          formStatus.innerHTML =
            '<strong>Enquiry copied to clipboard.</strong> Paste it directly into your email program and send to <code>hello@yugya.com</code>.';
        } catch (fallbackError) {
          formStatus.className = 'form-status error show';
          formStatus.textContent =
            'Unable to copy automatically. Please write directly to hello@yugya.com.';
        }

        document.body.removeChild(textarea);
      }
    });
  }
});
