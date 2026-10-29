(function () {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const byId = Object.fromEntries(PROJECTS.map(p => [p.id, p]));

  const PAGES = ['home', 'about', 'projects', 'experience', 'skills', 'fit', 'contact'];

  const TITLES = {
    home: '최원빈 | 기계시스템설계, 무인기개발 포트폴리오',
    about: '소개 | 최원빈 포트폴리오',
    projects: '프로젝트 | 최원빈 포트폴리오',
    experience: '경험 | 최원빈 포트폴리오',
    skills: '역량 | 최원빈 포트폴리오',
    fit: '직무 적합성 | 최원빈 포트폴리오',
    contact: '연락처 | 최원빈 포트폴리오'
  };

  // 페이지별 다음 행동 배너: [문구, 버튼, 이동할 해시]
  const NEXT = {
    home: ['대표 프로젝트의 과정과 수치를 확인해 보세요', '프로젝트 보기', '#/projects'],
    about: ['어떤 프로젝트를 했는지 확인해 보세요', '프로젝트 보기', '#/projects'],
    projects: ['프로젝트 밖에서 맡았던 일도 확인해 보세요', '경험 보기', '#/experience'],
    detail: ['이 프로젝트가 지원 직무와 어떻게 연결되는지 확인해 보세요', '직무 적합성 보기', '#/fit'],
    experience: ['쓸 줄 아는 툴과 사용한 프로젝트를 확인해 보세요', '역량 보기', '#/skills'],
    skills: ['역량이 지원 직무에 어떻게 맞는지 확인해 보세요', '직무 적합성 보기', '#/fit'],
    fit: ['궁금한 점이 있으면 편하게 연락 주세요', '연락하기', '#/contact'],
    contact: ['처음 화면으로 돌아갑니다', '홈으로', '#/home']
  };

  function esc(value) {
    return String(value).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  function media(src, alt) {
    if (src) return `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy">`;
    return `<div class="ph" role="img" aria-label="${esc(alt)} 이미지 준비 중"><span>이미지 준비 중</span></div>`;
  }

  /* ---------- 공통 정보 채우기 ---------- */
  function fillProfile() {
    $$('[data-resume]').forEach(a => { a.href = PROFILE.resume; });
    $$('[data-github]').forEach(a => { a.href = PROFILE.github; });
    $$('[data-github-label]').forEach(el => { el.textContent = PROFILE.githubLabel; });
    $$('[data-email-label]').forEach(el => { el.textContent = PROFILE.email; });
    $$('[data-email-link]').forEach(a => { a.href = 'mailto:' + PROFILE.email; });
    $('#year').textContent = new Date().getFullYear();
  }

  /* ---------- 프로젝트 카드 ---------- */
  function cardHTML(p) {
    return `
      <a class="pcard" href="#/projects/${esc(p.id)}" data-tags="${esc(p.tags.join(' '))}">
        <div class="pcard-media">${media(p.cover, p.title)}</div>
        <div class="pcard-body">
          <p class="meta">${esc(p.period)} · ${esc(p.team)}</p>
          <h3>${esc(p.title)}</h3>
          <p class="role">${esc(p.role)}</p>
          <div class="pcard-metric"><strong>${esc(p.metric.value)}</strong><span>${esc(p.metric.label)}</span></div>
          <div class="tags">${p.tags.map(t => `<span class="tag">${esc(TAG_LABEL[t])}</span>`).join('')}</div>
        </div>
      </a>`;
  }

  function renderCards() {
    $('#featured').innerHTML = FEATURED.map(id => byId[id]).filter(Boolean).map(cardHTML).join('');
    $('#project-grid').innerHTML = PROJECTS.map(cardHTML).join('');
  }

  function setupFilter() {
    const chips = $$('[data-filter]');
    chips.forEach(chip => chip.addEventListener('click', () => {
      const f = chip.dataset.filter;
      chips.forEach(c => c.setAttribute('aria-pressed', String(c === chip)));
      let shown = 0;
      $$('#project-grid .pcard').forEach(card => {
        const ok = f === 'all' || card.dataset.tags.split(' ').includes(f);
        card.hidden = !ok;
        if (ok) shown++;
      });
      $('#project-empty').hidden = shown > 0;
    }));
  }

  /* ---------- 프로젝트 상세 ---------- */
  function renderDetail(id) {
    const p = byId[id];
    if (!p) return false;

    const i = PROJECTS.indexOf(p);
    const prev = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length];
    const next = PROJECTS[(i + 1) % PROJECTS.length];

    const list = items => `<ul>${items.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;

    const gallery = p.gallery.length
      ? `<div class="gallery">${p.gallery.map(g => `
          <figure><a href="${esc(g.src)}" target="_blank" rel="noopener">${media(g.src, g.cap)}</a><figcaption>${esc(g.cap)}</figcaption></figure>`).join('')}
        </div>`
      : '';

    const links = p.links.length
      ? p.links.map(l => `<a class="btn btn-primary" href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join('')
      : '<p class="note">공개 가능한 자료를 정리 중입니다.</p>';

    $('#detail').innerHTML = `
      <nav class="crumb" aria-label="현재 위치"><a href="#/projects">프로젝트</a><span aria-hidden="true">/</span><span>${esc(p.title)}</span></nav>

      <header class="detail-head">
        <div>
          <p class="eyebrow">${esc(p.course)}</p>
          <h1>${esc(p.title)}</h1>
          <p class="lead">${esc(p.subtitle)}</p>
        </div>
        <a class="btn btn-ghost" href="#/projects">목록으로</a>
      </header>

      <dl class="infobar">
        <div><dt>기간</dt><dd>${esc(p.period)}</dd></div>
        <div><dt>팀</dt><dd>${esc(p.team)}</dd></div>
        <div><dt>내 역할</dt><dd>${esc(p.role)}</dd></div>
        <div><dt>사용 툴</dt><dd>${esc(p.tools.join(', '))}</dd></div>
      </dl>

      <figure class="detail-hero">${media(p.cover, p.title)}</figure>

      <section class="dsec">
        <h2><span class="num">01</span>목표</h2>
        <p>${esc(p.goal)}</p>
      </section>

      <section class="dsec">
        <h2><span class="num">02</span>내 역할</h2>
        <div class="split">
          <div class="box box-accent"><h3>내가 한 일</h3>${list(p.mine)}</div>
          <div class="box"><h3>팀원이 한 일</h3>${list(p.teamPart)}</div>
        </div>
      </section>

      <section class="dsec">
        <h2><span class="num">03</span>진행 과정</h2>
        <ol class="process">
          ${p.process.map((s, k) => `<li><span class="step">${k + 1}</span><strong>${esc(s.t)}</strong><span>${esc(s.d)}</span></li>`).join('')}
        </ol>
      </section>

      <section class="dsec">
        <h2><span class="num">04</span>수치 결과</h2>
        <div class="table-wrap">
          <table class="result-table">
            <thead><tr><th>항목</th><th>목표</th><th>결과</th><th>비고</th></tr></thead>
            <tbody>${p.results.map(r => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td><td><strong>${esc(r[2])}</strong></td><td>${esc(r[3])}</td></tr>`).join('')}</tbody>
          </table>
        </div>
        ${gallery}
      </section>

      <section class="dsec">
        <h2><span class="num">05</span>한계와 배운 점</h2>
        <div class="split">
          <div class="box box-warn"><h3>한계</h3><p>${esc(p.limits)}</p></div>
          <div class="box"><h3>배운 점</h3><p>${esc(p.learned)}</p></div>
        </div>
      </section>

      <section class="dsec">
        <h2><span class="num">06</span>근거 자료</h2>
        <div class="btn-row">${links}</div>
        <p class="related">이 프로젝트의 역량:
          ${p.tags.map(t => `<a class="tag tag-link" href="#/skills">${esc(TAG_LABEL[t])}</a>`).join(' ')}
        </p>
      </section>

      <nav class="pager" aria-label="다른 프로젝트">
        <a href="#/projects/${esc(prev.id)}"><span>이전 프로젝트</span><strong>← ${esc(prev.title)}</strong></a>
        <a href="#/projects/${esc(next.id)}" class="pager-next"><span>다음 프로젝트</span><strong>${esc(next.title)} →</strong></a>
      </nav>`;

    document.title = `${p.title} | 최원빈 포트폴리오`;
    return true;
  }

  /* ---------- 라우터 (해시 기반, file:// 에서도 동작) ---------- */
  function route() {
    const hash = location.hash;
    if (hash && !hash.startsWith('#/')) return; // 페이지 내 앵커는 무시

    const [page, id] = (hash.slice(2) || 'home').split('/');
    let key = PAGES.includes(page) ? page : 'home';

    if (key === 'projects' && id) {
      key = renderDetail(id) ? 'detail' : 'projects';
    }

    $$('.page').forEach(s => { s.hidden = s.dataset.page !== key; });

    const navKey = key === 'detail' ? 'projects' : key;
    $$('[data-nav]').forEach(a => {
      const on = a.dataset.nav === navKey;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });

    const [text, label, href] = NEXT[key];
    $('#next-text').textContent = text;
    const btn = $('#next-btn');
    btn.textContent = label;
    btn.href = href;

    if (key !== 'detail') document.title = TITLES[key];
    closeMenu();
    window.scrollTo(0, 0);
    $('#main').focus({ preventScroll: true });
  }

  /* ---------- 모바일 메뉴 ---------- */
  const menuBtn = $('.menu-btn');
  const menu = $('#gnb-menu');

  function closeMenu() {
    menu.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', '메뉴 열기');
  }

  menuBtn.addEventListener('click', () => {
    const open = !menu.classList.contains('open');
    menu.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  });

  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  /* ---------- 같은 페이지 안 이동 (역량 그룹, 경험 타임라인) ---------- */
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-jump]');
    if (!btn) return;
    const target = document.getElementById(btn.dataset.jump);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  /* ---------- 직무 적합성 탭 ---------- */
  function setupTabs() {
    const tabs = $$('[role="tab"]');
    function select(tab) {
      tabs.forEach(t => {
        const on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
    }
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(tab));
      tab.addEventListener('keydown', e => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        const n = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
        select(n);
        n.focus();
      });
    });
  }

  /* ---------- 토스트 ---------- */
  let toastTimer;
  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2400);
  }

  /* ---------- 연락처: 이메일 복사, 메일 폼 ---------- */
  function setupContact() {
    $('#copy-email').addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(PROFILE.email);
        toast('이메일 주소를 복사했습니다');
      } catch (err) {
        const ta = document.createElement('textarea');
        ta.value = PROFILE.email;
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand('copy');
        ta.remove();
        toast(ok ? '이메일 주소를 복사했습니다' : PROFILE.email);
      }
    });

    const form = $('#contact-form');
    const errorEl = $('#form-error');

    form.addEventListener('input', e => {
      e.target.classList.remove('invalid');
      errorEl.hidden = true;
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      const problems = [];
      if (!data.name.trim()) problems.push(['name', '이름을 입력해 주세요.']);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) problems.push(['email', '올바른 이메일 주소를 입력해 주세요.']);
      if (!data.message.trim()) problems.push(['message', '내용을 입력해 주세요.']);

      $$('.invalid', form).forEach(el => el.classList.remove('invalid'));
      if (problems.length) {
        problems.forEach(([name]) => form.elements[name].classList.add('invalid'));
        errorEl.textContent = problems.map(p => p[1]).join(' ');
        errorEl.hidden = false;
        form.elements[problems[0][0]].focus();
        return;
      }

      // 서버가 없는 정적 사이트라 메일 앱으로 넘긴다.
      // 폼 전송 서비스(Formspree 등)를 붙이면 이 부분을 fetch 호출로 바꾸면 된다.
      const subject = `[포트폴리오 문의] ${data.company.trim() || '회사명 미기재'} ${data.name.trim()}`;
      const body = `이름: ${data.name.trim()}\n회사명: ${data.company.trim()}\n회신 이메일: ${data.email.trim()}\n\n${data.message.trim()}`;
      window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      toast('메일 앱을 열었습니다');
      form.reset();
    });
  }

  /* ---------- 시작 ---------- */
  fillProfile();
  renderCards();
  setupFilter();
  setupTabs();
  setupContact();
  window.addEventListener('hashchange', route);
  route();
})();
