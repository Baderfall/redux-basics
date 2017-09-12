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
      };
    default:
      return state;
  }
};

/* Todos arr reducer */

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

var store = Redux.createStore(todos);

/* Tests */

console.log(store.getState());

store.dispatch({
  type: 'ADD_TODO',
  id: 0,
  text: 'Learn redux'
});

console.log(store.getState());

store.dispatch({
  type: 'TOGGLE_TODO',
  id: 0
});

console.log(store.getState());
