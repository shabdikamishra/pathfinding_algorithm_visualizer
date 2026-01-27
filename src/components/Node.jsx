import React from 'react';


export default function Node({ row, col, isStart, isEnd, isWall, onMouseDown, onMouseEnter, onMouseUp }) {
const extraClassName = isWall ? 'node-wall' : '';
const startClass = isStart ? 'node-start' : '';
const endClass = isEnd ? 'node-end' : '';
return (
<div
id={`node-${row}-${col}`}
className={`node ${extraClassName} ${startClass} ${endClass}`}
data-row={row}
data-col={col}
onMouseDown={() => onMouseDown(row, col)}
onMouseEnter={() => onMouseEnter(row, col)}
onMouseUp={() => onMouseUp()}
></div>
);
}