// Navigation active state management
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    const href = link.getAttribute("href")

    // Remove active class from all
    link.classList.remove("active")

    // Add active class to current page
    if (currentPage.includes(href) || (currentPage === "/" && href === "index.html")) {
      link.classList.add("active")
    }
  })

  // Sidebar toggle functionality
  const toggleButtons = document.querySelectorAll(".section-toggle")
  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const sectionId = button.dataset.section
      const content = document.getElementById(sectionId)
      const icon = button.querySelector(".toggle-icon")

      if (content) {
        content.classList.toggle("active")
        button.classList.toggle("active")
        icon.textContent = content.classList.contains("active") ? "▼" : "▶"
      }
    })
  })
})
