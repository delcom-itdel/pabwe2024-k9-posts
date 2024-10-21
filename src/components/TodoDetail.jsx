import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { todoItemShape } from "./TodoItem";
import { postedAt } from "../utils/tools";
import { FaClock, FaRegThumbsUp, FaRegComment } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import {
  asyncAddComment,
  asyncDeleteComment,
  asyncDetailTodo,
  asyncDeletePost,
} from "../states/todos/action";

function TodoDetail({ todo, like, authLogin }) {
  const navigate = useNavigate();

  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const handleDeleteComment = async (id) => {
    await dispatch(asyncDeleteComment(id));
    await dispatch(asyncDetailTodo(id));

    // eslint-disable-next-line no-undef
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Komentar berhasil dihapus!",
      showConfirmButton: false,
      timer: 700,
    });
  };

  const handleDeletePost = async (id) => {
    await dispatch(asyncDeletePost(id));

    // eslint-disable-next-line no-undef
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Post berhasil dihapus!",
      showConfirmButton: false,
      timer: 700,
    });

    navigate("/");
  };

  const handleOnAddComment = async (e) => {
    e.preventDefault();

    if (comment.trim()) {
      const formData = new FormData();
      formData.append("comment", comment);

      await dispatch(asyncAddComment(todo.id, formData));
      await dispatch(asyncDetailTodo(todo.id));

      // eslint-disable-next-line no-undef
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Comment berhasil ditambahkan!",
        showConfirmButton: false,
        timer: 700,
      });

      setComment("");
    } else {
      console.error("Comment is missing!");
    }
  };

  function handleComment({ target }) {
    setComment(target.value);
  }

  return (
    <div className="card mt-3">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-12 d-flex justify-content-between align-items-center">
            <div className="text-sm op-5">
              <FaClock />
              <span className="ps-2">{postedAt(todo.created_at)}</span>
            </div>
            {authLogin.id === todo.user_id && (
              <button
                className="btn btn-link text-danger"
                onClick={() => handleDeletePost(todo.id)}
              >
                <FaTrash />
              </button>
            )}
          </div>
          <div className="col-12">
            <hr />
            <img src={todo.cover} alt="Cover" className="img-fluid mb-3" />
            <p>{todo.description}</p>
          </div>
          <div className="col-12 d-flex justify-content-between mt-2">
            <div>
              <FaRegThumbsUp
                onClick={like}
                className={
                  todo.likes.includes(authLogin.id) ? "text-primary" : ""
                }
                style={{ cursor: "pointer" }}
              />{" "}
              {todo.likes.length}
            </div>
            <div>
              <FaRegComment /> {todo.comments.length}
            </div>
          </div>
          <div className="col-12 mt-3">
            <form className="input-group mb-3" onSubmit={handleOnAddComment}>
              <input
                type="text"
                className="form-control"
                placeholder={
                  todo.my_comment?.id
                    ? "Update your comment"
                    : "Add a comment..."
                }
                value={comment}
                onChange={handleComment}
              />
              <button type="submit" className="btn btn-primary">
                {todo.my_comment?.id ? "Update" : "Submit"}
              </button>
            </form>
            <div>
              <div className="mb-2">Comments</div>

              {todo.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border-bottom py-2 d-flex justify-content-between align-items-center"
                >
                  <p className="mb-0">{comment.comment}</p>
                  {todo.my_comment?.id === comment.id && (
                    <button
                      className="btn btn-link text-danger"
                      onClick={() => handleDeleteComment(todo.id)}
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

TodoDetail.propTypes = {
  todo: PropTypes.shape(todoItemShape).isRequired,
  like: PropTypes.func.isRequired,
  authLogin: PropTypes.any,
};

export default TodoDetail;
