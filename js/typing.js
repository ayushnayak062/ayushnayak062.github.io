// About page file switching, sidebar toggles, and line number generation
document.addEventListener("DOMContentLoaded", () => {
  const fileLinks = document.querySelectorAll(".file-link");
  const codeContent = document.getElementById("codeContent");
  const lineNumbers = document.getElementById("lineNumbers");
  const currentTab = document.getElementById("currentTab");
  const sectionToggles = document.querySelectorAll(".section-toggle");

  /* --------------------------------
     Content map
     -------------------------------- */
  const contentMap = {
    bio: `/**
 * About me
 * I have 2+ years of experience building immersive
 * gameplay systems, VR training simulators, and 
 * multiplayer experiences. Strong focus on 
 * performance, system design, and player experience.
 * 
 * Passionate about indie games, experimental mechanics,
 * and narrative-driven design. I love creating 
 * interactive experiences that push the boundaries
 * of what's possible in Unity and VR.
 * 
 * Currently working on XR training solutions and
 * exploring new ways to make games more engaging
 * and accessible.
 */`,
    experience: `/**
 * Professional Experience
 * 
 * XR Developer — Cusmat Technologies
 * Aug 2023 – May 2025
 * - Built VR training simulators for 200+ operators
 * - Designed error-injection systems for realistic scenarios
 * - Developed real-time trainer portals with analytics
 * - Optimized performance for standalone VR headsets
 * 
 * Unity Game Developer — Agon Interactive
 * Aug 2022 – Feb 2023
 * - Developed co-op VR zombie shooter experience
 * - Implemented enemy AI behavior trees
 * - Integrated haptic suit APIs for immersive feedback
 * - Created multiplayer networking systems
 */`,
    skills: `/**
 * const skills = {
 *   Engines: ["Unity 3D", "Unreal Engine"],
 *   Languages: ["C#", "C++", "Java", "Python", "SQL"],
 *   Platforms: ["PC", "Android", "WebGL", "VR (Quest, Vive)"],
 *   Networking: ["Photon"],
 *   Monetization: ["Unity Ads", "IAP"],
 *   Tools: ["Git", "Addressables", "Shader Graph"]
 * };
 */`,
    education: `/**
 * Education
 * 
 * Bachelor of Science — Computer Science & Game Development
 * Backstage Pass Institute of Gaming and Technology
 * Hyderabad | 2019 – 2023
 * 
 * Key Focus:
 * - Unity game development (C#)
 * - Core computer science fundamentals
 * - Gameplay mechanics and implementation
 * - Debugging, testing, and iteration
 * 
 * Senior Project:
 * Fruit Attack — Casual Unity arcade game with multiple modes
 */`,
    interests: `/**
 * Interests
 * - Making small games to test big ideas
 * - Fixing gameplay systems that break in new and exciting ways
 * - VR/XR experiments that may or may not work
 * - Football — FC Barcelona fan for life (therapy included)
 * - Rap music louder than my build errors
 * - Movies and cinematography (yes, I pause scenes to study framing)
 * - Photography, mostly blaming lighting for bad shots
 */`,
  };

  /* --------------------------------
     Render comment block as real lines
     -------------------------------- */
  function renderCommentBlock(text) {
    return text
      .split("\n")
      .map((line) => `<span class="comment-line">${line}</span>`)
      .join("");
  }

  /* --------------------------------
     Sidebar section toggle logic
     -------------------------------- */
  sectionToggles.forEach((toggle) => {
    const sectionId = toggle.dataset.section;
    const content = document.getElementById(sectionId);
    if (!content) return;

    toggle.addEventListener("click", () => {
      toggle.classList.toggle("active");
      content.classList.toggle("active");
    });
  });

  /* --------------------------------
     Line numbers
     -------------------------------- */
  function updateLineNumbers(content) {
    if (!lineNumbers) return;

    const lines = content.split("\n").length;
    lineNumbers.innerHTML = "";

    for (let i = 1; i <= lines; i++) {
      const span = document.createElement("span");
      span.textContent = i;
      lineNumbers.appendChild(span);
    }
  }

  /* --------------------------------
     Initial load (bio)
     -------------------------------- */
  if (codeContent) {
    const bioContent = contentMap.bio;
    codeContent.innerHTML = renderCommentBlock(bioContent);
    updateLineNumbers(bioContent);
  }

  /* --------------------------------
     File switching
     -------------------------------- */
  fileLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const file = link.dataset.file;

      fileLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      if (codeContent && contentMap[file]) {
        codeContent.innerHTML = renderCommentBlock(contentMap[file]);
        updateLineNumbers(contentMap[file]);
      }

      if (currentTab) {
        currentTab.textContent = file;
      }
    });
  });
  console.log("typing.js loaded");
  /* --------------------------------
     Sidebar defaults (mobile vs desktop)
     -------------------------------- */
  const DESKTOP_BREAKPOINT = 1280;
  let wasDesktop = window.innerWidth >= DESKTOP_BREAKPOINT;

  function collapseAllSections() {
    sectionToggles.forEach((toggle) => {
      const sectionId = toggle.dataset.section;
      const content = document.getElementById(sectionId);
      if (!content) return;

      toggle.classList.remove("active");
      content.classList.remove("active");
    });
  }

  function syncSidebarWithViewport() {
    const isDesktop = window.innerWidth >= DESKTOP_BREAKPOINT;

    // Only collapse when crossing from desktop → non-desktop
    if (wasDesktop && !isDesktop) {
      collapseAllSections();
    }

    wasDesktop = isDesktop;
  }

  // Initial load
  syncSidebarWithViewport();

  // Resize listener
  window.addEventListener("resize", syncSidebarWithViewport);
});
