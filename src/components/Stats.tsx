import React from 'react';
import "../assets/css/Stats.css";

interface StateProps {
    min: number;
    max: number;
    avg: number;
}

const Stats: React.FunctionComponent<StateProps> = ({min, max, avg}) => {
    return (
        <div className="card" id="stats">
            <div>
                <span>Min</span>
                <span>{min}</span>
            </div> 
            <div>
                <span>Max</span>
                <span>{max}</span>
            </div> 
            <div>
                <span>Avg</span>
                <span>{avg}</span>
            </div> 
        </div>
    )
}

export default Stats
