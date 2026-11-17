/**
 * AIpreneur Academy - Hero Section 1 Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initDynamicConfig();
  initBackgroundSlideshow();
  initCounter();
  initAlmaiSocialProof();
  initProgressBar();
  initServiceModal();
  init3DParallax();
});

/* ==========================================================================
   1. Theme Management (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';

  setTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      setTheme(nextTheme);
    });
  }
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  const themeIcon = document.querySelector('#themeToggle i');
  if (themeIcon) {
    themeIcon.className = theme === 'light' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  }
}

/* ==========================================================================
   2. Background Event Photos Crossfade Slideshow
   ========================================================================== */
function initBackgroundSlideshow() {
  const bgContainer = document.getElementById('hero2Bg');
  if (!bgContainer) return;

  const images = bgContainer.querySelectorAll('img');
  if (images.length <= 1) return;

  let currentIndex = 0;
  const intervalTime = 6000; // 6 seconds per photo

  setInterval(() => {
    images[currentIndex].classList.remove('on');
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add('on');
  }, intervalTime);
}

/* ==========================================================================
   3. Almai.id Social Proof Count-Up & Dynamic User Rotator
   ========================================================================== */
function initCounter() {
  const counterEl = document.getElementById('total-user-count') || document.querySelector('[data-count]');
  if (!counterEl) return;

  const target = parseInt(counterEl.getAttribute('data-count'), 10) || 8942;
  const suffix = counterEl.getAttribute('data-suffix') || '+';
  const duration = 1800; // 1.8s
  const start = 0;
  let startTime = null;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const easedProgress = easeOutCubic(progress);
    const currentValue = Math.floor(start + (target - start) * easedProgress);

    // Format with comma e.g. 8,942+
    counterEl.textContent = currentValue.toLocaleString('en-US') + suffix;

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

const defaultRecentUsers = [
  { name: "Khotibul Haromain" },
  { name: "ARYO SENO" },
  { name: "Muhamad raihan dapa" },
  { name: "Sofyan" },
  { name: "Ilmanfirmansyh" },
  { name: "Arief septia munandar" },
  { name: "Muhammad indah dhil arsya" },
  { name: "M. IHSAN ADI SOFYAN" },
  { name: "AKHMAD KHAIRUL AMIEN" },
  { name: "muhamad rangga" },
  { name: "nava amalia islami" },
  { name: "abdillah risyan ramadhan" },
  { name: "azahran theola mitzi" },
  { name: "Raihan" },
  { name: "reyAdW" },
  { name: "yudhistira Anugrahadi Jatmiko" }
];

function initAlmaiSocialProof() {
  if (!window.almaiRecentUsers) {
    window.almaiRecentUsers = [...defaultRecentUsers];
  }

  const gradients = [
    'linear-gradient(135deg, #33e818 0%, #1a7a0c 100%)',
    'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
    'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
    'linear-gradient(135deg, #ec4899 0%, #be185d 100%)'
  ];

  function getGradientByName(name) {
    const charCode = (name && name.charCodeAt(0)) || 0;
    return gradients[charCode % gradients.length];
  }

  let userIdx = 0;
  const toastNameEl = document.getElementById('toast-name');
  const toastEl = document.getElementById('user-toast');

  function getActiveUsers() {
    return (window.almaiRecentUsers && window.almaiRecentUsers.length) 
      ? window.almaiRecentUsers 
      : defaultRecentUsers;
  }

  function updateAvatars(startIdx) {
    const activeUsers = getActiveUsers();
    for (let i = 0; i < 3; i++) {
      const u = activeUsers[(startIdx + i) % activeUsers.length];
      const el = document.getElementById(`badge-initial-${i}`);
      if (el && u) {
        el.textContent = (u.name || '').charAt(0).toUpperCase();
        el.style.background = getGradientByName(u.name || '');
      }
    }
  }

  function cycleNextUser() {
    if (!toastNameEl || !toastEl) return;
    const activeUsers = getActiveUsers();
    if (!activeUsers.length) return;
    userIdx = (userIdx + 1) % activeUsers.length;
    const nextUser = activeUsers[userIdx];

    toastEl.style.opacity = '0';
    toastEl.style.transform = 'translateY(4px)';

    setTimeout(() => {
      toastNameEl.textContent = nextUser.name;
      updateAvatars(userIdx);
      toastEl.style.opacity = '1';
      toastEl.style.transform = 'translateY(0)';
    }, 400);
  }

  // Initial populate
  updateAvatars(0);

  // Rotate user toast every 4 seconds
  setInterval(cycleNextUser, 4000);
}

/* ==========================================================================
   4. Scroll Progress Bar
   ========================================================================== */
function initProgressBar() {
  const progressBar = document.getElementById('progressBar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const percentage = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.width = percentage + '%';
  }, { passive: true });
}

