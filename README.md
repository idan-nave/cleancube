
# Rubik's Cube Learning Platform - CleanCube

---

## Introduction
CleanCube is a learning platform designed to teach users how to solve a Rubik's Cube through an interactive and user-friendly interface. Whether you're a beginner eager to learn or a competitive solver aiming to refine your techniques, CleanCube offers tailored tools and resources to improve your skills.

---

## Features
1. **Interactive Learning:**
   - Step-by-step tutorials for solving a Rubik's Cube.
   - Detailed algorithms for every stage of the cube.

2. **Preloaded Screenshots:**
   - View predefined screenshots of cube states for better understanding.
   - Visual aids to guide the learning process.

3. **Progress Tracking:**
   - Display progress visually as you advance through the learning steps.

4. **Thumbnails and Feedback:**
   - Real-time display of preloaded images.
   - Hover effects and click-to-remove functionality for thumbnails.

5. **Abort Feature:**
   - Option to cancel the current session and reset progress.

---

## How It Works
1. **Select Difficulty:**
   - Choose between Easy, Medium, and Hard difficulty levels to start your learning journey.

2. **Load Preloaded Images:**
   - Use the "Load Images" button to view preloaded screenshots of different cube states.

3. **View Progress:**
   - Check the visual progress bar to track how many images you've loaded.

4. **Interactive Thumbnails:**
   - Hover over thumbnails for a highlight effect.
   - Remove thumbnails by clicking on them for a more customized view.

---

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/CleanCube.git
   ```

2. Navigate to the project directory:
   ```bash
   cd CleanCube
   ```

3. Install dependencies (if applicable):
   ```bash
   npm install
   ```

4. Open the `index.html` file in your browser to start using the platform.

---

## File Structure
```
CleanCube/
│
├── index.html         # Main HTML file
├── css/
│   ├── mainframe.css  # Styling for the interactive interface
│   ├── nav-style.css  # Styling for the navigation bar
│   └── footer-style.css # Styling for the footer
├── js/
│   ├── rendering.js   # Handles rendering of cube states
│   ├── analyze-btn.js # Controls the "Analyze" button functionality
│   ├── timer.js       # Timer functionalities (if applicable)
│   └── load-nav-footer.js # Dynamically loads navigation and footer
├── assets/
│   ├── img-py/        # Preloaded cube screenshots
│   │   ├── image1-backup.jpg
│   │   ├── image2-backup.jpg
│   │   └── image3-backup.jpg
│   └── media/         # Media files like icons and SVGs
└── README.md          # Project documentation
```

---

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **Libraries:** [html2canvas](https://html2canvas.hertzen.com/) (for screenshots)
- **Backend:** Node.js (for advanced server-side functionalities)
- **Hosting:** Render.com

---

## Future Enhancements
- **Dynamic Algorithm Suggestions:**
  - Integrate AI-based tools to provide real-time algorithm suggestions.

- **Personalized Learning Paths:**
  - Customize tutorials based on user progress and performance.

- **Competitive Mode:**
  - Add a feature for speedcubers to compete and improve their solving times.

---

## Contributing
Contributions are welcome! Feel free to:
1. Fork this repository.
2. Make your changes.
3. Submit a pull request.

---

## License
This project is licensed under the MIT License. See `LICENSE` for details.

---

