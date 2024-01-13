import mysql.connector

# Koneksi ke database
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password=""
)

# Objek Kursor
mycursor = mydb.cursor()

# Query - membuat tabel
""" create_table_query = 
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255),
  email VARCHAR(255)
)
"""
mycursor.execute("SHOW DATABASES")

# menambahka data
# insert_data_query = "INSERT INTO user (username, email) VALUES (%s, %s)"
# user_data = ("Jafar_Ali", "jafarali@gmail.com")
# cursor.execute(insert_data_query, user_data)

# commit change
# mydb.commit()

# membaca data
# select_data_query = "SELECT * FROM users"
# cursor.execute(select_data_query)

# mengambil semua baris hasil
# result = cursor.fetchall()
for x in mycursor:
    print(x)

# Tutup kursor dan koneksi
# cursor.close()
# mydb.close()