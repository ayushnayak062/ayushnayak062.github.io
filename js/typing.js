// About page file switching and line number generation
document.addEventListener("DOMContentLoaded", () => {
  const fileLinks = document.querySelectorAll(".file-link");
  const codeContent = document.getElementById("codeContent");
  const lineNumbers = document.getElementById("lineNumbers");
  const currentTab = document.getElementById("currentTab");

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
    education: `/**
 * Education
 * 
 * Bachelor of Technology in Computer Science
 * XYZ University
 * 2018 – 2022
 * 
 * Relevant Coursework:
 * - Game Development & Design
 * - Computer Graphics & Rendering
 * - Artificial Intelligence
 * - Data Structures & Algorithms
 * - Virtual Reality Systems
 * - Multiplayer Game Architecture
 * 
 * Senior Project: Built a procedural dungeon crawler
 * with roguelike mechanics in Unity
 */`,
    interests: `/**
 * Interests
 * - Indie game development
 * - VR and XR experiences
 * - Game mechanics design
 * - AI behavior systems
 * - Multiplayer networking
 * - Performance optimization
 * - Unity shader development
 * - Narrative-driven games
 * - Experimental gameplay
 * - Procedural generation
 * - Game jams & rapid prototyping
 */`,
  };

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

  if (codeContent) {
    const bioContent = contentMap.bio;
    codeContent.innerHTML = `<code>${bioContent}</code>`;
    updateLineNumbers(bioContent);
  }

  // File link click handlers
  fileLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const file = link.dataset.file;

      // Update active state
      fileLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      // Update content
      if (codeContent && contentMap[file]) {
        codeContent.innerHTML = `<code>${contentMap[file]}</code>`;
        updateLineNumbers(contentMap[file]);
      }

      // Update tab name
      if (currentTab) {
        currentTab.textContent = file;
      }
    });
  });
});
