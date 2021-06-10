// MODULES
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { commentBlog } from "../../reducers/Blogs/blogsSlice";
// STYLES
import "./CommentSection.styles.css";

const CommentSection = () =>{
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user);
  const [commentInput, setCommentInput] = useState("");
  const comments = useSelector(state=>state.blogs&&state.blogs.filter(blog=>blog.id===id)[0]?.comments);

  const handleChange = e => {
    setCommentInput(e.target.value);
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if (commentInput.length<=3){
      alert("Comment must have at least a length of 3");
      return;
    }
    const comment = {
      content: commentInput
    };
    dispatch(commentBlog(id, comment));
    e.target.comment.value = "";
  };

  return (<div className="comment-container">
    <div className="comment-header"><h1>Comments:</h1></div>
    <div className="comment-section">
    { comments&&comments.length?
      <ul id="comment-list">
        {
          comments.map(comment=><li className="comment-item" key={comment.id}>{comment.content}<em style={{
            marginLeft: "1em"
          }}> - Anonymous</em></li>)
        }
      </ul>:
      <h2 id="no-comments">There are no comments yet. Be the first on comment</h2>
    }
    </div>
    <div className="comment-form">
      {user?<form onSubmit={handleSubmit} id="comment-form">
        <input id="comment-input" type="text-area" name="comment" onChange={handleChange} required/>
        <input id="comment-submit" type="submit" value="Comment"/>
      </form>:<h3 style={{color: "red"}}>Must be logged to comment.</h3>}
    </div>
  </div>);
};

export default CommentSection;
