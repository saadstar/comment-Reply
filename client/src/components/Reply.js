import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const Reply = ({ commentId }) => {
  const [content, setContent] = useState("");
    const [replies, setReplies] = useState({});
    useEffect(() => {
        const fetchReplies = async () => {
            try {
                const res = await axios.get(
                  `http://localhost:3600/api/comment/reply/${commentId}`
                );
                setReplies(res.data)
            }catch(er){}
        }
        fetchReplies();
    },[])
    console.log(commentId);
    console.log(replies);
  return (
    <div className="lefte-border">
      <div className="container mt-3 p-4 back-white" key={replies.id}>
        <div class="row">
          <div class="col-1">
            <div className="butnContainer low-width p-1 ">
              <button>+</button>
              <p className="mb-0">{replies.score >= 0 ? replies.score : 0}</p>
              <button>-</button>
            </div>
          </div>
          <div class="col-8">
            <div class="container">
              <div class="d-flex align-item-center justify-content-flex-start gap-4">
                <img src={replies.image} alt="comment" width={50} height={50} />
                <p className="username">{replies.username}</p>
                {replies.username === "juliusomo" && (
                  <span className="you">you</span>
                )}
                <p className="date">{replies.createdAt}</p>
              </div>
              <div class="row">
                <div class="col">
                  <p className="text-content">
                    {" "}
                    <span className="replyto">@{replies.replyingTo}</span>
                    {replies.content}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-3">
            {replies.username !== "juliusomo" ? (
              <button className="editer">
                <i class="fa-solid fa-share fa-flip-horizontal"></i>
                reply
              </button>
            ) : (
              <div className="replyr d-flex  gap-2">
                {/* <!-- Button trigger modal --> */}
                <button
                  type="button"
                  class=" danger d-flex gap-1"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal4"
                >
                  <i class="fa-solid fa-trash"></i> DELETE
                </button>
                {/* <!-- Modal --> */}
                <div
                  class="modal fade"
                  id="exampleModal4"
                  tabindex="-1"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-centered w-50">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1
                          class="modal-title fs-5 fw-bold text-center"
                          id="exampleModalLabel"
                        >
                          Delete Comment
                        </h1>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <p className="text-center gray fs-5 p-2">
                        Are You sure you want to delete this commnet? This will
                        remove the comment and undone.
                      </p>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary bg-gray cancel"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        >
                          No,Cancel
                        </button>
                        <button
                          type="button"
                          class="btn btn-primary-danger dangerious"
                          data-bs-dismiss="modal"
                        >
                          Yes,Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Button trigger modal --> Edit Section */}
                <button
                  type="button"
                  class="editer  ms-1"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal3"
                >
                  <i class="fa-solid fa-pen"></i>
                  Edit
                </button>
                <div
                  class="modal fade"
                  id="exampleModal3"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-centered ">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1
                          class="modal-title fs-5"
                          id="exampleModalLabel"
                        >{`Edit Your Comment`}</h1>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body d-flex">
                        <img
                          alt="editPic"
                          src={replies.image}
                          height={50}
                          width={50}
                          className="img "
                        />
                        <input
                          className="form-control border-dark ms-2 black"
                          placeholder={"your reply"}
                          onChange={(e) => setContent(e.target.value)}
                        />
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-primary"
                          data-bs-dismiss="modal"
                        >
                          UPDATE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>      
    </div>
  );
};
