import React from 'react'
import {Link} from 'react-router-dom'

const Postcontent = ({_id, author, title, body, postedat}) => {
    let date = new Date(postedat)
    return (
        
        <div className='posts'  key={_id}>
            <Link to={`/comments/${_id}`} key={_id} className='post-links'>
            <div className='postinfo'>  
                <div className="inlineblock">
                   <h5 className='words'>{author}</h5>
                </div>
                <div className="inlineblock">
                    <p className='words'><small>{`${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`}</small></p>
                </div>
            </div>
            <div className='post-bodycontent'>
                <h3 className='words'>{title}</h3>
                <p className='words'>{body}</p>
            </div>
            </Link>
        </div>
    )
}

export default Postcontent
