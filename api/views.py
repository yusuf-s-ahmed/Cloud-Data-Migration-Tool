import mysql.connector
from pymongo import MongoClient
from rest_framework.decorators import api_view
from rest_framework.response import Response
from urllib.parse import urlparse, parse_qs
from django.shortcuts import render


def parse_mysql_conn_string(conn_string):
    """Parse the MySQL connection string and return parameters."""
    result = urlparse(conn_string)
    return {
        'host': result.hostname,
        'user': result.username,
        'password': result.password,
        'database': result.path[1:],  # Remove the leading '/'
        'port': result.port or 3306,   # Default to 3306 if no port is provided
    }

def parse_mongo_conn_string(conn_string):
    """Parse the MongoDB connection string and return parameters."""
    result = urlparse(conn_string)
    db_name = result.path[1:]  # Remove the leading '/'
    
    # Handle connection string options
    options = parse_qs(result.query)
    
    return {
        'host': result.hostname,
        'user': result.username,
        'password': result.password,
        'database': db_name,
        'options': options,  # Store query options for later use
        'is_srv': conn_string.startswith('mongodb+srv://')  # Check for SRV
    }

@api_view(['POST'])
def migrate_data(request):
    print("migrate_data called")
    mysql_conn_str = request.data.get('mysql_conn')
    mongo_conn_str = request.data.get('mongo_conn')
    mysql_table = request.data.get('mysql_table')
    mongo_collection_name = request.data.get('mongo_collection')

    if not mysql_conn_str or not mongo_conn_str or not mysql_table or not mongo_collection_name:
        return Response({"error": "MySQL and MongoDB connection strings, table name, and collection name must be provided."}, status=400)

    try:
        # Parse MySQL connection string
        mysql_params = parse_mysql_conn_string(mysql_conn_str)

        # Connect to MySQL
        with mysql.connector.connect(
            host=mysql_params['host'],
            user=mysql_params['user'],
            password=mysql_params['password'],
            database=mysql_params['database'],
            port=mysql_params['port']
        ) as mysql_conn:
            with mysql_conn.cursor() as mysql_cursor:
                # Execute query to fetch data from specified MySQL table
                mysql_cursor.execute(f"SELECT * FROM {mysql_table}")
                rows = mysql_cursor.fetchall()
                column_names = [i[0] for i in mysql_cursor.description]

        # Parse MongoDB connection string
        mongo_params = parse_mongo_conn_string(mongo_conn_str)

        # Connect to MongoDB
        if mongo_params['is_srv']:
            # Use SRV connection
            mongo_client = MongoClient(mongo_conn_str)
        else:
            # Regular connection
            mongo_uri = f"mongodb://{mongo_params['user']}:{mongo_params['password']}@{mongo_params['host']}/{mongo_params['database']}"
            mongo_client = MongoClient(mongo_uri)

        mongo_collection = mongo_client[mongo_params['database']][mongo_collection_name]

        # Convert rows to documents
        documents = [{column_names[i]: row[i] for i in range(len(row))} for row in rows]
        mongo_collection.insert_many(documents)

        return Response({"message": "Migration completed successfully."}, status=200)

    except mysql.connector.Error as db_err:
        return Response({"error": f"MySQL Error: {str(db_err)}"}, status=500)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
