const API_URL = "http://localhost:5000/api/tasks";

//  token helper
const getToken = () => localStorage.getItem("token");

//  response handler
const handleResponse = async (res) => {
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "API Error");
  }
  return res.json();
};

// GET tasks
export const getTasks = async () => {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`, // 🔥 FIX
    },
  });

  return handleResponse(res);
};

// CREATE task
export const createTask = async (task) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`, // 🔥 FIX
    },
    body: JSON.stringify(task),
  });

  return handleResponse(res);
};

// DELETE task
export const deleteTask = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`, // 🔥 FIX
    },
  });

  return handleResponse(res);
};

// UPDATE task
export const updateTask = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`, // 🔥 FIX
    },
    body: JSON.stringify(data),
  });

  return handleResponse(res);
};