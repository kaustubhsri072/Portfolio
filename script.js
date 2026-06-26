/**
 * Portfolio — Scroll animations, smooth navigation, active link tracking
 * Vanilla JS, no dependencies.
 */

(function () {
  'use strict';

  // ============ SCROLL REVEAL ============

  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));


  // ============ ACTIVE NAV LINK ============

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  function updateActiveLink() {
    const scrollY = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();


  // ============ MOBILE MENU ============

  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }


  // ============ NAV BACKGROUND ON SCROLL ============

  const nav = document.getElementById('nav');

  function updateNavBackground() {
    if (window.scrollY > 50) {
      nav.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
    } else {
      nav.style.borderBottomColor = 'transparent';
    }
  }

  window.addEventListener('scroll', updateNavBackground, { passive: true });
  updateNavBackground();


  // ============ SMOOTH SCROLL FOR NAV LINKS ============

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = document.querySelector('.nav').offsetHeight;
        const targetPosition = targetEl.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });

  // ============ INTERACTIVE BACKGROUND GRID ============
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let points = [];
    const spacing = 40; // distance between points
    const mouse = { x: -1000, y: -1000, radius: 250 }; // interaction radius

    function initGrid() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      points = [];
      
      const cols = Math.floor(width / spacing) + 2;
      const rows = Math.floor(height / spacing) + 2;
      
      for (let i = 0; i < cols; i++) {
        points[i] = [];
        for (let j = 0; j < rows; j++) {
          const x = i * spacing;
          const y = j * spacing;
          points[i][j] = {
            x: x,
            y: y,
            originX: x,
            originY: y,
            vx: 0,
            vy: 0
          };
        }
      }
    }

    window.addEventListener('resize', initGrid);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    window.addEventListener('mouseout', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    function animateGrid() {
      ctx.clearRect(0, 0, width, height);
      
      // Update physics for points
      for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points[i].length; j++) {
          const p = points[i][j];
          
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          // Repel points near the mouse to create a "warp" effect
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            p.vx += Math.cos(angle) * force * 2;
            p.vy += Math.sin(angle) * force * 2;
          }
          
          // Spring force back to original position
          p.vx += (p.originX - p.x) * 0.05;
          p.vy += (p.originY - p.y) * 0.05;
          
          // Apply friction
          p.vx *= 0.8;
          p.vy *= 0.8;
          
          // Update position
          p.x += p.vx;
          p.y += p.vy;
        }
      }
      
      // Draw grid lines
      for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points[i].length; j++) {
          const p = points[i][j];
          
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          // Only draw if there are neighbors (prevents out of bounds)
          if (i < points.length - 1 || j < points[i].length - 1) {
              // Calculate opacity based on distance to mouse
              let opacity = 0.03; // default faint grid
              if (dist < mouse.radius * 1.5) {
                // Light up brightly when near mouse
                opacity = 0.03 + (0.6 * (1 - dist / (mouse.radius * 1.5)));
              }
              
              ctx.beginPath();
              // Draw line to the right neighbor
              if (i < points.length - 1) {
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(points[i + 1][j].x, points[i + 1][j].y);
              }
              // Draw line to the bottom neighbor
              if (j < points[i].length - 1) {
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(points[i][j + 1].x, points[i][j + 1].y);
              }
              
              // 96, 165, 250 is the hex #60A5FA (blue accent)
              ctx.strokeStyle = `rgba(96, 165, 250, ${opacity})`;
              ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animateGrid);
    }

    initGrid();
    animateGrid();
  }

})();
