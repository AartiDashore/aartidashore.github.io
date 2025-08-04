// const canvas = document.getElementById('bg-canvas');
// const ctx = canvas.getContext('2d');

// let width, height, lines;

// function init() {
//   width = canvas.width = window.innerWidth;
//   height = canvas.height = window.innerHeight;

//   lines = Array.from({ length: 80 }, () => ({
//     x: Math.random() * width,
//     y: Math.random() * height,
//     dx: (Math.random() - 0.5) * 0.5,
//     dy: (Math.random() - 0.5) * 0.5,
//     radius: Math.random() * 1.5 + 0.5
//   }));
// }

// function draw() {
//   ctx.clearRect(0, 0, width, height);

//   // draw lines
//   for (let i = 0; i < lines.length; i++) {
//     const a = lines[i];

//     // update position
//     a.x += a.dx;
//     a.y += a.dy;

//     // bounce off edges
//     if (a.x < 0 || a.x > width) a.dx *= -1;
//     if (a.y < 0 || a.y > height) a.dy *= -1;

//     // draw node
//     ctx.beginPath();
//     ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
//     ctx.fillStyle = '#00ffd1';
//     ctx.fill();

//     // draw lines to nearby nodes
//     for (let j = i + 1; j < lines.length; j++) {
//       const b = lines[j];
//       const dist = Math.hypot(a.x - b.x, a.y - b.y);
//       if (dist < 100) {
//         ctx.beginPath();
//         ctx.moveTo(a.x, a.y);
//         ctx.lineTo(b.x, b.y);
//         ctx.strokeStyle = 'rgba(0, 255, 209, 0.07)';
//         ctx.lineWidth = 1;
//         ctx.stroke();
//       }
//     }
//   }

//   requestAnimationFrame(draw);
// }

// window.addEventListener('resize', init);

// init();
// draw();




















// const canvas = document.getElementById('bg-canvas');
// const ctx = canvas.getContext('2d');

// let width, height;
// let particles = [];
// let stars = [];
// let explosions = [];

// function resizeCanvas() {
//   width = canvas.width = window.innerWidth;
//   height = canvas.height = window.innerHeight;
// }
// window.addEventListener('resize', resizeCanvas);
// resizeCanvas();

// // Constants
// const PARTICLE_COUNT = 80;
// const STAR_COUNT = 100;

// // Initialize particles
// function createParticles() {
//   particles = Array.from({ length: PARTICLE_COUNT }, () => ({
//     x: Math.random() * width,
//     y: Math.random() * height,
//     dx: (Math.random() - 0.5) * 0.4,
//     dy: (Math.random() - 0.5) * 0.4,
//     radius: Math.random() * 1.5 + 1,
//     color: `hsl(${Math.random() * 360}, 100%, 70%)`,
//   }));
// }

// // Initialize stars
// function createStars() {
//   stars = Array.from({ length: STAR_COUNT }, () => ({
//     x: Math.random() * width,
//     y: Math.random() * height,
//     z: Math.random() * 2 + 0.5,
//     radius: Math.random() * 0.8 + 0.2,
//   }));
// }

// // Draw stars
// function drawStars() {
//   ctx.fillStyle = '#ffffff10';
//   stars.forEach(star => {
//     ctx.beginPath();
//     ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
//     ctx.fill();

//     star.y += star.z;
//     if (star.y > height) {
//       star.y = 0;
//       star.x = Math.random() * width;
//     }
//   });
// }

// // Draw particles and connecting lines
// function drawParticles() {
//   particles.forEach((p, i) => {
//     p.x += p.dx;
//     p.y += p.dy;

//     // Bounce on edges
//     if (p.x < 0 || p.x > width) p.dx *= -1;
//     if (p.y < 0 || p.y > height) p.dy *= -1;

//     // Dot
//     ctx.beginPath();
//     ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
//     ctx.fillStyle = p.color;
//     ctx.fill();

//     // Lines to nearby particles
//     for (let j = i + 1; j < particles.length; j++) {
//       const q = particles[j];
//       const dist = Math.hypot(p.x - q.x, p.y - q.y);
//       if (dist < 100) {
//         const gradient = ctx.createLinearGradient(p.x, p.y, q.x, q.y);
//         gradient.addColorStop(0, p.color);
//         gradient.addColorStop(1, q.color);

//         ctx.beginPath();
//         ctx.moveTo(p.x, p.y);
//         ctx.lineTo(q.x, q.y);
//         ctx.strokeStyle = gradient;
//         ctx.lineWidth = 1.2;
//         ctx.globalAlpha = 0.2;
//         ctx.stroke();
//         ctx.globalAlpha = 1;
//       }
//     }
//   });
// }

// // Draw explosions
// function drawExplosions() {
//   for (let i = explosions.length - 1; i >= 0; i--) {
//     const explosion = explosions[i];

//     explosion.particles.forEach(p => {
//       p.x += p.dx;
//       p.y += p.dy;
//       p.life -= 1;

//       if (p.life > 0) {
//         ctx.beginPath();
//         ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, p.life / 40)})`;
//         ctx.shadowColor = '#ffffff';
//         ctx.shadowBlur = 10;
//         ctx.fill();
//         ctx.shadowBlur = 0;
//       }
//     });

//     // Remove when all particles die
//     explosion.particles = explosion.particles.filter(p => p.life > 0);
//     if (explosion.particles.length === 0) {
//       explosions.splice(i, 1);
//     }
//   }
// }

