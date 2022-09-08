import React from 'react'

 const Modal = (props) => {
  return (
    <div className='modalctnr'>
      <div className='modalchildren'>
        <div className='closebtn' onClick={props.onClose}> X</div>
        {props.children}
        <div className='closebtn'>
        <button onClick={props.onSubmit}>Add</button>
        </div>
        </div>
    </div>
  )
}
export default Modal;