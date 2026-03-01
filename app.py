from flask import Flask, render_template, request, redirect, url_for, flash, session
from werkzeug.security import generate_password_hash, check_password_hash
import mysql.connector
import re
import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image
from werkzeug.utils import secure_filename
import cloudinary
import cloudinary.uploader
from datetime import date
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.secret_key = os.environ.get("FLASK_SECRET_KEY")

IMG_SIZE = (224, 224)
MODEL_PATH = "Models/mobilenetv2.h5"

# Load model once
model = tf.keras.models.load_model(MODEL_PATH)

# Replace with YOUR actual class list from training output
CLASS_NAMES = ['airplane', 'airport', 'baseball_diamond', 'basketball_court', 'beach', 'bridge', 'chaparral', 'church', 'circular_farmland', 'cloud', 'commercial_area', 'dense_residential', 'desert', 'forest', 'freeway', 'golf_course', 'ground_track_field', 'harbor', 'industrial_area', 'intersection', 'island', 'lake', 'meadow', 'medium_residential', 'mobile_home_park', 'mountain', 'overpass', 'palace', 'parking_lot', 'railway', 'railway_station', 'rectangular_farmland', 'river', 'roundabout', 'runway', 'sea_ice', 'ship', 'snowberg', 'sparse_residential', 'stadium', 'storage_tank', 'tennis_court', 'terrace', 'thermal_power_station', 'wetland']

# ---------------------------
# Database Connection
# ---------------------------
def get_db_connection():
    return mysql.connector.connect(
        host = os.environ.get("DB_HOST"),
        user = os.environ.get("DB_USER"),
        password = os.environ.get("DB_PASSWORD"), 
        database = os.environ.get("DB_NAME")
    )

# ---------------------------
# Cloud configuration
# ---------------------------

cloudinary.config(
    cloud_name = os.environ.get("CLOUDINARY_CLOUD_NAME"),
    api_key = os.environ.get("CLOUDINARY_API_KEY"),
    api_secret = os.environ.get("CLOUDINARY_API_SECRET")
)

print(os.environ.get("CLOUDINARY_API_KEY"))

# ---------------------------
# HOME PAGE
# ---------------------------
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/methodology')
def methodology():
    return render_template('methodology.html')

# ---------------------------
# SIGN UP
# ---------------------------
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        uname = request.form['uname']
        email = request.form['email']
        password = request.form['password']

        # Basic validation
        if not uname.strip():
            flash("Username is required", "danger")
            return redirect(url_for('register'))

        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            flash("Invalid email address", "danger")
            return redirect(url_for('register'))

        if len(password) < 6:
            flash("Password must be at least 6 characters", "danger")
            return redirect(url_for('register'))

        hashed_password = generate_password_hash(password)

        conn = get_db_connection()
        cursor = conn.cursor()

        # Check existing email
        cursor.execute("SELECT u_id FROM users WHERE email = %s", (email,))
        if cursor.fetchone():
            flash("Email already registered", "danger")
            cursor.close()
            conn.close()
            return redirect(url_for('register'))

        # Insert user
        cursor.execute(
            "INSERT INTO users (uname, email, password) VALUES (%s, %s, %s)",
            (uname, email, hashed_password)
        )
        conn.commit()

        cursor.close()
        conn.close()

        flash("Registration successful. Please login.", "success")
        return redirect(url_for('login'))

    return render_template('register.html')

# ---------------------------
# LOGIN
# ---------------------------
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            flash("Invalid email address", "danger")
            return redirect(url_for('login'))

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()

        cursor.close()
        conn.close()

        if user and check_password_hash(user['password'], password):
            session['user_id'] = user['u_id']
            session['username'] = user['uname']
            return redirect(url_for('index'))
        else:
            flash("Invalid email or password", "danger")
            return redirect(url_for('login'))

    return render_template('login.html')

# ---------------------------
# LOGOUT 
# ---------------------------
@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))

# ---------------------------
# UPLOAD
# ---------------------------

