from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from email_validator import validate_email, EmailNotValidError
import os
import zipfile
import requests
import subprocess
from config import APP_VERSION

app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:////home/nazim/Documents/Tihan/Server_App/server_app/application/db.sqlite3"
db = SQLAlchemy(app)

app_version = APP_VERSION

class Users_Client(db.Model):
    __tablename__ = 'user_dashboard_users_client'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email_user = db.Column(db.String(100), unique=True, nullable=False)
    password_user = db.Column(db.String(20), nullable=False)
    vehicle_sign = db.Column(db.String(50), nullable=False, unique=True)

EXTRACTION_PATH = "./updates"
file_id = ''
datetime_latest = ''
file_name = ''

def validate_user_email(email):
    try:
        validate_email(email)
        return True
    except EmailNotValidError as e:
        err = "Invalid Email"
        return err

@app.route("/signup", methods=['POST'])
def user_signup():
    data = request.json
    firstName = data.get('firstName')
    lastName = data.get('lastName')
    emailUser = data.get('email')
    user_password = data.get('password')
    vehicle_signature = data.get('vehicleSignature')
    email_checker = validate_user_email(emailUser)
    if email_checker:
        print("Email successful")
        users_obj = Users_Client(
            first_name = firstName,
            last_name = lastName,
            email_user = emailUser,
            password_user = user_password,
            vehicle_sign = vehicle_signature
        )
        db.session.add(users_obj)
        db.session.commit()
        return jsonify({'message': 'Successfully Signed Up'})
    else:
        print(email_checker)
    print(firstName)
    return jsonify({'message':'Success SignedUp'})

@app.route("/check-update", methods=["GET"])
def check_update():
    server_url = "http://127.0.0.1:8000/latest-file/"
    response = requests.get(server_url)
    if response.status_code==200:
        data = response.json()
        latest_datetime = data.get('latest_datetime')
        name_file = data.get('file_name') 
        file_id = data.get('file_id')
        print(file_id)
        # if app_version == name_file:
        return jsonify({'message':'Update available', 'file_id': file_id})
        # else:
        #     return jsonify({'message':'Software up-to date'})
    else:
        return jsonify({"message":"Unexpected error occured"})


# @app.route("/update", methods=['GET'])
# def get_update():
#     try:
#         file_id = fileid
#         server_url = "http://127.0.0.1:8000/send-file/{}/".format(file_id)
#         # Make the GET request to Django server
#         response = requests.get(server_url, stream=True)
            
#             # Check if the response is successful
#         if response.status_code != 200:
#             return jsonify({"error": f"Failed to download file. Status code: {response.status_code}"}), response.status_code
            
#             # Save the file locally with a dynamic name
#         local_file_path = f"./downloaded_file_{file_id}.zip"
#         with open(local_file_path, "wb") as f:
#             for chunk in response.iter_content(chunk_size=8192):
#                 f.write(chunk)

#         return jsonify({"message": "File downloaded successfully", "file_path": local_file_path}), 200

#     except Exception as e:
#         print(e)
#         return jsonify({"error": str(e)}), 500

@app.route("/update", methods=['GET'])
def get_update():
    try:
        fileid = request.args.get('fileid')
        print(file_id)
        bash_script = "./updation.sh"
        result =  subprocess.Popen(["bash", bash_script, fileid])
        print(result)
        return jsonify({"message": "File downloaded successfully"}), 200
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500

    
    

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
