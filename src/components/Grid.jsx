import React from 'react';
import Node from './Node';


export default function Grid({ grid, onMouseDown, onMouseEnter, onMouseUp }) {
return (
<div className="grid" onMouseLeave={() => onMouseUp()}>
{grid.map((row, rowIdx) => (
<div key={rowIdx} className="grid-row">
{row.map((node, nodeIdx) => (
<Node
key={nodeIdx}
row={node.row}
col={node.col}
isStart={node.isStart}
isEnd={node.isEnd}
isWall={node.isWall}
onMouseDown={onMouseDown}
onMouseEnter={onMouseEnter}
onMouseUp={onMouseUp}
/>
))}
</div>
))}
</div>
);
}