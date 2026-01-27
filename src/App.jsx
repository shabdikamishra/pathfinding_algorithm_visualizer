import React, { useState, useEffect, useRef } from 'react';
import Grid from './components/Grid';
import ControlPanel from './components/ControlPanel';
import './styles/grid.css';
import './styles/node.css';
import './styles/panel.css';
import { bfs } from './algorithms/bfs';
import { dfs } from './algorithms/dfs';
import { dijkstra } from './algorithms/dijkstra';
import { astar } from './algorithms/astar';


const START_NODE_ROW = 10;
const START_NODE_COL = 5;
const END_NODE_ROW = 10;
const END_NODE_COL = 45;
const ROWS = 21; // 21 rows
const COLS = 51; // 51 cols ~ 40x20 close

export default function App() {
const [grid, setGrid] = useState([]);
const [mouseIsPressed, setMouseIsPressed] = useState(false);
const [isRunning, setIsRunning] = useState(false);
const [algorithm, setAlgorithm] = useState('BFS');
const [speed, setSpeed] = useState(20); // ms per node
const startNodeRef = useRef({ row: START_NODE_ROW, col: START_NODE_COL });
const endNodeRef = useRef({ row: END_NODE_ROW, col: END_NODE_COL });


useEffect(() => {
const initialGrid = getInitialGrid();
setGrid(initialGrid);
}, []);


function getInitialGrid() {
const initialGrid = [];
for (let row = 0; row < ROWS; row++) {
const currentRow = [];
for (let col = 0; col < COLS; col++) {
currentRow.push(createNode(row, col));
}
initialGrid.push(currentRow);
}
return initialGrid;
}

function createNode(row, col) {
return {
row,
col,
isStart: row === START_NODE_ROW && col === START_NODE_COL,
isEnd: row === END_NODE_ROW && col === END_NODE_COL,
isWall: false,
distance: Infinity,
isVisited: false,
previousNode: null,
};
}


function handleMouseDown(row, col) {
if (isRunning) return;
const newGrid = toggleWall(grid, row, col);
setGrid(newGrid);
setMouseIsPressed(true);
}


function handleMouseEnter(row, col) {
if (!mouseIsPressed || isRunning) return;
const newGrid = toggleWall(grid, row, col);
setGrid(newGrid);
}


function handleMouseUp() {
setMouseIsPressed(false);
}

function toggleWall(grid, row, col) {
const node = grid[row][col];
if (node.isStart || node.isEnd) return grid;
const newGrid = grid.slice();
const newNode = { ...node, isWall: !node.isWall };
newGrid[row] = grid[row].slice();
newGrid[row][col] = newNode;
return newGrid;
}


function clearGrid() {
if (isRunning) return;
setGrid(getInitialGrid());
}


function clearWalls() {
if (isRunning) return;
const newGrid = grid.map(row =>
row.map(node => ({ ...node, isWall: false }))
);
setGrid(newGrid);
}


function clearPath() {
if (isRunning) return;
const newGrid = grid.map(row =>
row.map(node => ({ ...node, isVisited: false, previousNode: null }))
);
setGrid(newGrid);
// also clear DOM classes if any
const nodes = document.getElementsByClassName('node');
for (let node of nodes) {
node.className = 'node';
const row = parseInt(node.getAttribute('data-row'));
const col = parseInt(node.getAttribute('data-col'));
if (row === START_NODE_ROW && col === START_NODE_COL) node.classList.add('node-start');
if (row === END_NODE_ROW && col === END_NODE_COL) node.classList.add('node-end');
if (grid[row][col].isWall) node.classList.add('node-wall');
}
}


async function visualize() {
if (isRunning) return;
setIsRunning(true);
clearPath();
const start = grid[START_NODE_ROW][START_NODE_COL];
const end = grid[END_NODE_ROW][END_NODE_COL];
let visitedNodesInOrder = [];
let nodesInShortestPathOrder = [];
if (algorithm === 'BFS') {
visitedNodesInOrder = bfs(grid, start, end);
} else if (algorithm === 'DFS') {
visitedNodesInOrder = dfs(grid, start, end);
} else if (algorithm === 'Dijkstra') {
const result = dijkstra(grid, start, end);
visitedNodesInOrder = result.visited;
nodesInShortestPathOrder = result.shortestPath;
} else if (algorithm === 'A*') {
const result = astar(grid, start, end);
visitedNodesInOrder = result.visited;
nodesInShortestPathOrder = result.shortestPath;
}

// If algorithms returned parents only, build path now
if (nodesInShortestPathOrder.length === 0) {
nodesInShortestPathOrder = buildPathFromParents(end);
}


await animate(visitedNodesInOrder, nodesInShortestPathOrder);
setIsRunning(false);
}


function buildPathFromParents(endNode) {
const path = [];
let current = endNode;
while (current && current.previousNode) {
path.unshift(current);
current = current.previousNode;
}
// include start if connected
if (current && current.isStart) path.unshift(current);
return path;
}

function animate(visitedNodes, pathNodes) {
return new Promise(resolve => {
for (let i = 0; i <= visitedNodes.length; i++) {
if (i === visitedNodes.length) {
setTimeout(() => {
animatePath(pathNodes);
resolve(true);
}, speed * i);
return;
}
setTimeout(() => {
const node = visitedNodes[i];
const elem = document.getElementById(`node-${node.row}-${node.col}`);
if (elem && !elem.classList.contains('node-start') && !elem.classList.contains('node-end')) {
elem.classList.add('node-visited');
}
}, speed * i);
}
});
}

function animatePath(pathNodes) {
for (let i = 0; i < pathNodes.length; i++) {
setTimeout(() => {
const node = pathNodes[i];
const elem = document.getElementById(`node-${node.row}-${node.col}`);
if (elem && !elem.classList.contains('node-start') && !elem.classList.contains('node-end')) {
elem.classList.remove('node-visited');
elem.classList.add('node-path');
}
}, 50 * i);
}
}


function handleAlgorithmChange(value) {
setAlgorithm(value);
}


function handleSpeedChange(value) {
setSpeed(parseInt(value, 10));
}

return (
<div className="app">
<header className="app-header">
<h1>Pathfinding Visualizer (React)</h1>
<p>Algorithms: BFS | DFS | Dijkstra | A*</p>
</header>
<ControlPanel
algorithm={algorithm}
onAlgorithmChange={handleAlgorithmChange}
onVisualize={visualize}
onClearGrid={clearGrid}
onClearWalls={clearWalls}
onClearPath={clearPath}
onSpeedChange={handleSpeedChange}
speed={speed}
isRunning={isRunning}
/>
<Grid
grid={grid}
onMouseDown={handleMouseDown}
onMouseEnter={handleMouseEnter}
onMouseUp={handleMouseUp}
/>
<footer className="app-footer">
<small>Built with React • Good for resumes & interviews</small>
</footer>
</div>
);
}
