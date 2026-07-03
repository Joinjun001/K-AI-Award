import psycopg2
import hashlib

def init_db():
    conn = psycopg2.connect(
        host='127.0.0.1',
        port=5432,
        user='daon_user',
        password='your_strong_password',
        dbname='daondb'
    )
    cur = conn.cursor()
    
    # Create table welfare_benefits
    create_table_query = """
    CREATE TABLE IF NOT EXISTS welfare_benefits (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100),
        min_age INTEGER DEFAULT 0,
        max_age INTEGER DEFAULT 18,
        max_income INTEGER DEFAULT 150,
        region VARCHAR(100),
        desc_ko TEXT,
        desc_vi TEXT,
        desc_zh TEXT,
        desc_en TEXT,
        eligibility TEXT,
        source_url VARCHAR(512),
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """
    cur.execute(create_table_query)
    
    # Create table user_account
    create_user_table_query = """
    CREATE TABLE IF NOT EXISTS user_account (
        username VARCHAR(50) PRIMARY KEY,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """
    cur.execute(create_user_table_query)
    
    # Create default admin account if not exists
    admin_username = 'admin'
    admin_password = 'admin123'
    admin_pw_hash = hashlib.sha256(admin_password.encode('utf-8')).hexdigest()
    
    cur.execute("SELECT username FROM user_account WHERE username = %s;", (admin_username,))
    if not cur.fetchone():
        cur.execute(
            "INSERT INTO user_account (username, password_hash, role) VALUES (%s, %s, %s);",
            (admin_username, admin_pw_hash, 'admin')
        )
        print("Default admin user created successfully.")
    
    conn.commit()
    print("Database initialization complete.")
    
    cur.close()
    conn.close()

if __name__ == '__main__':
    init_db()

