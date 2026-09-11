/**
 * ============================================================================
 * Hodous — Green Flag یا Red Flag؟ (Test 2)
 * 15 Situational Questions · 3-Option Assessment (الف / ب / ج)
 * Authentic 3D Card Flip Animation · Pure JavaScript · Zero SVG
 * Scoped Pastel Green / Red Theme · Zero Regression on Test 1
 * ============================================================================
 */

(() => {
  'use strict';

  // ==========================================================================
  // 1. 15 SITUATIONAL QUESTIONS DATA (Bilingual FA & EN)
  // Scoring: Option A = 2 pts, Option B = 1 pt, Option C = 0 pts (Max = 30 pts)
  // ==========================================================================
  const GORF_QUESTIONS = [
    {
      id: 1,
      fa: {
        question: 'یکی از دوستان نزدیکت به سرگرمی یا موضوعی علاقه دارد که تو اصلاً با آن ارتباط نمی‌گیری. معمولاً چه واکنشی داری؟',
        options: [
          'به تفاوت سلیقه‌اش احترام می‌گذارم و اگر خودش درباره آن صحبت کند، بدون قضاوت به علاقه‌اش گوش می‌دهم.',
          'خیلی درگیرش نمی‌شوم؛ خودم آن علاقه را ندارم، ولی دلیلی هم برای مخالفت با آن نمی‌بینم.',
          'معمولاً سعی می‌کنم نشان بدهم انتخابش جالب یا منطقی نیست و ممکن است او را به خاطرش دست بیندازم.'
        ]
      },
      en: {
        question: 'A close friend is passionate about a hobby or topic that you cannot relate to at all. How do you usually react?',
        options: [
          'I respect our difference in taste, and if they talk about it, I listen non-judgmentally to their enthusiasm.',
          'I don\'t get too involved; it\'s not for me, but I see no reason to oppose or criticize it.',
          'I usually try to show their choice isn\'t interesting or logical, and I might tease them about it.'
        ]
      }
    },
    {
      id: 2,
      fa: {
        question: 'رفتاری از طرف یک فرد نزدیک باعث ناراحتی تو شده است. چه می‌کنی؟',
        options: [
          'بعد از اینکه احساساتم کمی آرام شد، موضوع را مستقیم و بدون کنایه با او مطرح می‌کنم.',
          'ابتدا کمی فاصله می‌گیرم تا از روی عصبانیت چیزی نگویم، بعد اگر مسئله همچنان مهم بود درباره‌اش صحبت می‌کنم.',
          'ترجیح می‌دهم رفتارم تغییر کند تا خودش متوجه شود چه چیزی ناراحتم کرده است.'
        ]
      },
      en: {
        question: 'Behavior from someone close to you has upset you. What do you do?',
        options: [
          'Once my emotions have cooled down, I address the issue directly and without sarcasm.',
          'I take some space first to avoid reacting in anger, then discuss it if it still matters.',
          'I prefer giving subtle hints or the cold shoulder so they figure out on their own what upset me.'
        ]
      }
    },
    {
      id: 3,
      fa: {
        question: 'پارتنرت تصمیم گرفته یک عصر را با دوستانش بگذراند و در آن مدت کمتر در دسترس باشد.',
        options: [
          'طبیعی می‌دانم که هرکدام از ما زندگی و روابط اجتماعی مستقل خودمان را داشته باشیم.',
          'ممکن است کمی احساس دلتنگی یا بی‌اهمیتی کنم، اما در تصمیمش دخالت نمی‌کنم.',
          'ناراحتی‌ام را طوری نشان می‌دهم که احساس کند بهتر است برنامه‌اش را تغییر دهد یا زمان بیشتری را با من بگذراند.'
        ]
      },
      en: {
        question: 'Your partner decides to spend an evening with their friends and be less available during that time.',
        options: [
          'I consider it natural that each of us maintains independent lives and social connections.',
          'I might feel a bit lonely or sidelined, but I don\'t interfere with their decision.',
          'I make my displeasure evident so they feel pressured to change their plans or spend more time with me.'
        ]
      }
    },
    {
      id: 4,
      fa: {
        question: 'بعد از یک بحث یا اتفاق، متوجه می‌شوی بخشی از مشکل واقعاً به رفتار خودت مربوط بوده است.',
        options: [
          'مسئولیت سهم خودم را می‌پذیرم و اگر لازم باشد بابت آن عذرخواهی و جبران می‌کنم.',
          'پذیرفتن اشتباهم برایم راحت نیست، اما اگر بعداً به این نتیجه برسم که حق با طرف مقابل بوده، رفتارم را اصلاح می‌کنم.',
          'معمولاً ابتدا دنبال دلیلی می‌گردم که نشان دهد شرایط یا رفتار طرف مقابل باعث اشتباه من شده است.'
        ]
      },
      en: {
        question: 'After an argument, you realize that part of the problem was genuinely caused by your own behavior.',
        options: [
          'I take accountability for my part and apologize or make amends if needed.',
          'Admitting fault isn\'t easy for me, but if I realize later they were right, I adjust my behavior.',
          'I usually look for excuses showing that the circumstances or their behavior provoked my mistake.'
        ]
      }
    },
    {
      id: 5,
      fa: {
        question: 'یکی از دوستانت به موفقیتی می‌رسد که خودت مدت زیادی برای رسیدن به چیزی مشابه آن تلاش کرده‌ای.',
        options: [
          'ممکن است خودم را با او مقایسه کنم، اما اجازه نمی‌دهم این احساس روی رفتارم با او تأثیر بگذارد.',
          'تبریک می‌گویم و خوشحال می‌شوم، هرچند ممکن است در خلوت خودم کمی احساس عقب‌ماندن کنم.',
          'موفقیتش ناخودآگاه باعث می‌شود بخواهم دستاوردهای خودم را هم مطرح کنم یا ارزش موفقیت او را کمتر ببینم.'
        ]
      },
      en: {
        question: 'A friend achieves a major success that you have been striving for yourself for a long time.',
        options: [
          'I might compare myself inwardly, but I never let that feeling affect how I treat them.',
          'I congratulate them and feel genuinely happy, even if privately I feel a bit left behind.',
          'Their success reflexively makes me highlight my own accomplishments or downplay theirs.'
        ]
      }
    },
    {
      id: 6,
      fa: {
        question: 'پارتنرت گوشی‌اش را کنار تو گذاشته و برای چند دقیقه از اتاق خارج می‌شود.',
        options: [
          'اصلاً دلیلی برای بررسی گوشی نمی‌بینم؛ حریم خصوصی او برای من حتی در رابطه نزدیک هم وجود دارد.',
          'ممکن است از روی کنجکاوی وسوسه شوم، اما می‌دانم این کنجکاوی به‌تنهایی دلیل موجهی برای ورود به حریم او نیست.',
          'اگر چیزی برایم مشکوک باشد، فکر می‌کنم بررسی گوشی می‌تواند راهی برای مطمئن شدن از واقعیت باشد.'
        ]
      },
      en: {
        question: 'Your partner leaves their phone next to you and steps out of the room for a few minutes.',
        options: [
          'I see no reason to check their phone; their personal privacy remains inviolable even in close relationships.',
          'Curiosity might tempt me, but I recognize curiosity alone is no justification to intrude on their privacy.',
          'If I suspect something, checking their phone feels like a justified way to verify the truth.'
        ]
      }
    },
    {
      id: 7,
      fa: {
        question: 'یکی از اعضای خانواده درباره تصمیم مهمی که گرفته‌ای نظر کاملاً متفاوتی دارد و مرتب نگرانی‌اش را بیان می‌کند.',
        options: [
          'نظرش را می‌شنوم و سعی می‌کنم بفهمم نگرانی او از کجا می‌آید، اما تصمیم نهایی را خودم می‌گیرم.',
          'اگر بدانم تصمیمم را گرفته‌ام، وارد بحث طولانی نمی‌شوم و ترجیح می‌دهم زمان نشان دهد چه اتفاقی می‌افتد.',
          'اگر احساس کنم بیش از حد در تصمیمم دخالت می‌کند، ممکن است واکنشم تند شود و گفت‌وگو را شخصی کنم.'
        ]
      },
      en: {
        question: 'A family member strongly disagrees with an important decision you made and repeatedly expresses anxiety about it.',
        options: [
          'I listen and understand where their concern comes from, but make the final choice autonomously.',
          'Once my mind is made up, I avoid prolonged debates and let time prove the outcome.',
          'If I feel they are overstepping, I tend to react sharply and turn the discussion personal.'
        ]
      }
    },
    {
      id: 8,
      fa: {
        question: 'دوستت در یک کار گروهی اشتباهی کرده که باعث شده بخشی از برنامه به مشکل بخورد.',
        options: [
          'ابتدا روی حل مشکل تمرکز می‌کنم و بعد درباره مسئولیت او و اینکه چطور می‌توان از تکرار آن جلوگیری کرد صحبت می‌کنم.',
          'انتظار دارم خودش متوجه اشتباهش شود و برای جبران آن قدم بردارد؛ اگر این اتفاق نیفتد، موضوع را مطرح می‌کنم.',
          'در همان لحظه بیشتر روی اشتباه او تمرکز می‌کنم و ممکن است با عصبانیت یا سرزنش واکنش نشان دهم.'
        ]
      },
      en: {
        question: 'A friend makes an error during group work that derails part of the project schedule.',
        options: [
          'I focus first on fixing the problem, then constructively discuss responsibility and future prevention.',
          'I expect them to realize their mistake and take corrective steps; if not, I bring it up.',
          'In the heat of the moment, I fixate on their error and react with blame or irritation.'
        ]
      }
    },
    {
      id: 9,
      fa: {
        question: 'فردی که برایت مهم است از یکی از رفتارهایت انتقاد می‌کند، اما تو فکر می‌کنی بخشی از برداشت او منصفانه نیست.',
        options: [
          'اول سعی می‌کنم بفهمم دقیقاً چه چیزی باعث چنین برداشتی شده، بعد اگر لازم باشد درباره بخش‌هایی که قبول ندارم توضیح می‌دهم.',
          'توضیح خودم را می‌دهم و اگر احساس کنم بخشی از انتقادش درست است، آن قسمت را می‌پذیرم.',
          'چون با اصل انتقاد موافق نیستم، بیشتر تمرکزم روی اثبات اشتباه طرف مقابل قرار می‌گیرد.'
        ]
      },
      en: {
        question: 'Someone important to you critiques your behavior, but you believe part of their perception is unfair.',
        options: [
          'I first seek to understand what triggered their impression, then clarify the points I disagree with calmly.',
          'I explain my view, and if any valid point was made, I acknowledge and accept that part.',
          'Because I disagree with the critique, my primary focus shifts to proving them wrong.'
        ]
      }
    },
    {
      id: 10,
      fa: {
        question: 'از یک دوست، عضو خانواده یا فردی که با او رابطه نزدیکی داری، برای یک درخواست شخصی جواب منفی می‌شنوی.',
        options: [
          'ممکن است ناامید شوم، اما «نه» او را به‌عنوان یک پاسخ معتبر می‌پذیرم و برای تغییر نظرش فشار نمی‌آورم.',
          'شاید یک بار دلیلش را بپرسم یا گزینه دیگری پیشنهاد کنم، اما اگر همچنان نخواست، موضوع را رها می‌کنم.',
          'اگر درخواست برایم مهم باشد، ممکن است با اصرار، دلخوری یا ایجاد احساس گناه تلاش کنم نظرش را تغییر دهد.'
        ]
      },
      en: {
        question: 'You receive a clear "no" to a personal favor from a friend, family member, or partner.',
        options: [
          'I might feel disappointed, but I accept their "no" as valid without pressuring them to reconsider.',
          'I might ask once for clarification or propose an alternative, but let it go if they decline.',
          'If it\'s important to me, I may use persistence, guilt-tripping, or visible sulking to sway them.'
        ]
      }
    },
    {
      id: 11,
      fa: {
        question: 'پارتنرت درباره فردی صحبت می‌کند که اخیراً با او بیشتر در ارتباط بوده و متوجه می‌شوی کمی حسادت کرده‌ای.',
        options: [
          'ابتدا سعی می‌کنم بفهمم این حس از کجا می‌آید و اگر لازم باشد، بدون متهم کردن او درباره‌اش صحبت می‌کنم.',
          'ممکن است مدتی ذهنم درگیر شود، اما تا وقتی رفتار مشخصی برای نگرانی وجود نداشته باشد، سعی می‌کنم آن را مدیریت کنم.',
          'برای آرام شدن خودم، شروع می‌کنم به پرس‌وجوی بیشتر، مقایسه کردن خودم با آن فرد یا زیر نظر گرفتن رابطه‌شان.'
        ]
      },
      en: {
        question: 'Your partner mentions someone they\'ve been talking to more frequently, and you feel a spark of jealousy.',
        options: [
          'I reflect on where that insecurity stems from and, if needed, address it calmly without accusations.',
          'My mind might dwell on it for a bit, but unless there\'s concrete cause for concern, I manage it internally.',
          'To soothe my anxiety, I start interrogating, comparing myself, or monitoring their interactions.'
        ]
      }
    },
    {
      id: 12,
      fa: {
        question: 'در یک بحث، متوجه می‌شوی استدلال طرف مقابل از استدلال تو منطقی‌تر است.',
        options: [
          'اگر قانع شوم، نظرم را اصلاح می‌کنم؛ حتی اگر قبول کردن اشتباهم برایم خوشایند نباشد.',
          'قبل از اینکه نظرم را تغییر دهم، سعی می‌کنم بیشتر درباره موضوع فکر کنم و شواهد را بررسی کنم.',
          'معمولاً سخت است که در همان لحظه عقب‌نشینی کنم و ممکن است بحث را تا جایی ادامه دهم که موضع خودم حفظ شود.'
        ]
      },
      en: {
        question: 'During a discussion, you realize the other person\'s argument is more rational than yours.',
        options: [
          'If convinced, I adapt my viewpoint, even if admitting my error feels momentarily uncomfortable.',
          'Before changing my stance, I take time to reflect on the points and review the evidence.',
          'I find it hard to back down on the spot, so I may keep arguing just to defend my original stance.'
        ]
      }
    },
    {
      id: 13,
      fa: {
        question: 'یکی از نزدیکانت مدتی ترجیح می‌دهد بیشتر تنها باشد و کمتر در دسترس باشد.',
        options: [
          'نیاز او به فضای شخصی را محترم می‌دانم و تا زمانی که مسئله مشخصی وجود نداشته باشد، آن را شخصی نمی‌کنم.',
          'ممکن است کمی نگران شوم و یک بار درباره حالش بپرسم، اما بعد به او فرصت می‌دهم.',
          'تغییر رفتارش را نشانه‌ای درباره رابطه‌مان می‌دانم و برای فهمیدن دلیلش مرتب پیگیری می‌کنم.'
        ]
      },
      en: {
        question: 'Someone close to you needs some alone time and becomes less reachable for a period.',
        options: [
          'I honor their need for personal space and avoid taking it personally unless a clear issue arises.',
          'I might feel slightly concerned and check in once, but then give them the space they requested.',
          'I interpret their withdrawal as a symptom of trouble in our connection and persist in asking why.'
        ]
      }
    },
    {
      id: 14,
      fa: {
        question: 'در یک بحث جدی با فردی که برایت مهم است، عصبانیتت به اوج می‌رسد.',
        options: [
          'اگر احساس کنم ادامه بحث نتیجه‌ای ندارد، مکث می‌کنم و بعد از آرام شدن دوباره به موضوع برمی‌گردم.',
          'ممکن است لحنم تند شود یا صدایم بالا برود، اما بعد از فروکش کردن عصبانیت سعی می‌کنم بحث را منطقی ادامه دهم.',
          'وقتی خیلی عصبانی هستم، ممکن است حرف‌هایی بزنم که می‌دانم بعداً پشیمان می‌شوم؛ معمولاً کنترل آن لحظه برایم سخت است.'
        ]
      },
      en: {
        question: 'During an intense argument with someone you care about, your anger reaches a peak.',
        options: [
          'If I sense the argument is spiraling, I pause and return to the topic once we\'ve cooled down.',
          'My tone might sharpen or elevate, but once tempers settle, I attempt to continue reasonably.',
          'In peak rage, I often say hurtful things I later regret; emotional control in that instant is very difficult.'
        ]
      }
    },
    {
      id: 15,
      fa: {
        question: 'متوجه می‌شوی حرف یا رفتارت، بدون اینکه قصد بدی داشته باشی، شخص دیگری را ناراحت کرده است.',
        options: [
          'نداشتن قصد بد را از تأثیری که رفتارم گذاشته جدا می‌کنم؛ اگر لازم باشد عذرخواهی و جبران می‌کنم.',
          'اگر بفهمم ناراحتی او منطقی بوده، سعی می‌کنم در آینده آن رفتار را تکرار نکنم.',
          'چون قصد آسیب زدن نداشته‌ام، معمولاً احساس می‌کنم مسئولیتی نسبت به ناراحتی او ندارم.'
        ]
      },
      en: {
        question: 'You learn that your words or actions hurt someone\'s feelings, even though you had zero ill intent.',
        options: [
          'I separate my lack of bad intent from the real impact caused; I apologize and make it right if needed.',
          'If I see that their hurt was justified, I make sure not to repeat that specific behavior.',
          'Since I had no malicious intent, I usually feel zero responsibility for how they reacted.'
        ]
      }
    }
  ];

  // ==========================================================================
  // 2. LOCALIZED UI STRINGS
  // ==========================================================================
  const GORF_UI = {
    fa: {
      hubBadge: '۱۵ سؤال موقعیتی · چرخش ۳بعدی کارت',
      hubTitle: '<span class="card-title-green-gorf">Green Flag</span> یا <span class="card-title-red-gorf">Red Flag</span>؟',
      hubSub1: 'الگوهای ارتباطی تو بیشتر به کدام سمت گرایش دارند؟',
      hubSub2: 'بررسی الگوهای رفتاری در روابط از طریق ۱۵ موقعیت روان‌شناختی روزمره همراه با چرخش ۳بعدی کارت نتیجه.',
      hubCta: 'شروع آزمون Green یا Red',
      cardStamp: 'Green Flag یا Red Flag؟',
      nextBtn: 'ادامه',
      viewResultBtn: 'مشاهده نتیجه',
      prevBtn: 'قبلی',
      resultKicker: 'تحلیل الگوی پاسخ‌ها و رفتار ارتباطی',
      greenNarrative: 'پاسخ‌های تو در این تست بیشتر به سمت الگوهای Green Flag متمایل بود.',
      redNarrative: 'پاسخ‌های تو در این تست بیشتر به سمت الگوهایی متمایل بود که می‌توانند در روابط فرساینده شوند.',
      neutralNarrative: 'پاسخ‌های تو در این تست تعادلی میان الگوهای Green Flag و الگوهای نیازمند بازنگری نشان داد.',
      disclaimer: 'این آزمون صرفاً برای سرگرمی و خودشناسی طراحی شده و تشخیص روانشناختی یا ارزیابی قطعی شخصیت نیست.',
      retakeBtn: 'انجام دوباره تست',
      shareBtn: 'اشتراک‌گذاری نتیجه',
      backToHubBtn: 'بازگشت به آزمون‌ها',
      toastCopied: 'نتیجه تست در کلیپ‌بورد کپی شد',
      optionLetters: ['الف', 'ب', 'ج']
    },
    en: {
      hubBadge: '15 Situational Questions · 3D Flip Card',
      hubTitle: '<span class="card-title-green-gorf">Green Flag</span> or <span class="card-title-red-gorf">Red Flag</span>?',
      hubSub1: 'Which relational patterns do your responses naturally align with?',
      hubSub2: 'Explore behavioral tendencies across 15 everyday psychological scenarios with an authentic 3D flip card reveal.',
      hubCta: 'Start Green or Red Flag Test',
      cardStamp: 'Green Flag or Red Flag?',
      nextBtn: 'Next',
      viewResultBtn: 'View Result',
      prevBtn: 'Back',
      resultKicker: 'Response Pattern & Behavioral Analysis',
      greenNarrative: 'Your responses in this test leaned towards Green Flag patterns.',
      redNarrative: 'Your responses in this test leaned towards patterns that can become draining in relationships.',
      neutralNarrative: 'Your responses in this test showed a 50/50 balance between Green Flag patterns and areas to reflect on.',
      disclaimer: 'This test is designed purely for entertainment and self-reflection, not psychological diagnosis or definitive personality assessment.',
      retakeBtn: 'Retake Test',
      shareBtn: 'Share Result',
      backToHubBtn: 'Back to Tests Hub',
      toastCopied: 'Result copied to clipboard',
      optionLetters: ['A', 'B', 'C']
    }
  };

  // ==========================================================================
  // 3. APPLICATION STATE
  // ==========================================================================
  const gorfState = {
    currentIndex: 0,
    answers: new Array(GORF_QUESTIONS.length).fill(null),
    greenPercent: 0,
    redPercent: 0,
    isCompleted: false
  };

  // Web Audio subtle gentle feedback
  let audioCtx = null;
  function playSubtleClick() {
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
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
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
  let cardLaunchGorf = null;
  let viewHub = null;
  let viewGorfQuiz = null;
  let viewGorfResult = null;
  let sessionControlsBar = null;
  let btnBackToHub = null;

  let progressFill = null;
  let counterBadge = null;
  let testTitleStamp = null;
  let questionTextEl = null;
  let optionsListEl = null;
  let btnPrevEl = null;
  let btnNextEl = null;

  let flipCardEl = null;
  let resultDetailsEl = null;
  let percentageHeadlineEl = null;
  let balanceBarGreen = null;
  let balanceBarRed = null;
  let labelValGreen = null;
  let labelValRed = null;
  let narrativeTextEl = null;
  let disclaimerTextEl = null;
  let btnGorfRestart = null;
  let btnGorfShare = null;
  let btnGorfBackHub = null;
  let shareToastEl = null;

  // ==========================================================================
  // 5. RENDER & NAVIGATION LOGIC
  // ==========================================================================
  function showGorfView(targetView) {
    // Deactivate all views across the page
    document.querySelectorAll('.view-section').forEach(v => {
      v.classList.remove('is-active');
    });

    if (sessionControlsBar) {
      sessionControlsBar.style.display = (targetView === viewHub) ? 'none' : 'flex';
    }

    if (targetView === viewHub) {
      document.body.classList.remove('theme-gorf-pastel');
      document.body.classList.remove('theme-bgf-pastel');
      document.body.classList.remove('theme-pastel-red');
    } else {
      document.body.classList.remove('theme-pastel-red');
      document.body.classList.remove('theme-bgf-pastel');
      document.body.classList.add('theme-gorf-pastel');
    }

    if (targetView) {
      targetView.classList.add('is-active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function renderQuestion() {
    if (!questionTextEl || !optionsListEl) return;

    const lang = getCurrentLang();
    const t = GORF_UI[lang] || GORF_UI.fa;
    const qData = GORF_QUESTIONS[gorfState.currentIndex];
    const qContent = qData[lang] || qData.fa;
    const totalQ = GORF_QUESTIONS.length;
    const currentNum = gorfState.currentIndex + 1;

    // 1. Update Progress Bar
    const progressPct = ((currentNum) / totalQ) * 100;
    if (progressFill) {
      progressFill.style.width = progressPct.toFixed(1) + '%';
    }

    // 2. Update Counter & Meta
    if (counterBadge) {
      counterBadge.textContent = `${currentNum} / ${totalQ}`;
    }
    if (testTitleStamp) {
      testTitleStamp.textContent = t.cardStamp;
    }

    // 3. Update Question Text (No category header)
    questionTextEl.textContent = qContent.question;

    // 4. Render 3 Options
    optionsListEl.innerHTML = '';
    const selectedAnswerIndex = gorfState.answers[gorfState.currentIndex];

    qContent.options.forEach((optText, index) => {
      const btn = document.createElement('div');
      btn.className = 'gorf-option-btn';
      if (selectedAnswerIndex === index) {
        btn.classList.add('is-selected');
      }
      btn.setAttribute('role', 'radio');
      btn.setAttribute('aria-checked', selectedAnswerIndex === index ? 'true' : 'false');
      btn.setAttribute('tabindex', '0');

      const letterBadge = document.createElement('span');
      letterBadge.className = 'gorf-option-letter';
      letterBadge.textContent = t.optionLetters[index] || (index === 0 ? 'الف' : index === 1 ? 'ب' : 'ج');

      const bodySpan = document.createElement('span');
      bodySpan.className = 'gorf-option-body';
      bodySpan.textContent = optText;

      btn.appendChild(letterBadge);
      btn.appendChild(bodySpan);

      btn.addEventListener('click', () => {
        handleOptionSelect(index);
      });

      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleOptionSelect(index);
        }
      });

      optionsListEl.appendChild(btn);
    });

    // 5. Update Navigation Buttons
    if (btnPrevEl) {
      btnPrevEl.disabled = (gorfState.currentIndex === 0);
      const prevSpan = btnPrevEl.querySelector('.gorf-btn-prev-text');
      if (prevSpan) prevSpan.textContent = t.prevBtn;
    }

    if (btnNextEl) {
      btnNextEl.disabled = (selectedAnswerIndex === null);
      const nextSpan = btnNextEl.querySelector('.gorf-btn-next-text');
      if (nextSpan) {
        nextSpan.textContent = (gorfState.currentIndex === totalQ - 1) ? t.viewResultBtn : t.nextBtn;
      }
    }
  }

  function handleOptionSelect(optionIndex) {
    playSubtleClick();
    gorfState.answers[gorfState.currentIndex] = optionIndex;

    // Update styling on options
    const optionBtns = optionsListEl.querySelectorAll('.gorf-option-btn');
    optionBtns.forEach((btn, idx) => {
      const isChosen = (idx === optionIndex);
      btn.classList.toggle('is-selected', isChosen);
      btn.setAttribute('aria-checked', isChosen ? 'true' : 'false');
    });

    // Enable Next button
    if (btnNextEl) {
      btnNextEl.disabled = false;
    }
  }

  function handleNextClick() {
    playSubtleClick();
    if (gorfState.currentIndex < GORF_QUESTIONS.length - 1) {
      gorfState.currentIndex++;
      renderQuestion();
    } else {
      finishTestAndShowResult();
    }
  }

  function handlePrevClick() {
    playSubtleClick();
    if (gorfState.currentIndex > 0) {
      gorfState.currentIndex--;
      renderQuestion();
    }
  }

  // ==========================================================================
  // 6. SCORING & 3D FLIP CARD RESULT ANIMATION
  // Option A = 2 pts, Option B = 1 pt, Option C = 0 pts. Max = 30 pts.
  // ==========================================================================
  function finishTestAndShowResult() {
    let totalScore = 0;
    gorfState.answers.forEach(ans => {
      if (ans === 0) totalScore += 2;
      else if (ans === 1) totalScore += 1;
      // ans === 2 => 0 pts
    });

    const maxScore = GORF_QUESTIONS.length * 2; // 30
    const rawGreenPct = (totalScore / maxScore) * 100;
    const greenPercent = Math.round(rawGreenPct);
    const redPercent = 100 - greenPercent;

    gorfState.greenPercent = greenPercent;
    gorfState.redPercent = redPercent;
    gorfState.isCompleted = true;

    showGorfView(viewGorfResult);
    execute3DCardFlip(greenPercent, redPercent);
  }

  function execute3DCardFlip(greenPct, redPct) {
    const lang = getCurrentLang();
    const t = GORF_UI[lang] || GORF_UI.fa;

    if (!flipCardEl) return;

    // 1. Reset state
    flipCardEl.classList.remove('flip-to-green', 'flip-to-red', 'flip-to-neutral');
    if (resultDetailsEl) {
      resultDetailsEl.classList.remove('is-revealed');
    }

    // Force browser reflow to reset transitions
    void flipCardEl.offsetWidth;

    // 2. Apply 3D Rotation based on dominant score
    setTimeout(() => {
      if (greenPct > redPct) {
        flipCardEl.classList.add('flip-to-green');
      } else if (redPct > greenPct) {
        flipCardEl.classList.add('flip-to-red');
      } else {
        flipCardEl.classList.add('flip-to-neutral');
      }
    }, 100);

    // 3. Populate Texts & Details
    if (percentageHeadlineEl) {
      percentageHeadlineEl.className = 'gorf-percentage-headline';
      if (greenPct > redPct) {
        percentageHeadlineEl.classList.add('is-green');
        percentageHeadlineEl.textContent = `GREEN ${greenPct}%`;
      } else if (redPct > greenPct) {
        percentageHeadlineEl.classList.add('is-red');
        percentageHeadlineEl.textContent = `RED ${redPct}%`;
      } else {
        percentageHeadlineEl.classList.add('is-neutral');
        percentageHeadlineEl.textContent = `GREEN 50% — RED 50%`;
      }
    }

    // Ratio Bar
    if (balanceBarGreen) balanceBarGreen.style.width = `${greenPct}%`;
    if (balanceBarRed) balanceBarRed.style.width = `${redPct}%`;
    if (labelValGreen) labelValGreen.textContent = `GREEN ${greenPct}%`;
    if (labelValRed) labelValRed.textContent = `RED ${redPct}%`;

    // Narrative
    if (narrativeTextEl) {
      if (greenPct > redPct) {
        narrativeTextEl.textContent = t.greenNarrative;
      } else if (redPct > greenPct) {
        narrativeTextEl.textContent = t.redNarrative;
      } else {
        narrativeTextEl.textContent = t.neutralNarrative;
      }
    }

    // Disclaimer
    if (disclaimerTextEl) {
      disclaimerTextEl.textContent = t.disclaimer;
    }

    // Action buttons labels
    if (btnGorfRestart) {
      const txt = btnGorfRestart.querySelector('.gorf-btn-restart-text');
      if (txt) txt.textContent = t.retakeBtn;
    }
    if (btnGorfShare) {
      const txt = btnGorfShare.querySelector('.gorf-btn-share-text');
      if (txt) txt.textContent = t.shareBtn;
    }
    if (btnGorfBackHub) {
      const txt = btnGorfBackHub.querySelector('.gorf-btn-hub-text');
      if (txt) txt.textContent = t.backToHubBtn;
    }

    // 4. Reveal Details with smooth fade after 3D card settles
    setTimeout(() => {
      if (resultDetailsEl) {
        resultDetailsEl.classList.add('is-revealed');
      }
    }, 1400);
  }

  function handleShareResult() {
    playSubtleClick();
    const lang = getCurrentLang();
    const t = GORF_UI[lang] || GORF_UI.fa;
    const green = gorfState.greenPercent;
    const red = gorfState.redPercent;
    const winner = green >= red ? `GREEN ${green}%` : `RED ${red}%`;

    const shareText = lang === 'en'
      ? `🌱 Hodous — Green Flag or Red Flag Assessment\nResult: ${winner} (Green: ${green}% · Red: ${red}%)\nTake the test: https://xhodous.github.io/test.html`
      : `🌱 آزمون Green Flag یا Red Flag هودوس\nنتیجه من: ${winner} (سبز: ${green}٪ · قرمز: ${red}٪)\nانجام آزمون: https://xhodous.github.io/test.html`;

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
    gorfState.currentIndex = 0;
    gorfState.answers.fill(null);
    gorfState.greenPercent = 0;
    gorfState.redPercent = 0;
    gorfState.isCompleted = false;
    renderQuestion();
    showGorfView(viewGorfQuiz);
  }

  // ==========================================================================
  // 7. LANGUAGE UPDATE FUNCTION (Callable globally)
  // ==========================================================================
  window.updateGorfLanguage = function(lang) {
    const t = GORF_UI[lang] || GORF_UI.fa;

    // Update Hub Card labels
    const hubBadge = document.getElementById('hub-card-gorf-badge-text');
    const hubTitle = document.getElementById('hub-card-gorf-title');
    const hubSub1 = document.getElementById('hub-card-gorf-sub1');
    const hubSub2 = document.getElementById('hub-card-gorf-sub2');
    const hubCta = document.getElementById('hub-card-gorf-cta-text');

    if (hubBadge) hubBadge.textContent = t.hubBadge;
    if (hubTitle) hubTitle.innerHTML = t.hubTitle;
    if (hubSub1) hubSub1.textContent = t.hubSub1;
    if (hubSub2) hubSub2.textContent = t.hubSub2;
    if (hubCta) hubCta.textContent = t.hubCta;

    // If currently on Quiz view, re-render
    if (viewGorfQuiz && viewGorfQuiz.classList.contains('is-active')) {
      renderQuestion();
    }

    // If currently on Result view, re-render result
    if (viewGorfResult && viewGorfResult.classList.contains('is-active')) {
      execute3DCardFlip(gorfState.greenPercent, gorfState.redPercent);
    }
  };

  // ==========================================================================
  // 8. INITIALIZATION & EVENT BINDINGS
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM
    cardLaunchGorf = document.getElementById('card-launch-gorf');
    viewHub = document.getElementById('view-hub');
    viewGorfQuiz = document.getElementById('view-gorf-quiz');
    viewGorfResult = document.getElementById('view-gorf-result');
    sessionControlsBar = document.getElementById('test-session-bar');
    btnBackToHub = document.getElementById('btn-back-to-hub');

    progressFill = document.getElementById('gorf-progress-fill');
    counterBadge = document.getElementById('gorf-counter-badge');
    testTitleStamp = document.getElementById('gorf-test-title-stamp');
    questionTextEl = document.getElementById('gorf-question-text');
    optionsListEl = document.getElementById('gorf-options-list');
    btnPrevEl = document.getElementById('gorf-btn-prev');
    btnNextEl = document.getElementById('gorf-btn-next');

    flipCardEl = document.getElementById('gorf-flip-card');
    resultDetailsEl = document.getElementById('gorf-result-details');
    percentageHeadlineEl = document.getElementById('gorf-percentage-headline');
    balanceBarGreen = document.getElementById('gorf-balance-bar-green');
    balanceBarRed = document.getElementById('gorf-balance-bar-red');
    labelValGreen = document.getElementById('label-val-green');
    labelValRed = document.getElementById('label-val-red');
    narrativeTextEl = document.getElementById('gorf-narrative-text');
    disclaimerTextEl = document.getElementById('gorf-disclaimer-text');
    btnGorfRestart = document.getElementById('btn-gorf-restart');
    btnGorfShare = document.getElementById('btn-gorf-share');
    btnGorfBackHub = document.getElementById('btn-gorf-back-hub');
    shareToastEl = document.getElementById('share-toast');

    // Launch Test 2 from Hub
    if (cardLaunchGorf) {
      cardLaunchGorf.addEventListener('click', () => {
        playSubtleClick();
        resetTest();
      });

      cardLaunchGorf.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          playSubtleClick();
          resetTest();
        }
      });
    }

    // Navigation buttons in quiz
    if (btnNextEl) {
      btnNextEl.addEventListener('click', handleNextClick);
    }
    if (btnPrevEl) {
      btnPrevEl.addEventListener('click', handlePrevClick);
    }

    // Results Actions
    if (btnGorfRestart) {
      btnGorfRestart.addEventListener('click', () => {
        playSubtleClick();
        resetTest();
      });
    }
    if (btnGorfShare) {
      btnGorfShare.addEventListener('click', handleShareResult);
    }
    if (btnGorfBackHub) {
      btnGorfBackHub.addEventListener('click', () => {
        playSubtleClick();
        showGorfView(viewHub);
      });
    }

    // Back to Hub in top session bar
    if (btnBackToHub) {
      btnBackToHub.addEventListener('click', () => {
        // If Test 2 is active, return to hub cleanly
        if ((viewGorfQuiz && viewGorfQuiz.classList.contains('is-active')) ||
            (viewGorfResult && viewGorfResult.classList.contains('is-active'))) {
          showGorfView(viewHub);
        }
      });
    }

    // Global Language Toggle Button in top nav
    const globalLangBtn = document.getElementById('global-lang-toggle');
    if (globalLangBtn) {
      globalLangBtn.addEventListener('click', () => {
        playSubtleClick();
        const current = getCurrentLang();
        const newLang = (current === 'fa') ? 'en' : 'fa';
        
        // Update document lang & dir
        document.documentElement.lang = newLang;
        document.documentElement.dir = (newLang === 'en') ? 'ltr' : 'rtl';
        document.body.dir = (newLang === 'en') ? 'ltr' : 'rtl';
        document.body.classList.toggle('lang-en', newLang === 'en');

        const btnTxt = globalLangBtn.querySelector('.global-lang-text');
        if (btnTxt) btnTxt.textContent = (newLang === 'fa') ? 'EN' : 'فا';

        // Notify all tests
        if (typeof window.applyHodousLanguage === 'function') {
          window.applyHodousLanguage(newLang);
        }
        if (typeof window.updateGorfLanguage === 'function') {
          window.updateGorfLanguage(newLang);
        }
        if (typeof window.updateBgfLanguage === 'function') {
          window.updateBgfLanguage(newLang);
        }
      });
    }

    // Initial language sync
    window.updateGorfLanguage(getCurrentLang());
  });

})();
