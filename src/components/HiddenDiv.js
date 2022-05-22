import React from 'react'
import { useState } from 'react'
import Comments from './Comments'

const HiddenDiv = ({onDeleteComment, commentIDs, commentId, isFavorite, id, posterPath, trailerPath, title, releaseDate, runtime, overview, onClickClose, onClickAddFav, comments, onAddComment}) => {
    
    //component-level state:
    const [text, setText] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        onAddComment({ text });

        setText('');
    }
    
    return (
        <div id="hidden-div">
            <button className="btn" id="close_button" onClick={onClickClose}>CLOSE</button>
            <button className="btn" id="add-fav-button" onClick={() => onClickAddFav(id)}>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</button>
            
            <br />
            <iframe id="trailer" src={trailerPath}>
            </iframe>

            <h4 id="detail-title">{title}</h4>
            <p id="detail-release-date">Release Date: {releaseDate}</p>
            <p id="detail-runtime">Runtime: {runtime} minutes</p>
            <p id="detail-overview">Overview: {overview}</p>


            <hr />

            <form id="comment-form" onSubmit={onSubmit}>

                <label htmlFor="comment-input">Add comment:</label>
                <br />
                <input type="text" id="comment-input" value={text} onChange={(e) => setText(e.target.value)} />
                <button type="submit" id="comment-btn">Add</button>
            </form>

            <Comments commentIDs={commentIDs} comments={comments} onDeleteComment={onDeleteComment} />
        </div>
    )
}

HiddenDiv.defaultProps= {
    id: 0,
    posterPath: 'asdf',
    trailerPath: 'asdf',
    title: 'asdf',
    releaseDate: 'asdf',
    runtime: 'asdf',
    overview: 'asdf'
  }
  
export default HiddenDiv