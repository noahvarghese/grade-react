const Stats = ({ min, max, avg }) => {
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
    );
};