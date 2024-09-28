async function apiAddStudent(studentData) {
  try {
    const response = await fetch("http://127.0.0.1:5000/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const newStudent = await response.json();

    return newStudent;
  } catch (error) {
    console.error("There was an error adding the student:", error);
    throw error;
  }
}

export { apiAddStudent };
