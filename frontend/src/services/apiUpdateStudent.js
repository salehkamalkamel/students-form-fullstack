async function apiUpdateStudent(studentId, updatedData) {
  try {
    const response = await fetch(
      `http://127.0.0.1:5000/students/${studentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to update student:", error);
    return { error: error.message };
  }
}

export { apiUpdateStudent };
