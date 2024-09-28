async function apiGetStudent(studentID) {
  try {
    const response = await fetch(`http://127.0.0.1:5000/students/${studentID}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

export { apiGetStudent };
