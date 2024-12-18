import {useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App () {
  const [ todoList, setToDoList ] = useState( [] );
  const [ newItemName, setNewItemName ] = useState (  );

  useEffect( ()=>{
    fetchToDoList();
  }, [] );
  
  function fetchToDoList() {
    console.log( 'in fecthToDoList');
    axios.get( '/api/todo' ).then( function( response ) {
      setToDoList( response.data );
    }).catch( function( err ) {
      alert( 'error getting todo list' );
    })
  }

  function addItem(){
    const objectToSend = {
      name: newItemName
    }
    console.log( 'sending:', objectToSend );
    axios.post( '/api/todo', objectToSend ).then( function( response ){
      console.log( 'back from POST:', response.data );
      fetchToDoList();
    }).catch( function ( err ){
      console.log( err );
      alert( 'error adding item' );
    })
  }

  function toggleMe( id ){
    console.log( 'in toggleMe:', id );
    const objectToSend = {
      id: id
    }
    axios.put( '/api/todo', objectToSend ).then( function( response ){
      console.log( 'back from PUT:', response.data );
      fetchToDoList();
    }).catch( function ( err ){
      console.log( err );
      alert( 'error updating todo item' );
    });
  }

  function deleteMe( id ){
    console.log( 'in deleteMe:', id );
    axios.delete( `/api/todo?id=${ id }` ).then( function ( response ){
      console.log( 'back from Delete:', response.data );
      fetchToDoList();
    }).catch( function( err ){
      console.log( err );
      alert( 'error deleting item' );
    })
  }

  return (
    <div className="tableApp">
      <h1>TO DO APP</h1>
        <h2>Current List:</h2>
          <table>
                  <tr>
                    <th>To-Do</th>
                    <th>Complete</th>
                    <th>Delete</th>
                  </tr>
            {
              todoList.map( ( item )=> (
                      <tr>
                        <td><p className={ `complete-${ item.complete }` }>{ item.name }</p></td>
                          <td><button onClick={ ()=>{ toggleMe( item.id ) }}>Complete</button></td>
                          <td><button onClick={ ()=>{ deleteMe( item.id ) }}>Delete</button></td>
                      </tr>
              ))
            }
          </table>
        <h2>Create New:</h2>
      <input type='text' placeholder='name' onChange={ (e)=>{ setNewItemName( e.target.value ) }}/>
      <button onClick={addItem}>Add Item</button>
      <p>{JSON.stringify( newItemName )}</p>
    </div>
  );

}

export default App
