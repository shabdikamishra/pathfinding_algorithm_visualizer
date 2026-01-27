import { PriorityQueue } from './utils';


export function dijkstra(grid, startNode, endNode) {
const visitedInOrder = [];
const pq = new PriorityQueue((a, b) => a.distance < b.distance);


// initialize distances
for (const row of grid) {
for (const node of row) {
node.distance = Infinity;
node.previousNode = null;
}
}


startNode.distance = 0;
pq.push({ ...startNode, distance: 0 });


while (!pq.isEmpty()) {
const current = pq.pop();
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
const alt = node.distance + 1; // uniform weight
if (alt < n.distance) {
n.distance = alt;
n.previousNode = node;
pq.push({ ...n, distance: alt });
}
}
}
return { visited: visitedInOrder, shortestPath: [] }; // no path found
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