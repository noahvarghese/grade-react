/*
 * StAuth10065: I Noah Varghese, 000753196 certify that this material is my original work.
 * No other person’s work has been used without due acknowledgement. 
 * I have not made my work available to anyone else.
*/

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
    index: number | undefined;
}

const Form = ({ setGrade, setSubject, addGrade, currentGrade, currentSubject, index }: FormProps) => {

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
                    <input type="text" id="subject" name="subject" onChange={setSubject} placeholder=" " value={currentSubject.value ?? ""} />
                    <label htmlFor="subject"><span>Subject</span></label>
                </div>
                <div className={classNames("inputContainer", "card", { error: currentGrade.error})}>
                    <input type="number" id="grade" name="grade" onChange={setGrade} min="0" max="100" placeholder=" " value={currentGrade.value ?? ""}  />
                    <label htmlFor="grade"><span>Grade</span></label>
                </div>
                <button type="submit">
                    {Number(index) ? "Update" : "Add"}
                </button>
            </form>
            {error}
        </div>
    )
}

export default Form;
