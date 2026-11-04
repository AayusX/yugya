/**
 * Yugya — Core Website JavaScript
 * Zero external dependencies. Accessible, lightweight, and resilient.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Dynamic Footer Year ---
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // --- 2. Mobile Navigation Toggle ---
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    const toggleNav = (open) => {
      const isOpen = typeof open === 'boolean' ? open : !navMenu.classList.contains('open');
      navMenu.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    };

    navToggle.addEventListener('click', () => toggleNav());

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        toggleNav(false);
      }
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        toggleNav(false);
        navToggle.focus();
      }
    });

    // Close menu when a navigation link is clicked
    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        toggleNav(false);
      });
    });
  }

  // --- 3. Active Navigation Link Detection ---
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach((link) => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  // --- 4. Intersection Observer for Subtle Fade-in Animations ---
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fadeElements = document.querySelectorAll('.fade-in');

  if (!prefersReducedMotion && 'IntersectionObserver' in window && fadeElements.length > 0) {
    const appearOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, appearOptions);

    fadeElements.forEach((el) => appearOnScroll.observe(el));
  } else {
    // If reduced motion is requested or observer is unsupported, show immediately
    fadeElements.forEach((el) => el.classList.add('visible'));
  }

  // --- 5. Contact Form Handling ---
  const contactForm = document.getElementById('enquiryForm');
  const formStatus = document.getElementById('formStatus');
  const projectDesc = document.getElementById('projectDetails');
  const charCount = document.getElementById('charCount');
  const copyBtn = document.getElementById('copyEnquiryBtn');

  // URL query parameter for service pre-selection
  if (contactForm) {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    const serviceSelect = document.getElementById('serviceCategory');
    if (serviceParam && serviceSelect) {
      for (let i = 0; i < serviceSelect.options.length; i++) {
        if (serviceSelect.options[i].value.toLowerCase().includes(serviceParam.toLowerCase())) {
          serviceSelect.selectedIndex = i;
          break;
        }
      }
    }
  }

  // Real-time character counter for project description
  if (projectDesc && charCount) {
    projectDesc.addEventListener('input', () => {
      const len = projectDesc.value.trim().length;
      charCount.textContent = `${len} / 30 characters (recommended min: 30)`;
      if (len >= 30) {
        charCount.style.color = 'var(--status-verified)';
      } else {
        charCount.style.color = 'var(--ink-tertiary)';
      }
    });
  }

  // Formatter helper for email body
  const formatEnquiryText = (data) => {
    return [
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
      '=========================================='
    ].join('\n');
  };

  const getFormData = () => {
    if (!contactForm) return null;
    return {
      name: (document.getElementById('clientName')?.value || '').trim(),
      email: (document.getElementById('clientEmail')?.value || '').trim(),
      org: (document.getElementById('clientOrg')?.value || '').trim(),
      service: document.getElementById('serviceCategory')?.value || 'Not selected',
      timeline: document.getElementById('timelineGoal')?.value || 'Not specified',
      details: (document.getElementById('projectDetails')?.value || '').trim()
    };
  };

  // Submit Handler: Opens mailto client with pre-filled content
  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!contactForm.reportValidity()) return;

      const data = getFormData();
      if (!data) return;

      if (data.details.length < 25) {
        formStatus.className = 'form-status error show';
        formStatus.textContent = 'Please provide a few more sentences describing your requirements so we can understand your project scope.';
        projectDesc?.focus();
        return;
      }

      const subject = encodeURIComponent(`Project Enquiry: ${data.service} — ${data.name}`);
      const body = encodeURIComponent(formatEnquiryText(data));
      const mailtoUrl = `mailto:hello@yugya.com?subject=${subject}&body=${body}`;

      formStatus.className = 'form-status info show';
      formStatus.innerHTML = `
        <strong>Email draft opened.</strong> This form does not submit to a remote server. Your email application has opened with your details prepared.<br>
        <strong>Please review and click Send in your email application to deliver it to <code>hello@yugya.com</code>.</strong><br>
        If your email application did not open automatically, click <a href="${mailtoUrl}">this direct email link</a> or use the <strong>Copy Formatted Enquiry</strong> button below to paste your message into webmail.
      `;

      // Trigger email client
      window.location.href = mailtoUrl;
    });
  }

  // Copy to Clipboard Button
  if (copyBtn && contactForm && formStatus) {
    copyBtn.addEventListener('click', async () => {
      const data = getFormData();
      if (!data || !data.name || !data.email || !data.details) {
        formStatus.className = 'form-status error show';
        formStatus.textContent = 'Please complete the Name, Email, and Project Description fields before copying.';
        return;
      }

      const formatted = formatEnquiryText(data);
      try {
        await navigator.clipboard.writeText(formatted);
        formStatus.className = 'form-status success show';
        formStatus.innerHTML = '<strong>Enquiry copied to clipboard.</strong> You can now paste this directly into your email application (such as Gmail or Outlook) and send it to <code>hello@yugya.com</code>.';
      } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = formatted;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          formStatus.className = 'form-status success show';
          formStatus.innerHTML = '<strong>Enquiry copied to clipboard.</strong> Paste this directly into your email program and send to <code>hello@yugya.com</code>.';
        } catch (e) {
          formStatus.className = 'form-status error show';
          formStatus.textContent = 'Unable to copy automatically. Please write directly to hello@yugya.com.';
        }
        document.body.removeChild(textarea);
      }
    });
  }
});
