/**
 * ============================================================================
 * Hodous — بزرگترین ردفلگ برای تو چیه؟ (Interactive Elimination Red Flag Test)
 * 10 Situational Scenarios · 1 to 10 Rating Scale · Elimination Mode
 * Each number (1..10) is selected exactly once and removed from subsequent questions.
 * Top 5 Red Flags Ranking & Personalized Behavioral Synthesis
 * Pure Vanilla JavaScript · Web Audio API · Zero External Dependencies · Zero SVG
 * ============================================================================
 */

(() => {
  'use strict';

  // ========================================================================
  // 1. 10 SITUATIONAL SCENARIOS DATA (Bilingual FA & EN)
  // Exactly 10 Scenarios corresponding to 10 Unique Rating Numbers (1 to 10)
  // ========================================================================
  const QUESTIONS = [
    {
      id: 1,
      category: 'privacy_breach',
      fa: {
        title: 'نقض حریم شخصی و افشای راز',
        question: 'با یک نفر صمیمی هستی. یک روز متوجه می‌شوی حرف شخصی‌ای که قبلاً به او گفته بودی را برای چند نفر دیگر تعریف کرده و وقتی ناراحت می‌شوی می‌گوید:\n«چیز خاصی نبود که، مگه چی گفتم؟»',
        explanation: 'شما رازداری و حفظ کلام محرمانه را سنگ‌بنای اعتماد می‌دانید. افشای حرف خصوصی و به دنبال آن کوچک‌انگاری موضوع، از نظر شما نقض جدی پیوند امن است.'
      },
      en: {
        title: 'Breach of Privacy & Secret Sharing',
        question: 'You are close with someone. One day, you discover they shared a personal secret you told them with several others. When you express hurt, they dismiss it:\n"It was no big deal, what did I even say?"',
        explanation: 'You consider confidentiality the cornerstone of trust. Sharing private confidences followed by trivializing the breach represents a profound violation of relational safety.'
      }
    },
    {
      id: 2,
      category: 'blame_generalization',
      fa: {
        title: 'برچسب‌زنی کلی و فرافکنی تقصیر',
        question: 'هر وقت با طرف مقابل اختلاف نظر داری، به جای اینکه درباره موضوع صحبت کند، می‌گوید:\n«تو کلاً همین‌طوری‌ای، همیشه مشکل از توئه.»',
        explanation: 'شما از تعمیم‌های تخریبی و حمله به کلیت شخصیت به‌شدت فاصله می‌گیرید و معتقدید تعارض‌ها باید صرفاً حول موضوع واقعی و به شیوه بالغانه حل شوند.'
      },
      en: {
        title: 'Toxic Generalization & Constant Blaming',
        question: 'Whenever you disagree, instead of addressing the actual topic, they say:\n"You are always like this, the problem is always you."',
        explanation: 'You reject sweeping character attacks and deflection, insisting that conflicts be resolved constructively around the actual issue rather than labeling your entire identity.'
      }
    },
    {
      id: 3,
      category: 'relational_isolation',
      fa: {
        title: 'انحصارطلبی و انزوای اجتماعی',
        question: 'با یک نفر صمیمی هستی و متوجه می‌شوی هر وقت با آدم جدیدی دوست می‌شوی، رفتار او سرد می‌شود و سعی می‌کند کاری کند که کمتر با آن شخص وقت بگذرانی.',
        explanation: 'حفظ استقلال فردی و داشتن شبکه‌ای آزاد از دوستی‌ها برای شما حیاتی است. تلاش پنهان برای منزوی ساختن شما خط قرمزی آشکار در روابط به شمار می‌رود.'
      },
      en: {
        title: 'Possessiveness & Social Isolation',
        question: 'You are close with someone and notice that whenever you make a new friend, they turn cold and try to manipulate you into spending less time with that person.',
        explanation: 'Maintaining autonomy and diverse friendships is vital to you. Covert attempts to isolate you or restrict your social life are perceived as a severe boundary violation.'
      }
    },
    {
      id: 4,
      category: 'silent_mindgames',
      fa: {
        title: 'قهر تنبیهی و بازی‌های روانی',
        question: 'وقتی طرف مقابل از چیزی ناراحت می‌شود، چند روز عمداً جواب نمی‌دهد؛ نه برای اینکه آرام شود، بلکه بعداً خودش می‌گوید:\n«می‌خواستم ببینم چقدر دنبالم میای.»',
        explanation: 'شما به ارتباط شفاف و صریح باور دارید و بازی با احساسات از طریق سکوت تنبیهی و آزمودن میزان التماس طرف مقابل را رفتاری کودکانه و فرساینده می‌دانید.'
      },
      en: {
        title: 'Punitive Silent Treatment & Mind Games',
        question: 'When upset, they deliberately ignore you for days—not to cool down, but later admitting:\n"I wanted to test how much you would chase after me."',
        explanation: 'You value direct and transparent communication, viewing punitive silence and manipulative loyalty tests as emotionally exhausting and toxic relationship games.'
      }
    },
    {
      id: 5,
      category: 'public_humiliation',
      fa: {
        title: 'تحقیر در جمع و شوخی با نقاط ضعف',
        question: 'یک بار جلوی بقیه اشتباهی می‌کنی. طرف مقابل دقیقاً می‌داند این موضوع برایت حساس است، اما باز هم همان موضوع را جلوی جمع به شوخی مطرح می‌کند.',
        explanation: 'شما انتظار دارید نزدیکان شما سپر عزت‌نفس شما در جمع باشند. خنداندن دیگران به بهای شکستن شأن شما، رفتاری غیرقابل‌توجیه در نگاه شماست.'
      },
      en: {
        title: 'Public Humiliation & Exploiting Vulnerability',
        question: 'You make an innocent mistake in public. They know precisely this is sensitive for you, yet they bring it up as a joke in front of everyone.',
        explanation: 'You expect close allies to safeguard your dignity. Entertaining a group at the expense of your acknowledged sensitivities is deeply intolerable to you.'
      }
    },
    {
      id: 6,
      category: 'surveillance_control',
      fa: {
        title: 'تجسس و کنترل‌گری تحت لوای اعتماد',
        question: 'طرف مقابل از تو می‌خواهد رمز گوشی یا حساب‌هایت را داشته باشد و وقتی می‌پرسی چرا، جواب می‌دهد:\n«اگر چیزی برای پنهان کردن نداری، پس نباید مشکلی داشته باشی.»',
        explanation: 'شما تفاوت شفافی میان پنهان‌کاری و حریم خصوصی قائلید. تحمیل کنترل و تفتیش به بهانه اثبات صداقت، از دید شما نشانه سوءظن مزمن و نادیده گرفتن مرزهاست.'
      },
      en: {
        title: 'Surveillance & False Transparency Control',
        question: 'They demand passwords to your phone or accounts, saying:\n"If you have nothing to hide, you shouldn\'t have a problem with it."',
        explanation: 'You draw a sharp line between secrecy and privacy. Demanding digital surveillance under the guise of proving honesty is a severe breach of mutual respect.'
      }
    },
    {
      id: 7,
      category: 'diminishing_success',
      fa: {
        title: 'تخریب موفقیت و حسادت پنهان',
        question: 'هر وقت موفقیتی به دست می‌آوری، به جای اینکه خوشحال شود، سریع شروع می‌کند به پیدا کردن ایرادش:\n«خب خیلی هم چیز خاصی نیست، فلانی خیلی بهتر انجامش داده.»',
        explanation: 'شما مایلید در کنار افرادی باشید که حامی رشد شما باشند. کوچک‌انگاری دستاوردها و مقایسه‌های طعنه‌آمیز، بیانگر رقابت ناسالم و عدم ظرفیت همدلی است.'
      },
      en: {
        title: 'Diminishing Success & Covert Envy',
        question: 'Whenever you achieve something, rather than being happy, they swiftly undercut it:\n"Well, it\'s not that special, someone else did it way better."',
        explanation: 'You need relationships grounded in mutual celebration. Downplaying accomplishments and cynical comparisons reveal destructive envy and lack of genuine support.'
      }
    },
    {
      id: 8,
      category: 'gaslighting_invalidation',
      fa: {
        title: 'دستکاری واقعیت (گس‌لایتینگ) و بی‌ارزش‌سازی احساس',
        question: 'وقتی از رفتار او ناراحت می‌شوی، به جای اینکه درباره موضوع صحبت کند، می‌گوید:\n«تو زیادی حساسی. هیچ آدم عاقلی از این چیزها ناراحت نمیشه.»',
        explanation: 'شما حق ابراز احساسات را محترم می‌شمارید. زیر سؤال بردن درک شما یا متهم کردنتان به حساسیت افراطی، تلاشی برای فرار از مسئولیت و بسیار آسیب‌زننده است.'
      },
      en: {
        title: 'Gaslighting & Emotional Invalidation',
        question: 'When you are hurt by their action, rather than discussing it, they say:\n"You are way too sensitive. No rational person would get upset over that."',
        explanation: 'You consider emotional validity non-negotiable. Questioning your sanity or dismissing feelings as "overly sensitive" is perceived as dangerous gaslighting.'
      }
    },
    {
      id: 9,
      category: 'weaponizing_secrets',
      fa: {
        title: 'سلاح‌سازی از رازها و نقاط حساس در دعوا',
        question: 'موضوعی را قبلاً به او گفته‌ای که دوست نداری درباره‌اش صحبت شود. بعد از یک دعوا، همان موضوع را دقیقاً می‌داند کجا استفاده کند تا بیشتر ناراحتت کند.',
        explanation: 'شما گشودگی عاطفی را نشانه صمیمیت می‌دانید. تبدیل اعتراف‌ها و ضعف‌های شما به تیری برای انتقام در تنش‌ها، یکی از عمیق‌ترین موارد نقض امانت است.'
      },
      en: {
        title: 'Weaponizing Secrets in Arguments',
        question: 'You previously confided a sensitive matter you don\'t like brought up. In an argument, they deliberately weaponize that exact thing to maximize your hurt.',
        explanation: 'You treat vulnerability as sacred intimacy. Turning shared confidences into ammunition during conflict is one of the ultimate relational betrayals in your eyes.'
      }
    },
    {
      id: 10,
      category: 'dodging_accountability',
      fa: {
        title: 'سلب مسئولیت و وارونه‌سازی تقصیر',
        question: 'طرف مقابل وقتی اشتباه می‌کند تقریباً هیچ‌وقت عذرخواهی نمی‌کند. حتی وقتی واضح است که مقصر بوده، بحث را طوری پیش می‌برد که در نهایت تو احساس کنی باید از او عذرخواهی کنی.',
        explanation: 'بلوغ عاطفی و شهامت عذرخواهی برای شما معیار اساسی است. مواجهه با فردی که خطا را نمی‌پذیرد و ماجرا را وارونه می‌کند، فرسایش شدید اعصاب را به همراه دارد.'
      },
      en: {
        title: 'Dodging Accountability & Guilt Inversion',
        question: 'When they make an unmistakable mistake, they almost never apologize. Instead, they twist the argument until you end up feeling you should apologize to them.',
        explanation: 'Emotional maturity and sincere accountability are paramount to you. Dealing with someone who twists reality to make you apologize for their wrongdoing is intolerable.'
      }
    }
  ];

  const TOTAL_QUESTIONS = QUESTIONS.length; // Exactly 10 questions

  // ========================================================================
  // 2. UI TEXT DICTIONARY (Bilingual Localization)
  // ========================================================================
  const UI_TEXT = {
    fa: {
      dir: 'rtl',
      hubTitle: 'Test',
      hubBadge: '۱۰ سناریوی واقعی · مقیاس ۱ تا ۱۰ (حذف تدریجی عدد)',
      hubMainTitle: 'بزرگترین ردفلگ برای تو چیه؟',
      hubSub1: 'اگر این رفتارها را از یک نفر ببینی، چقدر برایت قابل‌قبول‌اند؟',
      hubSub2: 'اگر این رفتارها را از یک نفر ببینی، چقدر برایت Red Flag محسوب می‌شوند؟',
      hubCta: 'شروع ارزیابی خطوط قرمز',
      hubArrow: '←',
      back: 'بازگشت',
      soundOn: 'صدا فعال',
      soundMuted: 'بی‌صدا',
      setupHeadline: 'تنظیمات آزمون',
      setupSubHeadline: 'زبان آزمون و ظاهر کارت را مشخص کنید',
      langLabel: 'زبان آزمون / Test Language',
      themeLabel: 'پوسته کارت / Card Theme',
      previewWhite: 'پس‌زمینه روشن و مینیمال (پاستیلی)',
      previewBlack: 'پس‌زمینه تیره و مخملی (یاقوتی)',
      previewOpt: 'مقیاس ۱ تا ۱۰ (یکتا)',
      startBtn: 'شروع تست',
      questionOf: (curr, total) => `سؤال ${curr} از ${total}`,
      scaleHint: 'هر عدد فقط یک بار قابل انتخاب است و پس از انتخاب از گزینه‌ها حذف می‌شود',
      scaleMin: '۱ = کمترین میزان Red Flag',
      scaleMax: '۱۰ = بیشترین میزان Red Flag',
      animationSubtitle: 'در حال تحلیل خطوط قرمز و استخراج رنکینگ...',
      resultKicker: 'تحلیل اختصاصی معیارهای ارتباطی',
      biggestTitlePrefix: 'بزرگترین ردفلگ برای تو:',
      rankingTitle: 'رنکینگ ۵ مورد با بیشترین حساسیت برای تو',
      summaryTitle: 'جمع‌بندی سبک ارتباطی و فاصله‌گیری از رفتارهای ناسالم',
      disclaimerText: 'توجه: این تست درباره معیارهای شخص برای تشخیص Red Flag در دیگران است، نه تشخیص شخصیت یا سلامت روان.',
      retakeBtn: 'انجام دوباره تست',
      shareBtn: 'اشتراک‌گذاری رنکینگ',
      copiedToast: 'رنکینگ در کلیپ‌بورد کپی شد',
      readyToast: 'رنکینگ آماده اشتراک‌گذاری است'
    },
    en: {
      dir: 'ltr',
      hubTitle: 'Test',
      hubBadge: '10 Real Scenarios · 1 to 10 Scale (Elimination Mode)',
      hubMainTitle: 'What is your biggest Red Flag?',
      hubSub1: 'If you encounter these behaviors, how acceptable are they to you?',
      hubSub2: 'How much of a Red Flag is each behavior in your eyes?',
      hubCta: 'Begin Red Flag Assessment',
      hubArrow: '→',
      back: 'Back',
      soundOn: 'Sound On',
      soundMuted: 'Muted',
      setupHeadline: 'Test Preferences',
      setupSubHeadline: 'Select language and visual card theme',
      langLabel: 'Test Language',
      themeLabel: 'Card Theme',
      previewWhite: 'Minimal light pastel aesthetic',
      previewBlack: 'Deep velvety dark ruby aesthetic',
      previewOpt: '1 to 10 Scale (Unique)',
      startBtn: 'Start Test',
      questionOf: (curr, total) => `Question ${curr} of ${total}`,
      scaleHint: 'Each number can only be chosen once and will be removed after selection',
      scaleMin: '1 = Lowest Red Flag',
      scaleMax: '10 = Highest Red Flag',
      animationSubtitle: 'Analyzing your relational boundaries and compiling rankings...',
      resultKicker: 'Personalized Relational Standards Analysis',
      biggestTitlePrefix: 'Your Biggest Red Flag:',
      rankingTitle: 'Top 5 Highest Sensitivity Red Flags',
      summaryTitle: 'Synthesis of Relational Standards & Distancing Triggers',
      disclaimerText: 'Note: This test explores your personal criteria for detecting Red Flags in others, not a diagnosis of your personality or mental health.',
      retakeBtn: 'Retake Test',
      shareBtn: 'Share Ranking',
      copiedToast: 'Ranking copied to clipboard',
      readyToast: 'Ranking ready to share'
    }
  };

  // ========================================================================
  // 3. PERSISTENT APPLICATION STATE
  // ========================================================================
  const STATE_STORAGE_KEY = 'hodous_redflag_elimination_v2';

  let state = {
    selectedLanguage: 'fa', // 'fa' | 'en'
    selectedTheme: 'white', // 'white' | 'black'
    inTestMode: false,
    testStarted: false,
    testFinished: false,
    currentQuestion: 0,
    answers: {}, // questionIndex (0..9) => score (1..10)
    soundEnabled: true,
    result: null,
    participantName: ''
  };

  function saveState() {
    try {
      localStorage.setItem(STATE_STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STATE_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          state = Object.assign(state, parsed);
        }
      }
    } catch (e) {}
  }

  function clearState() {
    state.inTestMode = false;
    state.testStarted = false;
    state.testFinished = false;
    state.currentQuestion = 0;
    state.answers = {};
    state.result = null;
    saveState();
  }

  // Returns list of numbers 1..10 not yet used in state.answers
  function getAvailableScores() {
    const used = Object.values(state.answers).map(Number);
    const available = [];
    for (let i = 1; i <= 10; i++) {
      if (!used.includes(i)) {
        available.push(i);
      }
    }
    return available;
  }

  // ========================================================================
  // 4. WEB AUDIO API SYNTHESIZER
  // ========================================================================
  let audioCtx = null;
  let isSoundEnabled = true;

  function initAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        try {
          audioCtx = new AudioContextClass();
        } catch (e) {
          audioCtx = null;
        }
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
  }

  // A. Tactile Scale Click Chime
  function playScaleSelectSound(val) {
    if (!isSoundEnabled || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      const baseFreq = 420 + (val * 46);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.7, now + 0.08);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {}
  }

  // B. Transition Whoosh
  function playTransitionSound() {
    if (!isSoundEnabled || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.12);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {}
  }

  // C. Completion Fanfare Chord
  function playCompletionChimes() {
    if (!isSoundEnabled || !audioCtx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const start = audioCtx.currentTime + idx * 0.07;
        const dur = 0.55;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.06, start + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(start);
        osc.stop(start + dur);
      });
    } catch (e) {}
  }

  // ========================================================================
  // 5. RANKING & BEHAVIORAL ANALYSIS ALGORITHM
  // ========================================================================
  function computeRankings() {
    const lang = state.selectedLanguage || 'fa';

    // Map each of the 10 questions with the unique assigned score
    const records = QUESTIONS.map((q, idx) => {
      const userScore = state.answers[idx] !== undefined ? Number(state.answers[idx]) : 5;
      const meta = q[lang];
      return {
        id: q.id,
        category: q.category,
        title: meta.title,
        question: meta.question,
        explanation: meta.explanation,
        score: userScore
      };
    });

    // Sort strictly descending by score
    const sorted = [...records].sort((a, b) => b.score - a.score);

    const biggest = sorted[0]; // Exactly score 10
    const top5 = sorted.slice(0, 5); // Scores 10, 9, 8, 7, 6

    // Dynamic Summary Synthesis
    let summaryText = '';
    if (lang === 'fa') {
      const topCats = top5.map(t => t.title).slice(0, 3).join('، ');
      summaryText = `بررسی اولویت‌بندی دقیق شما نشان می‌دهد که حساس‌ترین و غیرقابل‌مذاکره‌ترین خطوط قرمز شما در روابط، حول محور «${topCats}» شکل گرفته‌اند. شما پیوندهایی را تاب می‌آورید که شفافیت، حفظ حریم شخصی و احترام متقابل به استقلال فرد در آن‌ها تضمین‌شده باشد. هرگونه تلاش برای بازی روانی، بی‌ارزش‌سازی احساسات یا کنترل‌گری پنهان، بلافاصله زنگ خطر شما را به صدا درآورده و شما را به سمت فاصله‌گیری قاطعانه از رابطه سوق می‌دهد.`;
    } else {
      const topCats = top5.map(t => t.title).slice(0, 3).join(', ');
      summaryText = `Your rigorous ranking reveals that your most non-negotiable boundaries center around "${topCats}". You thrive in connections where transparency, personal privacy, and profound respect for individual autonomy are safeguarded. Any perceived mind games, emotional invalidation, or covert control immediately activate your relational defenses, leading you to decisively distance yourself.`;
    }

    return {
      biggest,
      top5,
      summaryText
    };
  }

  // ========================================================================
  // 6. DOM ELEMENTS
  // ========================================================================
  const viewHub = document.getElementById('view-hub');
  const viewTheme = document.getElementById('view-theme');
  const viewQuiz = document.getElementById('view-quiz');
  const viewAnimation = document.getElementById('view-animation');
  const viewResult = document.getElementById('view-result');
  const sessionControlsBar = document.getElementById('test-session-bar');

  const cardLaunchRog = document.getElementById('card-launch-rog');
  const btnBackToHub = document.getElementById('btn-back-to-hub');
  const startTestBtn = document.getElementById('btn-start-test');
  const themeBoxes = document.querySelectorAll('.theme-option-box');
  const langBoxes = document.querySelectorAll('.lang-option-box');

  const questionCardEl = document.getElementById('question-card');
  const questionCounterEl = document.getElementById('question-counter');
  const progressBarFillEl = document.getElementById('progress-bar-fill');
  const questionStatementEl = document.getElementById('question-statement');
  const scaleButtonsGridEl = document.getElementById('scale-buttons-grid');
  const scaleHintEl = document.getElementById('scale-hint-text');
  const scaleLegendMinEl = document.getElementById('scale-legend-min');
  const scaleLegendMaxEl = document.getElementById('scale-legend-max');

  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const soundStatusText = document.getElementById('sound-status-text');

  // Result Elements
  const resultBiggestTitleEl = document.getElementById('result-biggest-title');
  const resultBiggestScoreEl = document.getElementById('result-biggest-score');
  const resultBiggestDescEl = document.getElementById('result-biggest-desc');
  const rankingCardsContainerEl = document.getElementById('ranking-cards-container');
  const resultSummaryTextEl = document.getElementById('result-summary-text');
  const resultDisclaimerEl = document.getElementById('result-disclaimer');
  const btnRestart = document.getElementById('btn-restart');
  const btnShare = document.getElementById('btn-share');
  const shareToast = document.getElementById('share-toast');

  // Top Hamburger Menu
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

  // ========================================================================
  // 7. VIEW MANAGEMENT & ATMOSPHERE
  // ========================================================================
  function showView(targetView) {
    document.querySelectorAll('.view-section').forEach(v => {
      if (v) v.classList.remove('is-active');
    });

    if (sessionControlsBar) {
      sessionControlsBar.style.display = (targetView === viewHub) ? 'none' : 'flex';
    }

    // Exact user requirement: Hub is identical to index.html and song.html (light-blue theme)
    // When user starts the test (viewTheme, viewQuiz, viewAnimation, viewResult), page turns pastel red!
    if (targetView === viewHub) {
      document.body.classList.remove('theme-pastel-red');
      document.body.classList.remove('theme-gorf-pastel');
      document.body.classList.remove('theme-bgf-pastel');
    } else {
      document.body.classList.remove('theme-gorf-pastel');
      document.body.classList.remove('theme-bgf-pastel');
      document.body.classList.add('theme-pastel-red');
    }

    if (targetView) {
      targetView.classList.add('is-active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function applyLanguage(lang) {
    state.selectedLanguage = lang || 'fa';
    saveState();

    const t = UI_TEXT[state.selectedLanguage] || UI_TEXT.fa;
    const isEn = state.selectedLanguage === 'en';

    document.documentElement.lang = isEn ? 'en' : 'fa';
    document.documentElement.dir = t.dir;
    document.body.dir = t.dir;
    document.body.classList.toggle('lang-en', isEn);

    // Update global lang toggle button if present
    const globalLangBtn = document.getElementById('global-lang-toggle');
    if (globalLangBtn) {
      const btnTxt = globalLangBtn.querySelector('.global-lang-text');
      if (btnTxt) btnTxt.textContent = isEn ? 'FA' : 'EN';
    }

    // Sync with Test 2
    if (typeof window.updateGorfLanguage === 'function') {
      window.updateGorfLanguage(state.selectedLanguage);
    }

    // Sync with Test 3
    if (typeof window.updateBgfLanguage === 'function') {
      window.updateBgfLanguage(state.selectedLanguage);
    }

    // Update setup lang boxes
    langBoxes.forEach(box => {
      box.classList.toggle('is-selected', box.dataset.lang === state.selectedLanguage);
    });

    // Update static labels in Hub & Setup
    const hubCardBadge = document.getElementById('hub-card-badge-text');
    const hubCardTitle = document.getElementById('hub-card-title');
    const hubCardSub1 = document.getElementById('hub-card-sub1');
    const hubCardSub2 = document.getElementById('hub-card-sub2');
    const hubCardCta = document.getElementById('hub-card-cta-text');
    const hubCardArrow = document.getElementById('hub-card-cta-arrow');

    if (hubCardBadge) hubCardBadge.textContent = t.hubBadge;
    if (hubCardTitle) hubCardTitle.innerHTML = isEn 
      ? 'What is your biggest <span class="card-title-red">Red Flag</span>?' 
      : 'بزرگترین <span class="card-title-red">ردفلگ</span> برای تو چیه؟';
    if (hubCardSub1) hubCardSub1.textContent = t.hubSub1;
    if (hubCardSub2) hubCardSub2.textContent = t.hubSub2;
    if (hubCardCta) hubCardCta.textContent = t.hubCta;
    if (hubCardArrow) hubCardArrow.textContent = t.hubArrow;

    const setupMainHeadline = document.getElementById('setup-main-headline');
    const setupSubHeadline = document.getElementById('setup-sub-headline');
    const labelLangSelect = document.getElementById('label-lang-select');
    const labelThemeSelect = document.getElementById('label-theme-select');
    const previewTextWhite = document.getElementById('preview-text-white');
    const previewTextBlack = document.getElementById('preview-text-black');
    const previewOptWhite = document.getElementById('preview-opt-white');
    const previewOptBlack = document.getElementById('preview-opt-black');
    const btnStartTestText = document.getElementById('btn-start-test-text');
    const btnStartTestArrow = document.getElementById('btn-start-test-arrow');

    if (setupMainHeadline) setupMainHeadline.textContent = t.setupHeadline;
    if (setupSubHeadline) setupSubHeadline.textContent = t.setupSubHeadline;
    if (labelLangSelect) labelLangSelect.textContent = t.langLabel;
    if (labelThemeSelect) labelThemeSelect.textContent = t.themeLabel;
    if (previewTextWhite) previewTextWhite.textContent = t.previewWhite;
    if (previewTextBlack) previewTextBlack.textContent = t.previewBlack;
    if (previewOptWhite) previewOptWhite.textContent = t.previewOpt;
    if (previewOptBlack) previewOptBlack.textContent = t.previewOpt;
    if (btnStartTestText) btnStartTestText.textContent = t.startBtn;
    if (btnStartTestArrow) btnStartTestArrow.textContent = t.hubArrow;

    // Scale Legends & Hints
    if (scaleHintEl) scaleHintEl.textContent = t.scaleHint;
    if (scaleLegendMinEl) scaleLegendMinEl.textContent = t.scaleMin;
    if (scaleLegendMaxEl) scaleLegendMaxEl.textContent = t.scaleMax;

    // Nav Bar
    const backBtnText = btnBackToHub ? btnBackToHub.querySelector('span:last-child') : null;
    if (backBtnText) backBtnText.textContent = t.back;
    if (soundStatusText) soundStatusText.textContent = isSoundEnabled ? t.soundOn : t.soundMuted;

    // If currently on Quiz view, re-render question text
    if (viewQuiz && viewQuiz.classList.contains('is-active')) {
      renderCurrentQuestion();
    }

    // If currently on Result view, re-render rankings
    if (viewResult && viewResult.classList.contains('is-active')) {
      renderResults();
    }
  }

  function applyTheme(theme) {
    state.selectedTheme = theme === 'black' ? 'black' : 'white';
    saveState();

    const isBlack = state.selectedTheme === 'black';

    themeBoxes.forEach(box => {
      box.classList.toggle('is-selected', box.dataset.theme === state.selectedTheme);
    });

    if (questionCardEl) {
      questionCardEl.classList.remove('theme-white', 'theme-black');
      questionCardEl.classList.add(isBlack ? 'theme-black' : 'theme-white');
    }

    document.body.classList.toggle('theme-mode-dark', isBlack);
  }

  // ========================================================================
  // 8. QUESTION RENDERING & ELIMINATION SCALE INTERACTION
  // ========================================================================
  let isTransitioning = false;

  function renderCurrentQuestion() {
    const idx = state.currentQuestion;
    const q = QUESTIONS[idx];
    if (!q) return;

    const lang = state.selectedLanguage || 'fa';
    const t = UI_TEXT[lang] || UI_TEXT.fa;
    const meta = q[lang];

    // 1. Counter (سؤال ۱ از ۱۰)
    if (questionCounterEl) {
      questionCounterEl.textContent = t.questionOf(idx + 1, TOTAL_QUESTIONS);
    }

    // 2. Progress Bar
    if (progressBarFillEl) {
      const pct = Math.round(((idx + 1) / TOTAL_QUESTIONS) * 100);
      progressBarFillEl.style.width = `${pct}%`;
    }

    // 3. Question Statement
    if (questionStatementEl) {
      questionStatementEl.textContent = meta.question;
    }

    // 4. Render ONLY Available Numbers (Elimination Mode)
    const availableNumbers = getAvailableScores();

    if (scaleButtonsGridEl) {
      scaleButtonsGridEl.innerHTML = '';

      availableNumbers.forEach(num => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'scale-num-btn';
        btn.dataset.value = num;
        btn.textContent = num;
        btn.setAttribute('aria-label', `Rating ${num} of 10`);

        btn.addEventListener('click', () => {
          handleScaleSelection(num, btn);
        });

        scaleButtonsGridEl.appendChild(btn);
      });
    }

    isTransitioning = false;
  }

  function handleScaleSelection(value, clickedBtn) {
    if (isTransitioning) return;
    isTransitioning = true;

    initAudio();

    // 1. Record score for current question (removes 'value' from available pool)
    state.answers[state.currentQuestion] = value;
    saveState();

    // 2. Play tactile chime
    playScaleSelectSound(value);

    // 3. Highlight selected button and disable all currently visible buttons
    const allBtns = scaleButtonsGridEl.querySelectorAll('.scale-num-btn');
    allBtns.forEach(b => {
      b.disabled = true;
      b.classList.remove('is-selected');
    });
    clickedBtn.classList.add('is-selected');

    // 4. Smooth slide transition to next question after 380ms
    setTimeout(() => {
      playTransitionSound();

      if (questionCardEl) {
        questionCardEl.classList.add('is-transitioning');
      }

      setTimeout(() => {
        if (state.currentQuestion < TOTAL_QUESTIONS - 1) {
          state.currentQuestion++;
          saveState();
          renderCurrentQuestion();
          if (questionCardEl) {
            questionCardEl.classList.remove('is-transitioning');
          }
        } else {
          // Finished all 10 questions! Transition to animation stage
          state.testFinished = true;
          saveState();
          finishAssessment();
        }
      }, 200);

    }, 380);
  }

  // ========================================================================
  // 9. ANIMATION & RESULT PRESENTATION
  // ========================================================================
  function finishAssessment() {
    showView(viewAnimation);

    const lang = state.selectedLanguage || 'fa';
    const t = UI_TEXT[lang] || UI_TEXT.fa;
    const animSub = document.getElementById('animation-subtitle-text');
    if (animSub) animSub.textContent = t.animationSubtitle;

    setTimeout(() => {
      playCompletionChimes();
      renderResults();
      showView(viewResult);
    }, 2400);
  }

  function renderResults() {
    const lang = state.selectedLanguage || 'fa';
    const t = UI_TEXT[lang] || UI_TEXT.fa;
    const ranking = computeRankings();

    // Kicker & Titles
    const resKicker = document.getElementById('result-kicker-text');
    const resBiggestPrefix = document.getElementById('result-biggest-prefix');
    const rankingSectionTitle = document.getElementById('ranking-section-title');
    const summarySectionTitle = document.getElementById('summary-section-title');

    if (resKicker) resKicker.textContent = t.resultKicker;
    if (resBiggestPrefix) resBiggestPrefix.innerHTML = lang === 'en' 
      ? 'Your Biggest <span class="card-title-red">Red Flag</span>:' 
      : 'بزرگترین <span class="card-title-red">ردفلگ</span> برای تو:';
    if (rankingSectionTitle) rankingSectionTitle.textContent = t.rankingTitle;
    if (summarySectionTitle) summarySectionTitle.textContent = t.summaryTitle;

    // Biggest Red Flag Card (Score 10/10)
    if (resultBiggestTitleEl) resultBiggestTitleEl.textContent = ranking.biggest.title;
    if (resultBiggestScoreEl) resultBiggestScoreEl.textContent = `${ranking.biggest.score} / 10`;
    if (resultBiggestDescEl) resultBiggestDescEl.textContent = ranking.biggest.explanation;

    // Top 5 Ranking List (Scores 10, 9, 8, 7, 6)
    if (rankingCardsContainerEl) {
      rankingCardsContainerEl.innerHTML = '';
      ranking.top5.forEach((item, index) => {
        const rankNumber = index + 1;
        const card = document.createElement('div');
        card.className = `ranking-item-card rank-tier-${rankNumber}`;

        const pct = item.score * 10; // e.g. 10 => 100%, 9 => 90%

        card.innerHTML = `
          <div class="ranking-item-header">
            <div class="ranking-badge rank-badge-${rankNumber}">#${rankNumber}</div>
            <div class="ranking-meta-col">
              <h4 class="ranking-item-title">${item.title}</h4>
              <div class="ranking-score-pill">${item.score} / 10</div>
            </div>
          </div>
          <div class="ranking-bar-track">
            <div class="ranking-bar-fill" style="width: ${pct}%;"></div>
          </div>
          <p class="ranking-item-desc">${item.explanation}</p>
        `;

        rankingCardsContainerEl.appendChild(card);
      });
    }

    // Final Behavioral Summary
    if (resultSummaryTextEl) {
      resultSummaryTextEl.textContent = ranking.summaryText;
    }

    // Ethics Disclaimer
    if (resultDisclaimerEl) {
      resultDisclaimerEl.textContent = t.disclaimerText;
    }

    // Action Buttons
    if (btnRestart) btnRestart.textContent = t.retakeBtn;
    if (btnShare) btnShare.textContent = t.shareBtn;

    // Participant Badge & Central Archive / Webhook Logging
    const rogBadge = document.getElementById('rog-participant-badge');
    const participantName = state.participantName || (window.HodousTestHub ? window.HodousTestHub.getNickname() : '') || 'مهمان';
    if (rogBadge) {
      rogBadge.innerHTML = lang === 'en'
        ? `Personal Assessment for: <b>${escapeHTML(participantName)}</b>`
        : `کارنامه اختصاصی برای: <b>${escapeHTML(participantName)}</b>`;
    }

    if (window.HodousTestHub && window.HodousTestHub.saveResult && ranking.biggest) {
      const detailedChoices = QUESTIONS.map((q, idx) => {
        const val = state.answers[idx];
        return {
          qNum: idx + 1,
          title: q.fa ? q.fa.title : q.title,
          choice: val !== undefined ? `امتیاز رتبه‌بندی: ${val} از ۱۰` : 'ثبت نشده'
        };
      });

      window.HodousTestHub.saveResult({
        testId: 'biggest-red-flag',
        testTitle: 'بزرگترین ردفلگ برای تو چیه؟',
        nickname: participantName,
        score: `${ranking.biggest.title} (${ranking.biggest.score}/10)`,
        details: ranking.summaryText,
        choices: detailedChoices
      });
    }
  }

  function escapeHTML(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // ========================================================================
  // 10. EVENT HANDLERS & INITIALIZATION
  // ========================================================================
  function setupEvents() {
    // Top Hamburger Drawer
    if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMenu);
    if (navBackdrop) navBackdrop.addEventListener('click', closeMenu);

    // Launch Card Click (View Hub -> Setup View)
    if (cardLaunchRog) {
      const launchRogAction = () => {
        initAudio();
        if (window.HodousTestHub && window.HodousTestHub.promptNickname) {
          window.HodousTestHub.promptNickname('بزرگترین ردفلگ برای تو چیه؟', (nickname) => {
            state.participantName = nickname;
            saveState();
            document.body.classList.add('theme-pastel-red');
            showView(viewTheme);
          });
        } else {
          document.body.classList.add('theme-pastel-red');
          showView(viewTheme);
        }
      };

      cardLaunchRog.addEventListener('click', launchRogAction);
      cardLaunchRog.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          launchRogAction();
        }
      });
    }

    // Return to Hub
    if (btnBackToHub) {
      btnBackToHub.addEventListener('click', () => {
        initAudio();
        showView(viewHub);
      });
    }

    // Language Selection Boxes
    langBoxes.forEach(box => {
      box.addEventListener('click', () => {
        initAudio();
        const chosenLang = box.dataset.lang;
        applyLanguage(chosenLang);
      });
    });

    // Theme Selection Boxes
    themeBoxes.forEach(box => {
      box.addEventListener('click', () => {
        initAudio();
        const chosenTheme = box.dataset.theme;
        applyTheme(chosenTheme);
      });
    });

    // Start Test Button (Setup View -> Quiz View)
    if (startTestBtn) {
      startTestBtn.addEventListener('click', () => {
        initAudio();
        state.testStarted = true;
        state.currentQuestion = 0;
        state.answers = {};
        saveState();
        renderCurrentQuestion();
        showView(viewQuiz);
      });
    }

    // Sound Toggle
    if (soundToggleBtn) {
      soundToggleBtn.addEventListener('click', () => {
        isSoundEnabled = !isSoundEnabled;
        state.soundEnabled = isSoundEnabled;
        saveState();
        const t = UI_TEXT[state.selectedLanguage || 'fa'];
        if (soundStatusText) {
          soundStatusText.textContent = isSoundEnabled ? t.soundOn : t.soundMuted;
        }
        soundToggleBtn.classList.toggle('is-muted', !isSoundEnabled);
      });
    }

    // Retake Test
    if (btnRestart) {
      btnRestart.addEventListener('click', () => {
        initAudio();
        clearState();
        showView(viewTheme);
      });
    }

    // Share Ranking
    if (btnShare) {
      btnShare.addEventListener('click', () => {
        initAudio();
        const lang = state.selectedLanguage || 'fa';
        const t = UI_TEXT[lang] || UI_TEXT.fa;
        const ranking = computeRankings();

        let shareUrl = '';
        if (window.HodousTestHub && window.HodousTestHub.generateShareUrl && ranking.biggest) {
          shareUrl = window.HodousTestHub.generateShareUrl('biggest-red-flag', `${ranking.biggest.title} (${ranking.biggest.score}/10)`);
        }

        const shareLines = [
          lang === 'en' ? '🚩 My Relational Red Flags Ranking:' : '🚩 رنکینگ خطوط قرمز من در رفتار دیگران:',
          lang === 'en' 
            ? `Top Red Flag: ${ranking.biggest.title} (${ranking.biggest.score}/10)`
            : `بزرگترین ردفلگ من: ${ranking.biggest.title} (${ranking.biggest.score}/۱۰)`,
          ...ranking.top5.map((item, idx) => `${idx + 1}. ${item.title} — ${item.score}/10`),
          shareUrl ? (lang === 'en' ? `🔗 View Result: ${shareUrl}` : `🔗 مشاهده کارنامه:\n${shareUrl}`) : '',
          'Hodous · Red Flag Test'
        ].filter(Boolean);
        const shareText = shareLines.join('\n');

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(shareText).then(() => {
            showToast(t.copiedToast);
          }).catch(() => {
            showToast(t.readyToast);
          });
        } else {
          showToast(t.readyToast);
        }
      });
    }
  }

  function showToast(msg) {
    if (!shareToast) return;
    shareToast.textContent = msg;
    shareToast.classList.add('is-visible');
    setTimeout(() => {
      shareToast.classList.remove('is-visible');
    }, 2800);
  }

  // ========================================================================
  // 11. ULTRA-FAST HARDWARE-ACCELERATED DIAMOND STAR ENGINE (Offscreen Sprites, Zero Lag)
  // ========================================================================
  function initStarCanvas() {
    const canvas = document.getElementById('star-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let stars = [];
    const STAR_COUNT = 130;
    let animationFrameId = null;

    // Helper: pre-render a sharp diamond star sprite once into an offscreen canvas
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

      // Outer soft halo star
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

      // Sharp white core
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

      // Secondary 4 spikes for royal 8-pointed star
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

    // Pre-rendered sprite sets for Blue (Hub) and Red (Quiz)
    const spriteSets = {
      blue: {
        royal8: createOffscreenStar(9, 8, 'blue'),
        diamond4: createOffscreenStar(5.5, 4, 'blue'),
        micro4: createOffscreenStar(2.8, 4, 'blue')
      },
      red: {
        royal8: createOffscreenStar(9, 8, 'red'),
        diamond4: createOffscreenStar(5.5, 4, 'red'),
        micro4: createOffscreenStar(2.8, 4, 'red')
      }
    };

    function resize() {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(dpr, dpr);
      buildStars();
      draw();
    }

    function buildStars() {
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

    // Hardware-accelerated blitting loop (Zero lag, 0.05ms per frame)
    function draw() {
      ctx.clearRect(0, 0, width, height);

      const isPastelRed = document.body.classList.contains('theme-pastel-red');
      const activeSprites = isPastelRed ? spriteSets.red : spriteSets.blue;
      const now = Date.now();

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const alpha = Math.max(0.18, Math.min(1, s.baseAlpha + Math.sin(now * s.twinkleSpeed + s.phase) * s.twinkleAmp));
        ctx.globalAlpha = alpha;

        const spr = activeSprites[s.type];
        ctx.drawImage(spr.canvas, s.x - spr.halfW, s.y - spr.halfH, spr.halfW * 2, spr.halfH * 2);
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();
  }
  // ========================================================================
  // INITIALIZATION ON DOM READY
  // ========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    loadState();
    initStarCanvas();
    setupEvents();

    applyLanguage(state.selectedLanguage || 'fa');
    applyTheme(state.selectedTheme || 'white');

    // Resume previous view if active
    if (state.testFinished && state.answers && Object.keys(state.answers).length >= TOTAL_QUESTIONS) {
      showView(viewResult);
      renderResults();
    } else if (state.testStarted && state.currentQuestion < TOTAL_QUESTIONS) {
      showView(viewQuiz);
      renderCurrentQuestion();
    } else {
      showView(viewHub);
    }

    // Expose language switcher for global access
    window.applyHodousLanguage = applyLanguage;
    window.HodousState = state;
  });

})();
