#### Wait management system

#### Frontend

To run Frontend, make sure you have node >=12 and install yarn
If you are the first time run this project, you can use 

```shell
yarn
```

to make sure you have all dependency, 

after that,You can use

```shell
yarn dev	
```

to run the next.js app

The frontend will base on URL :

```
http://localhost:3000
```

Please make sure you use Chrome to open this url
our system contain four main page:

```
http://localhost:3000/customer
http://localhost:3000/staff/table
http://localhost:3000/kitchen/table
http://localhost:3000/manager/menu
```

you need to open this four pages

#### Backend

To run Frontend, make sure the running environment in our test is    

```
python                        3.9.12
Flask                         2.0.0
Flask-Cors                    3.0.10
Flask-Migrate                 3.1.0
Flask-SQLAlchemy              3.0.0
mysql  Ver 14.14 Distrib 5.7.36, for Win64 (x86_64)
```  
  

Create and initialize the database in the command prompt. Please run

```
python create_db.py
python init_menu.py
```  

Run the backend before lunching the frontend. Please run  
```
python app.py
```
The demo video for our waiting system is [link]



Enjoy your order! thx