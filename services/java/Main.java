import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.server.LocalServerPort;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.result.DeleteResult;
import org.bson.Document;

@SpringBootApplication
public class Main {

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
    
    @RestControllerAdvice
    class GlobalExceptionHandler {
        @ExceptionHandler(Exception.class)
        public ResponseEntity<Object> handleException(Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @RestController
    @CrossOrigin
    class UserController {

        @Value("${server.port}")
        private int serverPort;
        private final String dbUrl = "mongodb+srv://ambidata2024:ambidata2024**@ambidata.vn0dlbx.mongodb.net/";
        private final String dbName = "ambidata";
        private final String collectionName = "UsuariosM";

        @PostMapping("/delete")
        public ResponseEntity<Object> delete(@RequestBody Document document) {
            try {
                String idNumber = document.getString("Documento");
                MongoClient client = MongoClients.create(dbUrl);
                MongoDatabase db = client.getDatabase(dbName);
                MongoCollection<Document> collection = db.getCollection(collectionName);
                DeleteResult result = collection.deleteOne(new Document("Documento", idNumber));
                if (result.getDeletedCount() == 1) {
                    return ResponseEntity.ok().body(new Document("success", true)
                        .append("message", "User with idNumber " + idNumber + " deleted successfully")
                        .append("id", idNumber));
                } else {
                    return ResponseEntity.ok().body(new Document("success", false)
                        .append("message", "No user found with idNumber " + idNumber));
                }
            } catch (Exception ex) {
                return ResponseEntity.badRequest().body(ex.getMessage());
            }
        }

        @RequestMapping("/")
        @ResponseBody
        public String index() {
            return "<html><body><h1>Servidor en ejecución</h1></body></html>";
        }
    }
}
