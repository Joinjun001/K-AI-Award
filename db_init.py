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
    
    # Create table welfare_benefits (drop and recreate to ensure schema alignment)
    cur.execute("DROP TABLE IF EXISTS welfare_benefits;")
    create_table_query = """
    CREATE TABLE welfare_benefits (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        title_vi VARCHAR(255),
        title_zh VARCHAR(255),
        title_en VARCHAR(255),
        category VARCHAR(100),
        region VARCHAR(100) DEFAULT '전국',
        source_url VARCHAR(512),
        
        -- Multi-language Summaries (Cached Translations)
        desc_ko TEXT,
        desc_vi TEXT,
        desc_zh TEXT,
        desc_en TEXT,
        
        -- Raw Korean descriptions from detailed Bokjiro API
        desc_outline TEXT,
        eligibility_dtl TEXT,
        selection_crit TEXT,
        welfare_content TEXT,
        
        -- Metadata Tags
        trgter_indvdl TEXT,
        life_array TEXT,
        onap_psblt_yn CHAR(1) DEFAULT 'N',
        
        -- Structural convenience data (JSONB)
        download_forms JSONB DEFAULT '[]'::jsonb,
        apply_method JSONB DEFAULT '[]'::jsonb,
        related_websites JSONB DEFAULT '[]'::jsonb,
        inquiry_contacts JSONB DEFAULT '[]'::jsonb,
        
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """
    cur.execute(create_table_query)
    
    # Create table user_account
    create_user_table_query = """
    CREATE TABLE IF NOT EXISTS user_account (
        username VARCHAR(50) PRIMARY KEY,
        password_hash VARCHAR(255),
        role VARCHAR(20) DEFAULT 'user',
        email VARCHAR(100) UNIQUE,
        full_name VARCHAR(100),
        profile_pic VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """
    cur.execute(create_user_table_query)
    
    # Run migrations to add columns if user_account table already existed
    try:
        cur.execute("ALTER TABLE user_account ADD COLUMN IF NOT EXISTS email VARCHAR(100) UNIQUE;")
        cur.execute("ALTER TABLE user_account ADD COLUMN IF NOT EXISTS full_name VARCHAR(100);")
        cur.execute("ALTER TABLE user_account ADD COLUMN IF NOT EXISTS profile_pic VARCHAR(255);")
        cur.execute("ALTER TABLE user_account ALTER COLUMN password_hash DROP NOT NULL;")
    except Exception as e:
        print("Migration warning on user_account table:", e)
        conn.rollback() # Rollback in case of failure so transaction remains valid
    
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
    
    # Create table user_translation_history
    create_history_table_query = """
    CREATE TABLE IF NOT EXISTS user_translation_history (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        source_text TEXT NOT NULL,
        lang VARCHAR(10) NOT NULL,
        result_data JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX IF NOT EXISTS idx_user_translation_history_username ON user_translation_history(username);
    """
    cur.execute(create_history_table_query)
    
    conn.commit()
    print("Database initialization complete.")
    
    cur.close()
    conn.close()

if __name__ == '__main__':
    init_db()

