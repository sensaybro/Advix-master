from sqlalchemy import create_engine, Column, Boolean, String, Integer, DateTime, BigInteger, ForeignKey
from sqlalchemy.orm import DeclarativeBase, Session, relationship

from datetime import datetime

from config import DB_PASSWORD, DB_USER, DB_DATABASE, DB_HOST, DB_PORT

engine = create_engine(
    f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_DATABASE}",
    isolation_level = "REPEATABLE READ"
)

session = Session(bind=engine)

class Base(DeclarativeBase):
    pass

class Chanel(Base):
    __tablename__ = 'Channel'

    id = Column(Integer, primary_key=True, autoincrement=True)
    User_id = Column(BigInteger)
    Category = Column(String, default='')
    language = Column(String, default='')
    name_channel = Column(String, default='')
    id_telegram = Column(BigInteger, unique=True, default=0)
    desc_channel = Column(String, default='')
    link_Cannel = Column(String, default='')
    link_Type_Boolean = Column(Boolean, default=False)
    url_Image_Channel = Column(String, default='')
    public_type = Column(Boolean, default=False)
    count_subscribers = Column(Integer, default=0)
    views = Column(Integer, default=0)
    reactions = Column(Integer, default=0)
    posts_count = Column(Integer, default=0)
    ERR = Column(Integer, default=0)
    position = Column(Integer)
    default_price = Column(Integer, default=0)
    default_time_day = Column(Integer, default=0)
    hot_price = Column(Integer, default=0)
    CPM = Column(Integer, default=0)
    hot_state = Column(Boolean, default=False)
    verified = Column(Integer)
    
class User(Base):
    __tablename__ = "User"

    User_id = Column(Integer, primary_key=True, autoincrement=True)
    id_telegram = Column(BigInteger, unique=True)
    link_image = Column(String)
    user_name = Column(String, unique=True)
    is_premium = Column(Boolean)

class Secrets(Base):
    __tablename__ = "Connect"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    token = Column(String, unique=True)
    telegram_id = Column(String)
    

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