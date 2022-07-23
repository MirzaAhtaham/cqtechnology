import React from 'react'

function DropInput({btnTitle, data, value, dropDown, btnClass, disabled, onChange}) {
  return (
    <div className="input-group mb-3">
        <button
          className={btnClass}
          type="button"
          data-bs-toggle={dropDown}
          aria-expanded="false"
        >
          {btnTitle}
        </button>
        <ul className="dropdown-menu">
          {data}
        </ul>
        <input type="text" disabled={disabled} onChange={onChange} className="form-control" value={value} />
      </div>
  )
}

export default DropInput