/* Formulir simulasi pendaftaran dihapus; tidak ada pendaftaran lokal. */

/* ==========================================================================
   6. 3D Subtle Tilt Parallax on Stage
   ========================================================================== */
function init3DParallax() {
  const stage = document.querySelector('.hero2-stage');
  if (!stage || window.innerWidth < 992) return;

  stage.addEventListener('mousemove', (e) => {
    const rect = stage.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = (y / (rect.height / 2)) * -4;
    const rotY = (x / (rect.width / 2)) * 4;

    const chips = stage.querySelectorAll('.hchip');
    chips.forEach(chip => {
      chip.style.transform = `translate(${x * 0.02}px, ${y * 0.02}px)`;
    });
  });

  stage.addEventListener('mouseleave', () => {
    const chips = stage.querySelectorAll('.hchip');
    chips.forEach(chip => {
      chip.style.transform = '';
    });
  });
}

/* ==========================================================================
   7. Dynamic 4-Cards & Stage Floating Chips
   ========================================================================== */
const DEFAULT_CARDS = [
  {
    icon: "fa-solid fa-magnifying-glass",
    chipTitle: "AI Riset",
    chipSub: "(data siap)",
    title: "AI RISET: RISET PASAR & WINNING PRODUCT",
    durasi: "Hitungan Menit",
    topik: "Scraping Tren E-Commerce, Margin Analisis, & Winning Product",
    materi: [
      "Dasar scraping pasar dan identifikasi produk viral berpotensi tinggi",
      "Karakteristik tren belanja TikTok Shop, Shopee, & Meta Ads secara real-time",
      "Analisis ulasan negatif kompetitor untuk menemukan celah kebutuhan konsumen",
      "Perhitungan harga pokok penjualan (HPP), estimasi margin, dan positioning ideal",
      "Penyusunan spreadsheet riset tervalidasi yang siap dieksekusi tim marketing"
    ],
    metode: [
      "Prompt Engineering Khusus (40%)",
      "Automated Scraping Tool (40%)",
      "Studi Kasus Winning Product (20%)"
    ],
    evaluasi: [
      "Uji akurasi proyeksi demand pasar",
      "Analisis risiko saturasi produk",
      "Validasi kelayakan margin minimal 40%"
    ],
    indikator: [
      "Memahami dasar riset pasar dan algoritma tren platform e-commerce.",
      "Mampu mengidentifikasi produk berpotensi tinggi dan memetakan celah kompetitor.",
      "Memahami diversifikasi produk siap jual dengan potensi konversi tinggi."
    ],
    sertifikat: "ada",
    ctaText: "Daftar Kelas"
  },
  {
    icon: "fa-solid fa-pen-nib",
    chipTitle: "AI Konten",
    chipSub: "(tulisan siap)",
    title: "AI KONTEN: COPYWRITING & PRODUKSI KONTEN VIRAL",
    durasi: "Real-Time",
    topik: "Hook Video 3 Detik, Storytelling Persuasif, & Kalender Konten",
    materi: [
      "Formula perancangan hook video 3 detik pertama berkonversi tinggi",
      "Penyusunan naskah video TikTok / Reels dengan teknik emotional storytelling",
      "Copywriting penawaran landing page, caption promo, dan broadcast WhatsApp",
      "Penyesuaian gaya bahasa (tone of voice) brand persona secara konsisten",
      "Otomatisasi pembuatan kalender konten 30 hari dalam sekali klik"
    ],
    metode: [
      "Framework Copywriting Hook (40%)",
      "Scripting & Formatting Template (40%)",
      "A/B Testing Variasi Angle (20%)"
    ],
    evaluasi: [
      "Review retensi penonton 3 detik pertama",
      "Validasi call-to-action (CTA) persuasif",
      "Kesesuaian persona dan branding bisnis"
    ],
    indikator: [
      "Memahami psikologi audiens dan struktur hook video penahan scroll.",
      "Mampu memproduksi puluhan skrip video siap rekam setiap hari.",
      "Memahami teknik copywriting penawaran yang terbukti memicu konversi."
    ],
    sertifikat: "ada",
    ctaText: "Daftar Kelas"
  },
  {
    icon: "fa-solid fa-coins",
    chipTitle: "AI Keuangan",
    chipSub: "(laporan beres)",
    title: "AI KEUANGAN: ARUS KAS, HPP, & DASHBOARD LABA RUGI",
    durasi: "24/7 Otomatis",
    topik: "Cashflow Tracking, Deteksi Boncos, & Rekonsiliasi Keuangan",
    materi: [
      "Pencatatan mutasi transaksi dan rekonsiliasi arus kas masuk-keluar otomatis",
      "Perhitungan real-time laba kotor, laba bersih, dan margin kontribusi tiap produk",
      "Sistem peringatan dini (early warning) saat ada biaya iklan atau operasional boncos",
      "Penyusunan proyeksi target cashflow dan anggaran belanja bulanan",
      "Otomatisasi pengiriman ringkasan laba-rugi harian ke WhatsApp pemilik bisnis"
    ],
    metode: [
      "Formula Kalkulasi Keuangan AI (40%)",
      "Integrasi Spreadsheet / Database (40%)",
      "Simulasi Audit & Stress Testing (20%)"
    ],
    evaluasi: [
      "Pengecekan selisih rekonsiliasi saldo",
      "Deteksi anomali biaya iklan harian",
      "Ketepatan perhitungan HPP per SKU"
    ],
    indikator: [
      "Memahami struktur pencatatan keuangan bisnis yang sehat dan transparan.",
      "Mampu mendeteksi kebocoran pengeluaran sebelum menimbulkan kerugian besar.",
      "Memahami pembacaan dashboard eksekutif untuk mengambil keputusan cepat."
    ],
    sertifikat: "ada",
    ctaText: "Daftar Kelas"
  },
  {
    icon: "fa-solid fa-bullhorn",
    chipTitle: "AI Promosi",
    chipSub: "(iklan jalan)",
    title: "AI PROMOSI: OPTIMASI IKLAN & SCALING STRATEGI",
    durasi: "Continuous",
    topik: "Meta Ads, TikTok Ads, Audience Targeting, & Budget Scaling",
    materi: [
      "Rekomendasi targeting demografis dan minat audiens yang tepat sasaran",
      "Penyusunan variasi copywriting dan visual angle untuk A/B testing materi iklan",
      "Evaluasi harian metrik ROAS, CTR, CPC, dan Conversion Rate secara otomatis",
      "Rekomendasi perbaikan cepat untuk materi iklan yang mengalami ad fatigue",
      "Panduan scaling budget bertahap tanpa merusak performa biaya akuisisi"
    ],
    metode: [
      "Targeting & Creative Framework (40%)",
      "Auditing Iklan & ROAS Formula (40%)",
      "Simulasi Scaling & Budgeting (20%)"
    ],
    evaluasi: [
      "Audit metrik ROAS minimal 3x",
      "Evaluasi Cost per Acquisition (CPA)",
      "Deteksi kejenuhan materi iklan (fatigue)"
    ],
    indikator: [
      "Memahami dasar kampanye digital ads dan matriks penentu keberhasilan.",
      "Mampu mengoptimalkan budget iklan dan menargetkan calon pembeli potensial.",
      "Memahami cara scale-up iklan secara aman dengan stabilitas profitabilitas."
    ],
    sertifikat: "ada",
    ctaText: "Daftar Kelas"
  }
];

