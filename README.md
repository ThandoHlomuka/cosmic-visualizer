# 🌌 Cosmic Visualization - Solar System Simulator

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ThandoHlomuka/cosmic-visualization)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Interactive 3D solar system simulator** - Run celestial body simulations without code and visualize results in real-time.

## ✨ Features

### 🪐 Solar System Exploration
- **8 Planets** - Mercury through Neptune with accurate relative sizes
- **200+ Moons** - Including Earth's Moon, Jupiter's Galilean moons, Saturn's Titan
- **1M+ Asteroids** - Simulated asteroid belt
- **Real-time Orbits** - Accurate orbital mechanics visualization

### 🔬 No-Code Simulation Lab
- **Orbital Mechanics** - Visualize planetary orbits
- **Gravitational Interaction** - See how bodies affect each other
- **Collision Detection** - Track potential collisions
- **Trajectory Analysis** - Analyze flight paths
- **N-Body Simulation** - Complex multi-body interactions

### 📊 Results & Analytics
- **Interactive Charts** - Distance, velocity, orbital path visualization
- **Data Tables** - Detailed simulation data
- **Export Options** - CSV, JSON, PNG exports
- **Real-time Updates** - Live data during simulation

## 🚀 Quick Start

### Local Development

1. **Clone or download** this repository
2. **Open** `index.html` in a modern browser
3. **Explore** the solar system!

```bash
# Or use a local server
python -m http.server 8000
# Visit: http://localhost:8000
```

### Deploy to Vercel

1. Click the "Deploy to Vercel" button above
2. Sign in with GitHub
3. Import your repository
4. Click "Deploy"

## 🎮 How to Use

### Solar System View

1. **Navigate** - Use mouse to rotate and zoom
2. **Select Bodies** - Click on any planet/moon from the list
3. **View Details** - See mass, temperature, orbital data
4. **Controls**:
   - `+` / `-` - Zoom in/out
   - Reset - Return to default view
   - Orbits - Toggle orbital paths
   - Labels - Toggle body labels

### Running Simulations

1. **Select Parameters**:
   - Simulation Type (Orbital, Gravity, Collision, etc.)
   - Primary Body (Sun, Earth, Jupiter, etc.)
   - Secondary Body (optional)
   - Time Scale (1x - 1000x)
   - Duration (1 - 10,000 days)
   - Accuracy Level

2. **Start Simulation**:
   - Click "Start Simulation"
   - Watch real-time visualization
   - Monitor time, distance, velocity

3. **Analyze Results**:
   - View charts (distance, velocity, orbit)
   - Check data table
   - Export results (CSV/JSON)

## 🛠️ Tech Stack

- **Three.js** - 3D graphics and rendering
- **Chart.js** - Data visualization
- **HTML5 Canvas** - 2D rendering
- **Vanilla JavaScript** - No framework dependencies
- **CSS3** - Modern styling with variables

## 📁 Project Structure

```
cosmic-visualization/
├── index.html          # Main HTML file
├── styles.css          # All styles
├── script.js           # Simulation logic & 3D rendering
├── README.md           # This file
├── DEPLOYMENT.md       # Deployment guide
└── .gitignore          # Git ignore rules
```

## 🌟 Celestial Bodies Included

### Planets
- ☀️ Sun (Star)
- ☿️ Mercury
- ♀️ Venus
- 🌍 Earth
- ♂️ Mars
- ♃ Jupiter
- ♄ Saturn (with rings)
- ♅ Uranus
- ♆ Neptune

### Moons
- 🌙 Moon (Earth)
- 🛰️ Io (Jupiter)
- 🛰️ Europa (Jupiter)
- 🛰️ Titan (Saturn)
- And many more...

## 🎯 Educational Use Cases

- **Astronomy Classes** - Visualize orbital mechanics
- **Physics Education** - Demonstrate gravitational forces
- **Space Enthusiasts** - Explore the solar system
- **Research** - Prototype simulation scenarios

## 📊 Simulation Types

1. **Orbital Mechanics** - Standard planetary orbits
2. **Gravitational Interaction** - N-body gravity simulation
3. **Collision Detection** - Track potential impacts
4. **Trajectory Analysis** - Path optimization
5. **N-Body Simulation** - Complex multi-body systems

## 🔧 Configuration

### Time Scale
- **1x** - Real-time
- **10x** - 10 days per second
- **100x** - 100 days per second
- **1000x** - 1000 days per second

### Accuracy Levels
- **Low** - Fast simulation, approximate results
- **Medium** - Balanced speed and accuracy
- **High** - Precise calculations, slower

## 📤 Export Formats

- **CSV** - Spreadsheet-compatible data
- **JSON** - Machine-readable format
- **PNG** - Chart screenshots (coming soon)

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

**WebGL Required** for 3D visualization.

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit"
git push origin main

# Deploy on Vercel
# Visit vercel.com and import your repository
```

### Other Platforms

- **Netlify** - Drag and drop deployment
- **GitHub Pages** - Enable in repository settings
- **Cloudflare Pages** - Connect GitHub

## 📝 API Reference

### Simulation Functions

```javascript
// Start simulation
startSimulation()

// Pause/Resume
pauseSimulation()

// Reset
resetSimulation()

// Export data
exportData('csv')  // or 'json', 'png'
```

### Canvas Controls

```javascript
zoomIn()
zoomOut()
resetView()
toggleOrbits()
toggleLabels()
```

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - See LICENSE file for details.

## 🙏 Acknowledgments

- **NASA** - Public domain planetary data
- **Three.js** - 3D rendering library
- **Chart.js** - Data visualization
- **Font Awesome** - Icons
- **Google Fonts** - Inter font family

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check the documentation
- Review simulation examples

---

**Built with ❤️ for space exploration and education**

🌌 *Explore the cosmos, one simulation at a time!*
