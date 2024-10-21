import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaRegThumbsUp, FaRegComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { asyncGetTodos, asyncPostLike } from "../states/todos/action";

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { todos, authLogin } = useSelector((states) => states);

  useEffect(() => {
    dispatch(asyncGetTodos());
  }, [dispatch]);

  const handleTodoClick = (todoId) => {
    navigate(`/post/${todoId}`);
  };

  const handleLikeClick = async (id, likes) => {
    const hasUserLiked = likes.includes(authLogin.id);
    let status = hasUserLiked ? 0 : 1;
    await dispatch(asyncPostLike(id, status));
    await dispatch(asyncGetTodos());
  };

  return (
    <section>
      <div className="container">
        <div className="row">
          {todos &&
            todos.map((todo) => (
              <div className="col-md-4 mb-4" key={todo.id}>
                <div
                  className="card flex-fill"
                  style={{
                    cursor: "pointer",
                    transition: "box-shadow 0.3s, background-color 0.3s",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "white",
                  }}
                  onClick={() => handleTodoClick(todo.id)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 8px 16px rgba(0, 0, 0, 0.2)";
                    e.currentTarget.style.backgroundColor = "#f7f7f7";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 4px 8px rgba(0, 0, 0, 0.1)";
                    e.currentTarget.style.backgroundColor = "white";
                  }}
                >
                  <img
                    src={todo.cover}
                    className="card-img-top"
                    alt={todo.description}
                    style={{
                      height: "300px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="card-body d-flex flex-column">
                    <p className="card-description">{todo.description}</p>
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <FaRegThumbsUp
                          className={`me-2 ${
                            todo.likes.includes(authLogin.id)
                              ? "text-primary"
                              : ""
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLikeClick(todo.id, todo.likes);
                          }}
                        />
                        <span>{todo.likes.length || 0}</span>
                        <FaRegComment className="ms-3 me-2" />
                        <span>{todo.comments.length || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default HomePage;
