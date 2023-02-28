from flask import Blueprint, render_template,g, request,jsonify
import dbcurd
from objects import Table
bp = Blueprint("menu", __name__)


@bp.route('/menu',methods=['GET'])
def menu():
    response = dbcurd.query_data()
    res = jsonify(response)
    res.headers.add('Display dishes', '*')
    return res

@bp.route('/menu/modify',methods=['PUT'])
def modify():
    if request.method == "PUT":
        json_data = request.json
        # if id is not none => modify
        # if id is none: add new
        print(json_data)
        id = json_data['id']
        if id == None:
            name_ = json_data['name']
            # check whether the dish name exists
            previous_id = dbcurd.check_exist(name_) 
            if previous_id > -1:
                return {"message" : f"{name} already exists, its id is {previous_id}"}

            image_path = json_data['img']
            cate = json_data['category']
            price_ = json_data['price']
            ingred = json_data['ingredients']
            recom = json_data['recommended']
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
        image_path = json_data['img']
        if image_path is None:
            image_path = previous_data['img']
        cate = json_data['category']
        if cate is None:
            cate = previous_data['category']
        price = json_data['price']
        if price is None:
            price = previous_data['price']
        ingred = json_data['ingredients']
        if ingred is None:
            ingred = previous_data['ingredient']
        recom = json_data['recommended']
        if recom is None:
            recom = previous_data['recommend']
        response = dbcurd.update_data(id, name, image_path, cate, price, ingred, recom)
        res = jsonify(response)
        res.headers.add('Update Successfully', '*')
        return res

@bp.route('/menu/delete/<int:id>',methods=['DELETE'])
def delete(id):
    
    
    # json_data = request.json
    # id = json_data['id']
    response = dbcurd.delete_data(id)
    res = jsonify(response)
    res.headers.add('Delete-One-Dish', '*')
    return res

