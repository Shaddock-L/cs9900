from Enum import Status

class Table:
    def __init__(self, labelId):
        self.available = True 
        self.help = False
        self.label = f"Table {labelId}"
        self.status = "CREATED"
        self.order = None
        self.price_sum = 0

    def updatehelp(self):
        self.help = not self.help


