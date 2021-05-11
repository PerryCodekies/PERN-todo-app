import React, { Fragment, useEffect, useState } from "react";

import EditTodo from "./EditTodo";
const ListTodos = () => {
    const [todos, setTodos] = useState([]);
    // Delete todo functionality
    const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            });
            
            setTodos(todos.filter(todo => todo.todo_id !== id)); // filter out the deleted ID
        } catch (err) {
            console.error(err.message);
        }
    };

    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json(); //parse JSON data

            setTodos(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getTodos();
    },[]);

    console.log(todos);

    return (<Fragment>
        <table class="table mt-5 text-center">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {/* <tr>
                    <td>John</td>
                    <td>Doe</td>
                    <td>john@example.com</td>
                </tr>
                */}
                {todos.map(todo => (
                    <tr key={todo.todo_id}>
                        <td>{todo.description}</td>
                        <td><EditTodo todo={todo}/></td>
                        <td><btn className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</btn></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </Fragment>);
};

export default ListTodos