window.activeCards = JSON.parse(JSON.stringify(DEFAULT_CARDS));

function getChipPositionClass(index, total) {
  if (total === 4) {
    const pos4 = ['l1', 'l2', 'r1', 'r2'];
    return pos4[index] || (index % 2 === 0 ? 'l3' : 'r3');
  }
  if (total <= 6) {
    const pos6 = ['l1', 'l2', 'l3', 'r1', 'r2', 'r3'];
    return pos6[index] || (index % 2 === 0 ? 'l2' : 'r2');
  }
  const side = index % 2 === 0 ? 'l' : 'r';
  const row = Math.min(Math.floor(index / 2) + 1, 3);
  return `${side}${row}`;
}

function renderStageChips(cards) {
  const stage = document.getElementById('heroStage');
  if (!stage) return;

  const validCards = (cards && Array.isArray(cards) && cards.length > 0) ? cards : DEFAULT_CARDS;
  window.activeCards = validCards;

  // Symmetrical 4-chips class distribution
  if (validCards.length === 4) {
    stage.classList.add('stage-4-chips');
  } else {
    stage.classList.remove('stage-4-chips');
  }

  // Remove existing chips only, keep mentor cutout
  stage.querySelectorAll('.hchip').forEach(el => el.remove());

  validCards.forEach((card, idx) => {
    const posClass = getChipPositionClass(idx, validCards.length);
    const chip = document.createElement('div');
    chip.className = `hchip ${posClass}`;
    chip.setAttribute('data-card-idx', idx);
    chip.setAttribute('role', 'button');
    chip.setAttribute('tabindex', '0');
    chip.setAttribute('title', `Klik untuk melihat info ${card.chipTitle || card.title}`);

    chip.innerHTML = `
      <i class="${card.icon || 'fa-solid fa-microchip'}"></i>
      ${card.chipTitle || card.title} <b>${card.chipSub || ''}</b>
      <span class="chip-hint"><i class="fa-solid fa-circle-info"></i></span>
    `;

    chip.addEventListener('click', (e) => {
      e.stopPropagation();
      openCardModal(card);
    });

    chip.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCardModal(card);
      }
    });

    stage.appendChild(chip);
  });
}

