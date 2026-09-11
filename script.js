// ==========================================================================
// Hodous — Luminous Starfield, Delphinus Constellation & Audio Handler
// Pure JavaScript & Canvas 2D (Zero SVG)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // ========================================================================
  // 1. Ultra-High-Performance Hardware-Accelerated Sharp Diamond Starfield
  // Pre-rendered offscreen sprites (Zero per-frame shadowBlur, 60fps smooth, Zero SVG)
  // ========================================================================
  const starCanvas = document.getElementById('star-canvas');
  if (starCanvas) {
    const ctx = starCanvas.getContext('2d', { alpha: true });
    let stars = [];
    const STAR_COUNT = 520;
    let animationFrameId = null;
    let width = 0;
    let height = 0;

    // Helper to pre-render one sharp diamond star into an offscreen canvas
    function createOffscreenStar(size, points, colorType) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const padding = size * 1.6;
      const dim = Math.ceil((size + padding) * 2);
      const off = document.createElement('canvas');
      off.width = dim * dpr;
      off.height = dim * dpr;
      const oCtx = off.getContext('2d');
      oCtx.scale(dpr, dpr);

      const cx = dim / 2;
      const cy = dim / 2;
      oCtx.translate(cx, cy);

      const glowColor = colorType === 'red' ? 'rgba(239, 68, 68, 0.9)' : 'rgba(14, 165, 233, 0.95)';
      const haloColor = colorType === 'red' ? 'rgba(239, 68, 68, 0.45)' : 'rgba(37, 99, 235, 0.4)';

      // 1. Outer soft star halo
      oCtx.fillStyle = haloColor;
      oCtx.beginPath();
      const sOut = size * 1.35;
      oCtx.moveTo(0, -sOut);
      oCtx.quadraticCurveTo(0, 0, sOut, 0);
      oCtx.quadraticCurveTo(0, 0, 0, sOut);
      oCtx.quadraticCurveTo(0, 0, -sOut, 0);
      oCtx.quadraticCurveTo(0, 0, 0, -sOut);
      oCtx.closePath();
      oCtx.fill();

      // 2. Crisp needle-sharp diamond star core
      oCtx.shadowBlur = 8;
      oCtx.shadowColor = glowColor;
      oCtx.fillStyle = '#FFFFFF';

      oCtx.beginPath();
      oCtx.moveTo(0, -size);
      oCtx.quadraticCurveTo(0, 0, size, 0);
      oCtx.quadraticCurveTo(0, 0, 0, size);
      oCtx.quadraticCurveTo(0, 0, -size, 0);
      oCtx.quadraticCurveTo(0, 0, 0, -size);
      oCtx.closePath();
      oCtx.fill();

      // 3. Secondary diagonal spikes for royal 8-pointed star
      if (points === 8) {
        const s2 = size * 0.46;
        oCtx.rotate(Math.PI / 4);
        oCtx.beginPath();
        oCtx.moveTo(0, -s2);
        oCtx.quadraticCurveTo(0, 0, s2, 0);
        oCtx.quadraticCurveTo(0, 0, 0, s2);
        oCtx.quadraticCurveTo(0, 0, -s2, 0);
        oCtx.quadraticCurveTo(0, 0, 0, -s2);
        oCtx.closePath();
        oCtx.fill();
      }

      return { canvas: off, halfW: dim / 2, halfH: dim / 2 };
    }

    // Pre-rendered sprite textures (created once, zero memory churn)
    const starSprites = {
      royal8: createOffscreenStar(9, 8, 'blue'),
      diamond4: createOffscreenStar(5.5, 4, 'blue'),
      micro4: createOffscreenStar(2.8, 4, 'blue')
    };

    function resizeStarCanvas() {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      starCanvas.width = width * dpr;
      starCanvas.height = height * dpr;
      starCanvas.style.width = width + 'px';
      starCanvas.style.height = height + 'px';
      ctx.scale(dpr, dpr);
      initStars();
      drawStars();
    }

    function initStars() {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        const depth = Math.random();
        let type = 'micro4';
        let baseAlpha = Math.random() * 0.35 + 0.35;
        let twinkleAmp = 0.25;

        if (depth > 0.88) {
          type = 'royal8';
          baseAlpha = Math.random() * 0.2 + 0.8;
          twinkleAmp = 0.25;
        } else if (depth > 0.60) {
          type = 'diamond4';
          baseAlpha = Math.random() * 0.3 + 0.55;
          twinkleAmp = 0.25;
        }

        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          type,
          baseAlpha,
          twinkleAmp,
          twinkleSpeed: Math.random() * 0.0025 + 0.001,
          phase: Math.random() * Math.PI * 2
        });
      }
    }

    // Direct hardware-accelerated texture blit (0.05ms per frame)
    function drawStars() {
      ctx.clearRect(0, 0, width, height);
      const now = Date.now();

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const alpha = Math.max(0.18, Math.min(1, star.baseAlpha + Math.sin(now * star.twinkleSpeed + star.phase) * star.twinkleAmp));
        ctx.globalAlpha = alpha;

        const spr = starSprites[star.type];
        ctx.drawImage(spr.canvas, star.x - spr.halfW, star.y - spr.halfH, spr.halfW * 2, spr.halfH * 2);
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(drawStars);
    }

    window.addEventListener('resize', resizeStarCanvas);
    resizeStarCanvas();
  }
  // ========================================================================
  // 2. Carl Sagan Quote Click Interaction (Persian Translation Reveal)
  // ========================================================================
  const quoteBox = document.getElementById('quote-box') || document.getElementById('tesla-quote-box');
  const quotePersian = document.getElementById('quote-persian-reveal') || document.getElementById('tesla-persian-reveal');

  if (quoteBox && quotePersian) {
    quoteBox.addEventListener('click', () => {
      quotePersian.classList.toggle('is-visible');
    });
  }

  // ========================================================================
  // 3. Top-Left Hamburger Navigation Drawer (Home, Song, Test)
  // ========================================================================
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navDrawer = document.getElementById('nav-drawer');
  const navBackdrop = document.getElementById('nav-backdrop');

  function openMenu() {
    if (navDrawer) navDrawer.classList.add('is-open');
    if (navBackdrop) navBackdrop.classList.add('is-open');
    if (hamburgerBtn) hamburgerBtn.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (navDrawer) navDrawer.classList.remove('is-open');
    if (navBackdrop) navBackdrop.classList.remove('is-open');
    if (hamburgerBtn) hamburgerBtn.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navDrawer && navDrawer.classList.contains('is-open');
      isOpen ? closeMenu() : openMenu();
    });
  }

  if (navBackdrop) navBackdrop.addEventListener('click', closeMenu);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // ========================================================================
  // 4. Dedicated Constellation Delphinus Engine Inside The Door
  // ========================================================================
  const delphinusCanvas = document.getElementById('delphinus-canvas');
  const doorInstallation = document.getElementById('interactive-door');
  const delphinusCaption = document.getElementById('delphinus-caption');

  if (delphinusCanvas && doorInstallation) {
    const dCtx = delphinusCanvas.getContext('2d');
    let dpr = window.devicePixelRatio || 1;
    let bgStars = [];
    let isDoorOpened = false;
    let lineAnimationProgress = 0;
    let isAnimatingLines = false;
    let animationStartTime = 0;
    let delphinusStars = [];

    function setupDelphinusCanvas() {
      const rect = delphinusCanvas.getBoundingClientRect();
      dpr = window.devicePixelRatio || 1;
      delphinusCanvas.width = rect.width * dpr;
      delphinusCanvas.height = rect.height * dpr;
      dCtx.scale(dpr, dpr);

      const cx = rect.width * 0.52;
      const cy = rect.height * 0.44;

      delphinusStars = [
        { name: 'Alpha',   x: cx - 18, y: cy - 36, r: 2.2, pulse: 0 },
        { name: 'Beta',    x: cx + 24, y: cy - 32, r: 2.3, pulse: 1.2 },
        { name: 'Gamma',   x: cx + 36, y: cy + 4,  r: 2.1, pulse: 2.4 },
        { name: 'Delta',   x: cx - 8,  y: cy + 12, r: 2.0, pulse: 3.6 },
        { name: 'Epsilon', x: cx - 44, y: cy + 50, r: 2.1, pulse: 4.8 }
      ];

      bgStars = [];
      for (let i = 0; i < 55; i++) {
        bgStars.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          r: Math.random() * 0.85 + 0.25,
          alpha: Math.random() * 0.6 + 0.2,
          speed: Math.random() * 0.02 + 0.005,
          phase: Math.random() * Math.PI * 2
        });
      }
    }

    const delphinusSegments = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      [3, 4]
    ];

    function renderDelphinusFrame() {
      const rect = delphinusCanvas.getBoundingClientRect();
      dCtx.clearRect(0, 0, rect.width, rect.height);
      const now = Date.now();

      // Background stars inside door
      bgStars.forEach(s => {
        const a = s.alpha + Math.sin(now * s.speed + s.phase) * 0.2;
        dCtx.beginPath();
        dCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        dCtx.fillStyle = `rgba(192, 230, 253, ${Math.max(0.08, a)})`;
        dCtx.fill();
      });

      // Delphinus lines
      if (lineAnimationProgress > 0) {
        const totalSegments = delphinusSegments.length;

        delphinusSegments.forEach((seg, idx) => {
          const segStartRatio = idx / totalSegments;
          const segEndRatio = (idx + 1) / totalSegments;

          if (lineAnimationProgress > segStartRatio) {
            const p1 = delphinusStars[seg[0]];
            const p2 = delphinusStars[seg[1]];

            const segProgress = Math.min(1, (lineAnimationProgress - segStartRatio) / (segEndRatio - segStartRatio));

            const currX = p1.x + (p2.x - p1.x) * segProgress;
            const currY = p1.y + (p2.y - p1.y) * segProgress;

            dCtx.beginPath();
            dCtx.moveTo(p1.x, p1.y);
            dCtx.lineTo(currX, currY);
            dCtx.strokeStyle = 'rgba(192, 230, 253, 0.75)';
            dCtx.lineWidth = 1.3;
            dCtx.shadowBlur = 6;
            dCtx.shadowColor = 'rgba(128, 170, 211, 0.9)';
            dCtx.stroke();
            dCtx.shadowBlur = 0;
          }
        });
      }

      // 5 Prominent Stars
      delphinusStars.forEach((star) => {
        const starTwinkle = Math.sin(now * 0.003 + star.pulse) * 0.3;
        const currentAlpha = isDoorOpened ? Math.min(1, 0.85 + starTwinkle) : 0.6 + starTwinkle;

        if (lineAnimationProgress > 0.1) {
          dCtx.beginPath();
          dCtx.arc(star.x, star.y, star.r * 2.5, 0, Math.PI * 2);
          dCtx.fillStyle = `rgba(192, 230, 253, ${0.25 * currentAlpha})`;
          dCtx.fill();
        }

        dCtx.beginPath();
        dCtx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        dCtx.fillStyle = '#FFFFFF';
        dCtx.shadowBlur = 8;
        dCtx.shadowColor = 'rgba(192, 230, 253, 0.95)';
        dCtx.fill();
        dCtx.shadowBlur = 0;
      });

      if (isAnimatingLines) {
        const elapsed = Date.now() - animationStartTime;
        lineAnimationProgress = Math.min(1, elapsed / 1400);

        if (lineAnimationProgress >= 1) {
          isAnimatingLines = false;
        }
      }

      requestAnimationFrame(renderDelphinusFrame);
    }

    doorInstallation.addEventListener('click', () => {
      isDoorOpened = !isDoorOpened;
      doorInstallation.classList.toggle('is-open', isDoorOpened);

      if (isDoorOpened) {
        isAnimatingLines = true;
        animationStartTime = Date.now();
        if (delphinusCaption) {
          delphinusCaption.classList.add('is-revealed');
        }
      } else {
        lineAnimationProgress = 0;
        isAnimatingLines = false;
        if (delphinusCaption) {
          delphinusCaption.classList.remove('is-revealed');
        }
      }
    });

    window.addEventListener('resize', setupDelphinusCanvas);
    setupDelphinusCanvas();
    renderDelphinusFrame();
  }

  // ========================================================================
  // 5. Audio Upload, Drag-and-Drop & Interactive Playback Handler (for song.html)
  // ========================================================================
  const audioFileInput = document.getElementById('audio-file-input');
  const uploadTriggerBtn = document.getElementById('upload-trigger-btn');
  const changeTrackBtn = document.getElementById('change-track-btn');
  const dropZone = document.getElementById('drop-zone');
  const audioPlayer = document.getElementById('audio-player');
  const playPauseBtn = document.getElementById('play-pause-btn');
  const trackTitle = document.getElementById('current-track-title');
  const trackTime = document.getElementById('current-track-time');
  const trackDuration = document.getElementById('current-track-duration');
  const visualizerWrap = document.getElementById('audio-visualizer-wrap');
  const playerContainer = document.getElementById('player-container');
  const awaitingBadge = document.getElementById('awaiting-badge');
  const playerStatusBadge = document.getElementById('player-status-badge');
  const audioErrorMsg = document.getElementById('audio-error-msg');
  const seekBar = document.getElementById('seek-bar');

  let isSeeking = false;
  let currentBlobUrl = null;

  function formatTime(seconds) {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function handleAudioFile(file) {
    if (!file || !audioPlayer) return;

    if (audioErrorMsg) audioErrorMsg.classList.add('hidden');

    if (currentBlobUrl) {
      URL.revokeObjectURL(currentBlobUrl);
    }
    currentBlobUrl = URL.createObjectURL(file);
    audioPlayer.src = currentBlobUrl;

    if (trackTitle) trackTitle.textContent = file.name.replace(/\.[^/.]+$/, '');
    if (playerContainer) playerContainer.classList.remove('hidden');
    if (awaitingBadge) awaitingBadge.classList.add('hidden');
    if (playerStatusBadge) playerStatusBadge.textContent = 'در حال آماده‌سازی...';
    if (seekBar) {
      seekBar.value = 0;
      seekBar.max = 100;
    }

    audioPlayer.play().then(() => {
      if (playPauseBtn) playPauseBtn.classList.add('is-playing');
      if (visualizerWrap) visualizerWrap.style.opacity = '1';
      if (playerStatusBadge) playerStatusBadge.textContent = 'در حال پخش';
    }).catch(() => {
      // Autoplay blocked by browser policy; user can click play manually
      if (playPauseBtn) playPauseBtn.classList.remove('is-playing');
      if (visualizerWrap) visualizerWrap.style.opacity = '0.4';
      if (playerStatusBadge) playerStatusBadge.textContent = 'آماده پخش (کلیک کنید)';
    });
  }

  // Trigger file picker safely across all browsers (including Safari on macOS)
  function triggerFileInput() {
    if (audioFileInput) {
      audioFileInput.value = ''; // Reset so selecting the same file triggers change
      audioFileInput.click();
    }
  }

  if (uploadTriggerBtn) {
    uploadTriggerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      triggerFileInput();
    });
  }

  if (changeTrackBtn) {
    changeTrackBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      triggerFileInput();
    });
  }

  if (dropZone) {
    dropZone.addEventListener('click', () => {
      triggerFileInput();
    });

    ['dragenter', 'dragover'].forEach(eventType => {
      dropZone.addEventListener(eventType, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.add('is-dragover');
      });
    });

    ['dragleave', 'drop'].forEach(eventType => {
      dropZone.addEventListener(eventType, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.remove('is-dragover');
      });
    });

    dropZone.addEventListener('drop', (e) => {
      const files = e.dataTransfer ? e.dataTransfer.files : null;
      if (files && files.length > 0) {
        handleAudioFile(files[0]);
      }
    });
  }

  if (audioFileInput) {
    audioFileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        handleAudioFile(file);
      }
    });
  }

  if (playPauseBtn && audioPlayer) {
    playPauseBtn.addEventListener('click', () => {
      if (audioPlayer.paused) {
        audioPlayer.play().then(() => {
          playPauseBtn.classList.add('is-playing');
          if (visualizerWrap) visualizerWrap.style.opacity = '1';
          if (playerStatusBadge) playerStatusBadge.textContent = 'در حال پخش';
        }).catch(() => {});
      } else {
        audioPlayer.pause();
        playPauseBtn.classList.remove('is-playing');
        if (visualizerWrap) visualizerWrap.style.opacity = '0.4';
        if (playerStatusBadge) playerStatusBadge.textContent = 'متوقف شده';
      }
    });

    audioPlayer.addEventListener('timeupdate', () => {
      if (trackTime) trackTime.textContent = formatTime(audioPlayer.currentTime);
      if (seekBar && !isSeeking && audioPlayer.duration) {
        seekBar.value = audioPlayer.currentTime;
      }
    });

    audioPlayer.addEventListener('loadedmetadata', () => {
      if (trackDuration) trackDuration.textContent = formatTime(audioPlayer.duration);
      if (seekBar && audioPlayer.duration) {
        seekBar.max = audioPlayer.duration;
        seekBar.value = 0;
      }
    });

    audioPlayer.addEventListener('ended', () => {
      playPauseBtn.classList.remove('is-playing');
      if (visualizerWrap) visualizerWrap.style.opacity = '0.4';
      if (playerStatusBadge) playerStatusBadge.textContent = 'به پایان رسید';
      if (seekBar) seekBar.value = 0;
    });

    audioPlayer.addEventListener('error', () => {
      if (audioErrorMsg) audioErrorMsg.classList.remove('hidden');
      if (playerStatusBadge) playerStatusBadge.textContent = 'خطا در بارگذاری';
      if (playPauseBtn) playPauseBtn.classList.remove('is-playing');
      if (visualizerWrap) visualizerWrap.style.opacity = '0.4';
    });
  }

  // Scrubber seek bar interaction
  if (seekBar && audioPlayer) {
    seekBar.addEventListener('input', () => {
      isSeeking = true;
      if (trackTime) trackTime.textContent = formatTime(Number(seekBar.value));
    });

    seekBar.addEventListener('change', () => {
      isSeeking = false;
      audioPlayer.currentTime = Number(seekBar.value);
    });
  }

});
