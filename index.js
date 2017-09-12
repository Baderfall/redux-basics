/* Single todo reducer */

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {id: action.id, text: action.text, completed: false};
    case 'TOGGLE_TODO':
      if(state.id === action.id) {
        return Object.assign({}, state, {completed: !state.completed});
      } else {
        return state;
      }
    default:
      return state;
  }
};

/* Todo arr reducer */

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

/* Visibility filter reducer */

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch(action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

/* Reducers composition */

const todoApp = Redux.combineReducers({ todos, visibilityFilter })

var store = Redux.createStore(todoApp);

let nextTodoId = 0;
class TodoApp extends Component {
  render() {
    return (
      <div>
        <button
          onClick={() => {
            store.dispatch({
              type: 'ADD_TODO'
              id: nextTodoId++,
              text: 'Test text'
            });
          }}
        >
        Add todo
        </button>
        <ul>
          {this.props.todo.map(todo =>
            <li key={todo.id}>
              {{ todo.text | todo.id }}
            </li>
          )}
        </ul>
    )
  }
}

const render = () => {
  ReactDOM.render(
    <TodoApp todos={store.getState().todos} />,
    document.getElementById('root');
  )
}

store.subscribe(render);
render();

/* Tests */

// console.log(store.getState());

// store.dispatch({
//   type: 'ADD_TODO',
//   id: 0,
//   text: 'Learn redux'
// });

// console.log(store.getState());

// store.dispatch({
//   type: 'TOGGLE_TODO',
//   id: 0
// });

// console.log(store.getState());

// store.dispatch({
//   type: 'SET_VISIBILITY_FILTER',
//   filter: 'SHOW_COMPLETED'
// });

// console.log(store.getState());
