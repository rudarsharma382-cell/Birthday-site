/**
 * ============================================================================
 * ANTI-GRAVITY LUXURY • NAKSH DAHIYA BIRTHDAY EXPERIENCE
 * World-Class Interactive Engine & Creative Technology
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // --------------------------------------------------------------------------
  // 1. THREE.JS 3D ANTI-GRAVITY COSMIC ENVIRONMENT
  // --------------------------------------------------------------------------
  initThreeCosmos();

  // --------------------------------------------------------------------------
  // 2. AUDIO ATMOSPHERE & SYNTHESIZER SOUND ENGINE
  // --------------------------------------------------------------------------
  initAudioEngine();

  // --------------------------------------------------------------------------
  // 3. CUSTOM STARDUST CURSOR
  // --------------------------------------------------------------------------
  initCustomCursor();

  // --------------------------------------------------------------------------
  // 4. 3D TILT ENGINE (HARDWARE-ACCELERATED MOUSE TRACKING)
  // --------------------------------------------------------------------------
  init3DTiltEngine();

  // --------------------------------------------------------------------------
  // 5. GSAP TIMELINES & SCROLL PARALLAX
  // --------------------------------------------------------------------------
  initGSAPAnimations();

  // --------------------------------------------------------------------------
  // 6. MEMORY LANE CAROUSEL & LIGHTBOX
  // --------------------------------------------------------------------------
  initMemoryCarousel();

  // --------------------------------------------------------------------------
  // 7. TYPEWRITER MONUMENT (THE TRIBUTE)
  // --------------------------------------------------------------------------
  initTributeTypewriter();

  // --------------------------------------------------------------------------
  // 8. INTERACTIVE "MAKE A WISH" & CANDLE CEREMONY
  // --------------------------------------------------------------------------
  initWishCeremony();

  // --------------------------------------------------------------------------
  // 9. VIP WISHES WALL (GUESTBOOK)
  // --------------------------------------------------------------------------
  initWishesGuestbook();
});

/* ============================================================================
   1. THREE.JS ANTI-GRAVITY COSMOS
   ============================================================================ */
function initThreeCosmos() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas || !window.THREE) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 40;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Cosmic Stardust Particles (Anti-Gravity upward drift)
  const particleCount = 1200;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const speeds = new Float32Array(particleCount);

  const goldColor = new THREE.Color(0xffd269);
  const cyanColor = new THREE.Color(0x00f2fe);
  const whiteColor = new THREE.Color(0xffffff);
  const magentaColor = new THREE.Color(0xff007f);

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 120;
    positions[i3 + 1] = (Math.random() - 0.5) * 120;
    positions[i3 + 2] = (Math.random() - 0.5) * 90;

    speeds[i] = 0.02 + Math.random() * 0.06;

    // Distribute luxury color palette
    const rand = Math.random();
    let col = goldColor;
    if (rand < 0.4) col = goldColor;
    else if (rand < 0.7) col = cyanColor;
    else if (rand < 0.85) col = whiteColor;
    else col = magentaColor;

    colors[i3] = col.r;
    colors[i3 + 1] = col.g;
    colors[i3 + 2] = col.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // Circular point texture
  const pCanvas = document.createElement('canvas');
  pCanvas.width = 16;
  pCanvas.height = 16;
  const ctx = pCanvas.getContext('2d');
  const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.4, 'rgba(255,255,255,0.8)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 16, 16);
  const pTexture = new THREE.CanvasTexture(pCanvas);

  const material = new THREE.PointsMaterial({
    size: 0.9,
    vertexColors: true,
    transparent: true,
    opacity: 0.75,
    map: pTexture,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // Floating 3D Zero-Gravity Geometries
  const shapesGroup = new THREE.Group();
  const shapeGeoms = [
    new THREE.IcosahedronGeometry(1.6, 0),
    new THREE.OctahedronGeometry(1.4, 0),
    new THREE.TetrahedronGeometry(1.5, 0),
    new THREE.TorusGeometry(1.5, 0.25, 8, 24)
  ];

  const floatingMeshes = [];
  for (let i = 0; i < 14; i++) {
    const geom = shapeGeoms[i % shapeGeoms.length];
    const isGold = i % 2 === 0;
    const meshMat = new THREE.MeshBasicMaterial({
      color: isGold ? 0xffd269 : 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.22
    });
    const mesh = new THREE.Mesh(geom, meshMat);
    mesh.position.set(
      (Math.random() - 0.5) * 80,
      (Math.random() - 0.5) * 80,
      (Math.random() - 0.5) * 40
    );
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    mesh.userData = {
      rotX: (Math.random() - 0.5) * 0.015,
      rotY: (Math.random() - 0.5) * 0.015,
      floatSpeed: 0.01 + Math.random() * 0.02,
      origY: mesh.position.y
    };
    shapesGroup.add(mesh);
    floatingMeshes.push(mesh);
  }
  scene.add(shapesGroup);

  // Mouse Interactivity
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Render Loop
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Smooth camera inertia towards cursor
    targetX += (mouseX * 5 - targetX) * 0.05;
    targetY += (-mouseY * 5 - targetY) * 0.05;
    camera.position.x = targetX;
    camera.position.y = targetY;
    camera.lookAt(0, 0, 0);

    // Particle Anti-Gravity Upward Motion
    const pos = geometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      pos[i3 + 1] += speeds[i]; // Anti-gravity drift up
      if (pos[i3 + 1] > 60) {
        pos[i3 + 1] = -60;
      }
    }
    geometry.attributes.position.needsUpdate = true;
    particles.rotation.y = elapsedTime * 0.02;

    // Geometric Shapes Floating
    floatingMeshes.forEach((mesh) => {
      mesh.rotation.x += mesh.userData.rotX;
      mesh.rotation.y += mesh.userData.rotY;
      mesh.position.y += Math.sin(elapsedTime * 1.5 + mesh.position.x) * 0.03;
    });

    renderer.render(scene, camera);
  }
  animate();
}

