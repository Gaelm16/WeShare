import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'

const Profilepage = () => {
    const [myposts, setMyPosts] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/profile')
        .then(response => {
            setMyPosts(response.data)
        })
    }, [])

    const deletepost = (Id) => {
        axios.delete(`http://localhost:4000/profile/${Id}`)
        .then(() => {
            setMyPosts(myposts.filter((val) => val._id !== Id) )
        })
    }

    const updatepost = (Id) => {
        const title = prompt("Enter new title: ")
        const body = prompt("Enter new body: ")
        axios.put(`http://localhost:4000/profile/${Id}`, {title, body})
        .then(() => {
            setMyPosts(
                myposts.map((val) => {
                    return val._id === Id ? {_id: Id, title: title, body: body} : val
                })
            )
        })
    }

    if(myposts.length === 0){
        return (
            <div>
                <Navbar/>
                <div className='section'>
                    <div className='myposts-section'>
                        <div className="myposts-header">
                            <h1>My Posts</h1>
                            <h2>No Posts Here! Go Create Some</h2>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Navbar/>
            <div className="section">
                <div className='myposts-section'>
                    <div className="myposts-header">
                        <h1>My Posts</h1>
                    </div>
                {console.log(myposts)}
            {myposts.map((content) => {
                const {author, title, body, _id, postedat} = content
                let date = new Date(postedat)
                return(
                    <div className='posts' key={content._id} >
                        <Link to={`/comments/${_id}`} className='post-links'>
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
                        <div className='inlineblock'>
                            <button onClick={() => deletepost(content._id)} className='btn'>Delete </button>  
                        </div>
                        <div className='inlineblock'>
                            <button onClick={() => updatepost(content._id)} className='btn'>Update</button>  
                        </div>
                    </div>
                    )
            })}
                </div>
            </div>
        </div>
    )
}

export default Profilepage
