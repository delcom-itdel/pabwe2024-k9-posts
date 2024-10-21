const api = (() => {
  const BASE_URL = "https://public-api.delcom.org/api/v1";

  async function _fetchWithAuth(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  function putAccessToken(token) {
    localStorage.setItem("accessToken", token);
  }

  function getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  // API Auth => https://public-api.delcom.org/docs/1.0/api-auth
  async function postAuthRegister({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const responseJson = await response.json();
    const { success, message } = responseJson;
    if (success !== true) {
      throw new Error(message);
    }
    return message;
  }

  async function postAuthLogin({ email, password }) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const responseJson = await response.json();
    const { success, message } = responseJson;
    if (success !== true) {
      throw new Error(message);
    }
    const {
      data: { token },
    } = responseJson;
    return token;
  }

  // API Users => https://public-api.delcom.org/docs/1.0/api-users;
  async function getMe() {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);
    const responseJson = await response.json();
    const { success, message } = responseJson;
    if (success !== true) {
      throw new Error(message);
    }
    const {
      data: { user },
    } = responseJson;
    return user;
  }

  async function postChangePhotoProfile({ photoFile }) {
    const formData = new FormData();
    formData.append("photo", photoFile);
    const response = await _fetchWithAuth(`${BASE_URL}/users/photo`, {
      method: "POST",
      body: formData,
    });
    const responseJson = await response.json();
    const { success, message } = responseJson;
    if (success !== true) {
      throw new Error(message);
    }
    return message;
  }

  // Post Todos => https://public-api.delcom.org/docs/1.0/api-posts
  async function postAddTodo(formData) {
    const response = await _fetchWithAuth(`${BASE_URL}/posts`, {
      method: "POST",
      body: formData,
    });

    const responseJson = await response.json();
    const { success, message } = responseJson;

    if (success !== true) {
      throw new Error(message);
    }

    const {
      data: { post_id },
    } = responseJson;

    return post_id;
  }

  async function postChangeCoverTodo({ id, cover }) {
    const formData = new FormData();
    formData.append("cover", cover);
    const response = await _fetchWithAuth(`${BASE_URL}/todos/${id}/cover`, {
      method: "POST",
      body: formData,
    });
    const responseJson = await response.json();
    const { success, message } = responseJson;
    if (success !== true) {
      throw new Error(message);
    }
    return message;
  }

  async function putUpdateTodo({ id, title, description, is_finished }) {
    const response = await _fetchWithAuth(`${BASE_URL}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        is_finished,
      }),
    });
    const responseJson = await response.json();
    const { success, message } = responseJson;
    if (success !== true) {
      throw new Error(message);
    }
    const {
      data: { todo_id },
    } = responseJson;
    return todo_id;
  }

  async function deleteTodo(id) {
    const response = await _fetchWithAuth(`${BASE_URL}/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseJson = await response.json();
    const { success, message } = responseJson;
    if (success !== true) {
      throw new Error(message);
    }
    return message;
  }

  async function getAllTodos() {
    const response = await _fetchWithAuth(`${BASE_URL}/posts`);
    const responseJson = await response.json();
    const { success, message } = responseJson;
    if (success !== true) {
      throw new Error(message);
    }
    const {
      data: { posts },
    } = responseJson;
    return posts;
  }

  async function getDetailTodo(id) {
    const response = await _fetchWithAuth(`${BASE_URL}/posts/${id}`);
    const responseJson = await response.json();
    const { success, message } = responseJson;
    if (success !== true) {
      throw new Error(message);
    }
    const {
      data: { post },
    } = responseJson;
    return post;
  }

  async function postLike(id, status) {
    const formData = new FormData();
    formData.append("like", status);
    const response = await _fetchWithAuth(`${BASE_URL}/posts/${id}/likes`, {
      method: "POST",
      body: formData,
    });
    const responseJson = await response.json();
    const { success, message } = responseJson;
    if (success !== true) {
      throw new Error(message);
    }

    return message;
  }

  async function addComment(id, formData) {
    const response = await _fetchWithAuth(`${BASE_URL}/posts/${id}/comments`, {
      method: "POST",
      body: formData,
    });

    const responseJson = await response.json();
    const { success, message } = responseJson;

    if (success !== true) {
      throw new Error(message);
    }

    return message;
  }

  async function deleteComment(id) {
    const response = await _fetchWithAuth(`${BASE_URL}/posts/${id}/comments`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseJson = await response.json();
    const { success, message } = responseJson;
    if (success !== true) {
      throw new Error(message);
    }
    return message;
  }

  async function deletePost(id) {
    const response = await _fetchWithAuth(`${BASE_URL}/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseJson = await response.json();
    const { success, message } = responseJson;
    if (success !== true) {
      throw new Error(message);
    }
    return message;
  }

  return {
    putAccessToken,
    getAccessToken,
    postAuthRegister,
    postAuthLogin,
    getMe,
    postChangePhotoProfile,
    postAddTodo,
    postChangeCoverTodo,
    putUpdateTodo,
    deleteTodo,
    getAllTodos,
    getDetailTodo,
    postLike,
    addComment,
    deleteComment,
    deletePost,
  };
})();

export default api;
