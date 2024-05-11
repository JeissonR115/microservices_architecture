from pymongo import MongoClient
from flask import Flask, request, jsonify
from flask_cors import CORS

class Server:
    def __init__(self, port, db_url=None, db_name=None, collection_name=None):
        self.port = port
        self.db_url = db_url
        self.db_name = db_name
        self.collection_name = collection_name
        self.server_running = False

    def start(self):
        self.setup_flask_app()
        self.setup_routes()
        self.listen_and_serve()

    def setup_flask_app(self):
        self.app = Flask(__name__)
        CORS(self.app)  # Habilita CORS para permitir solicitudes desde cualquier origen
        self.app.config['JSON_SORT_KEYS'] = False  # Desactiva la ordenación de claves JSON

    def setup_routes(self):
        @self.app.route('/')
        def index():
            message = 'Servidor en ejecución' 
            return f'<html><body><h1>{message}</h1></body></html>'
        
        @self.app.route('/delete', methods=['POST'])
        def delete():
            try:
                id_number = request.json.get('Documento')
                deleter = UserDeleter(db_url=self.db_url, db_name=self.db_name, collection_name=self.collection_name)
                result = deleter.delete_user(id_number)
                return jsonify(result), 200 if result['success'] else 400
            except Exception as e:
                return jsonify({'error': str(e)}), 400
            
    def listen_and_serve(self):
        attempts = 0
        max_attempts = 10
        retry_delay = 0.5
        while not self.server_running and attempts < max_attempts:
            try:
                self.app.run(port=self.port)
                self.server_running = True
            except Exception as e:
                if 'Address in use' in str(e):
                    print(f'El puerto {self.port} está ocupado. Cambiando al siguiente puerto.')
                    self.port += 1
                    attempts += 1
                else:
                    print(f'Error al iniciar el servidor: {e}')
                    break

class UserDeleter:
    def __init__(self, db_url, db_name, collection_name):
        self.db_url = db_url
        self.db_name = db_name
        self.collection_name = collection_name

    def delete_user(self, id_number):
        try:
            client = MongoClient(self.db_url)
            db = client[self.db_name]
            collection = db[self.collection_name]
            result = collection.delete_one({"Documento": id_number})
            if result.deleted_count == 1:
                return {"success": True, "message": f"User with idNumber {id_number} deleted successfully", "id": id_number}
            else:
                return {"success": False, "message": f"No user found with idNumber {id_number}"}
        except Exception as e:
            return {"success": False, "message": str(e)}

class Main:
    @staticmethod 
    def start_server():
        server = Server(
            port=3010, 
            db_url='mongodb+srv://ambidata2024:ambidata2024**@ambidata.vn0dlbx.mongodb.net/',
            db_name='ambidata',
            collection_name='UsuariosM'
        )
        server.start()

if __name__ == "__main__":
    Main.start_server()
