import React from 'react';


export default function SpeedControl({ speed, onChange, disabled }) {
return (
<div className="speed-control">
<label>
Speed:
<input
type="range"
min="5"
max="60"
value={speed}
onChange={e => onChange(e.target.value)}
disabled={disabled}
/>
<span className="speed-value">{speed} ms</span>
</label>
</div>
);
}