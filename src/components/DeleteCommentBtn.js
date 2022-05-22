import React from 'react'

//comment delete button component
const DeleteCommentBtn = ({onDeleteComment, commentId}) => {
  return (
    <button className='delete-comment-btn' onClick={() => onDeleteComment(commentId)}>Delete Comment</button>
  )
}

export default DeleteCommentBtn