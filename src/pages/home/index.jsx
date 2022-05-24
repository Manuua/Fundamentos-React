import React, {useState, useEffect} from 'react'// hook liga estados a partir de componentes
import'./styles.css';

import {Card}  from '../../components/Card ';

export function Home() {
 const [studentName,setStudantName]=useState();//estado
 const[students,setStudents]= useState([]);
 const [user,setUser]= useState({name:'', avatar:'',company:''});

//usamos uma função para altualizar o conteudo do estado não fazemos isso diretamente
  
  function handleAddStudent(){
      const newStudent = {
        name:studentName,//nome do estado
        time:new Date().toLocaleTimeString("pt-br", {
          hour:'2-digit',
          minute:'2-digit',
          second:'2-digit',
        })
      }
      setStudents(estadoAnterior=> [...estadoAnterior,newStudent]);
      //['manoela']
      //[manoela, araujo]
  }
 
  useEffect(() => {
   //corpo do useEffect
  fetch('https://api.github.com/users/Manuua')
  .then (response => response.json())
  .then(data => {
    setUser({
      name:data.name,
      avatar:data.avatar_url,
      })

  })
  }, []);// toda vez que algum componente desse array mudar o use effect é chamado
 
return (
  <div className="container">
  <header> 
    <h1> Lista de Presença</h1>
    <div>
      <strong>{user.name}</strong>
      <img src={user.avatar} alt="Foto de Perfil " />
    </div>
  </header>
    <input
     type="text" 
     placeholder="Digite o Nome "
     onChange={e => setStudantName(e.target.value)}
    />

    <button type="button" onClick={handleAddStudent}> 
     Adicionar 
    </button>

  { 
   students.map(student => (
   <Card 
   key={student.time}//chave unica pq n tem como adicionar 2 nomes at the same time
   name={student.name} 
   time={student.time}
   />
   ))
  }
    
  
  </div>
  )
}


