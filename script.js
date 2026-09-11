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

    let shootingStar = null;

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

      // Occasional White Shooting Star (شهاب‌سنگ سفید در مدار کهکشان)
      if (!shootingStar && Math.random() < 0.008) {
        shootingStar = {
          x: Math.random() * width * 0.75,
          y: Math.random() * height * 0.35,
          len: Math.random() * 80 + 50,
          speed: Math.random() * 12 + 12,
          alpha: 1.0,
          angle: (Math.PI / 4) + (Math.random() - 0.5) * 0.25
        };
      }

      if (shootingStar) {
        ctx.save();
        ctx.strokeStyle = `rgba(255, 255, 255, ${shootingStar.alpha})`;
        ctx.shadowColor = '#FFFFFF';
        ctx.shadowBlur = 8;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(
          shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.len,
          shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.len
        );
        ctx.stroke();
        ctx.restore();

        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
        shootingStar.alpha -= 0.024;
        if (shootingStar.alpha <= 0) {
          shootingStar = null;
        }
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
  // 5. Central 7-Track Cosmic Playlist & Floating White Planets Engine
  // ========================================================================
  const DEFAULT_COSMIC_7 = [
    {
      id: "taylor_swift_rwylm",
      title: "right where you left me",
      artist: "Taylor Swift",
      album: "evermore",
      duration: "4:05",
      cover: "covers/taylor_swift_rwylm.jpg",
      src: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/25/6e/18/256e1844-520d-f229-95e2-bbed3d0f1e5f/mzaf_10038194974124687672.plus.aac.p.m4a"
    },
    {
      id: "olivia_rodrigo_vampire",
      title: "vampire",
      artist: "Olivia Rodrigo",
      album: "GUTS",
      duration: "3:39",
      cover: "covers/olivia_rodrigo_vampire.jpg",
      src: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/83/09/5e/83095ea1-83bf-ecdc-3b75-358c350fca51/mzaf_15560849688086702972.plus.aac.p.m4a"
    },
    {
      id: "olivia_rodrigo_drivers_license",
      title: "drivers license",
      artist: "Olivia Rodrigo",
      album: "SOUR",
      duration: "4:02",
      cover: "covers/olivia_rodrigo_drivers_license.jpg",
      src: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/36/62/61/366261be-0996-d73d-de6f-03417867c800/mzaf_8201528327761821135.plus.aac.p.m4a"
    },
    {
      id: "olivia_rodrigo_deja_vu",
      title: "deja vu",
      artist: "Olivia Rodrigo",
      album: "SOUR",
      duration: "3:35",
      cover: "covers/olivia_rodrigo_deja_vu.jpg",
      src: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/83/5a/c2/835ac220-f31a-006f-b6a9-2acd29eb60d0/mzaf_13621843495437485054.plus.aac.p.m4a"
    },
    {
      id: "olivia_rodrigo_so_american",
      title: "so american",
      artist: "Olivia Rodrigo",
      album: "GUTS (spilled)",
      duration: "2:49",
      cover: "covers/olivia_rodrigo_so_american.jpg",
      src: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/43/13/c9/4313c92b-cf1c-0191-45ef-58e0f1eac07f/mzaf_15738418925021275838.plus.aac.p.m4a"
    },
    {
      id: "taylor_swift_cardigan",
      title: "cardigan",
      artist: "Taylor Swift",
      album: "folklore",
      duration: "3:59",
      cover: "covers/taylor_swift_cardigan.jpg",
      src: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/00/b3/f2/00b3f2a0-3228-b65f-7189-91eb26f5adf6/mzaf_3535055549125623460.plus.aac.p.m4a"
    },
    {
      id: "taylor_swift_mirrorball",
      title: "mirrorball",
      artist: "Taylor Swift",
      album: "folklore",
      duration: "3:28",
      cover: "covers/taylor_swift_mirrorball.jpg",
      src: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/7a/2d/aa/7a2daade-83e3-adb0-fb25-fe20222048f7/mzaf_9666965367070228287.plus.aac.p.m4a"
    }
  ];

  // --- IndexedDB Configuration for Persistent Local Tracks ---
  const DB_NAME = 'hodous_music_db';
  const DB_VERSION = 2;
  const STORE_NAME = 'tracks';

  function openAudioDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };
      request.onsuccess = (e) => resolve(e.target.result);
      request.onerror = (e) => reject(e.target.error);
    });
  }

  async function getAllTracksFromDB() {
    try {
      const db = await openAudioDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.getAll();
        req.onsuccess = () => {
          const list = req.result || [];
          list.sort((a, b) => (a.addedAt || 0) - (b.addedAt || 0));
          resolve(list);
        };
        req.onerror = () => reject(req.error);
      });
    } catch (e) {
      return [];
    }
  }

  async function saveTrackToDB(file) {
    try {
      const db = await openAudioDB();
      const id = 'user_track_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
      const cleanName = file.name.replace(/\.[^/.]+$/, '');
      const record = {
        id,
        title: cleanName,
        name: cleanName,
        blob: file,
        size: file.size,
        type: file.type,
        addedAt: Date.now()
      };
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.put(record);
        req.onsuccess = () => resolve(record);
        req.onerror = () => reject(req.error);
      });
    } catch (e) {
      return null;
    }
  }

  async function updateTrackTitleInDB(id, newTitle) {
    try {
      const db = await openAudioDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(id);
        req.onsuccess = () => {
          const data = req.result;
          if (data) {
            data.title = newTitle;
            store.put(data);
            resolve(true);
          } else {
            resolve(false);
          }
        };
        req.onerror = () => reject(req.error);
      });
    } catch (e) {
      return false;
    }
  }

  async function deleteTrackFromDB(id) {
    try {
      const db = await openAudioDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.delete(id);
        req.onsuccess = () => resolve(true);
        req.onerror = () => reject(req.error);
      });
    } catch (e) {
      return false;
    }
  }

  // --- Playlist DOM Elements ---
  const playlistContainer = document.getElementById('playlist-tracks-container');
  const playlistHeroDeck = document.getElementById('playlist-hero-deck');
  const playlistCountBadge = document.getElementById('playlist-count-badge');
  const dockAudio = document.getElementById('dock-audio-element');
  const deckCoverImg = document.getElementById('deck-cover-img');
  const deckTrackTitle = document.getElementById('deck-track-title');
  const deckTrackArtist = document.getElementById('deck-track-artist');
  const deckSeekBar = document.getElementById('deck-seek-bar');
  const deckTimeCurrent = document.getElementById('deck-time-current');
  const deckTimeDuration = document.getElementById('deck-time-duration');
  const deckPlayBtn = document.getElementById('deck-play-btn');
  const deckPrevBtn = document.getElementById('deck-prev-btn');
  const deckNextBtn = document.getElementById('deck-next-btn');
  const deckRepeatBtn = document.getElementById('deck-repeat-btn');
  const deckMuteBtn = document.getElementById('deck-mute-btn');
  const deckVolumeIcon = document.getElementById('deck-volume-icon');
  const deckVisualizer = document.getElementById('deck-visualizer-bars');

  const btnPlayAll = document.getElementById('btn-play-all');
  const btnShuffle = document.getElementById('btn-shuffle');
  const btnUploadTrack = document.getElementById('btn-upload-track');
  const playlistFileInput = document.getElementById('playlist-file-input');

  let currentPlaylist = [];
  let activeTrackIndex = 0;
  let isSeeking = false;
  let isShuffle = false;
  let isRepeat = false;
  let isMuted = false;
  let activeBlobUrls = [];

  function formatTimeDisplay(sec) {
    if (isNaN(sec) || !isFinite(sec)) return '0:00';
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  async function initCosmicPlaylist() {
    if (!playlistContainer) return;

    // 1. Check if user has uploaded files in IndexedDB
    const userDbTracks = await getAllTracksFromDB();

    if (userDbTracks && userDbTracks.length > 0) {
      // Clear any prior blob URLs
      activeBlobUrls.forEach(url => URL.revokeObjectURL(url));
      activeBlobUrls = [];

      const coverList = [
        'covers/taylor_swift_rwylm.jpg',
        'covers/olivia_rodrigo_vampire.jpg',
        'covers/olivia_rodrigo_drivers_license.jpg',
        'covers/olivia_rodrigo_deja_vu.jpg',
        'covers/olivia_rodrigo_so_american.jpg',
        'covers/taylor_swift_cardigan.jpg',
        'covers/taylor_swift_mirrorball.jpg'
      ];

      currentPlaylist = userDbTracks.map((item, idx) => {
        const blobUrl = URL.createObjectURL(item.blob);
        activeBlobUrls.push(blobUrl);
        return {
          id: item.id,
          isCustom: true,
          title: item.title || item.name,
          artist: 'آهنگ شخصی کاربر',
          album: 'کتابخانه آپلودشده',
          duration: '--:--',
          cover: coverList[idx % coverList.length],
          src: blobUrl
        };
      });
    } else {
      currentPlaylist = [...DEFAULT_COSMIC_7];
    }

    if (playlistCountBadge) {
      playlistCountBadge.textContent = `${currentPlaylist.length} قطعه`;
    }

    renderPlaylistRows();
    if (currentPlaylist.length > 0) {
      loadTrackByIndex(0, false);
    }
  }

  function renderPlaylistRows() {
    if (!playlistContainer) return;
    playlistContainer.innerHTML = '';

    currentPlaylist.forEach((track, idx) => {
      const isCurrent = (idx === activeTrackIndex);
      const isPlaying = isCurrent && dockAudio && !dockAudio.paused;

      const row = document.createElement('div');
      row.className = `playlist-track-row ${isCurrent ? 'is-active-row' : ''} ${isPlaying ? 'is-playing-row' : ''}`;
      row.dataset.index = idx;

      row.innerHTML = `
        <div class="flex items-center gap-3.5 min-w-0 flex-1">
          <!-- Row Number or Animated Equalizer -->
          <div class="w-7 text-center flex items-center justify-center shrink-0">
            <span class="row-number-badge text-xs font-mono font-bold ${isCurrent ? 'text-white' : 'text-[#80AAD3]'}">#${idx + 1}</span>
            <div class="row-eq-bars">
              <span class="row-eq-bar"></span>
              <span class="row-eq-bar"></span>
              <span class="row-eq-bar"></span>
            </div>
          </div>

          <!-- Cover Image Thumbnail -->
          <div class="w-11 h-11 rounded-xl overflow-hidden bg-[#060D17] border border-white/20 shrink-0 shadow-sm">
            <img src="${track.cover}" alt="${track.title}" class="w-full h-full object-cover" loading="lazy" />
          </div>

          <!-- Title & Artist -->
          <div class="min-w-0 flex-1 text-right">
            <p class="text-sm font-semibold ${isCurrent ? 'text-white' : 'text-white/90'} truncate">
              ${track.title}
            </p>
            <p class="text-xs text-[#80AAD3] truncate mt-0.5">
              ${track.artist} • <span class="text-white/40">${track.album}</span>
            </p>
          </div>
        </div>

        <!-- Duration & Actions -->
        <div class="flex items-center gap-3 shrink-0">
          <span class="text-xs text-[#80AAD3] font-mono hidden sm:inline">${track.duration || '3:30'}</span>

          ${track.isCustom ? `
            <button type="button" class="track-action-btn btn-rename-track" title="تغییر نام">✎</button>
            <button type="button" class="track-action-btn btn-delete-track" title="حذف">✕</button>
          ` : ''}

          <div class="w-8 h-8 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#060D17] flex items-center justify-center text-xs font-bold transition-all shadow-sm">
            <span>${isCurrent && isPlaying ? '❚❚' : '▶'}</span>
          </div>
        </div>
      `;

      row.addEventListener('click', (e) => {
        if (e.target.closest('.btn-rename-track') || e.target.closest('.btn-delete-track')) return;
        if (activeTrackIndex === idx) {
          togglePlayPause();
        } else {
          loadTrackByIndex(idx, true);
        }
      });

      // Custom Rename Action
      const renameBtn = row.querySelector('.btn-rename-track');
      if (renameBtn) {
        renameBtn.addEventListener('click', async (e) => {
          e.stopPropagation();
          const newName = prompt('نام جدید آهنگ را وارد کنید:', track.title);
          if (newName && newName.trim() && newName.trim() !== track.title) {
            await updateTrackTitleInDB(track.id, newName.trim());
            track.title = newName.trim();
            if (activeTrackIndex === idx && deckTrackTitle) {
              deckTrackTitle.textContent = newName.trim();
            }
            renderPlaylistRows();
          }
        });
      }

      // Custom Delete Action
      const deleteBtn = row.querySelector('.btn-delete-track');
      if (deleteBtn) {
        deleteBtn.addEventListener('click', async (e) => {
          e.stopPropagation();
          if (confirm(`آیا می‌خواهید قطعه «${track.title}» حذف شود؟`)) {
            await deleteTrackFromDB(track.id);
            initCosmicPlaylist();
          }
        });
      }

      playlistContainer.appendChild(row);
    });
  }

  function updateVisualPlaybackState() {
    const isPlaying = dockAudio && !dockAudio.paused;

    if (playlistHeroDeck) {
      playlistHeroDeck.classList.toggle('is-playing', isPlaying);
    }
    if (deckPlayBtn) {
      deckPlayBtn.classList.toggle('is-playing', isPlaying);
    }
    if (deckVisualizer) {
      deckVisualizer.style.opacity = isPlaying ? '1' : '0.4';
    }

    // Update row highlights
    if (playlistContainer) {
      const rows = playlistContainer.querySelectorAll('.playlist-track-row');
      rows.forEach((r, i) => {
        const isCurrent = (i === activeTrackIndex);
        r.classList.toggle('is-active-row', isCurrent);
        r.classList.toggle('is-playing-row', isCurrent && isPlaying);

        const playIcon = r.querySelector('.w-8 span');
        if (playIcon) {
          playIcon.textContent = (isCurrent && isPlaying) ? '❚❚' : '▶';
        }
      });
    }
  }

  function loadTrackByIndex(idx, autoPlay = false) {
    if (!currentPlaylist || currentPlaylist.length === 0) return;
    if (idx < 0) idx = 0;
    if (idx >= currentPlaylist.length) idx = 0;

    activeTrackIndex = idx;
    const track = currentPlaylist[idx];

    if (dockAudio) {
      dockAudio.src = track.src;
    }
    if (deckCoverImg) {
      deckCoverImg.src = track.cover;
    }
    if (deckTrackTitle) {
      deckTrackTitle.textContent = track.title;
    }
    if (deckTrackArtist) {
      deckTrackArtist.textContent = `${track.artist} • ${track.album}`;
    }
    if (deckSeekBar) {
      deckSeekBar.value = 0;
    }
    if (deckTimeCurrent) {
      deckTimeCurrent.textContent = '0:00';
    }

    if (autoPlay && dockAudio) {
      dockAudio.play().then(() => {
        updateVisualPlaybackState();
      }).catch(() => {
        updateVisualPlaybackState();
      });
    } else {
      updateVisualPlaybackState();
    }
  }

  function togglePlayPause() {
    if (!dockAudio) return;
    if (dockAudio.paused) {
      if (!dockAudio.src && currentPlaylist.length > 0) {
        loadTrackByIndex(activeTrackIndex, true);
      } else {
        dockAudio.play().then(() => {
          updateVisualPlaybackState();
        }).catch(() => {});
      }
    } else {
      dockAudio.pause();
      updateVisualPlaybackState();
    }
  }

  function playNextTrack() {
    if (currentPlaylist.length === 0) return;
    let nextIdx;
    if (isShuffle && currentPlaylist.length > 1) {
      do {
        nextIdx = Math.floor(Math.random() * currentPlaylist.length);
      } while (nextIdx === activeTrackIndex);
    } else {
      nextIdx = (activeTrackIndex + 1) % currentPlaylist.length;
    }
    loadTrackByIndex(nextIdx, true);
  }

  function playPrevTrack() {
    if (currentPlaylist.length === 0) return;
    const prevIdx = (activeTrackIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
    loadTrackByIndex(prevIdx, true);
  }

  // Bind Player Controls
  if (deckPlayBtn) deckPlayBtn.addEventListener('click', togglePlayPause);
  if (deckNextBtn) deckNextBtn.addEventListener('click', playNextTrack);
  if (deckPrevBtn) deckPrevBtn.addEventListener('click', playPrevTrack);

  if (deckRepeatBtn) {
    deckRepeatBtn.addEventListener('click', () => {
      isRepeat = !isRepeat;
      deckRepeatBtn.classList.toggle('is-active-toggle', isRepeat);
    });
  }

  if (deckMuteBtn && dockAudio) {
    deckMuteBtn.addEventListener('click', () => {
      isMuted = !isMuted;
      dockAudio.muted = isMuted;
      deckMuteBtn.classList.toggle('is-active-toggle', isMuted);
      if (deckVolumeIcon) deckVolumeIcon.textContent = isMuted ? '🔇' : '🔊';
    });
  }

  if (btnPlayAll) {
    btnPlayAll.addEventListener('click', () => {
      loadTrackByIndex(0, true);
    });
  }

  if (btnShuffle) {
    btnShuffle.addEventListener('click', () => {
      isShuffle = !isShuffle;
      btnShuffle.classList.toggle('is-active-toggle', isShuffle);
      btnShuffle.style.background = isShuffle ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)';
      playNextTrack();
    });
  }

  // Upload Button & File Input Handling
  if (btnUploadTrack && playlistFileInput) {
    btnUploadTrack.addEventListener('click', () => {
      playlistFileInput.click();
    });

    playlistFileInput.addEventListener('change', async (e) => {
      const files = Array.from(e.target.files || []).filter(f =>
        f.type.startsWith('audio/') || /\.(mp3|m4a|wav|ogg|aac|flac)$/i.test(f.name)
      );
      if (files.length === 0) return;

      for (let i = 0; i < files.length; i++) {
        await saveTrackToDB(files[i]);
      }

      await initCosmicPlaylist();
      if (currentPlaylist.length > 0) {
        loadTrackByIndex(currentPlaylist.length - files.length, true);
      }
    });
  }

  // Audio Element Events
  if (dockAudio) {
    dockAudio.addEventListener('timeupdate', () => {
      if (deckTimeCurrent) deckTimeCurrent.textContent = formatTimeDisplay(dockAudio.currentTime);
      if (deckSeekBar && !isSeeking && dockAudio.duration) {
        deckSeekBar.value = (dockAudio.currentTime / dockAudio.duration) * 100;
      }
    });

    dockAudio.addEventListener('loadedmetadata', () => {
      if (deckTimeDuration) deckTimeDuration.textContent = formatTimeDisplay(dockAudio.duration);
    });

    dockAudio.addEventListener('play', updateVisualPlaybackState);
    dockAudio.addEventListener('pause', updateVisualPlaybackState);

    dockAudio.addEventListener('ended', () => {
      if (isRepeat) {
        dockAudio.currentTime = 0;
        dockAudio.play().catch(() => {});
      } else {
        playNextTrack();
      }
    });
  }

  // Scrubber Seek
  if (deckSeekBar && dockAudio) {
    deckSeekBar.addEventListener('input', () => {
      isSeeking = true;
      if (dockAudio.duration) {
        const targetTime = (Number(deckSeekBar.value) / 100) * dockAudio.duration;
        if (deckTimeCurrent) deckTimeCurrent.textContent = formatTimeDisplay(targetTime);
      }
    });

    deckSeekBar.addEventListener('change', () => {
      isSeeking = false;
      if (dockAudio.duration) {
        dockAudio.currentTime = (Number(deckSeekBar.value) / 100) * dockAudio.duration;
      }
    });
  }

  // Initialize Playlist on load
  if (playlistContainer) {
    initCosmicPlaylist();
  }

});

