from redis import Redis
from rq import Queue
from app.core.config import Config


redis_conn = Redis(host=Config.REDIS_HOST, port= Config.REDIS_PORT, db=1)
jobs_queue_conn = Redis(host=Config.REDIS_HOST, port= Config.REDIS_PORT, db=0)
jobs_queue = Queue(connection=jobs_queue_conn)

connected_websockets = set()