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
    const STAR_COUNT = 130;
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
        let baseAlpha = Math.random() * 0.3 + 0.35;
        let twinkleAmp = 0.2;

        if (depth > 0.90) {
          type = 'royal8';
          baseAlpha = Math.random() * 0.25 + 0.75;
          twinkleAmp = 0.22;
        } else if (depth > 0.68) {
          type = 'diamond4';
          baseAlpha = Math.random() * 0.25 + 0.5;
          twinkleAmp = 0.2;
        }

        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          type,
          baseAlpha,
          twinkleAmp,
          twinkleSpeed: Math.random() * 0.0012 + 0.0004,
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
  // 5. Scattered Cosmic Sonic Constellation & Floating Master Dock Player
  // ========================================================================
  const COSMIC_SONGS = [
    {
      id: "taylor_swift_rwylm",
      title: "right where you left me",
      artist: "Taylor Swift",
      album: "evermore",
      cover: "covers/taylor_swift_rwylm.jpg",
      src: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/25/6e/18/256e1844-520d-f229-95e2-bbed3d0f1e5f/mzaf_10038194974124687672.plus.aac.p.m4a"
    },
    {
      id: "olivia_rodrigo_vampire",
      title: "vampire",
      artist: "Olivia Rodrigo",
      album: "GUTS",
      cover: "covers/olivia_rodrigo_vampire.jpg",
      src: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/83/09/5e/83095ea1-83bf-ecdc-3b75-358c350fca51/mzaf_15560849688086702972.plus.aac.p.m4a"
    },
    {
      id: "olivia_rodrigo_drivers_license",
      title: "drivers license",
      artist: "Olivia Rodrigo",
      album: "SOUR",
      cover: "covers/olivia_rodrigo_drivers_license.jpg",
      src: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/36/62/61/366261be-0996-d73d-de6f-03417867c800/mzaf_8201528327761821135.plus.aac.p.m4a"
    },
    {
      id: "olivia_rodrigo_deja_vu",
      title: "deja vu",
      artist: "Olivia Rodrigo",
      album: "SOUR",
      cover: "covers/olivia_rodrigo_deja_vu.jpg",
      src: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/83/5a/c2/835ac220-f31a-006f-b6a9-2acd29eb60d0/mzaf_13621843495437485054.plus.aac.p.m4a"
    },
    {
      id: "olivia_rodrigo_so_american",
      title: "so american",
      artist: "Olivia Rodrigo",
      album: "GUTS (spilled)",
      cover: "covers/olivia_rodrigo_so_american.jpg",
      src: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/43/13/c9/4313c92b-cf1c-0191-45ef-58e0f1eac07f/mzaf_15738418925021275838.plus.aac.p.m4a"
    },
    {
      id: "taylor_swift_cardigan",
      title: "cardigan",
      artist: "Taylor Swift",
      album: "folklore",
      cover: "covers/taylor_swift_cardigan.jpg",
      src: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/00/b3/f2/00b3f2a0-3228-b65f-7189-91eb26f5adf6/mzaf_3535055549125623460.plus.aac.p.m4a"
    },
    {
      id: "taylor_swift_mirrorball",
      title: "mirrorball",
      artist: "Taylor Swift",
      album: "folklore",
      cover: "covers/taylor_swift_mirrorball.jpg",
      src: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/7a/2d/aa/7a2daade-83e3-adb0-fb25-fe20222048f7/mzaf_9666965367070228287.plus.aac.p.m4a"
    },
    {
      id: "gracie_abrams_iloveyou",
      title: "I Love You, I'm Sorry",
      artist: "Gracie Abrams",
      album: "The Secret of Us",
      cover: "covers/gracie_abrams_iloveyou.jpg",
      src: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/68/8a/ff/688aff5f-ed4e-35c7-ced5-1b49f9756192/mzaf_17413493764668561277.plus.aac.p.m4a"
    }
  ];

  const constellationGrid = document.getElementById('cosmic-constellation');
  const dockAudio = document.getElementById('dock-audio-element');
  const dockPlayBtn = document.getElementById('dock-play-btn');
  const dockPrevBtn = document.getElementById('dock-prev-btn');
  const dockNextBtn = document.getElementById('dock-next-btn');
  const dockCoverThumb = document.getElementById('dock-cover-thumb');
  const dockTrackTitle = document.getElementById('dock-track-title');
  const dockTrackArtist = document.getElementById('dock-track-artist');
  const dockSeekBar = document.getElementById('dock-seek-bar');
  const dockTimeCurrent = document.getElementById('dock-time-current');
  const dockTimeDuration = document.getElementById('dock-time-duration');
  const visualizerWrap = document.getElementById('audio-visualizer-wrap');

  let activeTrackIndex = 0;
  let isSeekingDock = false;

  function formatTimeDisplay(sec) {
    if (isNaN(sec) || !isFinite(sec)) return '0:00';
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function renderCosmicConstellation() {
    if (!constellationGrid) return;
    constellationGrid.innerHTML = '';

    COSMIC_SONGS.forEach((song, idx) => {
      const isCurrent = (idx === activeTrackIndex);
      const isPlaying = isCurrent && dockAudio && !dockAudio.paused;

      const card = document.createElement('div');
      card.className = `cosmic-track-card ${isCurrent && isPlaying ? 'is-active-playing' : ''}`;
      card.dataset.index = idx;

      card.innerHTML = `
        <div class="track-cover-frame">
          <img src="${song.cover}" alt="${song.title}" class="track-cover-img" loading="lazy" />
          <div class="track-play-overlay">
            <div class="play-orb-disc">
              <span class="card-play-symbol">${isCurrent && isPlaying ? '❚❚' : '▶'}</span>
              <div class="card-equalizer">
                <span class="equalizer-bar"></span>
                <span class="equalizer-bar"></span>
                <span class="equalizer-bar"></span>
                <span class="equalizer-bar"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full text-center px-1" dir="rtl">
          <p class="text-xs sm:text-sm font-semibold text-[#0B223D] truncate">
            ${song.title}
          </p>
          <p class="text-[11px] text-[#5B86B6] truncate mt-0.5">
            ${song.artist} • <span class="text-[#80AAD3]">${song.album}</span>
          </p>
        </div>
      `;

      card.addEventListener('click', () => {
        if (activeTrackIndex === idx) {
          togglePlayPause();
        } else {
          loadAndPlayCosmicTrack(idx, true);
        }
      });

      constellationGrid.appendChild(card);
    });
  }

  function updateActiveCardVisuals() {
    if (!constellationGrid) return;
    const cards = constellationGrid.querySelectorAll('.cosmic-track-card');
    const isPlaying = dockAudio && !dockAudio.paused;

    cards.forEach((card, idx) => {
      const isCurrent = (idx === activeTrackIndex);
      if (isCurrent && isPlaying) {
        card.classList.add('is-active-playing');
      } else {
        card.classList.remove('is-active-playing');
      }

      const symbol = card.querySelector('.card-play-symbol');
      if (symbol) {
        symbol.textContent = (isCurrent && isPlaying) ? '❚❚' : '▶';
      }
    });

    if (dockPlayBtn) {
      dockPlayBtn.classList.toggle('is-playing', isPlaying);
    }
    if (visualizerWrap) {
      visualizerWrap.style.opacity = isPlaying ? '1' : '0.4';
    }
  }

  function loadAndPlayCosmicTrack(index, autoPlay = false) {
    if (index < 0 || index >= COSMIC_SONGS.length) return;
    activeTrackIndex = index;
    const song = COSMIC_SONGS[index];

    if (dockAudio) {
      dockAudio.src = song.src;
    }
    if (dockCoverThumb) {
      dockCoverThumb.src = song.cover;
    }
    if (dockTrackTitle) {
      dockTrackTitle.textContent = song.title;
    }
    if (dockTrackArtist) {
      dockTrackArtist.textContent = `${song.artist} • ${song.album}`;
    }
    if (dockSeekBar) {
      dockSeekBar.value = 0;
    }

    if (autoPlay && dockAudio) {
      dockAudio.play().then(() => {
        updateActiveCardVisuals();
      }).catch(() => {
        updateActiveCardVisuals();
      });
    } else {
      updateActiveCardVisuals();
    }
  }

  function togglePlayPause() {
    if (!dockAudio) return;
    if (dockAudio.paused) {
      if (!dockAudio.src) {
        loadAndPlayCosmicTrack(activeTrackIndex, true);
      } else {
        dockAudio.play().then(() => {
          updateActiveCardVisuals();
        }).catch(() => {});
      }
    } else {
      dockAudio.pause();
      updateActiveCardVisuals();
    }
  }

  function playNextCosmicTrack() {
    const nextIdx = (activeTrackIndex + 1) % COSMIC_SONGS.length;
    loadAndPlayCosmicTrack(nextIdx, true);
  }

  function playPrevCosmicTrack() {
    const prevIdx = (activeTrackIndex - 1 + COSMIC_SONGS.length) % COSMIC_SONGS.length;
    loadAndPlayCosmicTrack(prevIdx, true);
  }

  if (dockPlayBtn) {
    dockPlayBtn.addEventListener('click', togglePlayPause);
  }
  if (dockNextBtn) {
    dockNextBtn.addEventListener('click', playNextCosmicTrack);
  }
  if (dockPrevBtn) {
    dockPrevBtn.addEventListener('click', playPrevCosmicTrack);
  }

  if (dockAudio) {
    dockAudio.addEventListener('timeupdate', () => {
      if (dockTimeCurrent) dockTimeCurrent.textContent = formatTimeDisplay(dockAudio.currentTime);
      if (dockSeekBar && !isSeekingDock && dockAudio.duration) {
        dockSeekBar.value = (dockAudio.currentTime / dockAudio.duration) * 100;
      }
    });

    dockAudio.addEventListener('loadedmetadata', () => {
      if (dockTimeDuration) dockTimeDuration.textContent = formatTimeDisplay(dockAudio.duration);
    });

    dockAudio.addEventListener('play', updateActiveCardVisuals);
    dockAudio.addEventListener('pause', updateActiveCardVisuals);

    dockAudio.addEventListener('ended', () => {
      playNextCosmicTrack();
    });
  }

  if (dockSeekBar && dockAudio) {
    dockSeekBar.addEventListener('input', () => {
      isSeekingDock = true;
      if (dockAudio.duration) {
        const targetTime = (Number(dockSeekBar.value) / 100) * dockAudio.duration;
        if (dockTimeCurrent) dockTimeCurrent.textContent = formatTimeDisplay(targetTime);
      }
    });

    dockSeekBar.addEventListener('change', () => {
      isSeekingDock = false;
      if (dockAudio.duration) {
        dockAudio.currentTime = (Number(dockSeekBar.value) / 100) * dockAudio.duration;
      }
    });
  }

  // Initial load for song.html
  if (constellationGrid) {
    renderCosmicConstellation();
    loadAndPlayCosmicTrack(0, false);
  }

});

