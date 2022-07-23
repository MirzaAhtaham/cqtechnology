import React from 'react'

function CustomBtn({firstBtnTitle, secondBtnTitle, firstOnClick, secondOnClick,}) {
  return (
    <>
    <button type="button" class="btn btn-primary mx-5 my-3" onClick={firstOnClick}>
        {firstBtnTitle}
      </button>
      <button type="button" class="btn btn-primary mx-3 my-3" onClick={secondOnClick}>
        {secondBtnTitle}
      </button>
    </>
  )
}

export default CustomBtn