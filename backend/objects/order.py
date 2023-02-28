from datetime import datetime

class Order:
    def __init__(self, dish, bill):
        self.order_time = datetime.now()
        self.dish = [dish]
        self.completed = False
        self.bill = bill

    def add(self, dish):
        self.dish.append(dish)

    def updateCompleted(self):
        self.completed = True
