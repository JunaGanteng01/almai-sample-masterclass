/* Tambahan untuk tampilan gaya almai.id (halaman contoh). */
document.addEventListener('DOMContentLoaded', () => {
  // almai.id hanya mode gelap
  setTheme('dark');

  // Modal pendaftaran
  const regModal = document.getElementById('regModal');
  const svcModal = document.getElementById('serviceModal');
  const openReg = () => {
    svcModal.classList.remove('active');
    regModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };
  const closeReg = () => {
    regModal.classList.remove('active');
    document.body.style.overflow = '';
  };
  document.querySelectorAll('.js-open-reg').forEach(b => b.addEventListener('click', openReg));
  document.getElementById('closeModal').addEventListener('click', closeReg);
  regModal.addEventListener('click', e => { if (e.target === regModal) closeReg(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeReg(); });
  document.getElementById('registrationForm').addEventListener('submit', e => {
    e.preventDefault();
    alert('Ini halaman contoh — pendaftaran belum terhubung ke sistem pembayaran.');
    closeReg();
  });

  // Kartu agent membuka popup info yang sama dengan chip di hero
  document.querySelectorAll('.value-card').forEach(el => {
    const title = el.querySelector('h3').textContent.trim();
    const open = () => {
      const card = (window.activeCards || []).find(c => (c.chipTitle || c.title || '').trim() === title);
      if (card) openCardModal(card);
    };
    el.addEventListener('click', open);
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });

  // Testimoni berganti seperti di almai.id
  const testi = [
    ['RINA APRILIA', 'Admin toko sekarang dibantu AI,<br>saya fokus ke strategi.'],
    ['DIMAS PRATAMA', 'Konten seminggu jadi dalam sejam,<br>tinggal saya review.'],
    ['SARI WULANDARI', 'Laporan keuangan rapi tiap hari<br>tanpa harus lembur.'],
    ['ARIF NUGROHO', 'Penjelasan mentornya runtut,<br>langsung bisa dipraktikkan.']
  ];
  const nameEl = document.getElementById('testiName');
  const textEl = document.getElementById('testiText');
  let i = 0;
  setInterval(() => {
    nameEl.style.opacity = textEl.style.opacity = 0;
    setTimeout(() => {
      i = (i + 1) % testi.length;
      nameEl.textContent = testi[i][0];
      textEl.innerHTML = testi[i][1];
      nameEl.style.opacity = textEl.style.opacity = 1;
    }, 400);
  }, 3500);

  // Menu aktif mengikuti posisi scroll
  const links = [...document.querySelectorAll('.almai-nav-links a')];
  const secs = links.map(a => document.querySelector(a.getAttribute('href')));
  window.addEventListener('scroll', () => {
    let cur = 0;
    secs.forEach((s, k) => { if (s && s.getBoundingClientRect().top < 140) cur = k; });
    links.forEach((a, k) => a.classList.toggle('is-active', k === cur));
  }, { passive: true });
});
