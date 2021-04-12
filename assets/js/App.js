const App = () => {
    const [state, setState] = React.useState({
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

    const computeStats = (grades) => {
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

    const addGrade = (e) => {
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
                grades[state.index - 1] = newGrade;
            } else {
                grades.push(newGrade);
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

    const setGrade = (e) => {
        let newValue;

        try {
            newValue = Number(e.currentTarget.value);
        } catch (_) {
            newValue = state.currentGrade.value;
        }

        if (newValue !== state.currentGrade.value) {
            let error = "";

            if (Number(newValue) < 0) {
                error = "Grade must be greater than 0";
            } else if (Number(newValue) > 100) {
                error = "Grade must be less than 100";
            } else if (!Number.isInteger(newValue)) {
                error = "Grade must be an integer";
            }

            setState({
                ...state,
                currentGrade: { value: newValue, error },
            });
        }
    };

    const setSubject = (e) => {
        let newValue = e.currentTarget.value;
        if (newValue !== state.currentSubject.value) {
            let error = "";

            if (newValue.trim() === "") {
                error = "Subject cannot be blank";
            }

            setState({
                ...state,
                currentSubject: { value: newValue, error },
            });
        }
    };

    const editItem = (index) => {
        const current = state.grades[index - 1];
        setState({
            ...state,
            index: Number(index),
            currentGrade: {
                value: current.grade,
                error: "",
            },
            currentSubject: {
                value: current.subject,
                error: "",
            },
        });
    };

    const deleteItem = (index) => {
        let tmpGrades = state.grades;
        tmpGrades = tmpGrades
            .slice(0, index - 1)
            .concat(tmpGrades.slice(index, tmpGrades.length));
        const stats =
            tmpGrades.length > 0
                ? computeStats(tmpGrades)
                : { min: 0, max: 0, avg: 0 };
        setState({ ...state, grades: tmpGrades, stats });
    };

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
                    <Stats {...state.stats} />
                </div>
                <Grades
                    grades={state.grades}
                    deleteItem={deleteItem}
                    editItem={editItem}
                />
            </div>
        </div>
    );
};
