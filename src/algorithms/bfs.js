export function bfs(grid, startNode, endNode) {
const visitedNodesInOrder = [];
const queue = [];
const visited = new Set();
queue.push(startNode);
visited.add(`${startNode.row}-${startNode.col}`);


while (queue.length) {
const node = queue.shift();
// Skip walls
if (grid[node.row][node.col].isWall) continue;
visitedNodesInOrder.push(node);
if (node.row === endNode.row && node.col === endNode.col) {
return visitedNodesInOrder;
}
const neighbors = getNeighbors(grid, node);
for (const n of neighbors) {
const key = `${n.row}-${n.col}`;
if (!visited.has(key) && !grid[n.row][n.col].isWall) {
visited.add(key);
grid[n.row][n.col].previousNode = node;
queue.push(grid[n.row][n.col]);
}
}
}
return visitedNodesInOrder;
}


function getNeighbors(grid, node) {
const neighbors = [];
const { row, col } = node;
if (row > 0) neighbors.push(grid[row - 1][col]);
if (row < grid.length -1) neighbors.push(grid[row + 1][col]);
if (col > 0) neighbors.push(grid[row][col - 1]);
if (col < grid[0].length -1) neighbors.push(grid[row][col + 1]);
return neighbors;
}
