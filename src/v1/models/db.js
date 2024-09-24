import mysql from "mysql2";
import { configDotenv } from "dotenv";

configDotenv();

const connection = mysql.createConnection({
  host: "mysql_users_database",
  user: process.env?.MYSQL_USER || '',
  password: process.env?.MYSQL_PASSWORD || '',
  database: process.env?.MYSQL_DATABASE || '',
});

connection.connect((err) => {
  if (err) {
    console.error('¡No fué posible conectarse a la base de datos! ❌', err);
  } else {
    console.info('Conectado a MySQL ✅');
  }
});

export default connection;
