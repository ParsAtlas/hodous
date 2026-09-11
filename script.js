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
  // 5. Audio Upload, Persistent IndexedDB Library & Interactive Playback
  // ========================================================================
  const audioFileInput = document.getElementById('audio-file-input');
  const uploadTriggerBtn = document.getElementById('upload-trigger-btn');
  const changeTrackBtn = document.getElementById('change-track-btn');
  const addMoreBtn = document.getElementById('add-more-btn');
  const clearAllBtn = document.getElementById('clear-all-btn');
  const dropZone = document.getElementById('drop-zone');
  const audioPlayer = document.getElementById('audio-player');
  const playPauseBtn = document.getElementById('play-pause-btn');
  const prevTrackBtn = document.getElementById('prev-track-btn');
  const nextTrackBtn = document.getElementById('next-track-btn');
  const trackTitle = document.getElementById('current-track-title');
  const trackTime = document.getElementById('current-track-time');
  const trackDuration = document.getElementById('current-track-duration');
  const visualizerWrap = document.getElementById('audio-visualizer-wrap');
  const playerContainer = document.getElementById('player-container');
  const awaitingBadge = document.getElementById('awaiting-badge');
  const playerStatusBadge = document.getElementById('player-status-badge');
  const audioErrorMsg = document.getElementById('audio-error-msg');
  const seekBar = document.getElementById('seek-bar');
  const savedTracksList = document.getElementById('saved-tracks-list');
  const emptyLibraryState = document.getElementById('empty-library-state');
  const savedCountBadge = document.getElementById('saved-count-badge');

  let isSeeking = false;
  let currentBlobUrl = null;
  let savedTracks = [];
  let currentTrackIndex = -1;

  // --- IndexedDB Persistence Layer ---
  const DB_NAME = 'HodousAudioDB';
  const DB_VERSION = 1;
  const STORE_NAME = 'tracks';

  function openAudioDB() {
    return new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        reject(new Error('IndexedDB is not supported in this browser.'));
        return;
      }
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async function saveTrackToDB(file) {
    try {
      const db = await openAudioDB();
      const id = 'track_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
      const title = file.name.replace(/\.[^/.]+$/, '');
      const record = {
        id: id,
        name: file.name,
        title: title,
        size: file.size,
        type: file.type || 'audio/mpeg',
        addedAt: Date.now(),
        blob: file
      };
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.put(record);
        req.onsuccess = () => resolve(record);
        req.onerror = () => reject(req.error);
      });
    } catch (err) {
      console.warn('Could not save to IndexedDB:', err);
      return null;
    }
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
    } catch (err) {
      console.warn('Could not read from IndexedDB:', err);
      return [];
    }
  }

  async function deleteTrackFromDB(id) {
    try {
      const db = await openAudioDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.delete(id);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch (err) {
      console.warn('Could not delete from IndexedDB:', err);
    }
  }

  async function clearAllTracksFromDB() {
    try {
      const db = await openAudioDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.clear();
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch (err) {
      console.warn('Could not clear IndexedDB:', err);
    }
  }

  // --- Utility Functions ---
  function formatTime(seconds) {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function formatFileSize(bytes) {
    if (!bytes || bytes <= 0) return '0 KB';
    const mb = bytes / (1024 * 1024);
    if (mb >= 1) return mb.toFixed(1) + ' MB';
    const kb = bytes / 1024;
    return Math.round(kb) + ' KB';
  }

  function triggerFileInput() {
    if (audioFileInput) {
      audioFileInput.value = '';
      audioFileInput.click();
    }
  }

  // --- UI Update & Library Rendering ---
  function updateNavButtonsState() {
    if (prevTrackBtn) {
      prevTrackBtn.disabled = savedTracks.length <= 1;
    }
    if (nextTrackBtn) {
      nextTrackBtn.disabled = savedTracks.length <= 1;
    }
  }

  function renderLibrary() {
    if (!savedTracksList) return;

    if (savedCountBadge) {
      const count = savedTracks.length;
      savedCountBadge.textContent = `${count} آهنگ`;
    }

    if (clearAllBtn) {
      if (savedTracks.length > 0) {
        clearAllBtn.classList.remove('hidden');
      } else {
        clearAllBtn.classList.add('hidden');
      }
    }

    if (savedTracks.length === 0) {
      savedTracksList.innerHTML = '';
      if (emptyLibraryState) emptyLibraryState.classList.remove('hidden');
      if (playerContainer && currentTrackIndex === -1) {
        playerContainer.classList.add('hidden');
      }
      if (awaitingBadge && currentTrackIndex === -1) {
        awaitingBadge.classList.remove('hidden');
      }
      updateNavButtonsState();
      return;
    }

    if (emptyLibraryState) emptyLibraryState.classList.add('hidden');
    savedTracksList.innerHTML = '';

    savedTracks.forEach((track, idx) => {
      const isCurrent = (idx === currentTrackIndex);
      const isPlaying = isCurrent && audioPlayer && !audioPlayer.paused;

      const row = document.createElement('div');
      row.className = `saved-track-row ${isCurrent ? 'is-current' : ''} ${isPlaying ? 'is-playing-now' : ''}`;
      row.dataset.index = idx;
      row.dataset.id = track.id;

      row.innerHTML = `
        <div class="flex items-center gap-3 min-w-0 flex-1">
          <div class="mini-track-play-btn">
            <span class="mini-play-icon">${isCurrent && isPlaying ? '❚❚' : '▶'}</span>
            <div class="mini-eq">
              <span class="mini-eq-bar"></span>
              <span class="mini-eq-bar"></span>
              <span class="mini-eq-bar"></span>
            </div>
          </div>
          <div class="min-w-0 flex-1 text-right" dir="rtl">
            <p class="text-xs sm:text-sm font-medium text-[#0B223D] truncate">
              ${escapeHtml(track.title || track.name)}
            </p>
            <p class="text-[11px] text-[#5B86B6] truncate mt-0.5">
              <span>${formatFileSize(track.size)}</span> • <span class="text-[#3F6593]">ذخیره دائمی آفلاین</span>
            </p>
          </div>
        </div>
        <div class="flex items-center gap-1.5 shrink-0">
          <button type="button" class="track-delete-btn" title="حذف از حافظه" aria-label="حذف">
            ✕
          </button>
        </div>
      `;

      // Click to play/pause
      row.addEventListener('click', (e) => {
        if (e.target.closest('.track-delete-btn')) return;
        if (currentTrackIndex === idx) {
          if (audioPlayer.paused) {
            audioPlayer.play().catch(() => {});
          } else {
            audioPlayer.pause();
          }
          renderLibrary();
        } else {
          loadTrackByIndex(idx, true);
        }
      });

      // Delete action
      const delBtn = row.querySelector('.track-delete-btn');
      if (delBtn) {
        delBtn.addEventListener('click', async (e) => {
          e.stopPropagation();
          const confirmDel = confirm(`آیا می‌خواهید آهنگ «${track.title || track.name}» از کتابخانه حذف شود؟`);
          if (!confirmDel) return;

          await deleteTrackFromDB(track.id);
          const wasCurrent = (idx === currentTrackIndex);
          await loadSavedTracksFromDB();

          if (wasCurrent) {
            if (savedTracks.length > 0) {
              const nextIdx = Math.min(idx, savedTracks.length - 1);
              loadTrackByIndex(nextIdx, false);
            } else {
              currentTrackIndex = -1;
              if (audioPlayer) {
                audioPlayer.pause();
                audioPlayer.src = '';
              }
              if (currentBlobUrl) {
                URL.revokeObjectURL(currentBlobUrl);
                currentBlobUrl = null;
              }
              if (playerContainer) playerContainer.classList.add('hidden');
              if (awaitingBadge) awaitingBadge.classList.remove('hidden');
              if (visualizerWrap) visualizerWrap.style.opacity = '0.4';
            }
          } else if (currentTrackIndex > idx) {
            currentTrackIndex--;
          }
          renderLibrary();
        });
      }

      savedTracksList.appendChild(row);
    });

    updateNavButtonsState();
  }

  function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // --- Track Loading & Playback ---
  function loadTrackByIndex(index, shouldPlay = false) {
    if (index < 0 || index >= savedTracks.length) return;
    const track = savedTracks[index];
    currentTrackIndex = index;

    if (audioErrorMsg) audioErrorMsg.classList.add('hidden');

    if (currentBlobUrl) {
      URL.revokeObjectURL(currentBlobUrl);
    }

    try {
      const blob = track.blob instanceof Blob ? track.blob : new Blob([track.blob], { type: track.type || 'audio/mpeg' });
      currentBlobUrl = URL.createObjectURL(blob);
      audioPlayer.src = currentBlobUrl;
    } catch (e) {
      console.error('Error creating blob URL:', e);
      if (audioErrorMsg) audioErrorMsg.classList.remove('hidden');
      return;
    }

    if (trackTitle) trackTitle.textContent = track.title || track.name;
    if (playerContainer) playerContainer.classList.remove('hidden');
    if (awaitingBadge) awaitingBadge.classList.add('hidden');
    if (playerStatusBadge) playerStatusBadge.textContent = shouldPlay ? 'در حال پخش' : 'آماده پخش';

    if (seekBar) {
      seekBar.value = 0;
      seekBar.max = 100;
    }

    renderLibrary();

    if (shouldPlay) {
      audioPlayer.play().then(() => {
        if (playPauseBtn) playPauseBtn.classList.add('is-playing');
        if (visualizerWrap) visualizerWrap.style.opacity = '1';
        if (playerStatusBadge) playerStatusBadge.textContent = 'در حال پخش';
        renderLibrary();
      }).catch(() => {
        if (playPauseBtn) playPauseBtn.classList.remove('is-playing');
        if (visualizerWrap) visualizerWrap.style.opacity = '0.4';
        if (playerStatusBadge) playerStatusBadge.textContent = 'آماده پخش (کلیک کنید)';
        renderLibrary();
      });
    } else {
      if (playPauseBtn) playPauseBtn.classList.remove('is-playing');
      if (visualizerWrap) visualizerWrap.style.opacity = '0.4';
    }
  }

  function playNextTrack() {
    if (savedTracks.length === 0) return;
    const nextIdx = (currentTrackIndex + 1) % savedTracks.length;
    loadTrackByIndex(nextIdx, true);
  }

  function playPrevTrack() {
    if (savedTracks.length === 0) return;
    const prevIdx = (currentTrackIndex - 1 + savedTracks.length) % savedTracks.length;
    loadTrackByIndex(prevIdx, true);
  }

  // --- Process New Files (Single or Multiple) ---
  async function handleIncomingAudioFiles(fileList) {
    if (!fileList || fileList.length === 0) return;

    const validFiles = Array.from(fileList).filter(f =>
      f.type.startsWith('audio/') || /\.(mp3|m4a|wav|ogg|aac|flac|opus|wma)$/i.test(f.name)
    );

    if (validFiles.length === 0) {
      if (audioErrorMsg) {
        audioErrorMsg.textContent = 'هیچ فایل صوتی استانداردی (MP3, M4A, WAV) شناسایی نشد.';
        audioErrorMsg.classList.remove('hidden');
      }
      return;
    }

    if (playerStatusBadge) playerStatusBadge.textContent = 'در حال ذخیره‌سازی...';

    let firstNewIndex = -1;
    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
      await saveTrackToDB(file);
    }

    await loadSavedTracksFromDB();

    // Play the most recently added track
    if (savedTracks.length > 0) {
      firstNewIndex = savedTracks.length - validFiles.length;
      if (firstNewIndex < 0) firstNewIndex = 0;
      loadTrackByIndex(firstNewIndex, true);
    }
  }

  async function loadSavedTracksFromDB() {
    savedTracks = await getAllTracksFromDB();
    renderLibrary();
  }

  // --- Event Listeners ---
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

  if (addMoreBtn) {
    addMoreBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      triggerFileInput();
    });
  }

  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', async () => {
      if (savedTracks.length === 0) return;
      const confirmClear = confirm('آیا مطمئنید که می‌خواهید تمام آهنگ‌های ذخیره‌شده پاک شوند؟');
      if (!confirmClear) return;

      await clearAllTracksFromDB();
      savedTracks = [];
      currentTrackIndex = -1;
      if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.src = '';
      }
      if (currentBlobUrl) {
        URL.revokeObjectURL(currentBlobUrl);
        currentBlobUrl = null;
      }
      renderLibrary();
    });
  }

  if (prevTrackBtn) {
    prevTrackBtn.addEventListener('click', () => {
      playPrevTrack();
    });
  }

  if (nextTrackBtn) {
    nextTrackBtn.addEventListener('click', () => {
      playNextTrack();
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
        handleIncomingAudioFiles(files);
      }
    });
  }

  if (audioFileInput) {
    audioFileInput.addEventListener('change', (e) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleIncomingAudioFiles(files);
      }
    });
  }

  // --- Player Event Listeners ---
  if (playPauseBtn && audioPlayer) {
    playPauseBtn.addEventListener('click', () => {
      if (audioPlayer.paused) {
        audioPlayer.play().then(() => {
          playPauseBtn.classList.add('is-playing');
          if (visualizerWrap) visualizerWrap.style.opacity = '1';
          if (playerStatusBadge) playerStatusBadge.textContent = 'در حال پخش';
          renderLibrary();
        }).catch(() => {});
      } else {
        audioPlayer.pause();
        playPauseBtn.classList.remove('is-playing');
        if (visualizerWrap) visualizerWrap.style.opacity = '0.4';
        if (playerStatusBadge) playerStatusBadge.textContent = 'متوقف شده';
        renderLibrary();
      }
    });

    audioPlayer.addEventListener('play', () => {
      if (playPauseBtn) playPauseBtn.classList.add('is-playing');
      if (visualizerWrap) visualizerWrap.style.opacity = '1';
      renderLibrary();
    });

    audioPlayer.addEventListener('pause', () => {
      if (playPauseBtn) playPauseBtn.classList.remove('is-playing');
      if (visualizerWrap) visualizerWrap.style.opacity = '0.4';
      renderLibrary();
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
        seekBar.value = audioPlayer.currentTime || 0;
      }
    });

    audioPlayer.addEventListener('ended', () => {
      if (playPauseBtn) playPauseBtn.classList.remove('is-playing');
      if (visualizerWrap) visualizerWrap.style.opacity = '0.4';
      if (playerStatusBadge) playerStatusBadge.textContent = 'به پایان رسید';
      if (seekBar) seekBar.value = 0;

      // Automatically play next song if more than 1 track exists
      if (savedTracks.length > 1) {
        playNextTrack();
      } else {
        renderLibrary();
      }
    });

    audioPlayer.addEventListener('error', () => {
      if (audioErrorMsg) audioErrorMsg.classList.remove('hidden');
      if (playerStatusBadge) playerStatusBadge.textContent = 'خطا در بارگذاری';
      if (playPauseBtn) playPauseBtn.classList.remove('is-playing');
      if (visualizerWrap) visualizerWrap.style.opacity = '0.4';
      renderLibrary();
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

  // --- Initial Load: Restore Saved Tracks from IndexedDB ---
  if (window.location.pathname.endsWith('song.html') || document.getElementById('saved-library-section')) {
    loadSavedTracksFromDB().then(() => {
      if (savedTracks.length > 0) {
        // Prepare the first saved track ready to play
        loadTrackByIndex(0, false);
        if (playerStatusBadge) playerStatusBadge.textContent = 'آماده پخش (آفلاین)';
      }
    });
  }

});
