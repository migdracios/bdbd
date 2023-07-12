# 라이브러리
from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import desc

# 앱 셋업
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'  # SQLite 데이터베이스를 사용하고 있습니다. 필요에 따라 변경하세요.
db = SQLAlchemy(app)

# 시작화면
@app.route('/')
def render_index():
    return render_template('index.html')

if __name__ == "__main__":
    with app.app_context():
        db.create_all() 
    app.run(debug=True, port=8080)