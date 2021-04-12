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
