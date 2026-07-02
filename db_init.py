import psycopg2

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
    conn.commit()
    print("Database table 'welfare_benefits' created/verified successfully.")
    
    cur.close()
    conn.close()

if __name__ == '__main__':
    init_db()
