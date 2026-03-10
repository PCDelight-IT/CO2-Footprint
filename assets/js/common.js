"use strict";

window.initDirToggle = function initDirToggle() {
  const btn = document.getElementById("dirToggleBtn");
  const body = document.body;

  // I keep it simple:
  // - "left"  => menu on the left (default)
  // - "right" => menu on the right
  function applyLayout(side) {
    const isRight = side === "right";

    body.classList.toggle("layout-right", isRight);

    // Button text should explain what the layout currently is
    if (btn) {
      btn.textContent = isRight ? "Menu: Right" : "Menu: Left";
      btn.setAttribute("aria-pressed", String(isRight));
    }
  }

  // Load saved choice so it does NOT reset when changing pages
  const saved = localStorage.getItem("menu_side");
  const initial = saved === "right" || saved === "left" ? saved : "left";
  applyLayout(initial);

  if (btn) {
    btn.addEventListener("click", () => {
      const current = body.classList.contains("layout-right") ? "right" : "left";
      const next = current === "left" ? "right" : "left";

      // Save it so the user keeps the same layout across all pages
      localStorage.setItem("menu_side", next);
      applyLayout(next);
    });
  }
};