// // Create explosion
// function createExplosion(x, y) {
//   const burst = [];
//   for (let i = 0; i < 30; i++) {
//     const angle = Math.random() * Math.PI * 2;
//     const speed = Math.random() * 2 + 1.5;
//     burst.push({
//       x,
//       y,
//       dx: Math.cos(angle) * speed,
//       dy: Math.sin(angle) * speed,
//       radius: Math.random() * 2 + 1,
//       life: 100,
//     });
//   }
//   explosions.push({ particles: burst });
// }

// // Handle click
// canvas.addEventListener('click', e => {
//   createExplosion(e.clientX, e.clientY);
// });

// // Animation loop
// function animate() {
//   ctx.clearRect(0, 0, width, height);
//   drawStars();
//   drawParticles();
//   drawExplosions();
//   requestAnimationFrame(animate);
// }

// // Start
// createParticles();
// createStars();
// animate();


const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
let stars = [];
let explosions = [];
let gradientShapes = [];
let shootingStars = [];

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Constants
const PARTICLE_COUNT = 80;
const STAR_COUNT = 100;
const SHAPE_COUNT = 25;

// Initialize particles (your original nodes)
function createParticles() {
  particles = Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4,
    radius: Math.random() * 1.5 + 1,
    color: `hsl(${Math.random() * 360}, 100%, 70%)`,
  }));
}

// Initialize stars (background faint stars)
function createStars() {
  stars = Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    z: Math.random() * 2 + 0.5,
    radius: Math.random() * 0.8 + 0.2,
  }));
}

// Initialize gradient shapes (big colored orbs)
function createGradientShapes() {
  gradientShapes = [];
  for (let i = 0; i < SHAPE_COUNT; i++) {
    gradientShapes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 20 + Math.random() * 30,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      hue: Math.random() * 360,
      hueSpeed: 0.3 + Math.random() * 0.7,
    });
  }
}

// Draw stars
function drawStars() {
  ctx.fillStyle = '#ffffff10';
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();

    star.y += star.z;
    if (star.y > height) {
      star.y = 0;
      star.x = Math.random() * width;
    }
  });
}

// Draw particles and lines (your original)
function drawParticles() {
  particles.forEach((p, i) => {
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > width) p.dx *= -1;
    if (p.y < 0 || p.y > height) p.dy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const dist = Math.hypot(p.x - q.x, p.y - q.y);
      if (dist < 100) {
        const gradient = ctx.createLinearGradient(p.x, p.y, q.x, q.y);
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(1, q.color);

        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = 0.2;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
  });
}

// Draw gradient shapes (big colorful orbs)
function drawGradientShapes() {
  gradientShapes.forEach(shape => {
    shape.x += shape.dx;
    shape.y += shape.dy;

    if (shape.x < 0 || shape.x > width) shape.dx *= -1;
    if (shape.y < 0 || shape.y > height) shape.dy *= -1;

    shape.hue = (shape.hue + shape.hueSpeed) % 360;

    const grad = ctx.createRadialGradient(
      shape.x, shape.y, shape.radius * 0.1,
      shape.x, shape.y, shape.radius
    );
    grad.addColorStop(0, `hsla(${shape.hue}, 100%, 70%, 0.6)`);
    grad.addColorStop(1, `hsla(${(shape.hue + 60) % 360}, 100%, 50%, 0)`);

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
    ctx.fill();
  });
}

// Draw explosions (fix and keep your existing)
function drawExplosions() {
  for (let i = explosions.length - 1; i >= 0; i--) {
    const explosion = explosions[i];

    explosion.particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      p.life -= 1;

      if (p.life > 0) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, p.life / 40)})`;
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });

    explosion.particles = explosion.particles.filter(p => p.life > 0);
    if (explosion.particles.length === 0) {
      explosions.splice(i, 1);
    }
  }
}

// Create explosion particles on click
function createExplosion(x, y) {
  const burst = [];
  for (let i = 0; i < 30; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 2 + 1.5;
    burst.push({
      x,
      y,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      radius: Math.random() * 2 + 1,
      life: 100,
    });
  }
  explosions.push({ particles: burst });
}

canvas.addEventListener('click', e => {
  createExplosion(e.clientX, e.clientY);
});

// Shooting Stars logic
function createShootingStar() {
  shootingStars.push({
    x: Math.random() * width,
    y: Math.random() * height / 2,
    length: 150 + Math.random() * 100,
    dx: 8 + Math.random() * 4,
    dy: 2 + Math.random() * 1.5,
    trail: [],
  });
}

function drawShootingStars() {
  shootingStars.forEach((star, index) => {
    star.trail.push({ x: star.x, y: star.y });
    if (star.trail.length > 10) star.trail.shift();

    star.x += star.dx;
    star.y += star.dy;

    // Draw trail
    for (let i = 0; i < star.trail.length; i++) {
      const pos = star.trail[i];
      const alpha = i / star.trail.length;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw star head
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(star.x, star.y, 3, 0, Math.PI * 2);
    ctx.shadowColor = '#fff';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;

    if (star.x > width + star.length || star.y > height + star.length) {
      shootingStars.splice(index, 1);
    }
  });

  // Occasionally spawn new shooting stars
  if (Math.random() < 0.015) {
    createShootingStar();
  }
}

// Main animation loop
function animate() {
  ctx.clearRect(0, 0, width, height);

  drawStars();
  drawGradientShapes();
  drawParticles();
  drawExplosions();
  drawShootingStars();

  requestAnimationFrame(animate);
}

// Start everything
createParticles();
createStars();
createGradientShapes();
animate();
