import React from 'react';


export default function Legend() {
return (
<div className="legend">
<div><span className="legend-box start"></span> Start</div>
<div><span className="legend-box end"></span> End</div>
<div><span className="legend-box wall"></span> Wall</div>
<div><span className="legend-box visited"></span> Visited</div>
<div><span className="legend-box path"></span> Path</div>
</div>
);
}