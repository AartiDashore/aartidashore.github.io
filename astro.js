const container = document.getElementById('astro-container');
const astro = document.getElementById('astro-svg');
const rocket = document.getElementById('rocket-svg');

let launched = false;

function update() {
  const scrollY = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const pct = Math.min(scrollY / maxScroll, 1);

  // During scroll if not launched
  if (!launched) {
    const translateY = pct * (window.innerHeight - 150);
    const scale = 1 - pct * 0.3;
    container.style.transform = `translateY(${translateY}px) scale(${scale})`;

    if (pct >= 0.95) {
      astro.style.display = 'none';
      rocket.style.display = 'block';
    } else {
      astro.style.display = 'block';
      rocket.style.display = 'none';
    }
  }

  // When scrolling has reached top after launch
  if (launched && scrollY === 0) {
    // Reset rocket back to astronaut
    launched = false;
    container.style.transition = '';
    container.style.transform = 'translateY(0) scale(1)';
    astro.style.display = 'block';
    rocket.style.display = 'none';
  }
}

window.addEventListener('scroll', update);

container.addEventListener('click', () => {
  const scrollY = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

  // Only allow rocket launch when at bottom of page
  if (scrollY / maxScroll >= 0.95 && !launched) {
    launched = true;

    // Launch animation
    container.style.transition = 'transform 1s ease-out';
    container.style.transform = 'translateY(-100px) scale(1.2)';

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});
