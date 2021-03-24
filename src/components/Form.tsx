import React, { ChangeEvent } from 'react';
import "../assets/css/Form.css";

interface FormProps {
    updateGrade: (e: ChangeEvent<HTMLInputElement>) => void;
    updateSubject: (e: ChangeEvent<HTMLInputElement>) => void;
    addGrade: () => void;
    currentGrade: { value: number, error: string };
    currentSubject: { value: string, error: string }
}

const Form = ({ updateGrade, updateSubject, addGrade, currentGrade, currentSubject }: FormProps) => {
    return (
        <div>
            <form>
                <div className="inputContainer">

                </div>
                <div className="inputContainer">

                </div>
                <button type="submit" onClick={addGrade}>
                    Add
                </button>
            </form>
            {
                currentGrade.error ?
                    <div id="error">
                        <span>currentGrade.error</span>
                    </div>
                    : currentSubject.error ?
                        <div id="error">
                            <span>currentSubject.error</span>
                        </div>
                        : ""
            }
        </div>
    )
}

export default Form;