function openCardModal(card) {
  const serviceModal = document.getElementById('serviceModal');
  if (!serviceModal || !card) return;

  const tagEl = document.getElementById('svcTag');
  const titleEl = document.getElementById('svcTitle');
  const durasiEl = document.getElementById('svcDurasi');
  const topikEl = document.getElementById('svcTopik');
  const sertifikatEl = document.getElementById('svcSertifikat');
  const materiListEl = document.getElementById('svcMateriList');
  const col1TitleEl = document.getElementById('svcCol1Title');
  const metodeListEl = document.getElementById('svcMetodeList');
  const col2TitleEl = document.getElementById('svcCol2Title');
  const evaluasiListEl = document.getElementById('svcEvaluasiList');
  const compTitleEl = document.getElementById('svcCompTitle');
  const indikatorListEl = document.getElementById('svcIndikatorList');
  const ctaTextEl = document.getElementById('svcCtaText');

  if (tagEl) tagEl.textContent = 'LAYANAN · ' + (card.chipTitle || 'KURIKULUM');
  if (titleEl) titleEl.textContent = card.title || 'AI Masterclass';
  if (durasiEl) durasiEl.textContent = card.durasi || '-';
  if (topikEl) topikEl.textContent = card.topik || '-';

  if (sertifikatEl) {
    const hasCert = card.sertifikat !== 'tidak' && card.sertifikat !== false;
    sertifikatEl.innerHTML = hasCert 
      ? '<i class="fa-solid fa-certificate"></i> Ada' 
      : '<i class="fa-solid fa-ban"></i> Tidak Ada';
  }

  if (materiListEl && card.materi) {
    materiListEl.innerHTML = card.materi.filter(Boolean).map(m => `
      <li class="almai-dot-item">
        <span class="almai-bullet-dot"></span>
        <span>${m}</span>
      </li>
    `).join('');
  }

  if (col1TitleEl) col1TitleEl.textContent = 'METODE BELAJAR';
  if (metodeListEl && card.metode) {
    metodeListEl.innerHTML = card.metode.filter(Boolean).map(m => `
      <li class="almai-check-item">
        <i class="fa-solid fa-check"></i>
        <span>${m}</span>
      </li>
    `).join('');
  }

  if (col2TitleEl) col2TitleEl.textContent = 'EVALUASI';
  if (evaluasiListEl && card.evaluasi) {
    evaluasiListEl.innerHTML = card.evaluasi.filter(Boolean).map(e => `
      <li class="almai-edit-item">
        <i class="fa-solid fa-pen-to-square"></i>
        <span>${e}</span>
      </li>
    `).join('');
  }

  if (compTitleEl) compTitleEl.textContent = 'INDIKATOR KOMPETENSI';
  if (indikatorListEl && card.indikator) {
    indikatorListEl.innerHTML = card.indikator.filter(Boolean).map(i => `
      <li class="almai-star-item">
        <i class="fa-solid fa-star"></i>
        <span>${i}</span>
      </li>
    `).join('');
  }

  if (ctaTextEl) ctaTextEl.textContent = 'Daftar Kelas';

  const cardEl = serviceModal.querySelector('.almai-exact-modal');
  if (cardEl) cardEl.scrollTop = 0;

  serviceModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function initServiceModal() {
  const serviceModal = document.getElementById('serviceModal');
  const closeBtn = document.getElementById('closeServiceModal');
  const svcCtaBtn = document.getElementById('svcCtaBtn');

  if (!serviceModal) return;

  function closeServiceModal() {
    serviceModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeServiceModal);
  }

  serviceModal.addEventListener('click', (e) => {
    if (e.target === serviceModal) {
      closeServiceModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && serviceModal.classList.contains('active')) {
      closeServiceModal();
    }
  });

  // CTA tetap terlihat, tetapi tidak melakukan pendaftaran simulasi.
  // Integrator harus mengisi URL resmi beserta referral terverifikasi
  // pada atribut data-almai-registration-url dari elemen tombol.
  if (svcCtaBtn) {
    svcCtaBtn.addEventListener('click', () => {
      const url = svcCtaBtn.getAttribute('data-almai-registration-url');
      if (!url) {
        alert('Pendaftaran belum tersedia. Silakan gunakan formulir resmi di almai.id.');
        return;
      }
      try {
        const target = new URL(url, window.location.origin);
        if (target.protocol !== 'https:' || !['almai.id', 'www.almai.id'].includes(target.hostname)) {
          throw new Error('Domain pendaftaran tidak diizinkan');
        }
        window.location.assign(target.href);
      } catch (error) {
        alert('Tautan pendaftaran belum valid.');
      }
    });
  }

  // Initial render of stage chips with DEFAULT_CARDS
  renderStageChips(window.activeCards);
}

