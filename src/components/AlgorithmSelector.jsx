import React from 'react';


export default function AlgorithmSelector({ algorithm, onChange, disabled }) {
return (
<div className="algo-selector">
<label>
Algorithm:
<select value={algorithm} onChange={e => onChange(e.target.value)} disabled={disabled}>
<option value="BFS">BFS</option>
<option value="DFS">DFS</option>
<option value="Dijkstra">Dijkstra</option>
<option value="A*">A*</option>
</select>
</label>
</div>
);
}