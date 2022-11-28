import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


import AddTutorial from "./component/tutorial/add-tutorial.component";
import Tutorial from "./component/tutorial/tutorial.component";
import TutorialsList from "./component/tutorial/tutorials-list.component";
import Todo from "./component/todo/todo-list.component";

class App extends Component {
  render() {
    return (
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
                  <a href="/tutorials" className="navbar-brand">
                    으쌰으쌰
                  </a>
                  <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                      <Link to={"/tutorials"} className="nav-link">
                        Tutorials
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={"/add"} className="nav-link">
                  Add
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/todo"} className="nav-link">
                  Todo
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Routes>
              <Route element={<TutorialsList />} path="/" />
              <Route element={<TutorialsList />} path="/tutorials" />
              <Route element={<AddTutorial />} path="/add" />
              <Route element={<Tutorial />} path="/tutorials/:id"/>
              <Route element={<Todo />} path="/todo" />
            </Routes>
          </div>
        </div>
    );
  }
}

export default App;