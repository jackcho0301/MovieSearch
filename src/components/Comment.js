import React from 'react'
import DeleteCommentBtn from './DeleteCommentBtn'

//comment component
const Comment = ({comment, onDeleteComment, commentID}) => {
  return (
      <>
      <hr />
    <p>"{comment}" </p>
    <DeleteCommentBtn onDeleteComment={() => onDeleteComment(commentID)}/>
    </>
  )
}

export default Comment