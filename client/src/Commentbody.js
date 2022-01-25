import React from 'react'

const Commentbody = ({_id, author, postedat, body}) => {
    let date = new Date(postedat)
    return (
        <div className='comment-body' key={_id}>
            <div className='postinfo'>  
                <div className="inlineblock">
                   <h5 className='words'>{author}</h5>
                </div>
                <div className="inlineblock">
                    <p className='words'><small>{`${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`}</small></p>
                </div>
            </div>
            <div className='comment-content'>
                <p className='words'>{body}</p>
            </div>
        </div>
    )
}

export default Commentbody
