import time
import json
from datetime import datetime
from app.models.enums import JobStatus, OperationType
from app.core.common import redis_conn



async def process_image(task_id: str, file_path: str):
    try:
        print(f"processing started for task: {task_id}, file_path: {file_path}")
        # Simulate image processing - video generation
        for i in range(10):
            time.sleep(3)  # Simulate processing every 3 seconds
            current_progress = (i + 1) * 10  # Progress in percentage (10% increments)
            update_task_status(task_id, JobStatus.pending.value, current_progress)

        # generated video link
        video_url = "https://www.youtube.com/watch?v=a7Nw_3zDC7A"
        print(f"Image processed successfully for task: {task_id}, file_path: {file_path}")
        update_task_status(task_id, JobStatus.success.value, 100, video_url=video_url)

    except Exception as e:
        print(f"Error processing image for task: {task_id}, file_path: {file_path}, error: {e}")
        update_task_status(task_id, JobStatus.failed.value, 0)



def update_task_status(task_id: str, status: str, progress: int, video_url: str = ""):
    task_status = {
        "task_id": task_id,
        "status": status,
        "progress": progress,
        "video_url": video_url,
        "operation_type": OperationType.update.value
    }
    print(f"Updated task : {task_id}, progress: {progress}")
    redis_conn.publish('task_updates', json.dumps(task_status))


def create_task_status(task_id: str, status: str, title: str, image_url: str):
    task_status = {
        "task_id": task_id,
        "status": status,
        "title": title,
        "image_url": image_url,
        "progress": 0,
        "video_url": "",
        "created_at": datetime.now().isoformat(),
        "operation_type": OperationType.create.value
    }
    print(f"Created task : {task_id}")
    redis_conn.publish('task_updates', json.dumps(task_status))

