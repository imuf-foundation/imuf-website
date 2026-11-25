(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  let observer = null;
  const watched = new Set();

  const reset = (el) => {
    el.classList.remove('motion-hold', 'motion-hold-shift', 'motion-fade', 'motion-shift');
  };

  const clear = () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    watched.forEach(reset);
  };

  const finish = (el) => {
    el.dataset.motionDone = '1';
    reset(el);
    if (observer) observer.unobserve(el);
  };

  const play = (el) => {
    if (!el || el.dataset.motionDone === '1' || reduce.matches) {
      if (el) finish(el);
      return;
    }
    reset(el);
    el.classList.add(el.dataset.motion === 'fade' ? 'motion-fade' : 'motion-shift');
    el.dataset.motionDone = '1';
    el.addEventListener('animationend', () => reset(el), { once: true });
    if (observer) observer.unobserve(el);
  };

  const arm = (el, kind) => {
    if (!el || watched.has(el)) return;
    const rect = el.getBoundingClientRect();
    if (rect.bottom <= 0) return;
    el.dataset.motion = kind;
    el.classList.add(kind === 'fade' ? 'motion-hold' : 'motion-hold-shift');
    el.addEventListener('focusin', () => finish(el));
    watched.add(el);
  };

  const releaseVisibleHeadings = () => {
    const height = window.innerHeight || document.documentElement.clientHeight;
    watched.forEach(el => {
      if (el.dataset.motion !== 'fade' || el.dataset.motionDone === '1') return;
      const rect = el.getBoundingClientRect();
      if (rect.top < height && rect.bottom > 0) finish(el);
    });
  };

  try {
    if (reduce.matches || !('IntersectionObserver' in window)) return;

    const hero = document.querySelector('.home-hero');
    arm(document.querySelector('.home-page .hero-title'), 'fade');
    arm(document.querySelector('.home-page .hero-tagline'), 'fade');
    arm(document.querySelector('.home-page .hero-actions'), 'shift');

    const sectionTargets = [
      ['.ed-recruit h2', 'fade'],
      ['.ed-recruit-actions', 'shift'],
      ['.ed-hub h2', 'fade'],
      ['.ed-hub-entry', 'shift'],
      ['.ed-hub-nav', 'shift'],
      ['.ed-foundation h2', 'fade'],
      ['.ed-foundation-nav', 'shift'],
      ['.ed-archive h2', 'fade'],
      ['.ed-archive-action', 'shift']
    ];
    sectionTargets.forEach(([selector, kind]) => {
      arm(document.querySelector(selector), kind);
    });

    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        play(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' });

    watched.forEach(el => {
      if (!el.closest('.home-hero')) observer.observe(el);
    });

    const startHero = () => {
      if (reduce.matches) {
        clear();
        return;
      }
      const past = hero && hero.getBoundingClientRect().bottom <= 0;
      watched.forEach(el => {
        if (!el.closest('.home-hero')) return;
        if (past || el.getBoundingClientRect().bottom <= 0) finish(el);
        else play(el);
      });
    };

    const fontsReady = document.fonts && document.fonts.ready
      ? document.fonts.ready.catch(() => {})
      : Promise.resolve();
    const cap = new Promise(resolve => { setTimeout(resolve, 1000); });
    Promise.race([fontsReady, cap]).then(startHero);

    window.setTimeout(releaseVisibleHeadings, 2500);

    window.addEventListener('pageshow', event => {
      if (!event.persisted) return;
      const height = window.innerHeight || document.documentElement.clientHeight;
      watched.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom <= 0 || (rect.top < height && rect.bottom > 0)) finish(el);
      });
    });

    reduce.addEventListener('change', () => {
      if (reduce.matches) clear();
    });
  } catch (error) {
    clear();
  }
})();
