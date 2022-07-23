import React, {useEffect, useState} from 'react'
import '../App.css'
import axios from 'axios';

import Std from '../Components/studentData.json';
import BD from '../Components/BookData.json';

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [bookerror, setBookError] = useState(null);
  const [isBookLoaded, setIsBookLoaded] = useState(false);
  const [bookitems, setBookItems] = useState([]);
  useEffect(() => {
    
    fetch("http://127.0.0.1:5000/student")
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        setItems(result);
      },

      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )


    fetch("http://127.0.0.1:5000/book")
    .then(res => res.json())
    .then(
      (result) => {
        setIsBookLoaded(true);
        setBookItems(result);
      },
     
      (error) => {
        setIsBookLoaded(true);
        setBookError(error);
      }
    )

  }, [])

  
  return (
  <>
    <div className='homeStudentTitle' ><h2>Students</h2></div>
    <table className="table table-bordered">
    <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
      
    </tr>
  </thead>
  <tbody>
    
    {
        items.map((a, index)=>{
            return (
            <tr>
            <th scope="row">{index+1}</th>
            <td>{a.firstname}</td>
            <td>{a.lastname}</td>
          </tr>
          )
        })
    }
    
  </tbody>
</table>
<div className='homeStudentTitle' ><h2>Books</h2></div>
<table className="table table-bordered">
    <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Book Name</th>
      <th scope="col">Author</th>
      <th scope="col">Borrowed By</th>
      <th scope="col">Issue Date</th>
      <th scope="col">Return Date</th>
      
    </tr>
  </thead>
  <tbody>
    
    {
        bookitems.map((a, index)=>{
            return (
            <tr>
            <th scope="row">{index+1}</th>
            <td>{a.bookname}</td>
            <td>{a.author}</td>
            <td>{a.firstname }</td>
            <td>{a.borrowdate}</td>
            <td>{a.returndate}</td>
          </tr>
          )
        })
    }
    
  </tbody>
</table>
</>
  )
}

export default Home