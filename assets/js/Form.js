/*
“StAuth10065: I Noah Varghese, 000753196 certify that this material is my original work. 
No other person’s work has been used without due acknowledgement. 
I have not made my work available to anyone else.”
*/

const Form = ({
    setGrade,
    setSubject,
    addGrade,
    currentGrade,
    currentSubject,
    index,
}) => {
    let error;

    if (currentGrade.error) {
        error = (
            <div id="error">
                <span>
                    <img
                        src="assets/img/Attention.png"
                        alt="Attention"
                    />
                </span>
                <span>{currentGrade.error}</span>
            </div>
        );
    } else if (currentSubject.error) {
        error = (
            <div id="error">
                <span>
                    <img
                        src="assets/img/Attention.png"
                        alt="Attention"
                    />
                </span>
                <span>{currentSubject.error}</span>
            </div>
        );
    } else {
        error = "";
    }

    let subjectClass = "inputContainer card";

    if (currentSubject.error) {
        subjectClass += " error";
    }

    let gradeClass = "inputContainer card";

    if (currentGrade.error) {
        gradeClass += " error";
    }

    return (
        <div className="form">
            <form onSubmit={addGrade}>
                <div className={subjectClass}>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        onChange={setSubject}
                        placeholder=" "
                        value={currentSubject.value ?? ""}
                    />
                    <label htmlFor="subject">
                        <span>Subject</span>
                    </label>
                </div>
                <div className={gradeClass}>
                    <input
                        type="number"
                        id="grade"
                        name="grade"
                        onChange={setGrade}
                        min="0"
                        max="100"
                        placeholder=" "
                        value={currentGrade.value ?? ""}
                    />
                    <label htmlFor="grade">
                        <span>Grade</span>
                    </label>
                </div>
                <button type="submit">
                    {Number(index) ? "Update" : "Add"}
                </button>
            </form>
            {error}
        </div>
    );
};
