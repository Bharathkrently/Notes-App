import React from 'react';

import {combineReducers, legacy_createStore as createStore} from 'redux';
import {Provider} from 'react-redux';
import todoReducer from './src/store/reducer';
import ToDoApp from './src/Screens/ToDoList';

const rootReducer = combineReducers({
  data: todoReducer,
});

const store = createStore(rootReducer);

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <ToDoApp />
    </Provider>
  );
};

export default App;
