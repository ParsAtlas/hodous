/**
 * ============================================================================
 * Hodous — بزرگترین Green Flag تو چیه؟ (Test 3)
 * 10 Situational Scenarios · 1 to 10 Rating Scale · Elimination Mode
 * Authentic 3D Card Flip Animation · Top 5 Green Flag Priorities Ranking
 * Scoped Pastel Emerald Theme (.theme-bgf-pastel) · Zero SVG
 * ============================================================================
 */

(() => {
  'use strict';

  // ==========================================================================
  // 1. 10 GREEN FLAG SCENARIOS DATA (Bilingual FA & EN)
  // 10 Unique Scenarios corresponding to 10 Unique Rating Numbers (1 to 10)
  // ==========================================================================
  const BGF_SCENARIOS = [
    {
      id: 1,
      fa: {
        title: 'احترام به آسیب‌پذیری‌ها و مرزهای امن',
        question: 'وسط یک بحث، طرف مقابل می‌تواند از نقطه‌ضعفی که قبلاً با اعتماد برایش گفته‌ای علیه تو استفاده کند؛ اما عمداً این کار را نمی‌کند و بحث را فقط روی همان موضوع نگه می‌دارد.'
      },
      en: {
        title: 'Respecting Vulnerabilities & Boundaries',
        question: 'During an argument, the other person could easily weaponize a personal weakness you confided in them, but deliberately refrains and stays strictly focused on the topic.'
      }
    },
    {
      id: 2,
      fa: {
        title: 'حضور حامیانه بدون تحمیل و فشار',
        question: 'بعد از چند هفته، دوستت متوجه می‌شود حالت مثل همیشه نیست. بدون اینکه بازجویی کند یا اصرار به حرف زدن داشته باشد، فقط می‌گوید:\n«هر وقت خواستی حرف بزنی، من هستم.»'
      },
      en: {
        title: 'Supportive Presence Without Pressure',
        question: 'After a few weeks, your friend senses you aren\'t your usual self. Without interrogating or pressuring you to talk, they simply say:\n"Whenever you want to talk, I\'m here."'
      }
    },
    {
      id: 3,
      fa: {
        title: 'دفاع از حق بیان و شنیده شدن',
        question: 'در یک جمع، همه با نظر تو مخالف‌اند. طرف مقابل به‌جای اینکه فقط از تو طرفداری کند، اول اجازه می‌دهد حرفت کامل شنیده شود و بعد اگر لازم باشد از حق صحبت کردنت دفاع می‌کند.'
      },
      en: {
        title: 'Defending Your Voice & Fair Hearing',
        question: 'In a group, everyone disagrees with your opinion. Instead of blindly agreeing, the other person first ensures your point is fully heard, then defends your right to speak.'
      }
    },
    {
      id: 4,
      fa: {
        title: 'مسئولیت‌پذیری و احترام به زمان',
        question: 'قرار بود ساعت هفت همدیگر را ببینید. ده دقیقه دیر می‌رسد، اما قبل از رسیدن پیام داده، مسئولیت تأخیرش را پذیرفته و توضیح داده، بدون اینکه بهانه بیاورد.'
      },
      en: {
        title: 'Accountability & Respect for Time',
        question: 'You planned to meet at 7:00. They arrive 10 minutes late, but texted beforehand, took ownership of the delay, and explained cleanly without making excuses.'
      }
    },
    {
      id: 5,
      fa: {
        title: 'شادی خالصانه برای موفقیت‌های متقابل',
        question: 'دوستت یا پارتنرت موفقیت بزرگی به دست آورده، اما همان‌قدر که درباره موفقیت خودش هیجان دارد، موفقیت‌های کوچک تو را هم به خاطر می‌آورد و تشویقت می‌کند.'
      },
      en: {
        title: 'Genuine Celebration of Mutual Wins',
        question: 'Your friend or partner achieves a major milestone, but remains just as excited about your small wins, remembering and celebrating your efforts.'
      }
    },
    {
      id: 6,
      fa: {
        title: 'شنیدن فعال و درک همدلانه',
        question: 'بعد از یک سوءتفاهم، اولین جمله‌ای که می‌گوید این نیست که «منظورم این نبود»، بلکه می‌پرسد:\n«دقیقاً کدام بخش حرفم ناراحتت کرد؟»'
      },
      en: {
        title: 'Active Empathy & Clarification',
        question: 'After a misunderstanding, their first reaction isn\'t defensiveness ("That wasn\'t my point"), but curiosity:\n"Which part of what I said hurt you?"'
      }
    },
    {
      id: 7,
      fa: {
        title: 'توجه عمیق به جزئیات معنادار',
        question: 'چند ماه از آشنایی‌تان گذشته. بدون اینکه از او بخواهی، هنوز جزئیات کوچکی را که برایت مهم بوده یادش مانده؛ مثل نوشیدنی موردعلاقه‌ات، روز امتحانت یا اسمی که دوست داری صدایت بزند.'
      },
      en: {
        title: 'Attentive Recall of Meaningful Details',
        question: 'Months into knowing each other, without reminders, they remember the small details that matter to you: your favorite drink, exam day, or preferred nickname.'
      }
    },
    {
      id: 8,
      fa: {
        title: 'رعایت استقلال و فضای فردی',
        question: 'وقتی می‌گویی امروز حوصله صحبت کردن نداری، نه ناپدید می‌شود و نه فشار می‌آورد؛ فقط فضای لازم را به تو می‌دهد و مطمئن می‌شود اگر نظرت عوض شد، دسترسی به او داری.'
      },
      en: {
        title: 'Honoring Space & Emotional Autonomy',
        question: 'When you say you don\'t feel like talking today, they neither vanish nor pressure you; they give you space while assuring you they\'re reachable if you change your mind.'
      }
    },
    {
      id: 9,
      fa: {
        title: 'انعطاف فکری و خودانتقادی بالغانه',
        question: 'وسط یک اختلاف جدی، ناگهان مکث می‌کند و می‌گوید:\n«ممکنه حق با من نباشه؛ بذار دوباره بهش فکر کنم.»'
      },
      en: {
        title: 'Intellectual Humility & Self-Correction',
        question: 'Midway through an intense disagreement, they pause and admit:\n"I might not be right here; let me rethink this."'
      }
    },
    {
      id: 10,
      fa: {
        title: 'صداقت پیشگیرانه و شفافیت در اشتباه',
        question: 'یک روز متوجه می‌شوی اشتباهی کرده که احتمالاً هیچ‌وقت نمی‌فهمیدی. با این حال، خودش پیشقدم می‌شود، موضوع را می‌گوید و قبل از هر توضیحی مسئولیتش را می‌پذیرد.'
      },
      en: {
        title: 'Proactive Honesty & Radical Transparency',
        question: 'You discover they made an error you likely never would have found out about. Yet, they proactively step forward, confess it, and accept responsibility upfront.'
      }
    }
  ];

  // ==========================================================================
  // 2. LOCALIZED UI STRINGS
  // ==========================================================================
  const BGF_UI = {
    fa: {
      hubBadge: '۱۰ سناریوی واقعی · مقیاس ۱ تا ۱۰ (حذف تدریجی عدد)',
      hubTitle: 'بزرگترین <span class="card-title-green">گرین‌فلگ</span> برای تو چیه؟',
      hubSub1: 'اگر این رفتارها را از یک نفر ببینی، چقدر برایت ارزشمندند؟',
      hubSub2: 'اگر این رفتارها را از یک نفر ببینی، چقدر برایت Green Flag محسوب می‌شوند؟',
      hubCta: 'شروع ارزیابی رفتارهای امن و بالغانه',
      cardStamp: 'بزرگترین <span class="stamp-green">Green Flag</span> برای تو چیه؟',
      scaleHint: 'هر عدد فقط یک بار قابل انتخاب است و پس از انتخاب از گزینه‌ها حذف می‌شود',
      scaleMin: '۱ = اهمیت خیلی کمی دارد',
      scaleMax: '۱۰ = یکی از بزرگترین Green Flagهای ممکن است',
      prevBtn: 'قبلی',
      resultKicker: 'رنکینگ اختصاصی رفتارهای امن و بالغانه',
      prioritiesTitle: 'Top Green Flag Priorities',
      narrativeText: 'به نظر می‌رسد بیشترین ارزش را برای رفتارهایی قائل هستی که احساس امنیت، احترام و بلوغ عاطفی ایجاد می‌کنند.',
      disclaimer: 'این آزمون صرفاً برای سرگرمی و خودشناسی طراحی شده و معیار قطعی برای قضاوت درباره افراد نیست.',
      retakeBtn: 'انجام دوباره تست',
      shareBtn: 'اشتراک‌گذاری رنکینگ',
      backToHubBtn: 'بازگشت به آزمون‌ها',
      toastCopied: 'رنکینگ گرین‌فلگ‌ها در کلیپ‌بورد کپی شد'
    },
    en: {
      hubBadge: '10 Situational Scenarios · 1 to 10 Rating Scale · Elimination Mode',
      hubTitle: 'What is your biggest <span class="card-title-green-en">Green Flag</span>?',
      hubSub1: 'If you witness these behaviors, how deeply do you value them?',
      hubSub2: 'Rate each behavior on a 1-to-10 scale (each rating assigned exactly once).',
      hubCta: 'Start Green Flag Assessment',
      cardStamp: 'What is your biggest <span class="stamp-green">Green Flag</span>?',
      scaleHint: 'Each rating (1..10) can be assigned once and is eliminated from subsequent questions.',
      scaleMin: '1 = Very minimal importance',
      scaleMax: '10 = One of the greatest Green Flags possible',
      prevBtn: 'Back',
      resultKicker: 'Exclusive Relational Safety & Maturity Ranking',
      prioritiesTitle: 'Top Green Flag Priorities',
      narrativeText: 'You place the highest value on relational behaviors that foster psychological safety, deep mutual respect, and emotional maturity.',
      disclaimer: 'This assessment is designed purely for entertainment and self-reflection, and is not a definitive criterion for judging individuals.',
      retakeBtn: 'Retake Test',
      shareBtn: 'Share Ranking',
      backToHubBtn: 'Back to Tests Hub',
      toastCopied: 'Green Flags ranking copied to clipboard'
    }
  };

  // ==========================================================================
  // 3. APPLICATION STATE
  // ==========================================================================
  const bgfState = {
    currentQuestion: 0,
    answers: {}, // map question index (0..9) => rating (1..10)
    isFinished: false,
    participantName: ''
  };

  // Subtle web audio feedback
  let audioCtx = null;
  function playSubtleClick(pitch = 520) {
    try {
      if (!audioCtx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) audioCtx = new AudioCtx();
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      if (audioCtx) {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(pitch, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(pitch * 1.5, audioCtx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.045, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.04);
      }
    } catch (_) {}
  }

  function getCurrentLang() {
    const docLang = document.documentElement.lang || 'fa';
    return (docLang === 'en' || (window.HodousState && window.HodousState.selectedLanguage === 'en')) ? 'en' : 'fa';
  }

  // ==========================================================================
  // 4. DOM ELEMENTS
  // ==========================================================================
  let cardLaunchBgf = null;
  let viewHub = null;
  let viewBgfQuiz = null;
  let viewBgfResult = null;
  let sessionControlsBar = null;
  let btnBackToHub = null;

  let progressFill = null;
  let counterBadge = null;
  let brandStampEl = null;
  let questionTextEl = null;
  let scaleGridEl = null;
  let scaleHintEl = null;
  let scaleLegendMinEl = null;
  let scaleLegendMaxEl = null;
  let btnPrevEl = null;

  let flipCardEl = null;
  let resultDetailsEl = null;
  let prioritiesTitleEl = null;
  let rankingListEl = null;
  let narrativeTextEl = null;
  let disclaimerTextEl = null;
  let btnBgfRestart = null;
  let btnBgfShare = null;
  let btnBgfBackHub = null;
  let shareToastEl = null;

  // ==========================================================================
  // 5. VIEW MANAGEMENT & RENDER
  // ==========================================================================
  function showBgfView(targetView) {
    document.querySelectorAll('.view-section').forEach(v => {
      v.classList.remove('is-active');
    });

    if (sessionControlsBar) {
      sessionControlsBar.style.display = (targetView === viewHub) ? 'none' : 'flex';
    }

    if (targetView === viewHub) {
      document.body.classList.remove('theme-bgf-pastel');
    } else {
      document.body.classList.remove('theme-pastel-red');
      document.body.classList.remove('theme-gorf-pastel');
      document.body.classList.add('theme-bgf-pastel');
    }

    if (targetView) {
      targetView.classList.add('is-active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function renderQuestion() {
    if (!questionTextEl || !scaleGridEl) return;

    const lang = getCurrentLang();
    const t = BGF_UI[lang] || BGF_UI.fa;
    const totalQ = BGF_SCENARIOS.length; // 10
    const currentNum = bgfState.currentQuestion + 1;
    const scenario = BGF_SCENARIOS[bgfState.currentQuestion];
    const sData = scenario[lang] || scenario.fa;

    // 1. Update Progress Bar
    const progressPct = (currentNum / totalQ) * 100;
    if (progressFill) {
      progressFill.style.width = `${progressPct}%`;
    }

    // 2. Counter & Stamp
    if (counterBadge) {
      counterBadge.textContent = lang === 'en'
        ? `Question ${currentNum} of ${totalQ}`
        : `سؤال ${currentNum} از ${totalQ}`;
    }
    if (brandStampEl) {
      brandStampEl.innerHTML = t.cardStamp;
    }

    // 3. Question Statement
    questionTextEl.textContent = sData.question;

    // 4. Scale Legends & Hints
    if (scaleHintEl) scaleHintEl.textContent = t.scaleHint;
    if (scaleLegendMinEl) scaleLegendMinEl.textContent = t.scaleMin;
    if (scaleLegendMaxEl) scaleLegendMaxEl.textContent = t.scaleMax;

    // 5. Render 1..10 Elimination Buttons Grid
    scaleGridEl.innerHTML = '';
    const usedRatings = new Set(
      Object.entries(bgfState.answers)
        .filter(([qIdx]) => parseInt(qIdx, 10) !== bgfState.currentQuestion)
        .map(([, rating]) => rating)
    );

    const currentAssignedRating = bgfState.answers[bgfState.currentQuestion];

    for (let rating = 1; rating <= 10; rating++) {
      const btn = document.createElement('button');
      btn.className = 'bgf-scale-btn';
      btn.type = 'button';
      btn.textContent = rating;
      btn.setAttribute('aria-label', `Rating ${rating}`);

      const isUsed = usedRatings.has(rating);
      const isCurrent = (currentAssignedRating === rating);

      if (isUsed) {
        btn.disabled = true;
      }
      if (isCurrent) {
        btn.classList.add('is-selected');
      }

      btn.addEventListener('click', () => {
        handleRatingSelect(rating, btn);
      });

      scaleGridEl.appendChild(btn);
    }

    // 6. Back Button
    if (btnPrevEl) {
      btnPrevEl.disabled = (bgfState.currentQuestion === 0);
      const prevSpan = btnPrevEl.querySelector('.bgf-btn-prev-text');
      if (prevSpan) prevSpan.textContent = t.prevBtn;
    }
  }

  function handleRatingSelect(rating, clickedBtn) {
    playSubtleClick(500 + rating * 30);

    // Visual selection pop
    const allBtns = scaleGridEl.querySelectorAll('.bgf-scale-btn');
    allBtns.forEach(b => b.classList.remove('is-selected'));
    if (clickedBtn) clickedBtn.classList.add('is-selected');

    // Save answer
    bgfState.answers[bgfState.currentQuestion] = rating;

    // Smooth transition to next question or results (350ms)
    setTimeout(() => {
      if (bgfState.currentQuestion < BGF_SCENARIOS.length - 1) {
        bgfState.currentQuestion++;
        renderQuestion();
      } else {
        finishTestAndShowResult();
      }
    }, 350);
  }

  function handlePrevClick() {
    playSubtleClick(440);
    if (bgfState.currentQuestion > 0) {
      bgfState.currentQuestion--;
      renderQuestion();
    }
  }

  // ==========================================================================
  // 6. RANKING COMPILATION & 3D FLIP CARD
  // ==========================================================================
  function computeRankings() {
    const lang = getCurrentLang();
    const ranked = BGF_SCENARIOS.map((scenario, index) => {
      const score = bgfState.answers[index] || 0;
      const sData = scenario[lang] || scenario.fa;
      return {
        id: scenario.id,
        title: sData.title,
        question: sData.question,
        score: score,
        qNum: index + 1
      };
    });

    // Sort descending: score 10 down to 1
    const sorted = [...ranked].sort((a, b) => b.score - a.score);

    return {
      top10: sorted,
      top1: sorted[0],
      byQuestion: ranked
    };
  }

  function finishTestAndShowResult() {
    bgfState.isFinished = true;
    showBgfView(viewBgfResult);
    execute3DCardFlip();
  }

  let currentBgfViewMode = 'rank';

  function renderBgfItemsList(ranking) {
    if (!rankingListEl) return;
    rankingListEl.innerHTML = '';

    const items = currentBgfViewMode === 'rank' ? ranking.top10 : ranking.byQuestion;

    items.forEach((item, idx) => {
      const card = document.createElement('div');
      const rankNum = idx + 1;
      const badgeNum = currentBgfViewMode === 'rank' ? rankNum : item.qNum;
      const isTop = currentBgfViewMode === 'rank' && rankNum === 1;

      card.className = `bgf-rank-card ${isTop ? 'is-top1' : ''}`;
      card.style.cssText = "display:flex; align-items:center; justify-content:space-between; padding:11px 14px; border-radius:12px; background:#FFFFFF; border:1px solid #DCFCE7; box-shadow:0 2px 5px rgba(22,101,52,0.04);";

      card.innerHTML = `
        <div style="display:flex; align-items:center; gap:12px;">
          <span style="width:26px; height:26px; border-radius:50%; background:${isTop ? '#16A34A' : (rankNum <= 3 && currentBgfViewMode === 'rank') ? '#15803D' : '#F0FDF4'}; color:${(rankNum <= 3 && currentBgfViewMode === 'rank') ? '#FFFFFF' : '#166534'}; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:11px; flex-shrink:0;">
            ${badgeNum}
          </span>
          <span style="font-weight:600; color:#0B223D; font-size:13px; line-height:1.4;">${item.title}</span>
        </div>
        <span style="font-weight:700; color:#166534; background:#DCFCE7; border:1px solid #BBF7D0; padding:3px 9px; border-radius:8px; font-size:11px; white-space:nowrap; flex-shrink:0;">
          اولویت: ${item.score} / ۱۰
        </span>
      `;
      rankingListEl.appendChild(card);
    });
  }

  function setupBgfSortButtons(ranking) {
    const btnRank = document.getElementById('btn-bgf-sort-rank');
    const btnOrder = document.getElementById('btn-bgf-sort-order');
    if (!btnRank || !btnOrder) return;

    btnRank.onclick = () => {
      currentBgfViewMode = 'rank';
      btnRank.style.background = '#16A34A';
      btnRank.style.color = '#FFFFFF';
      btnRank.style.fontWeight = '600';
      btnOrder.style.background = 'transparent';
      btnOrder.style.color = '#166534';
      btnOrder.style.fontWeight = '500';
      renderBgfItemsList(ranking);
    };

    btnOrder.onclick = () => {
      currentBgfViewMode = 'order';
      btnOrder.style.background = '#16A34A';
      btnOrder.style.color = '#FFFFFF';
      btnOrder.style.fontWeight = '600';
      btnRank.style.background = 'transparent';
      btnRank.style.color = '#166534';
      btnRank.style.fontWeight = '500';
      renderBgfItemsList(ranking);
    };
  }

  function execute3DCardFlip() {
    const lang = getCurrentLang();
    const t = BGF_UI[lang] || BGF_UI.fa;
    const ranking = computeRankings();

    if (!flipCardEl) return;

    // 1. Reset card animation
    flipCardEl.classList.remove('flip-spin');
    if (resultDetailsEl) {
      resultDetailsEl.classList.remove('is-revealed');
    }

    void flipCardEl.offsetWidth; // force reflow

    // 2. Trigger 3D Spin
    setTimeout(() => {
      flipCardEl.classList.add('flip-spin');
    }, 100);

    // 3. Render Clean 1 to 10 Ranking Cards
    renderBgfItemsList(ranking);
    setupBgfSortButtons(ranking);

    // Action button labels
    if (btnBgfRestart) {
      const txt = btnBgfRestart.querySelector('.bgf-btn-restart-text');
      if (txt) txt.textContent = t.retakeBtn;
    }
    if (btnBgfShare) {
      const txt = btnBgfShare.querySelector('.bgf-btn-share-text');
      if (txt) txt.textContent = t.shareBtn;
    }
    if (btnBgfBackHub) {
      const txt = btnBgfBackHub.querySelector('.bgf-btn-hub-text');
      if (txt) txt.textContent = t.backToHubBtn;
    }

    // 4. Reveal Details after 3D card settles
    setTimeout(() => {
      if (resultDetailsEl) {
        resultDetailsEl.classList.add('is-revealed');
      }
    }, 1300);

    // Participant Badge & Central Archive / Webhook Logging
    const bgfBadge = document.getElementById('bgf-participant-badge');
    const participantName = bgfState.participantName || (window.HodousTestHub ? window.HodousTestHub.getNickname() : '') || 'مهمان';
    if (bgfBadge) {
      bgfBadge.innerHTML = lang === 'en'
        ? `Green Flag Priorities for: <b>${escapeHTML(participantName)}</b>`
        : `رتبه‌بندی اولویت‌ها برای: <b>${escapeHTML(participantName)}</b>`;
    }

    if (window.HodousTestHub && window.HodousTestHub.saveResult && ranking.top1) {
      const detailedChoices = BGF_ITEMS.map((item, idx) => {
        const score = bgfState.answers[idx] || 0;
        return {
          qNum: idx + 1,
          title: item.fa ? item.fa.title : item.title,
          choice: score > 0 ? `اولویت: ${score} از ۱۰` : 'ثبت نشده'
        };
      });

      window.HodousTestHub.saveResult({
        testId: 'biggest-green-flag',
        testTitle: 'بزرگترین Green Flag تو چیه؟',
        nickname: participantName,
        score: `${ranking.top1.title} (${ranking.top1.score}/10)`,
        details: ranking.top10.map((it, i) => `#${i + 1} ${it.title} (${it.score}/10)`).join(' · '),
        choices: detailedChoices
      });
    }
  }

  function escapeHTML(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function handleShareRanking() {
    playSubtleClick();
    const lang = getCurrentLang();
    const t = BGF_UI[lang] || BGF_UI.fa;
    const ranking = computeRankings();

    let shareUrl = '';
    if (window.HodousTestHub && window.HodousTestHub.generateShareUrl && ranking.top1) {
      shareUrl = window.HodousTestHub.generateShareUrl('biggest-green-flag', `${ranking.top1.title} (${ranking.top1.score}/10)`);
    }

    const lines = [
      lang === 'en' ? '🌱 My Green Flag Priorities (Sorted 1 to 10):' : '🌱 اولویت‌های گرین‌فلگ من (مرتب‌شده از ۱ تا ۱۰):',
      ...ranking.top10.map((item, idx) => `${idx + 1}. ${item.title} (${item.score}/10)`),
      shareUrl ? (lang === 'en' ? `🔗 View Result: ${shareUrl}` : `🔗 مشاهده کارنامه:\n${shareUrl}`) : '',
      'Hodous · Green Flag Test'
    ].filter(Boolean);

    const shareText = lines.join('\n');

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareText).then(() => {
        showToast(t.toastCopied);
      }).catch(() => {
        fallbackCopy(shareText, t.toastCopied);
      });
    } else {
      fallbackCopy(shareText, t.toastCopied);
    }
  }

  function fallbackCopy(text, msg) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast(msg);
    } catch (_) {}
    document.body.removeChild(ta);
  }

  function showToast(msg) {
    if (!shareToastEl) shareToastEl = document.getElementById('share-toast');
    if (!shareToastEl) return;
    shareToastEl.textContent = msg;
    shareToastEl.classList.add('is-visible');
    setTimeout(() => {
      shareToastEl.classList.remove('is-visible');
    }, 3200);
  }

  function resetTest() {
    bgfState.currentQuestion = 0;
    bgfState.answers = {};
    bgfState.isFinished = false;
    renderQuestion();
    showBgfView(viewBgfQuiz);
  }

  // ==========================================================================
  // 7. LANGUAGE SYNC (Callable globally)
  // ==========================================================================
  window.updateBgfLanguage = function(lang) {
    const t = BGF_UI[lang] || BGF_UI.fa;

    // Hub card static texts
    const hubBadge = document.getElementById('hub-card-bgf-badge-text');
    const hubTitle = document.getElementById('hub-card-bgf-title');
    const hubSub1 = document.getElementById('hub-card-bgf-sub1');
    const hubSub2 = document.getElementById('hub-card-bgf-sub2');
    const hubCta = document.getElementById('hub-card-bgf-cta-text');

    if (hubBadge) hubBadge.textContent = t.hubBadge;
    if (hubTitle) hubTitle.innerHTML = t.hubTitle;
    if (hubSub1) hubSub1.textContent = t.hubSub1;
    if (hubSub2) hubSub2.textContent = t.hubSub2;
    if (hubCta) hubCta.textContent = t.hubCta;

    // If currently on Quiz view
    if (viewBgfQuiz && viewBgfQuiz.classList.contains('is-active')) {
      renderQuestion();
    }

    // If currently on Result view
    if (viewBgfResult && viewBgfResult.classList.contains('is-active')) {
      execute3DCardFlip();
    }
  };

  // ==========================================================================
  // 8. INITIALIZATION & EVENT BINDINGS
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    cardLaunchBgf = document.getElementById('card-launch-bgf');
    viewHub = document.getElementById('view-hub');
    viewBgfQuiz = document.getElementById('view-bgf-quiz');
    viewBgfResult = document.getElementById('view-bgf-result');
    sessionControlsBar = document.getElementById('test-session-bar');
    btnBackToHub = document.getElementById('btn-back-to-hub');

    progressFill = document.getElementById('bgf-progress-fill');
    counterBadge = document.getElementById('bgf-counter-badge');
    brandStampEl = document.getElementById('bgf-brand-stamp');
    questionTextEl = document.getElementById('bgf-question-text');
    scaleGridEl = document.getElementById('bgf-scale-grid');
    scaleHintEl = document.getElementById('bgf-scale-hint');
    scaleLegendMinEl = document.getElementById('bgf-scale-legend-min');
    scaleLegendMaxEl = document.getElementById('bgf-scale-legend-max');
    btnPrevEl = document.getElementById('bgf-btn-prev');

    flipCardEl = document.getElementById('bgf-flip-card');
    resultDetailsEl = document.getElementById('bgf-result-details');
    prioritiesTitleEl = document.getElementById('bgf-priorities-title');
    rankingListEl = document.getElementById('bgf-ranking-list');
    narrativeTextEl = document.getElementById('bgf-narrative-text');
    disclaimerTextEl = document.getElementById('bgf-disclaimer-text');
    btnBgfRestart = document.getElementById('btn-bgf-restart');
    btnBgfShare = document.getElementById('btn-bgf-share');
    btnBgfBackHub = document.getElementById('btn-bgf-back-hub');
    shareToastEl = document.getElementById('share-toast');

    // Launch Test 3 from Hub
    if (cardLaunchBgf) {
      const launchBgfAction = () => {
        playSubtleClick();
        if (window.HodousTestHub && window.HodousTestHub.promptNickname) {
          window.HodousTestHub.promptNickname('بزرگترین Green Flag تو چیه؟', (nickname) => {
            bgfState.participantName = nickname;
            resetTest();
          });
        } else {
          resetTest();
        }
      };

      cardLaunchBgf.addEventListener('click', launchBgfAction);

      cardLaunchBgf.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          launchBgfAction();
        }
      });
    }

    // Previous Question Button
    if (btnPrevEl) {
      btnPrevEl.addEventListener('click', handlePrevClick);
    }

    // Results Actions
    if (btnBgfRestart) {
      btnBgfRestart.addEventListener('click', () => {
        playSubtleClick();
        resetTest();
      });
    }
    if (btnBgfShare) {
      btnBgfShare.addEventListener('click', handleShareRanking);
    }
    if (btnBgfBackHub) {
      btnBgfBackHub.addEventListener('click', () => {
        playSubtleClick();
        showBgfView(viewHub);
      });
    }

    // Back to Hub in top session bar
    if (btnBackToHub) {
      btnBackToHub.addEventListener('click', () => {
        if ((viewBgfQuiz && viewBgfQuiz.classList.contains('is-active')) ||
            (viewBgfResult && viewBgfResult.classList.contains('is-active'))) {
          showBgfView(viewHub);
        }
      });
    }

    // Initial sync
    window.updateBgfLanguage(getCurrentLang());
  });

})();
