import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Postcontent from './Postcontent'

const Postform = () => {
    const [modal, setModal] = useState(false)
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [comments, setComments] = useState([])
    const [newPostId, setPostId] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:4000/posts')
        .then(response => setComments(response.data))
    }, [])

    const createPost = async(e) => {
        e.preventDefault()
        try{
            const data = {title, body}
            await axios.post('http://localhost:4000/posts', data)
            .then(response => {
                setComments(comments => {
                    setPostId(response.data._id)
                    return [...comments, data]
                })
                //setPostId(response.data._id)
            })
        } catch(err){
            console.log(err)
        }
        setModal(false)
        setBody('')
        setTitle('')
    }

    return (
        <div >
            <div className='post-form'>
                <div className="form-center">
                    <input 
                    type="text"
                    className='input2'
                    placeholder='Create Post...' 
                    onClick={() => setModal(true)}
                    />
            </div>
            </div>
            {/* Modal */}
            {modal && (
            <div className='center'>
                <form className='form'>
                <div className='header'>
                    <h3>Create Thread</h3>
                </div>
                <div className='forms'>
                    <div className='margin'>
                        <input 
                        type='text'
                        className='form-input'
                        value={title}
                        placeholder='Enter Title'
                        onChange={((e) => setTitle(e.target.value))}
                        />
                    </div>
                    <div className='margin'>
                        <input 
                        type='text'
                        className='form-input-body'
                        value={body}
                        placeholder='Enter text'
                        onChange={((e) => setBody(e.target.value))}
                        />
                    </div>
                </div>
                <div className='enter'>
                    <button className='btn' onClick={() => setModal(false)}> Cancel</button>
                    <button className='btn' onClick={createPost}>Submit</button>
                </div>
                </form>           
            </div>
            )}
            {/* maps input into post */}
            <div className='postlisting'>
                {comments.map(comment => {
                    return(
                        <Postcontent key={comment._id} {...comment}/>
                    )
                })}
            </div>     
        </div>
    )
}

export default Postform
