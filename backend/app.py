from flask import Flask, jsonify, request
from models import db, Student
from config import Config
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(Config)

# Restrict CORS to trusted origins (replace with your frontend URL in production)
CORS(app, resources={r"/students/*": {"origins": "*"}})

db.init_app(app)

# Helper function to validate student data
def validate_student_data(data):
    required_fields = ['name', 'email', 'age']
    
    # Check for missing fields
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return False, f"Missing required fields: {', '.join(missing_fields)}"
    
    # Validate age
    try:
        age = int(data['age'])
        if age < 6 or age > 22:
            return False, "Age must be between 6 and 22"
    except ValueError:
        return False, "Age must be a valid integer"
    
    return True, None

# Get all students
@app.route('/students', methods=['GET'])
def get_all_students():
    students = Student.query.all()
    students_list = [student.to_dict() for student in students]
    return jsonify(students_list), 200

# Add a new student
@app.route('/students', methods=['POST'])
def add_student():
    data = request.json
    
    # Validate the request data
    is_valid, error_message = validate_student_data(data)
    if not is_valid:
        return jsonify({"error": error_message}), 400
    
    new_student = Student(
        name=data['name'],
        email=data['email'],
        age=data['age'],
        education_level=data.get('education_level', ''),
        nationality=data.get('nationality', ''),
        national_id=data.get('national_id')
    )
    db.session.add(new_student)
    db.session.commit()
    return jsonify(new_student.to_dict()), 201

# Get student by ID
@app.route('/students/<int:id>', methods=['GET'])
def get_student_by_id(id):
    student = Student.query.get(id)
    if student:
        return jsonify(student.to_dict()), 200
    else:
        return jsonify({"error": "Student not found"}), 404

# Update student by ID
@app.route('/students/<int:id>', methods=['PUT'])
def update_student(id):
    student = Student.query.get(id)
    if not student:
        return jsonify({"error": "Student not found"}), 404

    data = request.json
    
    # Validate the request data (partial update)
    if 'age' in data:
        is_valid, error_message = validate_student_data(data)
        if not is_valid:
            return jsonify({"error": error_message}), 400
    
    # Update student fields
    student.name = data.get('name', student.name)
    student.email = data.get('email', student.email)
    student.age = data.get('age', student.age)
    student.education_level = data.get('education_level', student.education_level)
    student.nationality = data.get('nationality', student.nationality)
    student.national_id = data.get('national_id', student.national_id)

    db.session.commit()
    return jsonify(student.to_dict()), 200

# Delete student by ID
@app.route('/students/<int:id>', methods=['DELETE'])
def delete_student(id):
    student = Student.query.get(id)
    if not student:
        return jsonify({"error": "Student not found"}), 404

    db.session.delete(student)
    db.session.commit()
    return jsonify({"message": "Student deleted"}), 200

if __name__ == '__main__':
    app.run(debug=True)
