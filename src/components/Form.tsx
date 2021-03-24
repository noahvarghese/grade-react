import React, { ChangeEvent, FormEvent } from 'react';
import classNames from "classnames";
import Attention from "../assets/img/Attention.png";
import "../assets/css/Form.css";
import "../assets/css/Card.css";

interface FormProps {
    setGrade: (e: ChangeEvent<HTMLInputElement>) => void;
    setSubject: (e: ChangeEvent<HTMLInputElement>) => void;
    addGrade: (e: FormEvent<HTMLFormElement>) => void;
    currentGrade: { value: number | undefined, error: string };
    currentSubject: { value: string | undefined, error: string };
}

const Form = ({ setGrade, setSubject, addGrade, currentGrade, currentSubject }: FormProps) => {

    let error;

    if ( currentGrade.error )  {
        error = <div id="error"><span><img src={Attention} alt="Attention" /></span><span>{currentGrade.error}</span></div>;
    }
    else if ( currentSubject.error ) {
        error = <div id="error"><span><img src={Attention} alt="Attention" /></span><span>{currentSubject.error}</span></div>;
    }
    else {
        error = "";
    }


    return (
        <div className="form">
            <form onSubmit={addGrade}>
                <div className={classNames("inputContainer", "card", { error: currentSubject.error})}>
                    <input type="text" id="subject" name="subject" onChange={setSubject} placeholder=" " />
                    <label htmlFor="subject"><span>Subject</span></label>
                </div>
                <div className={classNames("inputContainer", "card", { error: currentGrade.error})}>
                    <input type="number" id="grade" name="grade" onChange={setGrade} min="0" max="100" placeholder=" "  />
                    <label htmlFor="grade"><span>Grade</span></label>
                </div>
                <button type="submit">
                    Add
                </button>
            </form>
            {error}
        </div>
    )
}

export default Form;
