const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const header = document.querySelector('.site-header');
const backToTop = document.querySelector<HTMLAnchorElement>('.back-to-top');
const sectionLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.site-header a[href^="#"]'));
const sections = ['home', 'expertise', 'portfolio', 'resume', 'contact'].map(id => document.getElementById(id)).filter((section): section is HTMLElement => section !== null);
const updateHeader = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 80);
  if (backToTop) backToTop.hidden = window.scrollY < 400;
  if (sectionLinks.length) {
    const active = [...sections].reverse().find(section => section.getBoundingClientRect().top <= 180) ?? sections[0];
    sectionLinks.forEach(link => {
      if (link.hash === `#${active?.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
};
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const typed = document.querySelector<HTMLElement>('[data-typing]');
const roles = ['Web Developer.', 'Full-Stack Developer.', 'Automation Engineer.'];
let typingTimer: ReturnType<typeof setTimeout>;
let roleIndex = 0;
let deleting = false;
function typeNext() {
  if (!typed || reducedMotion.matches || document.hidden) return;
  const role = roles[roleIndex];
  const current = typed.textContent ?? '';
  if (!deleting && current === role) {
    deleting = true;
    typingTimer = setTimeout(typeNext, 2000);
  } else if (deleting && !current) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingTimer = setTimeout(typeNext, 200);
  } else {
    typed.textContent = deleting ? current.slice(0, -1) : role.slice(0, current.length + 1);
    typingTimer = setTimeout(typeNext, deleting ? 40 : 67);
  }
}
function refreshTyping() {
  clearTimeout(typingTimer);
  if (!typed) return;
  if (reducedMotion.matches) { typed.textContent = roles[0]; roleIndex = 0; deleting = false; }
  else if (!document.hidden) typingTimer = setTimeout(typeNext, 2000);
}
reducedMotion.addEventListener('change', refreshTyping);
document.addEventListener('visibilitychange', refreshTyping);
refreshTyping();

const menu = document.querySelector<HTMLDetailsElement>('.mobile-menu');
const mobileViewport = window.matchMedia('(max-width: 900px)');
let menuCloseTimer: ReturnType<typeof setTimeout>;
function closeMenu() {
  if (!menu?.open || menu.classList.contains('is-closing')) return;
  if (reducedMotion.matches) { menu.open = false; return; }
  menu.classList.add('is-closing');
  menuCloseTimer = setTimeout(() => { menu.open = false; }, 400);
}
mobileViewport.addEventListener('change', () => { if (!mobileViewport.matches && menu) menu.open = false; });
menu?.querySelector('summary')?.addEventListener('click', event => {
  if (menu.open) { event.preventDefault(); closeMenu(); }
});
menu?.addEventListener('toggle', () => {
  if (!menu.open) { clearTimeout(menuCloseTimer); menu.classList.remove('is-closing'); }
  menu.querySelector('summary')?.setAttribute('aria-label', menu.open ? 'Close navigation' : 'Open navigation');
  document.querySelectorAll<HTMLElement>('main, .site-footer, .back-to-top').forEach(element => { element.inert = menu.open; });
});
menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu?.open) { menu.open = false; menu.querySelector('summary')?.focus(); }
  if (event.key === 'Tab' && menu?.open) {
    const controls = Array.from(menu.querySelectorAll<HTMLElement>('summary, a[href]'));
    const first = controls[0], last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }
});
document.addEventListener('click', (event) => {
  if (menu?.open && event.target instanceof Node && !menu.contains(event.target)) closeMenu();
});

// Elements are readable without JavaScript. Motion is added only after hydration.
if (!reducedMotion.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.addEventListener('animationend', () => entry.target.classList.remove('reveal-ready'), { once: true });
        entry.target.classList.add('reveal-ready', 'is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
}

document.querySelectorAll<HTMLElement>('[data-gallery]').forEach(gallery => {
  const controls = gallery.querySelector<HTMLElement>('.project-filters');
  if (!controls) return;
  controls.hidden = false;
  const cards = Array.from(gallery.querySelectorAll<HTMLElement>('[data-platform]'));
  const loadMore = gallery.querySelector<HTMLButtonElement>('[data-load-more]');
  const pageSize = Number(gallery.dataset.pageSize) || cards.length;
  let visibleLimit = pageSize;
  let selected = 'All';
  function render(animate = false) {
    let matched = 0;
    cards.forEach(card => {
      const matches = selected === 'All' || card.dataset.platform === selected;
      if (matches) matched++;
      card.hidden = !matches || matched > visibleLimit;
      if (animate && !card.hidden && !reducedMotion.matches) card.animate([{ opacity: .6, transform: 'translateY(40px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 500, easing: 'ease-out' });
    });
    const status = gallery.querySelector('[data-gallery-status]');
    if (status) status.textContent = `Showing ${Math.min(visibleLimit, matched)} of ${matched} ${selected === 'All' ? '' : `${selected} `}projects`;
    if (loadMore) {
      loadMore.hidden = visibleLimit >= matched;
      loadMore.textContent = `Load ${Math.min(6, Math.max(0, matched - visibleLimit))} more projects`;
    }
  }
  loadMore?.addEventListener('click', () => {
    const visibleBefore = cards.filter(card => !card.hidden);
    visibleLimit += 6;
    render(true);
    // Keep keyboard users in the newly revealed work if the button disappears.
    if (loadMore.hidden) cards.find(card => !card.hidden && !visibleBefore.includes(card))?.querySelector('a')?.focus();
  });
  controls.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      selected = button.dataset.filter ?? 'All';
      visibleLimit = pageSize;
      controls.querySelectorAll('[data-filter]').forEach(control => control.setAttribute('aria-pressed', String(control === button)));
      render(true);
    });
  });
  render();
});
