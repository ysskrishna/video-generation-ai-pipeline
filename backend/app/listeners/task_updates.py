import json
import asyncio
from app.core.common import redis_conn, connected_websockets 
from app.models.enums import OperationType

def task_updates_listener():
    pubsub = redis_conn.pubsub()
    pubsub.subscribe('task_updates')
    for message in pubsub.listen():
        if message['type'] == 'message':
            try:
                task_status_new = json.loads(message['data'])
                task_id = task_status_new.get('task_id')
                operation_type = task_status_new.pop('operation_type', None)

                if operation_type == OperationType.create.value:
                    task_status_merged = task_status_new
                elif operation_type == OperationType.update.value:
                    current_data = redis_conn.get(task_id)
                    if current_data:
                        task_status_old = json.loads(current_data)
                        task_status_merged = {**task_status_old, **task_status_new}
                    else:
                        print(f"couldnt fetch old data from redis for task_id: {task_id}")
                        continue
                else:
                    print(f"operation_type: {operation_type} not defined")
                    continue

                # Update the redis db
                redis_conn.set(task_id, json.dumps(task_status_merged))
                # notify clients
                asyncio.run(notify_clients(task_status_merged))
            except json.JSONDecodeError as e:
                print(f"JSON decoding error: {e}")
            except Exception as e:
                print(f"Exception occurred in task_updates_listener: {e}")

async def notify_clients(task_status: dict):
    # Notify all connected clients about task status update
    for websocket in connected_websockets.copy():
        try:
            await websocket.send_json(task_status)
        except Exception as e:
            print(f"Error sending message to websocket: {e}")
            connected_websockets.remove(websocket)