/* ============================================================================
   2. AUDIO ATMOSPHERE ENGINE (WEB AUDIO API SYNTHESIZER)
   ============================================================================ */
let audioCtx = null;
let isPlayingSoundscape = false;
let chordInterval = null;

function initAudioEngine() {
  const toggleBtn = document.getElementById('soundtrack-toggle');
  const soundLabel = document.getElementById('sound-label');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    isPlayingSoundscape = !isPlayingSoundscape;

    if (isPlayingSoundscape) {
      toggleBtn.classList.add('sound-active');
      soundLabel.textContent = 'Soundscape: On';
      soundLabel.classList.add('text-cyan-300');
      startAmbientSynth();
    } else {
      toggleBtn.classList.remove('sound-active');
      soundLabel.textContent = 'Soundscape: Off';
      soundLabel.classList.remove('text-cyan-300');
      stopAmbientSynth();
    }
  });
}

function startAmbientSynth() {
  if (!audioCtx) return;

  // Lofi / Ethereal Luxury Chords (Fmaj9, Cmaj7, Dm9, Am7)
  const chordProgressions = [
    [174.61, 220.00, 261.63, 329.63, 392.00], // Fmaj9
    [130.81, 164.81, 196.00, 246.94, 293.66], // Cmaj7
    [146.83, 174.61, 220.00, 261.63, 329.63], // Dm9
    [110.00, 130.81, 164.81, 196.00, 246.94]  // Am7
  ];

  let currentStep = 0;

  function playChord(frequencies) {
    if (!isPlayingSoundscape || !audioCtx) return;

    frequencies.forEach((freq) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.025, audioCtx.currentTime + 1.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 4.8);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 5.0);
    });

    currentStep = (currentStep + 1) % chordProgressions.length;
  }

  playChord(chordProgressions[0]);
  chordInterval = setInterval(() => {
    if (isPlayingSoundscape) {
      playChord(chordProgressions[currentStep]);
    }
  }, 4800);
}

function stopAmbientSynth() {
  if (chordInterval) {
    clearInterval(chordInterval);
    chordInterval = null;
  }
}

// Celebration Chime Sound Effect
function playCelebrationChime() {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; // C5 to G6 arpeggio
    notes.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0.001, audioCtx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + idx * 0.08 + 1.4);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(audioCtx.currentTime + idx * 0.08);
      osc.stop(audioCtx.currentTime + idx * 0.08 + 1.5);
    });
  } catch (err) {
    console.log('Audio chime info:', err);
  }
}

/* ============================================================================
   3. CUSTOM STARDUST CURSOR
   ============================================================================ */
function initCustomCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  // Lerp smoothing for cursor ring
  function updateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(updateRing);
  }
  updateRing();

  // Hover expansion on interactive triggers
  const interactives = document.querySelectorAll('button, a, input, textarea, .tilt-card, .polaroid-card');
  interactives.forEach((el) => {
    el.addEventListener('mouseenter', () => ring.classList.add('active'));
    el.addEventListener('mouseleave', () => ring.classList.remove('active'));
  });
}

