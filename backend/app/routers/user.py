from fastapi import APIRouter, File, Form, UploadFile

import uuid
import os
import json
from datetime import datetime
from app.core.common import jobs_queue, redis_conn
from app.core.config import Config
from app.models.enums import JobStatus
from app.models.schemas import TaskStatus
from ai_engine.utils import process_image, create_task_status

router = APIRouter()


@router.get("/tasks", response_model=list[TaskStatus])
async def get_all_tasks():
    task_keys = redis_conn.keys()
    tasks = []
    for task_key in task_keys:
        task_id = task_key.decode("utf-8")
        task_status_str = redis_conn.get(task_id)
        if task_status_str:
            task_status = json.loads(task_status_str)
            tasks.append(TaskStatus(**task_status))
    return tasks


def save_uploaded_file(file: UploadFile, filename: str):
    # Ensure directory exists
    os.makedirs(Config.UPLOAD_DIR, exist_ok=True)
    file_path = os.path.join(Config.UPLOAD_DIR, filename)
    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())
    return file_path

@router.post("/upload")
async def upload_image(file: UploadFile = File(...), title: str = Form(...)):
    # Generate unique filename
    current_datetime = datetime.now()
    formatted_timestamp = current_datetime.strftime('%y%m%d%H%M%S')
    filename = f"{formatted_timestamp}_{file.filename}"

    file_path = save_uploaded_file(file, filename)

    task_id = str(uuid.uuid4())
    create_task_status(task_id, JobStatus.pending.value, title, image_url=file_path)
    
    # Add background task to jobs_queue
    jobs_queue.enqueue(process_image, task_id, file_path)

    return {"task_id": task_id, "filename": filename}