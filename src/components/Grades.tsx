import React from "react";
import Edit from "../assets/img/editBrush.png";
import Delete from "../assets/img/cancel.png";
import "../assets/css/Grades.css";

interface GradeProps {
    grades: { subject: string; grade: number }[];
    deleteItem: (index: number) => void;
    editItem: (index: number) => void;
}

const Grades: React.FunctionComponent<GradeProps> = ({ grades, deleteItem, editItem }) => {
    return (
        <div className="grades">
            {grades.map((grade, index) => (
                /* Set key to one over the index because Javascript converts the number 0 to undefined */
                <div className="subject card" key={index + 1}>
                    <div className="textContainer"><span>{grade.subject}</span></div>
                    <div className="textContainer"><span>{grade.grade}</span></div>
                    <div className="btnContainer">
                        <button type="button">
                            <img src={Edit} alt="Edit" onClick={() => editItem(index + 1)}/>
                        </button>
                        <button>
                            <img src={Delete} alt="Delete" onClick={() => deleteItem(index + 1)}/>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Grades;