/* ============================================================================
   4. 3D TILT ENGINE (HARDWARE-ACCELERATED)
   ============================================================================ */
function init3DTiltEngine() {
  const tiltElements = document.querySelectorAll('[data-tilt], .tilt-card, .tilt-btn');

  tiltElements.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angles (max 15 deg)
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
  });
}

/* ============================================================================
   5. GSAP TIMELINES & SCROLL PARALLAX
   ============================================================================ */
function initGSAPAnimations() {
  if (!window.gsap) return;

  if (window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Hero Section Reveal Timeline
  const heroTL = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.2 } });

  heroTL
    .from('.hero-badge', { y: -30, opacity: 0, duration: 0.9 })
    .from('.hero-fade-in', { y: 30, opacity: 0, stagger: 0.15 }, '-=0.5')
    .from('.naksh-calligraphy', {
      scale: 0.85,
      opacity: 0,
      filter: 'blur(10px)',
      duration: 1.4,
      ease: 'expo.out'
    }, '-=0.9')
    .from('.hero-avatar-wrapper', {
      y: 50,
      opacity: 0,
      rotateX: 20,
      duration: 1.3
    }, '-=0.8');

  // Parallax ScrollTrigger for Sections
  if (window.ScrollTrigger) {
    // Milestones entrance
    gsap.from('.stat-card', {
      scrollTrigger: {
        trigger: '#milestones',
        start: 'top 80%'
      },
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: 'power2.out'
    });

    // Gallery entrance
    gsap.from('.polaroid-card', {
      scrollTrigger: {
        trigger: '#gallery',
        start: 'top 75%'
      },
      y: 60,
      opacity: 0,
      stagger: 0.12,
      duration: 1.2,
      ease: 'power3.out'
    });

    // Tribute entrance
    gsap.from('.glass-monolith', {
      scrollTrigger: {
        trigger: '#tribute',
        start: 'top 75%'
      },
      y: 45,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      onComplete: () => {
        // Trigger typewriter when tribute scrolls into view if not yet started
        if (!hasTypewriterStarted) {
          startTypewriter();
        }
      }
    });
  }
}

/* ============================================================================
   6. MEMORY LANE CAROUSEL & LIGHTBOX
   ============================================================================ */
let isAutoDriftActive = true;
let driftInterval = null;

function initMemoryCarousel() {
  const viewport = document.querySelector('.carousel-viewport');
  const track = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const autoToggle = document.getElementById('carousel-autoplay-toggle');
  const autoDot = document.getElementById('autoplay-dot');
  const autoText = document.getElementById('autoplay-text');

  if (!viewport || !track) return;

  const scrollAmount = 330;

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      viewport.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      viewport.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  // Auto Drift Engine
  function startAutoDrift() {
    if (driftInterval) clearInterval(driftInterval);
    driftInterval = setInterval(() => {
      if (!isAutoDriftActive) return;
      if (viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 10) {
        viewport.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        viewport.scrollBy({ left: 2, behavior: 'auto' });
      }
    }, 30);
  }
  startAutoDrift();

  // Pause auto-drift on mouse hover
  viewport.addEventListener('mouseenter', () => {
    isAutoDriftActive = false;
  });
  viewport.addEventListener('mouseleave', () => {
    const isPausedByUser = autoDot.classList.contains('bg-rose-400');
    if (!isPausedByUser) isAutoDriftActive = true;
  });

  if (autoToggle) {
    autoToggle.addEventListener('click', () => {
      if (isAutoDriftActive) {
        isAutoDriftActive = false;
        autoDot.classList.replace('bg-emerald-400', 'bg-rose-400');
        autoText.textContent = 'Auto Drift: Paused';
      } else {
        isAutoDriftActive = true;
        autoDot.classList.replace('bg-rose-400', 'bg-emerald-400');
        autoText.textContent = 'Auto Drift: Active';
      }
    });
  }

  // Lightbox Modal Setup
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDate = document.getElementById('lightbox-date');
  const lightboxClose = document.getElementById('lightbox-close');

  function openLightbox(imgSrc, title, date) {
    if (!lightboxModal) return;
    lightboxImg.src = imgSrc;
    lightboxTitle.textContent = title || 'A Memorable Chapter';
    lightboxDate.textContent = date || 'ARCHIVES • 2026';
    lightboxModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // Attach Lightbox to Polaroid Cards
  document.querySelectorAll('.polaroid-card:not(#upload-polaroid-card)').forEach((card) => {
    card.addEventListener('click', () => {
      const img = card.dataset.img || card.querySelector('img')?.src;
      const caption = card.dataset.caption || card.querySelector('h3')?.textContent;
      const date = card.dataset.date || card.querySelector('p')?.textContent;
      if (img) openLightbox(img, caption, date);
    });
  });

  // Custom Photo Upload Integration
  const uploadCard = document.getElementById('upload-polaroid-card');
  const customFileInput = document.getElementById('custom-photo-input');

  if (uploadCard && customFileInput) {
    uploadCard.addEventListener('click', () => {
      customFileInput.click();
    });

    customFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const newCard = document.createElement('div');
        newCard.className = 'polaroid-card group flex-shrink-0 tilt-card';
        newCard.setAttribute('data-tilt', '');
        newCard.dataset.caption = 'User Memory Milestone';
        newCard.dataset.date = 'PERSONAL VAULT • 2026';
        newCard.dataset.img = event.target.result;

        newCard.innerHTML = `
          <div class="polaroid-pin"></div>
          <div class="polaroid-inner">
            <div class="polaroid-frame relative overflow-hidden rounded-lg">
              <img src="${event.target.result}" alt="Naksh Custom Memory" class="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700">
              <div class="polaroid-glare"></div>
              <div class="polaroid-badge">NEW</div>
            </div>
            <div class="polaroid-caption pt-4 pb-1 text-center">
              <h3 class="font-calligraphy text-2xl text-gold-300">New Memory Added</h3>
              <p class="font-syncopate text-[10px] uppercase tracking-widest text-slate-400 mt-1">Uploaded Just Now</p>
            </div>
          </div>
        `;

        newCard.addEventListener('click', () => {
          openLightbox(event.target.result, 'New Memory Added', 'Uploaded Just Now');
        });

        track.insertBefore(newCard, uploadCard);
        init3DTiltEngine();
        showToast('Photo added to Memory Lane!');
      };
      reader.readAsDataURL(file);
    });
  }
}

