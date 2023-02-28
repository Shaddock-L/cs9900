from flask_restx import Resource, Api
import decimal
from flask.json import JSONEncoder
from flask import Flask, session, g, request, jsonify
import config
from exts import db
from flask_migrate import Migrate
from flask_cors import CORS
from objects import Table
from blueprints import manager_bp,customer_bp, waiter_bp,kitchen_bp, menu_bp
app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config.from_object(config)
db.init_app(app) # 把app绑定到db上
api = Api(app,
          default="REST API for wait management",  # Default namespace
          title="comp9900-matrix",  # Documentation Title
          description="This is project for comp9900")  # Documentation Description
migrate = Migrate(app,db)   #将app绑定上数据库，从而可以在flask Terminal中进行表层面的增删改操作

app.register_blueprint(manager_bp)
app.register_blueprint(customer_bp)
app.register_blueprint(waiter_bp)
app.register_blueprint(kitchen_bp)
app.register_blueprint(menu_bp)
tables =[Table(i+1) for i in range(10)] # 存放20个table对象

class JsonEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, decimal.Decimal):
            return float(obj)
        return JSONEncoder.default(self, obj)

app.json_encoder = JsonEncoder

@app.before_request  # 钩子函数，一般定义在app.py中
                     # 在请求视图前，先做如下操作
def before_request():
    # 将session中的user_id 自动发给视图函数，从而避免多个视图函数都要请求user_id造成代码冗余
    g.tables = tables

if __name__ == '__main__':
    app.run(port=8080, debug=True)               




