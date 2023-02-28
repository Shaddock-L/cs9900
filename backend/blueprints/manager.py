from flask import Blueprint, render_template,request,jsonify
from models import MenuModel
import dbcurd
bp = Blueprint("manager", __name__, url_prefix="/manager")

    

@bp.route('/',methods=["GET","POST","DELETE","PATCH"])
def manager():
    if request.method == "GET":
        response = dbcurd.query_data()
        res = jsonify(response)
        res.headers.add('Get-All-Dishes', '*')
        return res
    elif request.method == "POST":
        json_data = request.json
        # if id is not none => modify
        # if id is none: add new
        id = json_data['id']
        if id == None:
            name_ = json_data['name']
            # check whether the dish name exists
            previous_id = dbcurd.check_exist(name_) 
            if previous_id > -1:
                return {"message" : f"{name} already exists, its id is {previous_id}"}

            image_path = json_data['image']
            cate = json_data['category']
            price_ = json_data['price']
            ingred = json_data['ingredient']
            recom = json_data['recommend']
            val_name = ['name', 'image', 'category', 'price', 'ingredient', 'recommend']
            val = [name_, image_path, cate, price_, ingred,recom]
            ret = dict(zip(val_name, val))

            dbcurd.add_new(name_, image_path, cate, price_, ingred, recom)
            res = jsonify(ret)
            res.headers.add('Add-One-New-Dish', '*')
            return res
        
        # id is not none, modify the data
        previous_data = dbcurd.query_data_by_id(id)    
        name = json_data['name']
        if name is None:
            name = previous_data['name']
        image_path = json_data['image']
        if image_path is None:
            image_path = previous_data['image']
        cate = json_data['category']
        if cate is None:
            cate = previous_data['category']
        price = json_data['price']
        if price is None:
            price = previous_data['price']
        ingred = json_data['ingredient']
        if ingred is None:
            ingred = previous_data['ingredient']
        recom = json_data['recommend']
        if recom is None:
            recom = previous_data['recommend']
        response = dbcurd.update_data(id, name, image_path, cate, price, ingred, recom)
        res = jsonify(response)
        res.headers.add('Update Successfully', '*')
        return res


    elif request.method == "DELETE":
        json_data = request.json
        id = json_data['id']
        response = dbcurd.delete_data(id)
        res = jsonify(response)
        res.headers.add('Delete-One-Dish', '*')
        return res


    # elif request.method == "PATCH":
    #     json_data = request.json
    #     id = json_data['id']
        