/* ============================================================================
   7. TYPEWRITER MONUMENT (THE TRIBUTE)
   ============================================================================ */
let defaultTributeMessage = 
`To Naksh Dahiya —

A visionary in thought, relentless in pursuit, and genuinely magnetic in spirit. You don't merely walk into a room; you elevate it. Today is a celebration of the laughter you ignite, the frontiers you conquer, and the extraordinary legacy you continue to build.

As you step into this next orbit, may every ambitious dream align, may gravity never anchor your aspirations, and may life reward you with the timeless grandeur and joy you deserve.

Happy Birthday, Legend. Keep soaring beyond the stars.`;

let hasTypewriterStarted = false;
let typewriterTimeout = null;

function initTributeTypewriter() {
  const replayBtn = document.getElementById('replay-typewriter-btn');
  const copyBtn = document.getElementById('copy-tribute-btn');
  const editBtn = document.getElementById('edit-tribute-btn');
  const editModal = document.getElementById('edit-modal');
  const cancelEditBtn = document.getElementById('cancel-edit-btn');
  const saveEditBtn = document.getElementById('save-edit-btn');
  const customMessageInput = document.getElementById('custom-message-input');

  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      startTypewriter();
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(defaultTributeMessage).then(() => {
        showToast('Tribute copied to clipboard!');
      });
    });
  }

  if (editBtn && editModal && customMessageInput) {
    editBtn.addEventListener('click', () => {
      customMessageInput.value = defaultTributeMessage;
      editModal.classList.remove('hidden');
    });

    cancelEditBtn.addEventListener('click', () => {
      editModal.classList.add('hidden');
    });

    saveEditBtn.addEventListener('click', () => {
      const val = customMessageInput.value.trim();
      if (val) {
        defaultTributeMessage = val;
        editModal.classList.add('hidden');
        startTypewriter();
        showToast('Custom message saved!');
      }
    });
  }

  // Guaranteed IntersectionObserver fallback
  const tributeSection = document.getElementById('tribute');
  if (tributeSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasTypewriterStarted) {
          startTypewriter();
          observer.disconnect();
        }
      });
    }, { threshold: 0.25 });
    observer.observe(tributeSection);
  }
}

