from flask import Blueprint, render_template,g, request,jsonify
import dbcurd
from objects import Table
bp = Blueprint("waiter", __name__, url_prefix="/table")

def Table2dict(id):
    return {
        "id": id,
        "helpNeeded": g.tables[id].help,
        "order": g.tables[id].order,
        "label" : g.tables[id].label,
        "available" : g.tables[id].available
    }

@bp.route('/',methods=['GET','POST'])
def index():
    if request.method == "GET":
        table_info = []
        size = len(g.tables)
        for i in range(size): 
            table_info.append(Table2dict(i))
        res = jsonify({"tableList" : table_info})
        res.headers.add('Table info', '*')
        return res
        

    # elif request.method == "PATCH":
    #     # This method is to cancel the help option after serving the customers
    #     json_data = request.json
    #     tableId = json_data["tableId"]
    #     g.tables[tableId].help = False 

    #     return {"message" : f"Table{tableId} cancels the help"}
    
    # elif request.method == "DELETE":
    #     #reset the table object to NONE
    #     json_data = request.json
    #     tableId = json_data["tableId"]
    #     g.tables[tableId] = None 

@bp.route('/order',methods=['POST'])
def finishOrder():
    json_data = request.json
    # print(json_data)
    tableId = int(json_data['tableId'])
    items = json_data
    order_price = items['totalCost']
    g.tables[tableId].order = items
    g.tables[tableId].available = False 
    g.tables[tableId].price_sum = order_price
    return {"message" : f"Table{tableId} successfully makes order"}

@bp.route('/<int:id>/help',methods=['POST'])
def toggleHelp(id):
    g.tables[id].help = not g.tables[id].help
    if g.tables[id].help == True:
        return {"message" : f"need"}
    return {"message" : f"cancel"}

@bp.route('/<int:id>/served',methods=['POST'])
def served(id):
    g.tables[id].order['orderStatus'] = "SERVED"
    return {"message" : f"Table{id} status changes to SERVED"}

@bp.route('/<int:id>/checkout',methods=['POST'])
def checkout(id):
    g.tables[id].order = None
    g.tables[id].available = True
    return {"Bill" : f"{g.tables[id].price_sum}"}
    return {"message" : f"Table{id} status changes to SERVED"}




