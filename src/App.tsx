import { ChangeEvent, useState } from "react";
import Nav from "./components/Nav";
import Form from "./components/Form";
import "./assets/css/App.css";

interface StateProps {
    index: number | undefined;
    currentGrade: {
        value: number;
        error: string;
    };
    currentSubject: {
        value: string;
        error: string;
    };
    grades: { grade: number, subject: string }[];
    stats: {
        max: number;
        min: number;
        avg: number;
    }
}

const App = () => {
    const [state, setState] = useState<StateProps>({
        index: undefined,
        currentGrade: { value: -1, error: "" },
        currentSubject: { value: "", error: "" },
        grades: [],
        stats: {
            max: 0,
            min: 0,
            avg: 0,
        }
    });

    const computeStats = (grades: { grade: number; subject: string }[]) => {
        const numberGrades = grades.map((grade) => grade.grade);
        let avg = 0, min = Infinity, max = 0;

        let total = 0;
        for (const grade in numberGrades) {
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
            avg
        }

    }

    const editGrade = () => {

    }

    const addGrade = () => {
        if (state.currentGrade.error === "" && state.currentSubject.error === "") {
            const grades = state.grades;
            const newGrade = { grade: state.currentGrade.value, subject: state.currentSubject.value };

            if (state.index) {
                grades[state.index] = newGrade;
            }
            else {
                grades.push(newGrade);
            }

            const stats = computeStats(grades);

            setState({ currentGrade: { value: -1, error: "" }, currentSubject: { value: "", error: "" }, index: undefined, grades, stats });
        }
    }

    const updateGrade = (e: ChangeEvent<HTMLInputElement>) => {
        let newValue;

        try {
            newValue = Number(e.currentTarget.value);
        } catch (_) {
            newValue = state.currentGrade.value;
        }

        if (newValue !== state.currentGrade.value) {

            let error: string = "";

            if (Number.isInteger(newValue)) {
                error = "Grade must be an integer";
            } else {
                if (newValue < 0) {
                    error = "Grade must be greater than 0";
                }
                else if (newValue > 100) {
                    error = "Grade must be less than 100";
                }
            }

            setState({ ...state, currentGrade: { value: newValue, error } });
        }
    }

    const updateSubject = (e: ChangeEvent<HTMLInputElement>) => {
        let newValue = e.currentTarget.value;
        if (newValue !== state.currentSubject.value) {
            let error = "";

            if (newValue.trim() === "") {
                error = "Subject cannot be blank";
            }

            setState({ ...state, currentSubject: { value: newValue, error } })
        }
    }

    return (
        <div className="App">
            <Nav />
            <Form updateGrade={updateGrade} updateSubject={updateSubject} currentGrade={state.currentGrade} currentSubject={state.currentSubject} addGrade={addGrade} />
        </div>
    );
}

export default App;
