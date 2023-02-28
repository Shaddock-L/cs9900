from flask import Blueprint, render_template,g, request,jsonify
import dbcurd
from objects import Table
bp = Blueprint("kitchen", __name__, url_prefix="/kitchen")

def Table2dict(id):
    return {
        "tableId": id,
        "Status": g.tables[id].status,
        "Order": g.tables[id].order,
        "label" : g.tables[id].label
    }

@bp.route('/',methods=['GET','POST', 'PATCH'])
def index():
    if request.method == "GET":
        table_info = []
        size = len(g.tables)
        for i in range(size): 
            # if g.tables[i].available == False:
            #     table_info.append(None)
            # else:
            table_info.append(Table2dict(i))
        idx = range(size)
        ret = dict(zip(idx, table_info))
        res = jsonify(ret)
        res.headers.add('Table info', '*')
        return res
    elif request.method == "POST":
        # modify the order status
        json_data = request.json
        tableId = int(json_data["tableId"]) - 1
        status = json_data["status"]
        g.tables[tableId].status = status
        return {"message" : f"Update order status of table {tableId + 1} to {status}"}
        
        

