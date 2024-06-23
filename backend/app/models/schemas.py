from pydantic import BaseModel

class TaskStatus(BaseModel):
    task_id: str
    status: str
    image_url: str
    created_at: str
    title: str = ""
    progress: int = 0
    video_url: str = ""