/* ==========================================================================
   8. Dynamic Configuration Synchronization (Admin Dashboard Integration)
   ========================================================================== */
function initDynamicConfig() {
  const stored = localStorage.getItem('almai_lp_config');
  if (stored) {
    try {
      applyStoredConfig(JSON.parse(stored));
    } catch (e) {
      console.warn('Could not parse stored almai_lp_config:', e);
    }
  }
}

function applyStoredConfig(cfg) {
  if (!cfg) return;

  // 1. Header & Brand Elements
  if (cfg.header) {
    const brandName = document.querySelector('.almai-brand-name');
    if (brandName && cfg.header.brandName !== undefined) brandName.textContent = cfg.header.brandName;

    const brandCorp = document.querySelector('.almai-brand-corp');
    if (brandCorp && cfg.header.brandCorp !== undefined) brandCorp.textContent = cfg.header.brandCorp;

    const brandLink = document.querySelector('.almai-brand');
    if (brandLink && cfg.header.brandUrl) brandLink.href = cfg.header.brandUrl;

    const logoIcon = document.querySelector('.almai-logo-icon');
    if (logoIcon && cfg.header.logoSrc) logoIcon.src = cfg.header.logoSrc;

    const loginBtn = document.querySelector('.almai-login-btn');
    if (loginBtn) {
      if (cfg.header.loginText !== undefined) loginBtn.textContent = cfg.header.loginText;
      if (cfg.header.loginUrl) loginBtn.href = cfg.header.loginUrl;
    }
  }

  // 2. Hero Headline, Subhead, Mentor Image
  if (cfg.hero) {
    const brandHeadingEl = document.querySelector('.hero2-brand-heading');
    if (brandHeadingEl && cfg.hero.brandHeading !== undefined) {
      const text = cfg.hero.brandHeading.trim();
      if (text.toUpperCase().startsWith('AI ') || text.toUpperCase().startsWith('AI')) {
        brandHeadingEl.innerHTML = `<span class="brand-ai">AI</span>${text.slice(2)}`;
      } else {
        brandHeadingEl.textContent = text;
      }
    }

    const brandSubEl = document.getElementById('heroBrandSub') || document.querySelector('.hero2-brand-sub');
    if (brandSubEl && cfg.hero.brandSub !== undefined) {
      brandSubEl.innerHTML = cfg.hero.brandSub;
    }

    const brandTag = document.getElementById('heroBrandTag') || document.querySelector('.hero2-tag');
    if (brandTag && cfg.hero.brandTag !== undefined) brandTag.textContent = cfg.hero.brandTag;

    const h1 = document.querySelector('.hero2-copy h1');
    if (h1) {
      const p1 = cfg.hero.headlinePart1 !== undefined ? cfg.hero.headlinePart1 : 'Strategi Cetak Omzet';
      const accent = cfg.hero.headlineAccent !== undefined ? cfg.hero.headlineAccent : '1 Milyar per Bulan';
      const conj = cfg.hero.headlineConjunction !== undefined ? cfg.hero.headlineConjunction : 'dengan';
      const hl = cfg.hero.headlineHighlight !== undefined ? cfg.hero.headlineHighlight : 'Membangun AI Workflow Sendiri';

      h1.innerHTML = `${p1} <span class="accent u-nobr">${accent}</span><br class="m-break"> ${conj} <span class="hl-mark">${hl}</span>`;
    }

    const lead = document.querySelector('.hero2-copy .lead');
    if (lead && cfg.hero.leadText !== undefined) {
      lead.innerHTML = cfg.hero.leadText;
    }

    const mentor = document.querySelector('.hero2-mentor');
    if (mentor) {
      if (cfg.hero.mentorImage) mentor.src = cfg.hero.mentorImage;
      if (cfg.hero.mentorAlt) mentor.alt = cfg.hero.mentorAlt;
    }
  }

  // 3. Dynamic Cards & Chips
  if (cfg.cards && Array.isArray(cfg.cards)) {
    renderStageChips(cfg.cards);
  }
}

window.applyStoredConfig = applyStoredConfig;


