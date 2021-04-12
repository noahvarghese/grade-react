/*
“StAuth10065: I Noah Varghese, 000753196 certify that this material is my original work. 
No other person’s work has been used without due acknowledgement. 
I have not made my work available to anyone else.”
*/
const Grades = ({ grades, deleteItem, editItem }) => {
    return (
        <div className="grades">
            {grades.map((grade, index) => (
                /* Set key to one over the index because Javascript converts the number 0 to undefined */
                <div className="subject card" key={index + 1}>
                    <div className="textContainer">
                        <span>{grade.subject}</span>
                    </div>
                    <div className="textContainer">
                        <span>{grade.grade}</span>
                    </div>
                    <div className="btnContainer">
                        <button type="button">
                            <img
                                src="assets/img/editBrush.png"
                                alt="Edit"
                                onClick={() => editItem(index + 1)}
                            />
                        </button>
                        <button>
                            <img
                                src="assets/img/cancel.png"
                                alt="Delete"
                                onClick={() => deleteItem(index + 1)}
                            />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};
