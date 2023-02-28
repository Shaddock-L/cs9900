from sqlalchemy import create_engine,Column,Integer,String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from flask_sqlalchemy import SQLAlchemy
import datetime


db = SQLAlchemy()
HOST = "localhost"
PORT = 3306
DATA_BASE = "flask_db"
USER = "root"
PWD = "123456"
DB_URI = f"mysql+pymysql://{USER}:{PWD}@{HOST}:{PORT}/{DATA_BASE}"

engine = create_engine(DB_URI)


# 创建一个基础类
Base = declarative_base(engine)

# class CategoryModel(Base):
#     __tablename__ = "category"
#     id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     name = db.Column(db.String(100),nullable=False)

class MenuModel(Base):
    __tablename__ = "menu"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    create_time = db.Column(db.DateTime, default=datetime.datetime.now())
    # initialized as the create time, modified later in functions when customer add order
    update_time = db.Column(db.DateTime, default=datetime.datetime.now())
    image = db.Column(db.String(255))  # img path
    category = db.Column(db.String(100))
    price = db.Column(db.DECIMAL(10,2), nullable=False)
    ingredient = db.Column(db.Text, nullable=False)
    #description = db.Column(db.Text)
    recommend = db.Column(db.Boolean, default=False)

Base.metadata.create_all()

print("done")

