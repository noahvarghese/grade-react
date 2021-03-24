/*
 * StAuth10065: I Noah Varghese, 000753196 certify that this material is my original work.
 * No other person’s work has been used without due acknowledgement. 
 * I have not made my work available to anyone else.
*/

import React, { ChangeEvent, FormEvent, useState } from "react";
import Nav from "./components/Nav";
import Form from "./components/Form";
import "./assets/css/App.css";
import Stats from "./components/Stats";
import Grades from "./components/Grades";

interface StateProps {
    currentGrade: {
        value: number | undefined;
        error: string;
    };
    currentSubject: {
        value: string | undefined;
        error: string;
    };
    grades: { grade: number; subject: string }[];
    stats: {
        max: number;
        min: number;
        avg: number;
    };
    index: number | undefined;
}

const App = () => {
    const [state, setState] = useState<StateProps>({
        index: undefined,
        currentGrade: { value: undefined, error: "" },
        currentSubject: { value: undefined, error: "" },
        grades: [],
        stats: {
            max: 0,
            min: 0,
            avg: 0,
        },
    });

    const computeStats = (grades: { grade: number; subject: string }[]) => {
        const numberGrades = grades.map((grade) => grade.grade);
        let avg = 0,
            min = Infinity,
            max = 0;

        let total = 0;
        for (const grade of numberGrades) {
            total += Number(grade);

            if (Number(grade) < min) {
                min = Number(grade);
            }

            if (Number(grade) > max) {
                max = Number(grade);
            }
        }

        avg = total / numberGrades.length;

        return {
            min: min === Infinity ? 0 : min,
            max,
            avg,
        };
    };

    const addGrade = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (
            state.currentGrade.error === "" &&
            state.currentSubject.error === "" &&
            state.currentGrade.value !== undefined &&
            state.currentSubject.value !== undefined
        ) {
            e.currentTarget.reset();
            const grades = state.grades;
            const newGrade = {
                grade: state.currentGrade.value,
                subject: state.currentSubject.value,
            };

            if (state.index) {
                grades[state.index - 1] = newGrade as {
                    grade: number;
                    subject: string;
                };
            } else {
                grades.push(newGrade as { grade: number; subject: string });
            }

            const stats = computeStats(grades);

            setState({
                currentGrade: { value: undefined, error: "" },
                currentSubject: { value: undefined, error: "" },
                index: undefined,
                grades,
                stats,
            });
        } else {
            if (state.currentSubject.value === undefined) {
                setState({
                    ...state,
                    currentSubject: {
                        ...state.currentSubject,
                        error: "Subject cannot be empty",
                    },
                });
            } else if (state.currentGrade.value === undefined) {
                setState({
                    ...state,
                    currentGrade: {
                        ...state.currentGrade,
                        error: "Grade cannot be empty",
                    },
                });
            }
        }
    };

    const setGrade = (e: ChangeEvent<HTMLInputElement>) => {
        let newValue;

        try {
            newValue = Number(e.currentTarget.value);
        } catch (_) {
            newValue = state.currentGrade.value;
        }

        if (newValue !== state.currentGrade.value) {
            let error: string = "";

            if (Number(newValue) < 0) {
                error = "Grade must be greater than 0";
            } else if (Number(newValue) > 100) {
                error = "Grade must be less than 100";
            } else if (!Number.isInteger(newValue)) {
                error = "Grade must be an integer";
            }

            setState({ ...state, currentGrade: { value: newValue, error } });
        }
    };

    const setSubject = (e: ChangeEvent<HTMLInputElement>) => {
        let newValue = e.currentTarget.value;
        if (newValue !== state.currentSubject.value) {
            let error = "";

            if (newValue.trim() === "") {
                error = "Subject cannot be blank";
            }

            setState({ ...state, currentSubject: { value: newValue, error } });
        }
    };

    const editItem = (index: number) => {
        const current = state.grades[index - 1];
        setState({
            ...state,
            index: Number(index),
            currentGrade: {
                value: current.grade,
                error: ""
            },
            currentSubject: {
                value: current.subject,
                error: ""
            }
        });
    } 

    const deleteItem = (index: number) => {
        let tmpGrades = state.grades;
        tmpGrades = tmpGrades.slice(0, index - 1).concat(tmpGrades.slice(index, tmpGrades.length));
        const stats = tmpGrades.length > 0 ? computeStats(tmpGrades) : { min: 0, max: 0, avg: 0};
        setState({...state, grades: tmpGrades, stats});
    }

    return (
        <div className="App">
            <Nav />
            <div id="contents">
                <div className="left">
                    <Form
                        setGrade={setGrade}
                        setSubject={setSubject}
                        currentGrade={state.currentGrade}
                        currentSubject={state.currentSubject}
                        addGrade={addGrade}
                        index={state.index}
                    />
                    <Stats {...state.stats}/>
                </div>
                <Grades grades={state.grades} deleteItem={deleteItem} editItem={editItem} />
            </div>
        </div>
    );
};

export default App;
