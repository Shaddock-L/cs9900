from exts import db
from models import MenuModel
from decimal import *

def add_new(name_, image_path, cate, price_, ingred, recom):
    price_ = Decimal.from_float(price_).quantize(Decimal('0.00'))
    menu_model = MenuModel(name = name_,image = image_path, category = cate, price = price_,\
        ingredient = ingred, recommend = recom)
    db.session.add(menu_model)
    db.session.commit()

def add_multiple(dataList):
    for [name_, image_path, cate, price_, ingred,recom] in dataList:
        add_new(name_, image_path, cate, price_, ingred, recom)

def get_id(name_):   
    dish = MenuModel.query.filter_by(name=name_).first()
    if dish == None:
        return None
    return dish.id

def check_exist(name_):
    ret = get_id(name_)
    if ret == None:
        return -1
    return ret


def query_data():   
    ret = []
        
    all_MenuModel = MenuModel.query.all()
    ret = []
    for record in all_MenuModel:
        ret.append(record.transfer_to_json())

    return ret

def query_data_by_id(id):
    dish = MenuModel.query.filter_by(id=id).first()
    if dish == None:
        return None
    ret = dish.transfer_to_json()
    return ret

def query_price_by_id(id):
    dish = MenuModel.query.filter_by(id=id).first()
    return dish.price
        
def query_data_by_cate(num):
    ret = []
    dishes = MenuModel.query.filter_by(category = num).all()
    for dish in dishes:
        temp = dish.transfer_to_json()
        ret.append(temp)
    return ret



def query_price(nm):   
    ret = MenuModel.query.filter_by(name=nm).first().price
    return ret

def update_data(id, name_, image_path, cate, price_, ingred, recom): 

    dish = MenuModel.query.filter_by(id=id).first()
    dish.name = name_
    dish.image = image_path
    dish.category = cate
    dish.price = price_
    dish.ingredient = ingred
    dish.recommend = recom
    db.session.commit()
    # return the updated data
    return query_data_by_id(id)


# delete a dish with its id
def delete_data(delete_id):  
    to_delete = MenuModel.query.filter_by(id=delete_id).first()
    db.session.delete(to_delete)
    ret = to_delete.transfer_to_json()
    db.session.commit()
    return ret








