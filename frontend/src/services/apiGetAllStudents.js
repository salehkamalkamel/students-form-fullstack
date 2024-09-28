async function apiGetAllStudents() {
  try {
    const response = await fetch("http://127.0.0.1:5000/students");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch students:", err);
    throw err;
  }
}

export { apiGetAllStudents };
