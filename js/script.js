/* ==========================================================================
   SONAKSHI PAVITRE — PORTFOLIO JAVASCRIPT ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initActiveNav();
  initModals();
  initScrollReveal();
  initBackToTop();
  initContactForm();
});

/* --------------------------------------------------------------------------
   1. Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initNavigation() {
  const toggleBtn = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('mobile-open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !toggleBtn.contains(e.target)) {
        navLinks.classList.remove('mobile-open');
      }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   2. Active Link Highlighting
   -------------------------------------------------------------------------- */
function initActiveNav() {
  const currentPath = window.location.pathname;
  let pageName = currentPath.split('/').pop();
  
  if (!pageName || pageName === '') {
    pageName = 'index.html';
  }

  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === pageName || (pageName === 'index.html' && href === './')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* --------------------------------------------------------------------------
   3. Universal Modal & Project Details Engine
   -------------------------------------------------------------------------- */
const PROJECT_DATA = {
  'hostel-management': {
    title: 'Hostel Management Database System',
    category: 'Database Management / DBMS',
    description: 'Hostel Management Database System is a database-oriented project designed to manage hostel-related information in an organized and structured manner. The system focuses on storing and managing information about students, rooms, hostel allocation, and related records.',
    features: [
      'Student information management',
      'Hostel and room management',
      'Room allocation tracking',
      'Student-room relationship management',
      'Database records management',
      'Searching and retrieving records',
      'Structured relational data handling',
      'Reduced manual record processing'
    ],
    tech: ['Oracle Database', 'SQL', 'Java', 'JDBC', 'DBMS'],
    learnings: [
      'Relational database design & schema planning',
      'Complex SQL queries & table relationships',
      'Robust CRUD operations handling',
      'Java Database Connectivity (JDBC) integration',
      'Structured enterprise data management'
    ]
  },
  'vehicle-rental': {
    title: 'Vehicle Rental Management System',
    category: 'Database Management / Software Project',
    description: 'Vehicle Rental Management System is a software and database-based project designed to organize vehicle rental information and simplify the management of customers, vehicles, bookings, and rental records.',
    features: [
      'Customer profile & records management',
      'Vehicle inventory & category management',
      'Vehicle availability tracking',
      'Rental & booking records handling',
      'Customer-vehicle relationship mapping',
      'Rental details & duration management',
      'Database-based record storage',
      'Organized retrieval of rental information'
    ],
    tech: ['Database Management System', 'SQL', 'Java', 'JDBC'],
    learnings: [
      'Relational database architecture design',
      'Implementation of efficient CRUD operations',
      'Data normalization & structural integrity',
      'Formulating optimized SQL queries',
      'Application-to-database interaction flow'
    ]
  },
  'smart-presentation': {
    title: 'AI-Powered Smart Presentation System',
    category: 'Smart Technology / Presentation System',
    description: 'AI-Powered Smart Presentation System is a concept/project focused on making presentations more interactive, organized, and intelligent by using AI-powered assistance for presentation-related tasks.',
    features: [
      'Smart presentation assistance concept',
      'Automated presentation support tools',
      'Intelligent content organization',
      'Interactive presentation experience',
      'Intelligent workflow suggestions',
      'Presentation flow assistance',
      'User-friendly modern interface'
    ],
    tech: ['Technology Stack: To be updated according to implementation'],
    learnings: [
      'Exploring intelligent human-computer interfaces',
      'Designing user-friendly interactive workflows',
      'Structuring presentation logic & automation flows'
    ]
  }
};

function initModals() {
  // Modal Overlay Close Events
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeAllModals();
      }
    });
  });

  // Modal Close Buttons
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      closeAllModals();
    });
  });

  // Escape Key to close modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
}

function openProjectModal(projectId) {
  const data = PROJECT_DATA[projectId];
  if (!data) return;

  const modal = document.getElementById('projectModal');
  if (!modal) return;

  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalCategory').textContent = data.category;
  document.getElementById('modalDescription').textContent = data.description;

  // Render Features
  const featuresList = document.getElementById('modalFeatures');
  featuresList.innerHTML = data.features.map(item => `<li><span class="bullet">•</span> ${item}</li>`).join('');

  // Render Tech Stack
  const techContainer = document.getElementById('modalTech');
  techContainer.innerHTML = data.tech.map(t => `<span class="badge">${t}</span>`).join('');

  // Render Learnings
  const learningsList = document.getElementById('modalLearnings');
  learningsList.innerHTML = data.learnings.map(l => `<li><span class="bullet">✓</span> ${l}</li>`).join('');

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
  document.body.style.overflow = 'auto';
}

/* --------------------------------------------------------------------------
   4. Scroll Reveal Animation
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   5. Back To Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------------
   6. Contact Form Validation
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const statusBox = document.getElementById('formStatus');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('formName').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const subject = document.getElementById('formSubject').value.trim();
    const message = document.getElementById('formMessage').value.trim();

    // Validation checks
    if (!name || !email || !subject || !message) {
      showStatus('Please fill in all required fields.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showStatus('Please enter a valid email address.', 'error');
      return;
    }

    // Factual validation message (Rule #17)
    showStatus(
      'Your message has been validated successfully. Please use the email address above (pavitresonakshee@gmail.com) to contact me directly.',
      'success'
    );
    form.reset();
  });

  function showStatus(msg, type) {
    if (!statusBox) return;
    statusBox.textContent = msg;
    statusBox.className = `form-status ${type}`;
    statusBox.style.display = 'block';
  }
}
