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
                <div className="subject card" key={index}>
                    <div className="textContainer"><span>{grade.subject}</span></div>
                    <div className="textContainer"><span>{grade.grade}</span></div>
                    <div className="btnContainer">
                        <button type="button">
                            <img src={Edit} alt="Edit" onClick={() => editItem(index)}/>
                        </button>
                        <button>
                            <img src={Delete} alt="Delete" onClick={() => deleteItem(index)}/>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Grades;
