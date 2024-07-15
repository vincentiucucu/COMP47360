FROM python:3.12-slim

RUN apt-get update && apt-get install -y \
    binutils \
    gdal-bin \
    libproj-dev \
    libgdal-dev

WORKDIR /app
COPY . /app

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
