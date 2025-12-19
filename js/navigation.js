document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const appWindow = document.querySelector(".app-window");
  const main = document.querySelector("main");

  if (!menuBtn || !appWindow || !main) return;

  /* --------------------------------
     Create mobile navigation panel
     -------------------------------- */
  const mobilePanel = document.createElement("div");
  mobilePanel.className = "mobile-nav-panel";

  const title = document.createElement("div");
  title.className = "mobile-nav-title";
  title.textContent = "# navigate:";
  mobilePanel.appendChild(title);

  document.querySelectorAll(".nav-link").forEach((link) => {
    const clone = link.cloneNode(true);
    clone.classList.remove("active");
    mobilePanel.appendChild(clone);
  });

  appWindow.insertBefore(mobilePanel, main.nextSibling);

  let isOpen = false;

  function openMenu() {
    isOpen = true;
    main.classList.add("hidden");
    mobilePanel.classList.add("open");
    menuBtn.textContent = "✕";
  }

  function closeMenu() {
    isOpen = false;
    mobilePanel.classList.remove("open");
    main.classList.remove("hidden");
    menuBtn.textContent = "☰";
  }

  menuBtn.addEventListener("click", () => {
    isOpen ? closeMenu() : openMenu();
  });

  /* --------------------------------
     Resize safety (hard reset)
     -------------------------------- */
  window.addEventListener("resize", () => {
    if (window.innerWidth > 767 && isOpen) {
      closeMenu();
    }
  });
});
