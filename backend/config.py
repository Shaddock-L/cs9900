# configuration for database
HOSTNAME = 'localhost'
PORT = '3306'
DATABASE = 'flask_db'
USERNAME = 'root'
PASSWORD = '123456'
DB_URI = 'mysql+pymysql://{}:{}@{}:{}/{}?charset=utf8'.format(USERNAME, PASSWORD, HOSTNAME, PORT, DATABASE)
SQLALCHEMY_DATABASE_URI = DB_URI
SQLALCHEMY_TRACK_MODIFICATIONS = True
SECRET_KEY = "waitmanagement"

# 邮箱配置
# 项目中使用gmail, 这样配置完后就可以使用我的账户给其他账户发送验证码
MAIL_SERVER  = "smtp.gmail.com"
MAIL_PORT = 465
MAIL_USE_TLS =  False
MAIL_USE_SSL = True
MAIL_DEBUG = True
MAIL_USERNAME = "zhengshisheng3@gmail.com"
MAIL_PASSWORD = "jszyugufmodahtzr"
MAIL_DEFAULT_SENDER = "zhengshisheng3@gmail.com"
