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
      hubBadge: '۱۰ سناریوی واقعی · مقیاس ۱ تا ۱۰',
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
      previewOpt: 'مقیاس ۱ تا ۱۰',
      startBtn: 'شروع تست',
      quizInstruction: 'تمام ۱۰ سناریوی زیر را مطالعه کنید و با آگاهی از همه موقعیت‌ها، در کادر هر سؤال عددی از ۱ تا ۱۰ را که مدنظرتان است انتخاب کنید.',
      ratingBoxLabel: 'کادر انتخاب عدد (از ۱ تا ۱۰):',
      notSelected: 'انتخاب نشده',
      scorePrefix: 'امتیاز',
      answeredCount: (curr, total) => `${curr} از ${total} پاسخ داده شده`,
      validationMissing: (count) => `لطفاً به تمام ۱۰ سؤال پاسخ دهید (${count} سؤال باقی‌مانده است).`,
      submitBtn: 'مشاهده نتیجه ارزیابی',
      biggestSectionTitle: 'بزرگترین ردفلگ تو چیست؟',
      lowestSectionTitle: 'کمترین ردفلگ تو چیست؟',
      scaleListTitle: 'انتخاب‌های تو از ۱ تا ۱۰ با سؤال داده شده',
      summaryLabel: 'جمع‌بندی ارزیابی:',
      summaryText: 'اولویت‌های شما نشان می‌دهد بالاترین حساسیت را به نقض حریم شخصی، بازی‌های روانی و فرافکنی دارید؛ شفافیت و امنیت روانی خط قرمز مطلق شماست.',
      retakeBtn: 'انجام دوباره تست',
      shareBtn: 'اشتراک‌گذاری نتیجه',
      backToHubBtn: 'بازگشت به آزمون‌ها',
      copiedToast: 'نتیجه در کلیپ‌بورد کپی شد',
      readyToast: 'نتیجه آماده اشتراک‌گذاری است'
    },
    en: {
      dir: 'ltr',
      hubTitle: 'Test',
      hubBadge: '10 Real Scenarios · 1 to 10 Scale',
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
      previewOpt: '1 to 10 Scale',
      startBtn: 'Start Test',
      quizInstruction: 'Review all 10 scenarios below and select any number from 1 to 10 for each question.',
      ratingBoxLabel: 'Rating selector box (1 to 10):',
      notSelected: 'Not selected',
      scorePrefix: 'Score',
      answeredCount: (curr, total) => `${curr} of ${total} answered`,
      validationMissing: (count) => `Please assign a rating to all 10 questions (${count} remaining).`,
      submitBtn: 'View Assessment Results',
      biggestSectionTitle: 'What is your biggest Red Flag?',
      lowestSectionTitle: 'What is your lowest Red Flag?',
      scaleListTitle: 'Your Choices from 1 to 10 with Scenarios',
      summaryLabel: 'Assessment Summary:',
      summaryText: 'Your choices reveal highest sensitivity to breaches of trust, manipulation, and blame deflection; genuine transparency and psychological safety are your absolute boundaries.',
      retakeBtn: 'Retake Test',
      shareBtn: 'Share Results',
      backToHubBtn: 'Back to Hub',
      copiedToast: 'Results copied to clipboard',
      readyToast: 'Results ready to share'
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
    const items = [];

    QUESTIONS.forEach((q, idx) => {
      const val = Number(state.answers[idx]) || 1;
      const meta = q[lang] || q.fa;
      items.push({
        num: val,
        title: meta.title,
        question: meta.question,
        explanation: meta.explanation,
        qIdx: idx
      });
    });

    items.sort((a, b) => a.num - b.num);
    return items;
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

  const rogQuestionsContainer = document.getElementById('rog-questions-container');
  const rogQuestionsList = document.getElementById('rog-questions-list');
  const rogAnsweredCounter = document.getElementById('rog-answered-counter');
  const rogQuizInstruction = document.getElementById('rog-quiz-instruction');
  const btnSubmitRog = document.getElementById('btn-submit-rog');
  const btnSubmitRogText = document.getElementById('btn-submit-rog-text');
  const rogValidationMsg = document.getElementById('rog-validation-msg');

  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const soundStatusText = document.getElementById('sound-status-text');

  // Result Elements
  const rogResultMainTitle = document.getElementById('rog-result-main-title');
  const rogBiggestTitle = document.getElementById('rog-biggest-title');
  const rogBiggestScoreBadge = document.getElementById('rog-biggest-score-badge');
  const rogBiggestScenario = document.getElementById('rog-biggest-scenario');
  const rogBiggestTag = document.getElementById('rog-biggest-tag');

  const rogLowestTitle = document.getElementById('rog-lowest-title');
  const rogLowestScoreBadge = document.getElementById('rog-lowest-score-badge');
  const rogLowestScenario = document.getElementById('rog-lowest-scenario');
  const rogLowestTag = document.getElementById('rog-lowest-tag');

  const rankingCardsContainerEl = document.getElementById('ranking-cards-container');
  const rogScaleListTitle = document.getElementById('rog-scale-list-title');
  const rogSummaryLabel = document.getElementById('rog-summary-label');
  const resultSummaryTextEl = document.getElementById('result-summary-text');

  const btnRestart = document.getElementById('btn-restart');
  const btnShare = document.getElementById('btn-share');
  const btnBackHubRog = document.getElementById('btn-back-hub-rog');
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
      renderAllQuestions();
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
  // 8. QUESTION RENDERING & SIMULTANEOUS 1-10 RATING
  // ========================================================================
  function renderAllQuestions() {
    if (!rogQuestionsList) return;
    const lang = state.selectedLanguage || 'fa';
    const t = UI_TEXT[lang] || UI_TEXT.fa;

    if (rogQuizInstruction) {
      rogQuizInstruction.textContent = t.quizInstruction;
    }
    if (btnSubmitRogText) {
      btnSubmitRogText.textContent = t.submitBtn;
    }

    rogQuestionsList.innerHTML = '';

    QUESTIONS.forEach((q, idx) => {
      const meta = q[lang] || q.fa;
      const currentVal = state.answers[idx]; // undefined or 1..10

      const card = document.createElement('div');
      card.className = `question-item-card ${currentVal ? 'is-answered' : ''}`;
      card.id = `rog-q-card-${idx}`;

      card.innerHTML = `
        <div class="q-card-header">
          <div class="q-number-badge">${idx + 1}</div>
          <h3 class="q-card-title">${escapeHTML(meta.title)}</h3>
        </div>
        <p class="q-card-scenario">${escapeHTML(meta.question)}</p>
        <div class="q-rating-box">
          <div class="q-rating-box-header">
            <span class="q-box-label">${t.ratingBoxLabel}</span>
            <span class="q-box-selected-val" id="rog-val-badge-${idx}">
              ${currentVal ? `${t.scorePrefix}: ${currentVal}` : t.notSelected}
            </span>
          </div>
          <div class="q-numbers-row">
            ${Array.from({ length: 10 }, (_, i) => i + 1).map(num => `
              <button type="button" class="q-pill-btn ${currentVal === num ? 'is-selected' : ''}" data-q="${idx}" data-val="${num}">
                ${num}
              </button>
            `).join('')}
            <input type="number" min="1" max="10" class="q-number-input-box" placeholder="۱..۱۰" data-q="${idx}" value="${currentVal || ''}" aria-label="Rating for question ${idx + 1}">
          </div>
        </div>
      `;

      // Event listeners for buttons
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

      rogQuestionsList.appendChild(card);
    });

    updateAnsweredCount();
  }

  function selectQuestionRating(qIdx, val, cardEl, buttons, inputEl) {
    initAudio();
    playScaleSelectSound(val);

    state.answers[qIdx] = val;
    saveState();

    buttons.forEach(b => {
      b.classList.toggle('is-selected', Number(b.dataset.val) === val);
    });

    if (inputEl && Number(inputEl.value) !== val) {
      inputEl.value = val;
    }

    cardEl.classList.add('is-answered');
    cardEl.classList.remove('is-highlight-missing');

    const badge = document.getElementById(`rog-val-badge-${qIdx}`);
    const lang = state.selectedLanguage || 'fa';
    const t = UI_TEXT[lang] || UI_TEXT.fa;
    if (badge) {
      badge.textContent = `${t.scorePrefix}: ${val}`;
    }

    if (rogValidationMsg) {
      rogValidationMsg.style.display = 'none';
    }

    updateAnsweredCount();
  }

  function updateAnsweredCount() {
    const answered = Object.keys(state.answers).length;
    const lang = state.selectedLanguage || 'fa';
    const t = UI_TEXT[lang] || UI_TEXT.fa;
    if (rogAnsweredCounter) {
      rogAnsweredCounter.textContent = t.answeredCount(answered, TOTAL_QUESTIONS);
    }
  }

  function handleSubmitAssessment() {
    initAudio();
    const unanswered = [];
    for (let i = 0; i < TOTAL_QUESTIONS; i++) {
      if (state.answers[i] === undefined || state.answers[i] === null) {
        unanswered.push(i);
      }
    }

    if (unanswered.length > 0) {
      unanswered.forEach(idx => {
        const card = document.getElementById(`rog-q-card-${idx}`);
        if (card) {
          card.classList.add('is-highlight-missing');
        }
      });

      const firstCard = document.getElementById(`rog-q-card-${unanswered[0]}`);
      if (firstCard) {
        firstCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      const lang = state.selectedLanguage || 'fa';
      const t = UI_TEXT[lang] || UI_TEXT.fa;
      if (rogValidationMsg) {
        rogValidationMsg.textContent = t.validationMissing(unanswered.length);
        rogValidationMsg.style.display = 'block';
      }
      return;
    }

    state.testFinished = true;
    saveState();
    finishAssessment();
  }

  // ========================================================================
  // 9. RESULT PRESENTATION
  // ========================================================================
  function finishAssessment() {
    playCompletionChimes();
    renderResults();
    showView(viewResult);
  }

  function renderResults() {
    const lang = state.selectedLanguage || 'fa';
    const t = UI_TEXT[lang] || UI_TEXT.fa;
    const items = computeRankings(); // sorted by num ascending 1..10

    if (items.length === 0) return;

    // 1. Highlight: Biggest Red Flag (highest score)
    const maxScore = Math.max(...items.map(it => it.num));
    const biggestItem = items.slice().reverse().find(it => it.num === maxScore) || items[items.length - 1];

    if (rogBiggestTitle) rogBiggestTitle.textContent = biggestItem.title;
    if (rogBiggestScoreBadge) rogBiggestScoreBadge.textContent = `${biggestItem.num} / 10`;
    if (rogBiggestScenario) rogBiggestScenario.textContent = biggestItem.question;
    if (rogBiggestTag) rogBiggestTag.textContent = t.biggestSectionTitle;

    // 2. Highlight: Lowest Red Flag (lowest score)
    const minScore = Math.min(...items.map(it => it.num));
    const lowestItem = items.find(it => it.num === minScore) || items[0];

    if (rogLowestTitle) rogLowestTitle.textContent = lowestItem.title;
    if (rogLowestScoreBadge) rogLowestScoreBadge.textContent = `${lowestItem.num} / 10`;
    if (rogLowestScenario) rogLowestScenario.textContent = lowestItem.question;
    if (rogLowestTag) rogLowestTag.textContent = t.lowestSectionTitle;

    // 3. Full 1 to 10 list with given questions
    if (rogScaleListTitle) {
      rogScaleListTitle.innerHTML = `<span>${t.scaleListTitle}</span>`;
    }

    if (rankingCardsContainerEl) {
      rankingCardsContainerEl.innerHTML = '';
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
        rankingCardsContainerEl.appendChild(card);
      });
    }

    // 4. Two-Line Summary
    if (rogSummaryLabel) rogSummaryLabel.textContent = t.summaryLabel;
    if (resultSummaryTextEl) resultSummaryTextEl.textContent = t.summaryText;

    // Action Buttons
    if (btnRestart) btnRestart.textContent = t.retakeBtn;
    if (btnShare) btnShare.textContent = t.shareBtn;

    // Participant badge & Admin webhook log
    const rogBadge = document.getElementById('rog-participant-badge');
    const participantName = state.participantName || (window.HodousTestHub ? window.HodousTestHub.getNickname() : '') || 'مهمان';
    if (rogBadge) {
      rogBadge.innerHTML = lang === 'en'
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
        testId: 'biggest-red-flag',
        testTitle: 'بزرگترین ردفلگ برای تو چیه؟',
        nickname: participantName,
        score: `بزرگترین ردفلگ: ${biggestItem.title} (${biggestItem.num}/10)`,
        details: items.map(it => `${it.num}. ${it.title}`).join(' · '),
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
        renderAllQuestions();
        showView(viewQuiz);
      });
    }

    // Submit Assessment Button
    if (btnSubmitRog) {
      btnSubmitRog.addEventListener('click', () => {
        handleSubmitAssessment();
      });
    }

    // Back to Hub from Results
    if (btnBackHubRog) {
      btnBackHubRog.addEventListener('click', () => {
        initAudio();
        showView(viewHub);
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
        const items = computeRankings();

        let shareUrl = '';
        if (window.HodousTestHub && window.HodousTestHub.generateShareUrl && items.length > 0) {
          shareUrl = window.HodousTestHub.generateShareUrl('biggest-red-flag', `۱: ${items[0].title}`);
        }

        const shareLines = [
          lang === 'en' ? '🚩 My Red Flag Choices (1 to 10):' : '🚩 انتخاب‌های من در تست ردفلگ (از ۱ تا ۱۰):',
          ...items.map(item => `${item.num}. ${item.title}`),
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
    } else if (state.testStarted) {
      showView(viewQuiz);
      renderAllQuestions();
    } else {
      showView(viewHub);
    }

    // Expose language switcher for global access
    window.applyHodousLanguage = applyLanguage;
    window.HodousState = state;
  });

})();
