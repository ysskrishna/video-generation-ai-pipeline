import os
from dotenv import load_dotenv
load_dotenv()

class Config(object):
    UPLOAD_DIR = os.getenv('UPLOAD_DIR')
    REDIS_HOST = os.getenv('REDIS_HOST')
    REDIS_PORT = int(os.getenv('REDIS_PORT'))