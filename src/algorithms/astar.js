import { PriorityQueue } from './utils';


function manhattan(a, b) {
return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}


export function astar(grid, startNode, endNode) {
const visitedInOrder = [];
const openSet = new PriorityQueue((a, b) => a.f < b.f);


for (const row of grid) {
for (const node of row) {
node.g = Infinity;
node.h = Infinity;
node.f = Infinity;
node.previousNode = null;
node.isVisited = false;
}
}


startNode.g = 0;
startNode.h = manhattan(startNode, endNode);
startNode.f = startNode.h;
openSet.push({ ...startNode, f: startNode.f });

while (!openSet.isEmpty()) {
const current = openSet.pop();
const node = grid[current.row][current.col];
if (node.isWall) continue;
if (node.isVisited) continue;
node.isVisited = true;
visitedInOrder.push(node);
if (node.row === endNode.row && node.col === endNode.col) {
const shortestPath = buildPath(node);
return { visited: visitedInOrder, shortestPath };
}


const neighbors = getNeighbors(grid, node);
for (const n of neighbors) {
if (n.isWall) continue;
const tentative_g = node.g + 1;
if (tentative_g < n.g) {
n.g = tentative_g;
n.h = manhattan(n, endNode);
n.f = n.g + n.h;
n.previousNode = node;
openSet.push({ ...n, f: n.f });
}
}
}


return { visited: visitedInOrder, shortestPath: [] };
}

function buildPath(node) {
const path = [];
let current = node;
while (current) {
path.unshift(current);
current = current.previousNode;
}
return path;
}


function getNeighbors(grid, node) {
const neighbors = [];
const { row, col } = node;
if (row > 0) neighbors.push(grid[row - 1][col]);
if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
if (col > 0) neighbors.push(grid[row][col - 1]);
if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
return neighbors;
}