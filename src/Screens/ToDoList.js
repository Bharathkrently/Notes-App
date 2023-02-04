// import React, {useState} from 'react';
// import {View, Text, FlatList, TouchableOpacity, TextInput} from 'react-native';
// import {useSelector, useDispatch} from 'react-redux';
// import {addTodo, updateTodo, deleteTodo} from '../store/actions';

// const ToDoList = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [newTodo, setNewTodo] = useState('');
//   const [selectedTodo, setSelectedTodo] = useState(null);

//   const todos = useSelector(state => state.todos);
//   const dispatch = useDispatch();

//   const handleAddTodo = () => {
//     dispatch(addTodo({id: Math.random().toString(), text: newTodo}));
//     setNewTodo('');
//   };

//   const handleUpdateTodo = () => {
//     dispatch(updateTodo({...selectedTodo, text: newTodo}));
//     setIsEditing(false);
//     setNewTodo('');
//     setSelectedTodo(null);
//   };

//   const handleDeleteTodo = () => {
//     dispatch(deleteTodo(selectedTodo.id));
//     setIsEditing(false);
//     setNewTodo('');
//     setSelectedTodo(null);
//   };

//   const renderItem = ({item}) => (
//     <View>
//       <Text>{item.text}</Text>
//       <TouchableOpacity onPress={() => setSelectedTodo(item)}>
//         <Text>Edit</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => dispatch(deleteTodo(item.id))}>
//         <Text>Delete</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View>
//       {isEditing ? (
//         <View>
//           <TextInput value={newTodo} onChangeText={text => setNewTodo(text)} />
//           <TouchableOpacity onPress={handleUpdateTodo}>
//             <Text>Save</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={handleDeleteTodo}>
//             <Text>Delete</Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <View>
//           <Text>To Do List</Text>
//           <TouchableOpacity onPress={() => setIsEditing(true)}>
//             <Text>+</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//       {!isEditing && (
//         <FlatList
//           data={todos}
//           renderItem={renderItem}
//           keyExtractor={item => item.id}
//           extraData={selectedTodo}
//         />
//       )}
//     </View>
//   );
// };

// export default ToDoList;

import React, {useState} from 'react';
import {
  View,
  Text,
  Alert,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import CustomButton from '../Components/CustomButton';

const ToDoApp = () => {
  const [todoList, setTodoList] = useState([]);
  const [showAddView, setShowAddView] = useState(false);
  const [showEditView, setShowEditView] = useState(false);
  const [todoItem, setTodoItem] = useState({});

  const addTodo = text => {
    if (!text) {
      Alert.alert(
        'Invalid action',
        'Empty Note cannot be saved. Add a note to save.',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      );
      return;
    }
    setTodoList([...todoList, {key: Math.random().toString(), text}]);
    setShowAddView(false);
  };

  const deleteTodo = key => {
    setTodoList(todoList.filter(todo => todo.key !== key));
    setShowEditView(false);
  };

  const editTodo = text => {
    if (!text) {
      Alert.alert(
        'Invalid action',
        'Empty Note cannot be saved. Add a note to save.',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      );
      return;
    }
    setTodoList(
      todoList.map(todo => {
        if (todo.key === todoItem.key) {
          todo.text = text;
        }
        return todo;
      }),
    );
    setShowEditView(false);
  };

  return (
    <View style={styles.container}>
      {showAddView ? (
        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setTodoItem({text})}
            value={todoItem.text}
          />
          <CustomButton
            title="Save"
            onPress={() => addTodo(todoItem.text)}
            btnStyles={{marginTop: 20}}
          />
          <CustomButton
            title="Back"
            onPress={() => setShowAddView(false)}
            btnStyles={{marginTop: 10}}
          />
        </View>
      ) : showEditView ? (
        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setTodoItem({...todoItem, text})}
            value={todoItem.text}
          />
          <CustomButton
            title="Save"
            onPress={() => editTodo(todoItem.text)}
            btnStyles={{marginTop: 20}}
          />
          <CustomButton
            title="Delete"
            onPress={() => deleteTodo(todoItem.key)}
            btnStyles={{marginTop: 10}}
          />
          <CustomButton
            title="Back"
            onPress={() => setShowEditView(false)}
            btnStyles={{marginTop: 10}}
          />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <Text style={styles.titleText}>To-Do List</Text>
          <FlatList
            data={todoList}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={[
                  styles.list,
                  {alignSelf: index % 2 === 0 ? 'flex-start' : 'flex-end'},
                ]}
                onPress={() => {
                  setTodoItem(item);
                  setShowEditView(true);
                }}>
                <Text style={{fontSize: 18}}>
                  {item.text.length > 40
                    ? item.text.substring(0, 40) + '...'
                    : item.text}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
            numColumns={2}
          />
          <CustomButton
            title="Add a note"
            onPress={() => {
              setShowAddView(true);
              setTodoItem({});
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titleText: {
    fontSize: 25,
    marginBottom: 20,
  },
  list: {
    width: '50%',
    height: 150,
    width: 150,
    margin: 10,
    backgroundColor: 'lightblue',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});

export default ToDoApp;
