import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { asyncDetailTodo, asyncPostLike } from "../states/todos/action";
import TodoDetail from "../components/TodoDetail";

function TodoDetailPage() {
  const { id } = useParams();
  const { authLogin, detailTodo = null } = useSelector((states) => states);
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(asyncDetailTodo(id));
    }
  }, [id, dispatch]);

  const handleLikeClick = async (id) => {
    const hasUserLiked = detailTodo.likes.includes(authLogin.id);
    let status = hasUserLiked ? 0 : 1;
    await dispatch(asyncPostLike(id, status));
    await dispatch(asyncDetailTodo(id));
  };

  return (
    <section>
      <div className="container pt-1">
        {detailTodo != null ? (
          <TodoDetail
            todo={detailTodo}
            like={() => handleLikeClick(id)}
            authLogin={authLogin}
          />
        ) : null}
      </div>
    </section>
  );
}

export default TodoDetailPage;
