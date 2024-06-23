import sys
import os

current_directory = os.path.dirname(os.path.abspath(__file__))
parent_directory = os.path.dirname(current_directory)
sys.path.append(parent_directory)
print(sys.path)

from rq import Worker, Queue, Connection
from app.core.common import jobs_queue_conn

listen = ['default']

if __name__ == '__main__':
    with Connection(jobs_queue_conn):
        worker = Worker(list(map(Queue, listen)))
        worker.work()