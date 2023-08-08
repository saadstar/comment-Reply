import React, { useEffect, useState } from 'react';
import { Reply } from "./Reply";
import axios from "axios";


export const Comment = () => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
 
  const getAllComments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3600/api/comment"
      );
      setComments(res.data);
    } catch (err) {
      console.log(err)
    }
  }
  const createComment = async () => {
    await axios.post("http://localhost:3600/api/comment", { content });
    getAllComments();
    setContent("");
  }
  useEffect(() => {
    getAllComments();
  }, [comments._id]);

    return (
      <div className="container mb">
        {comments.map((item, i) => {                   
          return (
            <div className="container mt-4 revo" key={item._id}>
              <div className="d-flex direction-column whiter p-4">
                <div className="butnContainer p-1 ">
                  <button>+</button>
                  <p className="mb-0">{item.score}</p>
                  <button>-</button>
                </div>
                <div className="d-flex flex-column">
                  <div className="d-flex imger ms-2">
                    <div className="d-flex">
                      <img src={item.image} alt="comment" />
                      <p className="username">{item.username}</p>
                      {item.username === "juliusomo" && (
                        <span className="you">you</span>
                      )}
                      <p className="date">{item.createdAt}</p>
                    </div>
                  </div>
                  <p className="text-content"> {item.content}</p>
                </div>
                {item.username !== "juliusomo" && (
                  // <!-- Button trigger modal -->
                  <>
                    <div className="replyr abso">
                      <button
                        className="editer"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal5"
                      >
                        <i class="fa-solid fa-share fa-flip-horizontal"></i>
                        reply
                      </button>
                    </div>
                    {/* // <!-- Modal --> */}
                    <div
                      class="modal fade"
                      id="exampleModal5"
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">
                              Reply
                            </h1>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <form className="form-group">
                              <div className="d-flex justify-content-between mt-2  direction-column whiter p-4">
                                <img
                                  src="./images/avatars/image-juliusomo.png"
                                  alt="me"
                                  width={50}
                                  height={50}
                                />
                                <input
                                  required
                                  type="text"
                                  placeholder="Add Your Reply Comment"
                                  className="input form-control"
                                />
                              </div>
                            </form>{" "}
                          </div>
                          <div class="modal-footer">
                            <button
                              className="btn"
                              data-bs-dismiss="modal"
                            >
                              SEND
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Reply commentId={ item._id} />
                  </>
                ) }
              </div>             
            </div>
          );
  })}
         {/* add comment create  */}
         <div className="container mb-4"> 
          <form onSubmit={(e) => e.preventDefault()} className="form-group"> 
         <div className="d-flex justify-content-between mt-2  direction-column whiter p-4">
             <img
               src="./images/avatars/image-juliusomo.png"
                alt="me"
               width={50} 
                height={50} 
               /> 
             <input 
             required
                onChange={(e) => setContent(e.target.value)}
                 value={content}
               type="text"
                placeholder="Add Your Comment"
                 className="input form-control"
               />
               <button className="btn" onClick={createComment}>
                 SEND
               </button>
             </div> 
           </form> 
        </div>
        </div>
          
    );
    
}
