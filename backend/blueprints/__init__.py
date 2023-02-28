#此文件目的是方便外部(如app.py)导入蓝图下的python文件

from .kitchen import bp as kitchen_bp
from .customer import bp as customer_bp
from .manager import bp as manager_bp
from .waiter import bp as waiter_bp
from .menu import bp as menu_bp
