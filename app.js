(() => {
  "use strict";

  const LINKS = {
    github: "https://github.com/JDBrunsDev",
    linkedin: "https://www.linkedin.com/in/jdbruns/",
    instagram: "https://www.instagram.com/jdbruns.dev?igsh=MWh1Y20wZnViNGJlZQ==",
    youtube: "https://youtube.com/@jdbruns.devops?si=wt_li5ZLXBPnN5TX",
    whatsapp: {
      phone: "5547991120083",
      text: "Olá, José Daniel! Vi seu portfólio e queria falar com você."
    }
  };

  function applyLinks(){
    const set = (id, url) => {
      const el = document.getElementById(id);
      if (el && url) el.href = url;
    };

    set("link-github", LINKS.github);
    set("link-linkedin", LINKS.linkedin);
    set("link-instagram", LINKS.instagram);
    set("link-youtube", LINKS.youtube);

    const wa = document.getElementById("link-whatsapp");
    if (wa && LINKS.whatsapp?.phone) {
      const text = encodeURIComponent(LINKS.whatsapp.text || "");
      wa.href = `https://wa.me/${LINKS.whatsapp.phone}${text ? `?text=${text}` : ""}`;
    }
  }
  applyLinks();

  const menuBtn = document.getElementById("menuBtn");
  const mobileNav = document.getElementById("mobileNav");

  function openMobileNav(){
    mobileNav?.classList.add("is-open");
    mobileNav?.setAttribute("aria-hidden", "false");
    menuBtn?.setAttribute("aria-expanded", "true");
  }

  function closeMobileNav(){
    mobileNav?.classList.remove("is-open");
    mobileNav?.setAttribute("aria-hidden", "true");
    menuBtn?.setAttribute("aria-expanded", "false");
  }

  menuBtn?.addEventListener("click", () => {
    const open = mobileNav?.classList.contains("is-open");
    open ? closeMobileNav() : openMobileNav();
  });

  document.addEventListener("click", (e) => {
    if (!mobileNav || !menuBtn) return;
    const clickedInside = mobileNav.contains(e.target) || menuBtn.contains(e.target);
    if (!clickedInside) closeMobileNav();
  });

  const header = document.querySelector(".header");
  const headerHeight = () => header?.offsetHeight || 72;

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;

      if (id === "#top") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        closeMobileNav();
        return;
      }

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - (headerHeight() - 6);
      window.scrollTo({ top, behavior: "smooth" });

      closeMobileNav();
    });
  });

  // Reveal on scroll (com fallback)
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    }, { threshold: 0.12 });

    reveals.forEach((el) => revealObserver.observe(el));
  } else {
    // fallback: mostra tudo
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  // Ano no footer
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Scroll spy (link ativo)
  const sections = ["sobre","projetos","stack","contato"]
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const navLinks = Array.from(document.querySelectorAll('[data-section]'));

  function setActive(sectionId){
    navLinks.forEach(a => {
      const active = a.getAttribute("data-section") === sectionId;
      a.classList.toggle("is-active", active);
    });
  }

  // Define um estado inicial (sem depender do scroll)
  setActive("sobre");

  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible?.target?.id) setActive(visible.target.id);
    }, { threshold: [0.2, 0.35, 0.5, 0.65] });

    sections.forEach(sec => spy.observe(sec));
  }

  // Topo do site: mantém "sobre" ativo quando estiver realmente no início
  window.addEventListener("scroll", () => {
    if (window.scrollY < 40) setActive("sobre");
  }, { passive: true });

})();
