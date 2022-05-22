import React from 'react'
import Comment from './Comment'

// component for comments
const Comments = ({ comments, onDeleteComment, commentIDs }) => {

  let arr = [];
  for (var i = 0; i < comments.length; i++) {
    // arr.push(<span className='indent' key={i}></span>);
    arr.push(<Comment key={commentIDs[i]} commentID={commentIDs[i]} comment={comments[i]} onDeleteComment={onDeleteComment} />);
  }



  return (

    <>
    {arr}
    </>
  )
}

export default Comments