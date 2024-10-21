import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import { showErrorDialog } from "../../utils/tools";

const ActionType = {
  GET_TODOS: "GET_TODOS",
  ADD_TODO: "ADD_TODO",
  DELETE_TODO: "DELETE_TODO",
  DETAIL_TODO: "DETAIL_TODO",
  POST_LIKE: "POST_LIKE",
  ADD_COMMENT: "ADD_COMMENT",
  DELETE_COMMENT: "DELETE_COMMENT",
  DELETE_POST: "DELETE_POST",
};

function getTodosActionCreator(todos) {
  return {
    type: ActionType.GET_TODOS,
    payload: {
      todos,
    },
  };
}

function addTodoActionCreator(status) {
  return {
    type: ActionType.ADD_TODO,
    payload: {
      status,
    },
  };
}

function deleteTodoActionCreator(status) {
  return {
    type: ActionType.DELETE_TODO,
    payload: {
      status,
    },
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function deleteCommentActionCreator() {
  return {
    type: ActionType.DELETE_COMMENT,
  };
}

function deletePostActionCreator() {
  return {
    type: ActionType.DELETE_POST,
  };
}

function detailTodoActionCreator(todo) {
  return {
    type: ActionType.DETAIL_TODO,
    payload: {
      todo,
    },
  };
}

function postLike(like) {
  return {
    type: ActionType.POST_LIKE,
    payload: {
      like,
    },
  };
}

function asyncGetTodos() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const todos = await api.getAllTodos();
      dispatch(getTodosActionCreator(todos));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncAddTodo(formData) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const postId = await api.postAddTodo(formData); // Menggunakan formData
      dispatch(addTodoActionCreator(true, postId)); // Jika perlu, kirim postId
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncDeleteTodo(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.deleteTodo(id);
      dispatch(deleteTodoActionCreator(true));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncDetailTodo(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const todo = await api.getDetailTodo(id);
      dispatch(detailTodoActionCreator(todo));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncPostLike(id, status) {
  return async (dispatch) => {
    try {
      await api.postLike(id, status);
      dispatch(postLike(status));
    } catch (error) {
      showErrorDialog(error.message);
    }
  };
}

function asyncAddComment(id, formData) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.addComment(id, formData);
      dispatch(addCommentActionCreator(formData.comment));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncDeleteComment(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.deleteComment(id);
      dispatch(deleteCommentActionCreator());
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncDeletePost(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.deletePost(id);
      dispatch(deletePostActionCreator());
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  getTodosActionCreator,
  asyncGetTodos,
  addTodoActionCreator,
  asyncAddTodo,
  deleteTodoActionCreator,
  asyncDeleteTodo,
  detailTodoActionCreator,
  asyncDetailTodo,
  asyncPostLike,
  asyncAddComment,
  asyncDeleteComment,
  asyncDeletePost,
};