@app.route('/upload', methods=['GET', 'POST'])
def upload():

    if not session.get('user_id'):
        return redirect(url_for('login'))

    if request.method == 'POST':

        location = request.form.get('location')
        file = request.files.get('image')

        if not location:
            flash("Location is required", "danger")
            return redirect(url_for('upload'))

        if not file or file.filename == '':
            flash("Image file is required", "danger")
            return redirect(url_for('upload'))

        # -----------------------------
        # Save temporarily to local
        # -----------------------------
        filename = secure_filename(file.filename)
        local_path = os.path.join("static/uploads", filename)
        file.save(local_path)

        # -----------------------------
        # Prediction
        # -----------------------------
        img = image.load_img(local_path, target_size=IMG_SIZE)
        img_arr = image.img_to_array(img) / 255.0
        img_arr = np.expand_dims(img_arr, axis=0)

        preds = model.predict(img_arr)
        class_idx = np.argmax(preds)
        confidence = float(np.max(preds)) * 100
        predicted_class = CLASS_NAMES[class_idx]

        # -----------------------------
        # Upload to Cloudinary
        # -----------------------------
        # Clean location name (remove spaces & lowercase)
        clean_location = location.strip().lower().replace(" ", "_")

        upload_result = cloudinary.uploader.upload(
            local_path,
            folder=f"geonex/{clean_location}"
        )

        cloud_url = upload_result["secure_url"]
        public_id = upload_result["public_id"]

        # -----------------------------
        # Delete local copy
        # -----------------------------
        os.remove(local_path)

        # -----------------------------
        # Insert into Database
        # -----------------------------
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO image_records
            (user_id, image_url, public_id, prediction, confidence, location)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (
            session.get("user_id"),
            cloud_url,
            public_id,
            predicted_class,
            round(confidence, 2),
            location
        ))

        conn.commit()
        cursor.close()
        conn.close()

        # -----------------------------
        # Store result in session (PRG)
        # -----------------------------
        session['result'] = {
            "image": cloud_url,
            "prediction": predicted_class,
            "confidence": round(confidence, 2),
            "location": location
        }

        return redirect(url_for('upload'))

    # -----------------------------
    # GET request
    # -----------------------------
    result = session.pop('result', None)

    if result:
        return render_template(
            "upload.html",
            uploaded_image=result["image"],
            prediction=result["prediction"],
            confidence=result["confidence"],
            location=result["location"]
        )

    return render_template("upload.html")

from datetime import date

@app.route('/report', methods=['GET', 'POST'])
def report():

    today = date.today().isoformat()  
    
    if not session.get('user_id'):
        return redirect(url_for('login')) 

    if request.method == 'POST':

        location = request.form.get('location')
        start_date = request.form.get('start_date')
        end_date = request.form.get('end_date')

        session['report_data'] = {
            "location": location,
            "start_date": start_date,
            "end_date": end_date
        }

        return redirect(url_for('report'))

    # ---------- GET ----------

    report_data = session.pop('report_data', None)

    if report_data:

        location = report_data['location']
        start_date = report_data['start_date']
        end_date = report_data['end_date']

        db = get_db_connection()
        cursor = db.cursor(dictionary=True)

        cursor.execute("""
            SELECT prediction AS class_name,
                   COUNT(*) AS count
            FROM image_records
            WHERE location = %s
              AND DATE(uploaded_at) BETWEEN %s AND %s
            GROUP BY prediction
        """, (location, start_date, end_date))

        folders = cursor.fetchall()

        cursor.close()
        db.close()

        return render_template(
            "report.html",
            folders=folders,
            show_result_section=True,
            location=location,
            start_date=start_date,
            end_date=end_date,
            today=today
        )

    # Normal GET → empty
    return render_template(
        "report.html",
        folders=None,
        today=today,
        show_result_section=False
    )

@app.route('/report-images')
def report_images():

    selected_class = request.args.get('selected_class')
    location = request.args.get('location')
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')

    db = get_db_connection()
    cursor = db.cursor(dictionary=True)

    cursor.execute("""
        SELECT *
        FROM image_records
        WHERE location = %s
          AND prediction = %s
          AND DATE(uploaded_at) BETWEEN %s AND %s
        ORDER BY uploaded_at DESC
    """, (location, selected_class, start_date, end_date))

    images = cursor.fetchall()

    cursor.close()
    db.close()

    return render_template(
        "report_images.html",
        images=images,
        selected_class=selected_class,
        location=location,
        start_date=start_date,
        end_date=end_date
    )
# ---------------------------
# RUN APP
# ---------------------------
if __name__ == '__main__':
    app.run(debug=True, port=4000)