function startTypewriter() {
  hasTypewriterStarted = true;
  const container = document.getElementById('typewriter-text');
  if (!container) return;

  if (typewriterTimeout) clearTimeout(typewriterTimeout);
  container.innerHTML = '';

  let i = 0;
  const speed = 22; // ms per character

  function typeChar() {
    if (i < defaultTributeMessage.length) {
      const char = defaultTributeMessage.charAt(i);
      if (char === '\n') {
        container.innerHTML += '<br>';
      } else {
        container.innerHTML += char;
      }
      i++;
      typewriterTimeout = setTimeout(typeChar, speed);
    }
  }

  typeChar();
}

/* ============================================================================
   8. INTERACTIVE "MAKE A WISH" & CANDLE CEREMONY
   ============================================================================ */
function initWishCeremony() {
  const blowBtn = document.getElementById('blow-candle-btn');
  const candleFlame = document.getElementById('candle-flame');
  const wishDecree = document.getElementById('wish-decree');
  const confettiMoreBtn = document.getElementById('confetti-more-btn');
  const heroConfettiBtn = document.getElementById('hero-confetti-btn');

  function triggerCelebration() {
    playCelebrationChime();

    // Detonate 3D Confetti Storm
    launchGrandConfetti();

    if (wishDecree) {
      wishDecree.classList.remove('hidden');
      wishDecree.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    if (candleFlame) {
      candleFlame.classList.add('animate-pulse');
      setTimeout(() => candleFlame.classList.remove('animate-pulse'), 3000);
    }
  }

  if (blowBtn) {
    blowBtn.addEventListener('click', triggerCelebration);
  }

  if (candleFlame) {
    candleFlame.addEventListener('click', triggerCelebration);
  }

  if (confettiMoreBtn) {
    confettiMoreBtn.addEventListener('click', () => {
      playCelebrationChime();
      launchGrandConfetti();
    });
  }

  if (heroConfettiBtn) {
    heroConfettiBtn.addEventListener('click', () => {
      playCelebrationChime();
      launchGrandConfetti();
    });
  }
}

function launchGrandConfetti() {
  if (!window.confetti) return;

  // Gold & Cyan Luxury Color Palette
  const colors = ['#ffd269', '#e5a93b', '#00f2fe', '#ffffff', '#ff007f'];

  // Blast 1: Center Starburst
  window.confetti({
    particleCount: 100,
    spread: 90,
    origin: { y: 0.6 },
    colors
  });

  // Blast 2: Left Cosmic Cannon
  setTimeout(() => {
    window.confetti({
      particleCount: 60,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.7 },
      colors
    });
  }, 250);

  // Blast 3: Right Cosmic Cannon
  setTimeout(() => {
    window.confetti({
      particleCount: 60,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.7 },
      colors
    });
  }, 450);
}

/* ============================================================================
   9. VIP WISHES WALL (GUESTBOOK)
   ============================================================================ */
function initWishesGuestbook() {
  const form = document.getElementById('add-wish-form');
  const container = document.getElementById('wishes-container');
  const emojiButtons = document.querySelectorAll('.emoji-btn');

  let selectedEmoji = '👑';

  emojiButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      emojiButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      selectedEmoji = btn.dataset.emoji || '👑';
    });
  });

  if (form && container) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const authorInput = document.getElementById('wish-author');
      const messageInput = document.getElementById('wish-message');

      const author = authorInput.value.trim();
      const message = messageInput.value.trim();

      if (!author || !message) return;

      const initials = author.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase() || 'VIP';

      const card = document.createElement('div');
      card.className = 'wish-card tilt-card glass-card p-6 rounded-2xl border border-white/10 group';
      card.setAttribute('data-tilt', '');

      card.innerHTML = `
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-gold-400/20 border border-gold-400/40 flex items-center justify-center font-cinzel font-bold text-gold-300 text-xs">
              ${initials}
            </div>
            <div>
              <h4 class="font-cinzel text-sm font-bold text-white">${escapeHTML(author)}</h4>
              <span class="text-[10px] font-syncopate text-cyan-400 uppercase tracking-widest">Orbit Transmission</span>
            </div>
          </div>
          <span class="text-xl">${selectedEmoji}</span>
        </div>
        <p class="font-montserrat text-xs text-slate-300 leading-relaxed font-light">
          "${escapeHTML(message)}"
        </p>
      `;

      container.prepend(card);
      init3DTiltEngine();
      form.reset();
      showToast('Wish transmitted into orbit!');
      playCelebrationChime();
    });
  }
}

// Utility: Toast notification
function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  if (!toast || !toastText) return;

  toastText.textContent = msg;
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3500);
}

// Utility: Escape HTML for security
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}
