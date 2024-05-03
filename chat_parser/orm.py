from sqlalchemy import create_engine, Column, Boolean, String, Integer
from sqlalchemy.orm import DeclarativeBase, Session


from config import DB_PASSWORD, DB_USER, DB_DATABASE, DB_HOST, DB_PORT

engine = create_engine(
    f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_DATABASE}",
    isolation_level = "REPEATABLE READ"
)

session = Session(bind=engine)

class Base(DeclarativeBase):
    pass

class Chanel(Base):
    __tablename__ = "Channel"

    id = Column(Integer, primary_key=True, autoincrement=True)
    User_id = Column(Integer)
    Category = Column(String)
    language = Column(String)
    price = Column(Integer)
    id_telegram = Column(Integer, unique=True)
    desc_channel = Column(String)
    name_channel = Column(String)
    link_Cannel  = Column(String)
    link_Type_Boolean = Column(Boolean)
    url_Image_Channel = Column(String)
    public_type = Column(Boolean)

class User(Base):
    __tablename__ = "User"

    User_id = Column(Integer, primary_key=True, autoincrement=True)
    id_telegram = Column(Integer, unique=True)
    link_image = Column(String)
    user_name = Column(String, unique=True)


class Secrets(Base):
    __tablename__ = "Connect"

    id = Column(Integer, primary_key=True, autoincrement=True)
    token = Column(String, unique=True)
    telegram_id = Column(Integer)
    

"""
class Сhannel(Base):
    __tablename__ = "Channel"

    id = Column(Integer, primary_key=True, autoincrement=True)

    channel_id = Column(Integer, unique=True)
    owner_id = Column(Integer)

    category = Column(String)
    language = Column(String)
    price = Column(Integer)

    name = Column(String)
    description = Column(String)
    invite_link = Column(String)
    private = Column(Boolean)
    avatar = Column(String)


class User(Base):
    __tablename__ = "User"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, unique=True)
    avatar = Column(String)
    username = Column(String, unique=True)
    
"""