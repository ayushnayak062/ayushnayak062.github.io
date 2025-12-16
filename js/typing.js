// About page file switching and line number generation
document.addEventListener("DOMContentLoaded", () => {
  const fileLinks = document.querySelectorAll(".file-link")
  const codeContent = document.getElementById("codeContent")
  const lineNumbers = document.getElementById("lineNumbers")
  const currentTab = document.getElementById("currentTab")

  // Content for different sections
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
 */`,
    education: `/**
 * Education & Experience
 * 
 * XR Developer — Cusmat Technologies
 * Aug 2023 – May 2025
 * - Built VR training simulators for 200+ operators
 * - Designed error-injection systems
 * - Developed real-time trainer portals
 * 
 * Unity Game Developer — Agon Interactive
 * Aug 2022 – Feb 2023
 * - Developed co-op VR zombie shooter
 * - Implemented enemy AI behavior
 * - Integrated haptic suit APIs
 */`,
  }

  function updateLineNumbers(content) {
    if (!lineNumbers) return

    const lines = content.split("\n").length
    lineNumbers.innerHTML = ""
    for (let i = 1; i <= lines; i++) {
      const span = document.createElement("span")
      span.textContent = i
      lineNumbers.appendChild(span)
    }
  }

  // Initialize line numbers
  if (codeContent) {
    updateLineNumbers(codeContent.textContent)
  }

  // File link click handlers
  fileLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const file = link.dataset.file

      // Update active state
      fileLinks.forEach((l) => l.classList.remove("active"))
      link.classList.add("active")

      // Update content
      if (codeContent && contentMap[file]) {
        codeContent.innerHTML = `<code>${contentMap[file]}</code>`
        updateLineNumbers(contentMap[file])
      }

      // Update tab name
      if (currentTab) {
        currentTab.textContent = file
      }
    })
  })
})
