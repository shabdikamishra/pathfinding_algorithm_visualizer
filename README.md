# Pathfinding Algorithm Visualizer (React)

An interactive web application built with **React** that visually demonstrates how popular **pathfinding algorithms** work on a grid. Users can draw walls, adjust animation speed, and compare different algorithms in real time.

---

## 🚀 Features

- 🟩 Interactive grid with **drag-to-draw walls**
- ▶️ Visualizes step-by-step exploration of nodes
- 🧠 Algorithms implemented:
  - Breadth-First Search (BFS)
  - Depth-First Search (DFS)
  - Dijkstra’s Algorithm
  - A* (A-Star) Algorithm
- ⚡ Adjustable animation speed
- 🧹 Controls to clear grid, walls, and paths
- 🎨 Clean, responsive UI with color-coded nodes

---

## 🧩 Algorithms & Data Structures Used

- **Graphs** (grid treated as an unweighted graph)
- **Queues** (BFS)
- **Stacks / Recursion** (DFS)
- **Priority Queue (Min-Heap)** (Dijkstra, A*)
- **Heuristics** (Manhattan distance for A*)
- **Parent pointers** for shortest path reconstruction

---

## 🛠️ Tech Stack

- **React (JavaScript)**
- HTML5
- CSS3
- create-react-app



## ▶️ How to Run Locally

```bash
# Clone the repository
git clone https://github.com/your-username/pathfinding-visualizer.git

# Navigate into the project directory
cd pathfinding-visualizer

# Install dependencies
npm install

# Start the development server
npm start
