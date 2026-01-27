import React from 'react';


export default function ControlPanel({ algorithm, onAlgorithmChange, onVisualize, onClearGrid, onClearWalls, onClearPath, onSpeedChange, speed, isRunning }) {
return (
<div className="control-panel">
<div className="controls-left">
<label>
Algorithm:
<select value={algorithm} onChange={e => onAlgorithmChange(e.target.value)} disabled={isRunning}>
<option value="BFS">BFS</option>
<option value="DFS">DFS</option>
<option value="Dijkstra">Dijkstra</option>
<option value="A*">A*</option>
</select>
</label>


<label>
Speed (ms):
<input type="range" min="5" max="60" value={speed} onChange={e => onSpeedChange(e.target.value)} disabled={isRunning} />
<span className="speed-value">{speed}</span>
</label>


<button onClick={onVisualize} disabled={isRunning}>Run</button>
</div>


<div className="controls-right">
<button onClick={onClearGrid} disabled={isRunning}>Reset Grid</button>
<button onClick={onClearWalls} disabled={isRunning}>Clear Walls</button>
<button onClick={onClearPath} disabled={isRunning}>Clear Path</button>
</div>


<div className="legend">
<div><span className="legend-item node-start"></span>Start</div>
<div><span className="legend-item node-end"></span>End</div>
<div><span className="legend-item node-wall"></span>Wall</div>
<div><span className="legend-item node-visited"></span>Visited</div>
<div><span className="legend-item node-path"></span>Path</div>
</div>
</div>
);
}