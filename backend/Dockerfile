FROM ultralytics/ultralytics:8.3.116-cpu
WORKDIR /app
COPY requirements.txt .

RUN pip install --no-cache-dir flask flask-cors
COPY . .

RUN mkdir uploads

EXPOSE 8080
CMD ["python", "main.py"]