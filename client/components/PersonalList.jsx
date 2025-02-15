import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PersonalChore from './PersonalChore';
import NothingHere from './NothingHere';

function PersonalList() {
  const [personalData, setPersonalData] = useState([]);
  const [chores, setChores] = useState('');
  const [points, setPoints] = useState(0);
  const [priority, setPriority] = useState(0);

  const getData = async () => {
   try {
    const search = await fetch('/individual')
    .then(res => res.json())
    .then((data) => {
      setPersonalData(data);
    })
   } 
   catch {
    setPersonalData([]);
   }
  }
  
  useEffect(() => {
    getData();
   }, []);


  const handleDelete = (id, e) => {
    fetch(`/individual/1`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((res) => {
        if (res){
          getData();
        }
      })
        .catch((err) => console.log(err));
  };


  if (personalData.length > 0){
  return (
    <div className= 'personalList'>
      <h1>Personal Chores List</h1>
      <Link to="/tasks">
        <button className="nothinghere">Add More Tasks</button>
      </Link>
      {
      personalData.map((task, i) => (
        <PersonalChore
          personalData={task}
          id = {task.id}
          chores={task.chorename} 
          points={task.points} 
          priority={task.priority} 
          key={i}
          handleDelete={handleDelete}
          setPersonalData={setPersonalData}
        />
      ))}
      
    </div>
      
  )}
  else {
     return (
       <div>
       <h1>Personal Chores List</h1>
       <NothingHere/>
       <div className='cloud'></div>
       </div>
     )
  }
}

export default PersonalList;
