const { useState, useEffect } = React;

const classNames = {
    TODO_ITEM: "todo-container",
    TODO_CHECKBOX: "todo-checkbox",
    TODO_TEXT: "todo-text",
    TODO_DELETE: "todo-delete",
}

function TodoItem({todo, onDeleteTodo, onCheckboxValueChange}) {
    return (
        <li className={classNames.TODO_ITEM}>
            <input onClick={() => {onCheckboxValueChange(todo.id)}}
                   className={classNames.TODO_CHECKBOX}
                   type="checkbox"
                   defaultChecked={todo?.checked || undefined}
            />

            <label className={classNames.TODO_TEXT}>
                <span>{todo.name}</span>
            </label>

            <button
                className={classNames.TODO_DELETE}
                onClick={() => {onDeleteTodo(todo.id)}}>delete</button>
        </li>
    )
}

function App() {
    // get array from local storage as initial value if exist
    const [todosArray, setTodosArray] = useState(JSON.parse(localStorage.getItem('todosArray') || "[]"));

    // add new todo
    function addTodo() {
        const name = prompt('Enter task to do');
        const todo = { id: Date.now(), name, checked: false };
        setTodosArray([...todosArray, todo]);
    }

    // toggle todos checkbox
    function toggleTodo(id) {
        setTodosArray(todosArray.map(todo => todo.id === id ? {...todo, checked: !todo.checked} : todo));
        localStorage.setItem('todosArray', JSON.stringify(todosArray));
    }

    // update local storage array
    useEffect(() => {
        localStorage.setItem('todosArray', JSON.stringify(todosArray))
    }, [todosArray])

    // delete todo by id
    function deleteTodo(id) {
        setTodosArray(todosArray.filter(todo => todo.id !== Number(id)));
    }
    return (
        <div className="container center">
            <h1 className="center title">My TODO App</h1>

            <div className="flow-right controls">
                <span>Item count: <span id="todo-count">{todosArray.length}</span></span>
                <span>Unchecked count:
                    <span id="unchecked-count">
                        {todosArray.filter((item) => !item?.checked).length}
                    </span>
                </span>
            </div>

            <button className="button center" onClick={addTodo}>New TODO</button>
            <ul id="todo-list" className="todo-list">
                {todosArray.map(item => <TodoItem key={item.id} todo={item} onCheckboxValueChange={toggleTodo} onDeleteTodo={deleteTodo}/>)}
            </ul>
        </div>
    );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);