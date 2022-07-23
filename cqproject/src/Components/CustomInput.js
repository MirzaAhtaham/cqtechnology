import React from 'react'

function CustomInput({title, inputTitle, firstValue, secondValue, firstplaceholder, secondplaceholder,  firstOnChange, secondOnChange }) {
  return (
    <>
    <div className="homeStudentTitle">
        <h2>{title}</h2>
      </div>

      <div className="input-group">
        <span className="input-group-text">{inputTitle}</span>
        <input
          type="text"
          value={firstValue}
          placeholder={firstplaceholder}
          className="form-control"
          onChange={firstOnChange}
        />
        <input
          type="text"
          value={secondValue}
          placeholder={secondplaceholder}
          className="form-control"
          onChange={secondOnChange}
        />
      </div>
      
      </>
  )
}

export default CustomInput