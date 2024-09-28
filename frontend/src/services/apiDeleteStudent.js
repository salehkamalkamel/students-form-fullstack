async function apiDeleteStudent(studentId) {
  try {
    const response = await fetch(
      `http://127.0.0.1:5000/students/${studentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to delete student:", error);
    return { error: error.message };
  }
}

export { apiDeleteStudent };
