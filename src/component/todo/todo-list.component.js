import React, { Component } from "react";
import TodoService from "../../service/todo.service";
import { withRouter } from '../../common/with-router';
import TodoListTemplate from "./TodoListTemplate";
import Form from "./Form";
import TodoItemList from "./TodoItemList";

class Todo extends Component{
  constructor(props){
    super(props);
    this.state = {
      todos : []
    }
    this.handleCreate = this.handleCreate.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleInitInfo = this.handleInitInfo.bind(this);
  }


  componentDidMount() {
    this.handleInitInfo()
  }


  handleInitInfo() {
    TodoService.getAll()
    .then(response => {
      this.setState({
        todos: response.data
      });
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  }


  handleCreate(inputValue) {
    const { todos } = this.state;
    if (inputValue === "") {
      alert("오늘 할 일을 입력해주세요!");
      return;
    }

    // 화면에서 먼저 변경사항을 보여주는 방법으로 이용
    this.setState({
      // input: "",
      // concat 을 사용하여 배열에 추가
      todos: todos.concat({
        id: 0,    // 임의의 id를 부여하여 key error 를 방지
        content: inputValue,
        isComplete: false
      })
    });

    // 처리
    const data = {
      body: JSON.stringify({"content" : inputValue}),
      headers: {'Content-Type': 'application/json'},
      method: 'post'
    }
    fetch("/api/todos", data)
    .then(res => {
      if(!res.ok) {
        throw new Error(res.status);
      } else {
        return this.handleInitInfo();
      }
    })
    .catch(err => console.log(err));
  }



  // 수정
  handleToggle(id) {
    const { todos } = this.state;

    const isComplete = todos.find(todo => todo.id === id).isComplete;
    if(!window.confirm(isComplete ? "미완료 처리 하시겠습니까?" : "완료 처리 하시겠습니까?")) {
      return;
    }

    // 파라미터로 받은 id 를 가지고 몇 번째 아이템인지 찾는다.
    const index = todos.findIndex(todo => todo.id === id);

    // 선택한 객체를 저장한다.
    const selected = todos[index];

    // 배열을 복사한다.
    const nextTodos = [...todos];

    // 기존의 값을 복사하고 isComplete 값을 덮어쓴다.
    nextTodos[index] = {
      ...selected,
      isComplete : !selected.isComplete
    };

    this.setState({
      todos : nextTodos
    });

    console.log(todos[index]);

    TodoService.update(id, nextTodos[index])
    .then(res => {
      if(!res.ok) {
        throw new Error(res.status);
      } else {
        return this.handleInitInfo();
      }
    })
    .catch(err => console.log(err));
  }


  // 삭제
  handleRemove(id) {
    const { todos } = this.state;

    const removeContent = todos.find(todo => todo.id === id).content;
    if(!window.confirm("'" + removeContent + "' 을 삭제하시겠습니까?")) {
      return;
    }

    this.setState({
      todos : todos.filter(todo => todo.id !== id)
    });

    const data = {
      headers: {'Content-Type':'application/json'},
      method: 'delete'
    }
    fetch("/api/todos/" + id, data)
    .then(res => {
      if(!res.ok) {
        throw new Error(res.status);
      } else {
        return this.handleInitInfo();
      }
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
        <TodoListTemplate form={(
            <Form
                // *** Form.js 에서 Hook(useState) 사용으로 인해 제거
                // value={this.state.input}
                // onChange={this.handleChange}
                // onCreate={this.handleCreate}
                // onKeyPress={this.handleKeyPress}
                onCreate={this.handleCreate}
            />
        )}>
          <TodoItemList
              todos={this.state.todos}
              onToggle={this.handleToggle}
              onRemove={this.handleRemove} />
        </TodoListTemplate>
    );
  }


}

export default Todo;