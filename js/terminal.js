// Snake game implementation
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("gameCanvas")
  const startBtn = document.getElementById("startBtn")
  const skipBtn = document.getElementById("skipBtn")
  const foodDots = document.getElementById("foodDots")
  const systemNodes = document.querySelectorAll(".system-node")
  const flowArrows = document.querySelectorAll(".flow-arrow")
  const runSystemBtn = document.getElementById("runSystemBtn")

  if (runSystemBtn && systemNodes.length > 0) {
    let isRunning = false

    runSystemBtn.addEventListener("click", () => {
      if (isRunning) return

      isRunning = true
      runSystemBtn.disabled = true
      runSystemBtn.textContent = "running..."

      // Reset all nodes and arrows to idle state
      systemNodes.forEach((node) => node.classList.remove("active"))
      flowArrows.forEach((arrow) => arrow.classList.remove("active"))

      // Sequentially activate each node
      systemNodes.forEach((node, index) => {
        setTimeout(() => {
          node.classList.add("active")

          // Activate arrow after this node (if exists)
          if (flowArrows[index]) {
            setTimeout(() => {
              flowArrows[index].classList.add("active")
            }, 200)
          }

          // Reset to idle after completing sequence
          if (index === systemNodes.length - 1) {
            setTimeout(() => {
              systemNodes.forEach((n) => n.classList.remove("active"))
              flowArrows.forEach((a) => a.classList.remove("active"))
              isRunning = false
              runSystemBtn.disabled = false
              runSystemBtn.textContent = "run-system"
            }, 1000)
          }
        }, index * 500)
      })
    })
  }

  if (systemNodes.length > 0) {
    // Add subtle pulse animation to nodes in sequence
    systemNodes.forEach((node, index) => {
      setTimeout(() => {
        node.style.animation = `pulse 2s ease-in-out infinite`
        node.style.animationDelay = `${index * 0.2}s`
      }, index * 200)
    })

    // Define pulse animation via style tag
    const style = document.createElement("style")
    style.textContent = `
      @keyframes pulse {
        0%, 100% {
          border-color: var(--border-color);
        }
        50% {
          border-color: var(--accent-cyan);
          box-shadow: 0 0 10px rgba(67, 217, 173, 0.3);
        }
      }
    `
    document.head.appendChild(style)
  }

  if (!canvas) return

  const ctx = canvas.getContext("2d")
  const gridSize = 20
  const tileCount = canvas.width / gridSize

  let snake = [{ x: 10, y: 10 }]
  let velocity = { x: 0, y: 0 }
  let food = { x: 15, y: 15 }
  const foodCount = 10
  let foodEaten = 0
  let gameRunning = false
  let gameLoop = null

  // Initialize food dots display
  function initFoodDots() {
    if (!foodDots) return
    foodDots.innerHTML = ""
    for (let i = 0; i < foodCount; i++) {
      const dot = document.createElement("div")
      dot.className = "food-dot"
      foodDots.appendChild(dot)
    }
  }

  function updateFoodDots() {
    if (!foodDots) return
    const dots = foodDots.querySelectorAll(".food-dot")
    dots.forEach((dot, index) => {
      if (index < foodEaten) {
        dot.classList.add("eaten")
      }
    })
  }

  function drawGame() {
    // Clear canvas with gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "#010C15")
    gradient.addColorStop(1, "#011221")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = "#1E2D3D"
    ctx.lineWidth = 0.5
    for (let i = 0; i <= tileCount; i++) {
      ctx.beginPath()
      ctx.moveTo(i * gridSize, 0)
      ctx.lineTo(i * gridSize, canvas.height)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, i * gridSize)
      ctx.lineTo(canvas.width, i * gridSize)
      ctx.stroke()
    }

    // Draw snake
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? "#43D9AD" : "#4EC9B0"
      ctx.fillRect(segment.x * gridSize + 2, segment.y * gridSize + 2, gridSize - 4, gridSize - 4)

      // Add glow effect to head
      if (index === 0) {
        ctx.shadowBlur = 10
        ctx.shadowColor = "#43D9AD"
      } else {
        ctx.shadowBlur = 0
      }
    })

    // Draw food
    ctx.fillStyle = "#FEA55F"
    ctx.shadowBlur = 15
    ctx.shadowColor = "#FEA55F"
    ctx.beginPath()
    ctx.arc(food.x * gridSize + gridSize / 2, food.y * gridSize + gridSize / 2, gridSize / 3, 0, Math.PI * 2)
    ctx.fill()
    ctx.shadowBlur = 0
  }

  function moveSnake() {
    if (velocity.x === 0 && velocity.y === 0) return

    const head = {
      x: snake[0].x + velocity.x,
      y: snake[0].y + velocity.y,
    }

    // Check wall collision
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
      gameOver()
      return
    }

    // Check self collision
    if (snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
      gameOver()
      return
    }

    snake.unshift(head)

    // Check food collision
    if (head.x === food.x && head.y === food.y) {
      foodEaten++
      updateFoodDots()

      if (foodEaten >= foodCount) {
        gameWon()
        return
      }

      placeFood()
    } else {
      snake.pop()
    }
  }

  function placeFood() {
    let validPosition = false
    while (!validPosition) {
      food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount),
      }
      validPosition = !snake.some((segment) => segment.x === food.x && segment.y === food.y)
    }
  }

  function gameOver() {
    gameRunning = false
    clearInterval(gameLoop)
    alert("Game Over! Try again.")
    resetGame()
  }

  function gameWon() {
    gameRunning = false
    clearInterval(gameLoop)
    alert("Congratulations! You completed the game! 🎉")
    resetGame()
  }

  function resetGame() {
    snake = [{ x: 10, y: 10 }]
    velocity = { x: 0, y: 0 }
    food = { x: 15, y: 15 }
    foodEaten = 0
    gameRunning = false
    startBtn.textContent = "start-game"
    initFoodDots()
    drawGame()
  }

  function startGame() {
    if (gameRunning) return

    gameRunning = true
    startBtn.textContent = "restart-game"
    velocity = { x: 1, y: 0 }

    gameLoop = setInterval(() => {
      moveSnake()
      drawGame()
    }, 150)
  }

  // Keyboard controls
  document.addEventListener("keydown", (e) => {
    if (!gameRunning) return

    switch (e.key) {
      case "ArrowUp":
        if (velocity.y === 0) velocity = { x: 0, y: -1 }
        e.preventDefault()
        break
      case "ArrowDown":
        if (velocity.y === 0) velocity = { x: 0, y: 1 }
        e.preventDefault()
        break
      case "ArrowLeft":
        if (velocity.x === 0) velocity = { x: -1, y: 0 }
        e.preventDefault()
        break
      case "ArrowRight":
        if (velocity.x === 0) velocity = { x: 1, y: 0 }
        e.preventDefault()
        break
    }
  })

  // Button controls
  document.querySelectorAll(".key-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!gameRunning) return

      const direction = btn.dataset.direction
      switch (direction) {
        case "up":
          if (velocity.y === 0) velocity = { x: 0, y: -1 }
          break
        case "down":
          if (velocity.y === 0) velocity = { x: 0, y: 1 }
          break
        case "left":
          if (velocity.x === 0) velocity = { x: -1, y: 0 }
          break
        case "right":
          if (velocity.x === 0) velocity = { x: 1, y: 0 }
          break
      }
    })
  })

  // Start and skip buttons
  if (startBtn) {
    startBtn.addEventListener("click", startGame)
  }

  if (skipBtn) {
    skipBtn.addEventListener("click", () => {
      window.location.href = "pages/about.html"
    })
  }

  // Initialize
  initFoodDots()
  drawGame()
})
