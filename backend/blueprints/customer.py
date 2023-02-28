from flask import Blueprint, render_template,g, request,jsonify
from collections import Counter
import dbcurd
from objects import Table

bp = Blueprint("customer", __name__, url_prefix="/customer")
def Table2dict(id):
    return {
        "tableId": id,
        "Help_status": g.tables[id].help,
        "Status": g.tables[id].status,
        "Order": g.tables[id].order,
        "checkout": g.tables[id].checkout
    }

def sumAllDishes(order):
    ret = {}
    sum_ = 0
    cnt = Counter(order)
    for key in cnt:
        price = dbcurd.query_price(key)
        ret[f"{key} × {cnt[key]}"] = cnt[key] * price 
        sum_ += cnt[key] * price
    ret["sum"] = sum_
    return ret 

def name2Id(orderMap):
    ret = {}
    for key in orderMap:
        ret[str(dbcurd.get_id(key))] = orderMap[key]
    return ret 



@bp.route('/',methods=['GET', 'POST', 'PATCH'])
def index():
    #
    if request.method == "GET":
        response = dbcurd.query_data()
        res = jsonify(response)
        res.headers.add('Display dishes', '*')
        return res
    
    # ITEMS, ITEMS COUNT
    elif request.method == "POST":
        json_data = request.json
        tableId = int(json_data['id']) - 1
        items = json_data['items']
        order_price = json_data['totalCost']
        g.tables[tableId].order = [items]
        g.tables[tableId].available = False 
        g.tables[tableId].price_sum = order_price
        return {"message" : f"Table{json_data['id']} successfully makes order"}

# @bp.route('/help',methods=['PATCH'])
# def help_option():
    elif request.method == "PATCH":
        json_data = request.json
        tableId = int(json_data['id']) - 1
        g.tables[tableId].updatehelp()
        if g.tables[tableId].help == True:
            return {"message" : f"Table{json_data['id']} needs help"}
        return {"message" : f"Table{json_data['id']} cancels help"}

# @bp.route('/checkout',methods=['GET'])
# def checkout():
#     #清空order ，available设置, 
#     json_data = request.json
#     tableId = int(json_data['id']) - 1
#     g.tables[tableId].available = True
#     g.tables[tableId].order = None
#     return {"Bill" : f"{g.tables[tableId].price_sum}"}
#     # allDishes = []
#     # for item in g.tables[tableId].order:
#     #     allDishes += item[:]
#     # ret = sumAllDishes(allDishes)
#     # res = jsonify(ret)
#     # res.headers.add("checkout", "*")
#     #return res

