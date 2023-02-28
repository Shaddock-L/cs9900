import models
import pandas as pd
from models import MenuModel
from sqlalchemy import create_engine
from decimal import *
HOST = "localhost"
PORT = 3306
DATA_BASE = "flask_db"
USER = "root"
PWD = "123456"
DB_URI = f"mysql+pymysql://{USER}:{PWD}@{HOST}:{PORT}/{DATA_BASE}"

engine = create_engine(DB_URI)

from sqlalchemy.orm import sessionmaker

# create session objects
Session = sessionmaker(engine)

def add_new(name_, image_path, cate, price_, ingred, recom):
    with Session() as session:
        price_ = Decimal.from_float(price_).quantize(Decimal('0.00'))
        cont = models.MenuModel(name = name_,image = image_path, category = cate, price = price_,\
            ingredient = ingred, recommend = recom)
        session.add(cont)
        session.commit()

def add_multiple(dataList):
    for [name_, image_path, cate, price_, ingred, recom] in dataList:
        
        add_new(name_, image_path, cate, price_, ingred,  recom)
    

if __name__ == '__main__':
    
    filename = 'db_init.tsv'
    df = pd.read_csv(filename, sep = '\t')
    data_list = df.values.tolist()
    add_multiple(data_list)
    print("menu is initialized!")