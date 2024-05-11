from flask import Flask
from pymongo import MongoClient

class DataBase:
    def __init__(self, url, db_name, collections):
        self.client = MongoClient(url)
        self.db = self.client[db_name]
        self.collections = collections

class Server:
    def __init__(self, port, db):
        self.app = Flask(__name__)
        self.port = port
        self.db = db

    def start(self):
        @self.app.route("/")
        def hello():
            return "Hello, World!"

        self.app.run(port=self.port)

data_base = DataBase(
    url='mongodb+srv://ambidata2024:ambidata2024**@ambidata.vn0dlbx.mongodb.net/',
    db_name='ambidata',
    collections={
        'sensorData': 'sensorData',
        'users': 'users',
        'UsuariosM': 'UsuariosM'
    }
)

class Main:
    @staticmethod 
    def start_server():
        server = Server(port=3000, db=data_base)
        server.start()

if __name__ == "__main__":
    Main.start_server()
