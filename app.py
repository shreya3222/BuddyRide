from flask import Flask, render_template, request,redirect,session;
import sqlite3
from bcrypt import gensalt,hashpw,checkpw
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)

def hash_password(password):
    salt = gensalt()
    hashed_password = hashpw(password.encode('utf-8'), salt)
    return hashed_password

def check_password(entered_password, hashed_password):
    return checkpw(entered_password.encode('utf-8'), hashed_password)



@app.route('/')
def LogIn():
    return render_template('LogIn.html')


@app.route('/Get_Auth', methods=['POST', 'GET'])
def Get_Auth():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        
        print(email)
        print(password)
        conn = sqlite3.connect('cabmates.db') 
        cursor = conn.cursor()
        try:
            cursor.execute( '''
                            SELECT * FROM Login WHERE Email = ?
                            ''', (email,))
            entry=cursor.fetchone()
            # print(entry[3])
            # cursor.execute('''
            #                 SELECT * FROM Login
            #                 ''')
            # Allentry=cursor.fetchall()

            conn.commit()
            conn.close()


            if check_password(password, entry[5]) :
                print('login sucessfull')
                session['email'] = email
                return redirect('/index')
            else :
                message='wrong password!'
                return render_template('LogIn.html',message=message)
        except:
            print('login failed')
            message='Email not found!'
            return render_template('LogIn.html',message=message)
    else:
        return render_template('LogIn.html')
        


@app.route('/Get_userData',methods=['POST', 'GET'])
def Get_userData():
    if request.method == 'POST':
        fname = request.form['fname']
        lname = request.form['lname']
        email = request.form['email']
        Password = request.form['password']
        gender = request.form['gender']
        batch = request.form['batch']
    
        hashpw = hash_password(Password)

        conn = sqlite3.connect('cabmates.db') 
        cursor = conn.cursor()
        try:
            cursor.execute('''
                        INSERT INTO Login (Fname, Lname, Email, Batch, Gender, Password)
                        VALUES (?, ?, ?, ?, ?, ?)
                        ''', (fname, lname, email, batch, gender, hashpw))
            print('signUp successful')
            conn.commit()
            conn.close()
            return render_template('LogIn.html')
        except:
            print('login failed')
            message='Email Already in Use!'
            return render_template('SignUp.html',message=message)
    else:
        render_template('SignUp.html')

@app.route('/SignUp',methods=['POST', 'GET'])
def SignUp():
    return render_template('SignUp.html')

@app.route('/index')
def index():
    if "email" in session:
        email=session['email']
    else:
        email = "test@test.com"
    conn = sqlite3.connect('cabmates.db') 
    cursor = conn.cursor()

    cursor.execute( '''
                    SELECT * FROM Cabmate WHERE Email = ?
                    ''', (email,))
    entries=cursor.fetchall()
    return render_template('index.html',entries=entries,user=email)

@app.route('/Add_Cabmate',methods=['POST', 'GET'])
def Add_Cabmate():
    if request.method == 'POST':
        if "email" in session:
            email=session['email']
        else:
            email = "test@test.com"

        body = request.get_json()
        
        datetime = body['datetime']
        pickup = body['pickup']
        destination = body['destination']

        conn = sqlite3.connect('cabmates.db') 
        cursor = conn.cursor()
        try:
            cursor.execute('''
                        INSERT INTO Cabmate (Email, DateTime, PickUp, Destination)
                        VALUES (?, ?, ?, ?)
                        ''', (email, datetime, pickup, destination))
            print('Cabmate added')
            conn.commit()
            conn.close()
            return redirect('/index')
        except:
            print('Cabmate failed')
            message='Cabmate failed'
            return render_template('Add_Cabmate.html',message=message)
    else:
        return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)