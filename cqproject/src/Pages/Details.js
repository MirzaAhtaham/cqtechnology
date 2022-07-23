import React, { useState, useEffect } from "react";
import "../App.css";
import CustomInput from "../Components/CustomInput";
import CustomBtn from "../Components/CustomBtn";
import DropInput from "../Components/DropInput";
import DatePicker from "react-date-picker";
import axios from "axios";

import StdData from "../Components/studentData.json";
import BD from "../Components/BookData.json";

function Details() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [bookerror, setBookError] = useState(null);
  const [isBookLoaded, setIsBookLoaded] = useState(false);
  const [bookitems, setBookItems] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:5000/student")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );

    fetch("http://127.0.0.1:5000/book")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsBookLoaded(true);
          setBookItems(result.filter(item => item.bid == null));
        },

        (error) => {
          setIsBookLoaded(true);
          setBookError(error);
        }
      );
  }, []);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstBook, setFirstBook] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bkName, setBkName] = useState("");
  const [stName, setStName] = useState("");
  const [value, onChange] = useState(new Date());
  const [value2, onChange2] = useState(new Date());
  const [stId, setstId] = useState("");
  const [bookId, setbookId] = useState("");

  const onFirstName = (a) => {
    setFirstName(a.target.value);
  };
  const onLastName = (a) => {
    setLastName(a.target.value);
  };
  const onFirstBook = (a) => {
    setFirstBook(a.target.value);
  };
  const onBookAuthor = (a) => {
    setBookAuthor(a.target.value);
  };

  const onAddStudent = () => {
    var data = JSON.stringify({
      firstname: firstName,
      lastname: lastName,
    });

    var config = {
      method: "post",
      url: "http://127.0.0.1:5000/student/add",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const onRemoveStudent = () => {};
  const onAddBook = () => {
    var data = JSON.stringify({
      bookname: firstBook,
      author: bookAuthor,
    });

    var config = {
      method: "post",
      url: "http://127.0.0.1:5000/book/add",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const onRemoveBook = () => {};
  const onSubmit = () => {
    var data = JSON.stringify({
      "studentid": stId,
      "bookid": bookId,
      "borrowdate": value,
      "returndate": value2
    });
    
    var config = {
      method: 'post',
      url: 'http://localhost:5000/book/borrow',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
    
  };
  const onReturn = () => {};

  return (
    <>
      <CustomInput
        title={"Students"}
        inputTitle={"First and last name"}
        firstValue={firstName}
        secondValue={lastName}
        firstplaceholder={"Firstname"}
        secondplaceholder={"Lastname"}
        firstOnChange={onFirstName}
        secondOnChange={onLastName}
      />
      <CustomBtn
        firstBtnTitle={"Add Student"}
        secondBtnTitle={"Remove Student"}
        firstOnClick={onAddStudent}
        secondOnClick={onRemoveStudent}
      />

      <CustomInput
        title={"Book"}
        inputTitle={"Book Name and Author name"}
        firstValue={firstBook}
        secondValue={bookAuthor}
        firstplaceholder={"Book Name"}
        secondplaceholder={"Author Name"}
        firstOnChange={onFirstBook}
        secondOnChange={onBookAuthor}
      />
      <CustomBtn
        firstBtnTitle={"Add Book"}
        secondBtnTitle={"Remove Book"}
        firstOnClick={onAddBook}
        secondOnClick={onRemoveBook}
      />

      <div className="homeStudentTitle">
        <h2>Borrow Book</h2>
      </div>
      <DropInput
        disabled
        btnTitle={"Books"}
        data={bookitems.map((b) => {
          return (
            <li>
              <p
                className="liStyle"
                onClick={() => {
                  setBkName(b.bookname);
                  setbookId(b.id)
                }}
              >
                {b.bookname}
              </p>
            </li>
          );
        })}
        value={bkName}
        dropDown={"dropdown"}
        btnClass="btn btn-outline-secondary dropdown-toggle"
      />

      <DropInput
        disabled
        dropDown={"dropdown"}
        btnTitle={"Students"}
        data={items.map((s) => {
          return (
            <li>
              <p
                className="liStyle"
                onClick={() => {
                  setstId(s.id)
                  setStName(s.firstname);
                }}
              >
                {s.firstname}s
              </p>
            </li>
          );
        })}
        value={stName}
        btnClass="btn btn-outline-secondary dropdown-toggle"
      />
      <div className="dateContainer">
        <div className="dateStyle">
          <h4>Issue Date</h4>
          <DatePicker onChange={onChange} value={value} />
        </div>

        <div className="dateStyle">
          <h4>Return Date</h4>
          <DatePicker onChange={onChange2} value={value2} />
        </div>
      </div>
      <CustomBtn
        firstBtnTitle={"Submit"}
        secondBtnTitle={"Returned"}
        firstOnClick={onSubmit}
        secondOnClick={onReturn}
      />
    </>
  );
}

export default Details;
