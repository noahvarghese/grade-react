/*
 * StAuth10065: I Noah Varghese, 000753196 certify that this material is my original work.
 * No other person’s work has been used without due acknowledgement. 
 * I have not made my work available to anyone else.
*/

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
