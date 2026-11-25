(() => {
  // Category labels remain visible; native details also works without JavaScript.
  const groups = [...document.querySelectorAll('.category-nav .nav-group')];
  const fineHover = window.matchMedia('(hover: hover) and (pointer: fine)');
  groups.forEach(group => {
    const summary = group.querySelector('summary');
    let closeTimer;
    const closeLater = () => {
      clearTimeout(closeTimer);
      closeTimer = setTimeout(() => {
        if (group.contains(document.activeElement)) return;
        group.open = false;
      }, 180);
    };
    summary.addEventListener('click', () => {
      groups.forEach(other => { if (other !== group) other.open = false; });
    });
    group.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      group.open = false;
    }));
    group.addEventListener('pointerenter', () => {
      if (!fineHover.matches) return;
      clearTimeout(closeTimer);
      groups.forEach(other => { if (other !== group) other.open = false; });
      group.open = true;
    });
    group.addEventListener('pointerleave', () => {
      if (!fineHover.matches) return;
      closeLater();
    });
    group.addEventListener('focusout', () => {
      setTimeout(() => {
        if (group.contains(document.activeElement) || group.matches(':hover')) return;
        group.open = false;
      }, 0);
    });
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.category-nav')) groups.forEach(group => { group.open = false; });
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const open = groups.find(group => group.open);
    if (open) { open.open = false; open.querySelector('summary').focus(); }
  });
  try {
    const bar = document.querySelector('[data-video-filters]');
    const filterButtons = [...document.querySelectorAll('[data-video-filter]')];
    const panels = [...document.querySelectorAll('[data-video-panel]')];
    if (!bar || !filterButtons.length || !panels.length) return;
    const category = document.getElementById('video-category');
    const select = (name) => {
      filterButtons.forEach(button => {
        button.setAttribute('aria-pressed', String(button.dataset.videoFilter === name));
      });
      panels.forEach(panel => {
        panel.hidden = panel.dataset.videoPanel !== name;
      });
      if (category) category.textContent = name;
    };
    filterButtons.forEach(button => {
      button.addEventListener('click', () => select(button.dataset.videoFilter));
    });
    select('Callahan');
    bar.hidden = false;
  } catch (error) {
    document.querySelectorAll('[data-video-panel]').forEach(panel => { panel.hidden = false; });
    const bar = document.querySelector('[data-video-filters]');
    if (bar) bar.hidden = true;
  }
})();
