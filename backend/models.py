import datetime
from exts import db


class MenuModel(db.Model):
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

    def transfer_to_json(self):
        return {
            'id' : self.id,
            'name' : self.name,
            # 'create_time': self.create_time,
            # 'update_time': self.update_time,
            'img': self.image,
            'category': self.category,
            'price': self.price,
            'ingredients': self.ingredient,
            'recommended': self.recommend
        }
       