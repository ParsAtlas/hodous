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
      hubBadge: '۱۰ سناریوی واقعی · مقیاس ۱ تا ۱۰',
      hubTitle: 'بزرگترین <span class="card-title-green">گرین‌فلگ</span> برای تو چیه؟',
      hubSub1: 'اگر این رفتارها را از یک نفر ببینی، چقدر برایت ارزشمندند؟',
      hubSub2: 'اگر این رفتارها را از یک نفر ببینی، چقدر برایت Green Flag محسوب می‌شوند؟',
      hubCta: 'شروع ارزیابی رفتارهای امن و بالغانه',
      cardStamp: 'بزرگترین <span class="stamp-green">Green Flag</span> برای تو چیه؟',
      quizInstruction: 'تمام ۱۰ سناریوی زیر را مطالعه کنید و با آگاهی از همه موقعیت‌ها، در کادر هر سؤال عددی از ۱ تا ۱۰ را که مدنظرتان است انتخاب کنید.',
      ratingBoxLabel: 'کادر انتخاب عدد (از ۱ تا ۱۰):',
      notSelected: 'انتخاب نشده',
      scorePrefix: 'امتیاز',
      answeredCount: (curr, total) => `${curr} از ${total} پاسخ داده شده`,
      validationMissing: (count) => `لطفاً به تمام ۱۰ سؤال پاسخ دهید (${count} سؤال باقی‌مانده است).`,
      submitBtn: 'مشاهده نتیجه ارزیابی',
      biggestSectionTitle: 'بزرگترین گرین‌فلگ تو چیست؟',
      lowestSectionTitle: 'کمترین گرین‌فلگ تو چیست؟',
      scaleListTitle: 'انتخاب‌های تو از ۱ تا ۱۰ با سؤال داده شده',
      summaryLabel: 'جمع‌بندی ارزیابی:',
      summaryText: 'شما بیشترین ارزش را برای رفتارهای توأم با احترام به مرزها، شنیدن فعال و صداقت بالغانه قائل هستید؛ احساس امنیت و پذیرش بی‌قیدوشرط پایه ارتباط شماست.',
      retakeBtn: 'انجام دوباره تست',
      shareBtn: 'اشتراک‌گذاری نتیجه',
      backToHubBtn: 'بازگشت به آزمون‌ها',
      toastCopied: 'نتیجه گرین‌فلگ‌ها در کلیپ‌بورد کپی شد'
    },
    en: {
      hubBadge: '10 Situational Scenarios · 1 to 10 Scale',
      hubTitle: 'What is your biggest <span class="card-title-green-en">Green Flag</span>?',
      hubSub1: 'If you witness these behaviors, how deeply do you value them?',
      hubSub2: 'Review all scenarios and rate each behavior on a 1-to-10 scale.',
      hubCta: 'Start Green Flag Assessment',
      cardStamp: 'What is your biggest <span class="stamp-green">Green Flag</span>?',
      quizInstruction: 'Review all 10 scenarios below and select any number from 1 to 10 for each question.',
      ratingBoxLabel: 'Rating selector box (1 to 10):',
      notSelected: 'Not selected',
      scorePrefix: 'Score',
      answeredCount: (curr, total) => `${curr} of ${total} answered`,
      validationMissing: (count) => `Please assign a rating to all 10 questions (${count} remaining).`,
      submitBtn: 'View Assessment Results',
      biggestSectionTitle: 'What is your biggest Green Flag?',
      lowestSectionTitle: 'What is your lowest Green Flag?',
      scaleListTitle: 'Your Choices from 1 to 10 with Scenarios',
      summaryLabel: 'Assessment Summary:',
      summaryText: 'You place the highest value on respect for boundaries, active listening, and sincere accountability; unconditional emotional safety forms your relational core.',
      retakeBtn: 'Retake Test',
      shareBtn: 'Share Results',
      backToHubBtn: 'Back to Tests Hub',
      toastCopied: 'Green Flags result copied to clipboard'
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

  let bgfQuestionsContainer = null;
  let bgfQuestionsList = null;
  let bgfAnsweredCounter = null;
  let bgfQuizInstruction = null;
  let btnSubmitBgf = null;
  let btnSubmitBgfText = null;
  let bgfValidationMsg = null;

  let bgfResultMainTitle = null;
  let bgfBiggestTitle = null;
  let bgfBiggestScoreBadge = null;
  let bgfBiggestScenario = null;
  let bgfBiggestTag = null;

  let bgfLowestTitle = null;
  let bgfLowestScoreBadge = null;
  let bgfLowestScenario = null;
  let bgfLowestTag = null;

  let bgfScaleListTitle = null;
  let rankingListEl = null;
  let bgfSummaryLabel = null;
  let bgfResultSummaryText = null;

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

  function renderAllQuestions() {
    if (!bgfQuestionsList) return;

    const lang = getCurrentLang();
    const t = BGF_UI[lang] || BGF_UI.fa;

    if (bgfQuizInstruction) {
      bgfQuizInstruction.textContent = t.quizInstruction;
    }
    if (btnSubmitBgfText) {
      btnSubmitBgfText.textContent = t.submitBtn;
    }

    bgfQuestionsList.innerHTML = '';

    BGF_SCENARIOS.forEach((scenario, idx) => {
      const sData = scenario[lang] || scenario.fa;
      const currentVal = bgfState.answers[idx];

      const card = document.createElement('div');
      card.className = `question-item-card ${currentVal ? 'is-answered' : ''}`;
      card.id = `bgf-q-card-${idx}`;

      card.innerHTML = `
        <div class="q-card-header">
          <div class="q-number-badge">${idx + 1}</div>
          <h3 class="q-card-title">${escapeHTML(sData.title)}</h3>
        </div>
        <p class="q-card-scenario">${escapeHTML(sData.question)}</p>
        <div class="q-rating-box">
          <div class="q-rating-box-header">
            <span class="q-box-label">${t.ratingBoxLabel}</span>
            <span class="q-box-selected-val" id="bgf-val-badge-${idx}">
              ${currentVal ? `${t.scorePrefix}: ${currentVal}` : t.notSelected}
            </span>
          </div>
          <div class="q-numbers-row">
            ${Array.from({ length: 10 }, (_, i) => i + 1).map(num => `
              <button type="button" class="q-pill-btn ${currentVal === num ? 'is-selected' : ''}" data-q="${idx}" data-val="${num}">
                ${num}
              </button>
            `).join('')}
            <input type="number" min="1" max="10" class="q-number-input-box" placeholder="۱..۱۰" data-q="${idx}" value="${currentVal || ''}" aria-label="Rating for scenario ${idx + 1}">
          </div>
        </div>
      `;

      const buttons = card.querySelectorAll('.q-pill-btn');
      const input = card.querySelector('.q-number-input-box');

      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          const val = Number(btn.dataset.val);
          selectQuestionRating(idx, val, card, buttons, input);
        });
      });

      input.addEventListener('input', (e) => {
        let val = parseInt(e.target.value, 10);
        if (isNaN(val)) return;
        if (val < 1) val = 1;
        if (val > 10) val = 10;
        e.target.value = val;
        selectQuestionRating(idx, val, card, buttons, input);
      });

      bgfQuestionsList.appendChild(card);
    });

    updateAnsweredCount();
  }

  function selectQuestionRating(qIdx, val, cardEl, buttons, inputEl) {
    playSubtleClick(500 + val * 30);

    bgfState.answers[qIdx] = val;

    buttons.forEach(b => {
      b.classList.toggle('is-selected', Number(b.dataset.val) === val);
    });

    if (inputEl && Number(inputEl.value) !== val) {
      inputEl.value = val;
    }

    cardEl.classList.add('is-answered');
    cardEl.classList.remove('is-highlight-missing');

    const badge = document.getElementById(`bgf-val-badge-${qIdx}`);
    const lang = getCurrentLang();
    const t = BGF_UI[lang] || BGF_UI.fa;
    if (badge) {
      badge.textContent = `${t.scorePrefix}: ${val}`;
    }

    if (bgfValidationMsg) {
      bgfValidationMsg.style.display = 'none';
    }

    updateAnsweredCount();
  }

  function updateAnsweredCount() {
    const answered = Object.keys(bgfState.answers).length;
    const lang = getCurrentLang();
    const t = BGF_UI[lang] || BGF_UI.fa;
    if (bgfAnsweredCounter) {
      bgfAnsweredCounter.textContent = t.answeredCount(answered, BGF_SCENARIOS.length);
    }
  }

  function handleSubmitBgfAssessment() {
    playSubtleClick(580);
    const unanswered = [];
    for (let i = 0; i < BGF_SCENARIOS.length; i++) {
      if (bgfState.answers[i] === undefined || bgfState.answers[i] === null) {
        unanswered.push(i);
      }
    }

    if (unanswered.length > 0) {
      unanswered.forEach(idx => {
        const card = document.getElementById(`bgf-q-card-${idx}`);
        if (card) {
          card.classList.add('is-highlight-missing');
        }
      });

      const firstCard = document.getElementById(`bgf-q-card-${unanswered[0]}`);
      if (firstCard) {
        firstCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      const lang = getCurrentLang();
      const t = BGF_UI[lang] || BGF_UI.fa;
      if (bgfValidationMsg) {
        bgfValidationMsg.textContent = t.validationMissing(unanswered.length);
        bgfValidationMsg.style.display = 'block';
      }
      return;
    }

    bgfState.isFinished = true;
    showBgfView(viewBgfResult);
    renderBgfResults();
  }

  // ==========================================================================
  // 6. RANKING COMPILATION & RESULT PRESENTATION
  // ==========================================================================
  function computeRankings() {
    const lang = getCurrentLang();
    const items = [];

    BGF_SCENARIOS.forEach((scenario, idx) => {
      const val = Number(bgfState.answers[idx]) || 1;
      const sData = scenario[lang] || scenario.fa;
      items.push({
        num: val,
        title: sData.title,
        question: sData.question,
        qIdx: idx
      });
    });

    items.sort((a, b) => a.num - b.num);
    return items;
  }

  function renderBgfResults() {
    const lang = getCurrentLang();
    const t = BGF_UI[lang] || BGF_UI.fa;
    const items = computeRankings(); // sorted by num ascending 1..10

    if (items.length === 0) return;

    // 1. Highlight: Biggest Green Flag (highest score)
    const maxScore = Math.max(...items.map(it => it.num));
    const biggestItem = items.slice().reverse().find(it => it.num === maxScore) || items[items.length - 1];

    if (bgfBiggestTitle) bgfBiggestTitle.textContent = biggestItem.title;
    if (bgfBiggestScoreBadge) bgfBiggestScoreBadge.textContent = `${biggestItem.num} / 10`;
    if (bgfBiggestScenario) bgfBiggestScenario.textContent = biggestItem.question;
    if (bgfBiggestTag) bgfBiggestTag.textContent = t.biggestSectionTitle;

    // 2. Highlight: Lowest Green Flag (lowest score)
    const minScore = Math.min(...items.map(it => it.num));
    const lowestItem = items.find(it => it.num === minScore) || items[0];

    if (bgfLowestTitle) bgfLowestTitle.textContent = lowestItem.title;
    if (bgfLowestScoreBadge) bgfLowestScoreBadge.textContent = `${lowestItem.num} / 10`;
    if (bgfLowestScenario) bgfLowestScenario.textContent = lowestItem.question;
    if (bgfLowestTag) bgfLowestTag.textContent = t.lowestSectionTitle;

    // 3. Full 1 to 10 list with given questions
    if (bgfScaleListTitle) {
      bgfScaleListTitle.innerHTML = `<span>${t.scaleListTitle}</span>`;
    }

    if (rankingListEl) {
      rankingListEl.innerHTML = '';
      items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'result-scale-item-card';
        card.innerHTML = `
          <div class="scale-item-num-badge">${item.num}</div>
          <div class="scale-item-details">
            <div class="scale-item-title">${escapeHTML(item.title)}</div>
            <div class="scale-item-scenario">${escapeHTML(item.question)}</div>
          </div>
        `;
        rankingListEl.appendChild(card);
      });
    }

    // 4. Two-Line Summary
    if (bgfSummaryLabel) bgfSummaryLabel.textContent = t.summaryLabel;
    if (bgfResultSummaryText) bgfResultSummaryText.textContent = t.summaryText;

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

    // Participant Badge & Central Archive
    const bgfBadge = document.getElementById('bgf-participant-badge');
    const participantName = bgfState.participantName || (window.HodousTestHub ? window.HodousTestHub.getNickname() : '') || 'مهمان';
    if (bgfBadge) {
      bgfBadge.innerHTML = lang === 'en'
        ? `Assessment for: <b>${escapeHTML(participantName)}</b>`
        : `انتخاب‌های: <b>${escapeHTML(participantName)}</b>`;
    }

    if (window.HodousTestHub && window.HodousTestHub.saveResult && items.length > 0) {
      const detailedChoices = items.map(it => ({
        qNum: it.num,
        title: it.title,
        choice: `امتیاز: ${it.num}`
      }));

      window.HodousTestHub.saveResult({
        testId: 'biggest-green-flag',
        testTitle: 'بزرگترین Green Flag تو چیه؟',
        nickname: participantName,
        score: `بزرگترین گرین‌فلگ: ${biggestItem.title} (${biggestItem.num}/10)`,
        details: items.map(it => `${it.num}. ${it.title}`).join(' · '),
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
    const items = computeRankings();

    let shareUrl = '';
    if (window.HodousTestHub && window.HodousTestHub.generateShareUrl && items.length > 0) {
      shareUrl = window.HodousTestHub.generateShareUrl('biggest-green-flag', `۱: ${items[0].title}`);
    }

    const lines = [
      lang === 'en' ? '🌱 My Green Flag Choices (1 to 10):' : '🌱 انتخاب‌های من در تست گرین‌فلگ (از ۱ تا ۱۰):',
      ...items.map(item => `${item.num}. ${item.title}`),
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
    renderAllQuestions();
    showBgfView(viewBgfQuiz);
  }

  // ==========================================================================
  // 7. LANGUAGE SYNC (Callable globally)
  // ==========================================================================
  window.updateBgfLanguage = function(lang) {
    const t = BGF_UI[lang] || BGF_UI.fa;

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

    if (viewBgfQuiz && viewBgfQuiz.classList.contains('is-active')) {
      renderAllQuestions();
    }

    if (viewBgfResult && viewBgfResult.classList.contains('is-active')) {
      renderBgfResults();
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

    bgfQuestionsContainer = document.getElementById('bgf-questions-container');
    bgfQuestionsList = document.getElementById('bgf-questions-list');
    bgfAnsweredCounter = document.getElementById('bgf-answered-counter');
    bgfQuizInstruction = document.getElementById('bgf-quiz-instruction');
    btnSubmitBgf = document.getElementById('btn-submit-bgf');
    btnSubmitBgfText = document.getElementById('btn-submit-bgf-text');
    bgfValidationMsg = document.getElementById('bgf-validation-msg');

    bgfResultMainTitle = document.getElementById('bgf-result-main-title');
    bgfBiggestTitle = document.getElementById('bgf-biggest-title');
    bgfBiggestScoreBadge = document.getElementById('bgf-biggest-score-badge');
    bgfBiggestScenario = document.getElementById('bgf-biggest-scenario');
    bgfBiggestTag = document.getElementById('bgf-biggest-tag');

    bgfLowestTitle = document.getElementById('bgf-lowest-title');
    bgfLowestScoreBadge = document.getElementById('bgf-lowest-score-badge');
    bgfLowestScenario = document.getElementById('bgf-lowest-scenario');
    bgfLowestTag = document.getElementById('bgf-lowest-tag');

    bgfScaleListTitle = document.getElementById('bgf-scale-list-title');
    rankingListEl = document.getElementById('bgf-ranking-list');
    bgfSummaryLabel = document.getElementById('bgf-summary-label');
    bgfResultSummaryText = document.getElementById('bgf-result-summary-text');

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

    // Submit Assessment Button
    if (btnSubmitBgf) {
      btnSubmitBgf.addEventListener('click', () => {
        handleSubmitBgfAssessment();
      });
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
