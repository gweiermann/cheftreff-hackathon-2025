from ultralytics import YOLO

model = None

def load_model(model_path):
    return YOLO('model.pt')

def predict_count(file_path):
    global model
    if model is None:
        model = load_model('model-v2.pt')
    results = model(file_path)
    num_boxes = len(results[0].boxes)
    return num_boxes