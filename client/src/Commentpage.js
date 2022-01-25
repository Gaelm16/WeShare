import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import Postcontent from './Postcontent'
import Commentbody from './Commentbody'


const Commentpage = (props) => {
    const [post, setPost] = useState([])
    const [comments, setComments] = useState([])
    const [postBodyComment, setPostBodyComment] = useState('')
    const Id = props.match.params.id
    //console.log(Id)


    useEffect(()=> {
        // gets the post clicked from home post page
        axios.get(`http://localhost:4000/comments/${Id}`) 
        .then(response => {
            setPost(response.data)
            // console.log(response.data)
        })

        // gets comments for the post clicked 
        axios.get('http://localhost:4000/comments/root/' + props.id) 
        .then(response => {
            setComments(response.data)
        })

    }, [])

     const createComment = async(e) => {
        e.preventDefault()
        try {
            const data = {postBodyComment, rootId:post._id}
            await axios.post(`http://localhost:4000/comments/${Id}`, data)
            .then((response) => {
                setComments(comments => {
                    return [...comments, data]
                })
            })
        } catch(err) {
            console.log(err)
        }
        setPostBodyComment('')
    }

    return (
        <div>
            <div>
                <Navbar/>
            </div>
            {post && (
                <div className='postlisting'>
                    {/* returns post clicked */}
                    <Postcontent {...post}/>

                    {/* comment input for post  */}
                    <div className='postss'>
                        <form >
                            <input 
                            type='text'
                            className='comment-input'
                            value={postBodyComment}
                            placeholder='Enter Comment...'
                            onChange={((e) => setPostBodyComment(e.target.value))}
                            />
                            <button onClick={createComment} className='btn'>Enter</button>
                        </form>
                    </div>

                    {/* filters comments to respective post */}
                    <div>
                        <div className='postlisting'>
                        {comments.filter(comment => post._id === comment.rootId).map((comme, i) => {
                            return(
                                //<Commentbody {...comme} key={comme._id} rootId={comme._id} />
                                <Commentbody key={i} {...comme} />
                            )
                        })}
                        </div>
                    </div>
                    
                </div>
              )
            }
             
        </div>
    )
}

export default Commentpage
