from datetime import datetime
from exts import db
import config
#from sqlalchemy import create_engine,Column,Integer,String
#from sqlalchemy.ext.declarative import declarative_base


# engine = create_engine(config.DB_URI)
# Base = declarative_base(engine)

class MenuModel(db.Model):
    __tablename__ = "menu"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    create_time = db.Column(db.DateTime, default=datetime.now)
    # initialized as the create time, modified later in functions when customer add order
    update_time = db.Column(db.DateTime, default=datetime.now)
    image = db.Column(db.String(255))  # 存放图片的相对路径
    category = db.Column(db.Integer, db.ForeignKey('category.id'))  # consider to use a enumerate type
    price = db.Column(db.DECIMAL(10,2), nullable=False)
    ingredient = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text)
    recommend = db.Column(db.Boolean, default=False)
    
    def to_json(self):
        """将实例对象转化为json"""
        item = self.__dict__
        if "_sa_instance_state" in item:
            del item["_sa_instance_state"]
        return item


class CategoryModel(db.Model):
    __tablename__ = "category"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100),nullable=False)
