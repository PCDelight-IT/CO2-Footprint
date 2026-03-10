"use strict";

async function injectPartial(targetId, url) {
  const el = document.getElementById(targetId);
  if (!el) return;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    el.textContent = `Could not load ${url} (HTTP ${res.status}).`;
    return;
  }
  el.innerHTML = await res.text();
}

function setActiveGlobalNav() {
  const page = String(document.body.dataset.page || "").toLowerCase();
  if (!page) return;

  document.querySelectorAll("[data-nav]").forEach((a) => {
    if (a.getAttribute("data-nav") === page) {
      a.classList.add("active");
      a.setAttribute("aria-current", "page");
    }
  });
}

function renderLocalNav() {
  const localNav = document.getElementById("localNav");
  if (!localNav) return;

  const page = String(document.body.dataset.page || "").toLowerCase();

  // Local links = anchors inside the current page
  const localLinksByPage = {
    index: [
      { href: "#filtersSection", label: "Filter" },
      { href: "#tableSection", label: "Tabelle" },
      { href: "#methodSection", label: "Methode" },
    ],

    info: [
      { href: "#about", label: "Worum geht es?" },
      { href: "#features", label: "Was kann ich hier machen?" },
      { href: "#data-model", label: "Welche Daten werden genutzt?" },
      { href: "#privacy", label: "Welche Daten werden gespeichert?" },
      { href: "#security", label: "Sicherheit" },
    ],

    rechtliches: [
      { href: "#purpose", label: "Zweck der Website" },
      { href: "#liability", label: "Haftungsausschluss" },
      { href: "#copyright", label: "Urheberrecht" },
      { href: "#external-links", label: "Externe Links" },
      { href: "#contact", label: "Kontakt / Hinweis" },
    ],

    datenschutz: [
      { href: "#data", label: "Datenverarbeitung" },
      { href: "#cookies", label: "Cookies / Tracking" },
      { href: "#cdn", label: "Drittanbieter (CDN)" },
      { href: "#security", label: "Sicherheit" },
    ],

    impressum: [
      { href: "#imprint", label: "Kontakt / Angaben" },
    ],
  };

  const items = localLinksByPage[page] || [];

  localNav.innerHTML = "";

  if (items.length === 0) {
    const li = document.createElement("li");
    li.className = "text-muted small";
    li.textContent = "Keine lokalen Links auf dieser Seite.";
    localNav.appendChild(li);
    return;
  }

  for (const it of items) {
    const li = document.createElement("li");
    li.className = "mb-2";

    const a = document.createElement("a");
    a.className = "link-secondary";
    a.href = it.href;
    a.textContent = it.label;

    li.appendChild(a);
    localNav.appendChild(li);
  }
}

(async function () {
  // Header (global navigation)
  await injectPartial("siteHeader", "./partials/header.html");

  // Local menu (only if the page has a placeholder)
  await injectPartial("siteMenu", "./partials/menu.html");

  // Footer
  await injectPartial("siteFooter", "./partials/footer.html");

  // Now we can mark the active global link
  setActiveGlobalNav();

  // And we can fill the local links for the current page
  renderLocalNav();

  // Initialize the header button (menu left/right) AFTER header injection
  if (typeof window.initDirToggle === "function") {
    window.initDirToggle();
  }
})();