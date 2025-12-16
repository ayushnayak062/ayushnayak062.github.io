# Ayush Nayak - Game Developer Portfolio

A VS Code/Terminal-inspired portfolio website showcasing game development projects and experience.

## 🎮 Features

- Dark VS Code theme with editor-style panels
- Interactive Snake game on homepage
- Responsive design (mobile to desktop)
- Clean semantic HTML
- Vanilla JavaScript (no frameworks)
- GitHub Pages compatible

## 📁 Project Structure

```
/
├── index.html              # Homepage with Snake game
├── pages/
│   ├── about.html         # About & experience
│   ├── projects.html      # Project showcase
│   └── contact.html       # Contact form
├── css/
│   ├── variables.css      # CSS variables
│   ├── base.css          # Base styles
│   ├── layout.css        # Layout & components
│   ├── terminal.css      # Game & terminal styles
│   └── responsive.css    # Mobile responsive
├── js/
│   ├── navigation.js     # Nav & sidebar logic
│   ├── typing.js         # About page logic
│   └── terminal.js       # Snake game
└── README.md
```

## 🚀 GitHub Pages Setup

### Method 1: Using GitHub Interface

1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to **Settings** → **Pages**
4. Under **Source**, select **main** branch
5. Click **Save**
6. Your site will be live at: `https://username.github.io/repository-name/`

### Method 2: Using Git Commands

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Portfolio website"

# Add remote repository
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git push -u origin main
```

Then follow steps 3-6 from Method 1.

## 🎨 Customization

### Colors
Edit `css/variables.css` to change the color scheme:
```css
:root {
    --accent-orange: #FEA55F;
    --accent-cyan: #43D9AD;
    /* Add your custom colors */
}
```

### Content
- Update personal info in each HTML file
- Modify project cards in `pages/projects.html`
- Change experience content in `pages/about.html`

### Snake Game Settings
In `js/terminal.js`:
```javascript
const gridSize = 20;        // Grid cell size
const foodCount = 10;       // Food to collect
let gameLoop = setInterval(..., 150); // Game speed (ms)
```

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🛠️ Technologies Used

- HTML5
- CSS3 (Grid, Flexbox, Custom Properties)
- Vanilla JavaScript (ES6+)
- Canvas API (for Snake game)

## 📄 License

Free to use for personal portfolios. Please customize with your own content.

## 🤝 Connect

- **Email**: ayushnayak062@gmail.com
- **GitHub**: [@ayushnayak062](https://github.com/ayushnayak062)
- **LinkedIn**: [ayushnayak062](https://linkedin.com/in/ayushnayak062)

---

Built with ❤️ for game developers
