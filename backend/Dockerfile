FROM python:3.8.0

WORKDIR /usr/src/app

# Backend setup
RUN pip install --upgrade pip

COPY requirements.txt /usr/src/app/requirements.txt
RUN pip install -r requirements.txt

COPY . .
RUN mkdir /usr/src/app/uploadings

# Setup yolo darknet
RUN apt update
RUN apt install -y git

RUN git clone https://github.com/AlexeyAB/darknet.git
RUN (cd /usr/src/app/darknet/ && make)

COPY neural_net/vehicle-yolov3.cfg /usr/src/app/darknet/cfg/vehicle-yolov3.cfg
COPY neural_net/vehicle.data /usr/src/app/darknet/data/vehicle.data
COPY neural_net/vehicle.names /usr/src/app/darknet/data/vehicle.names
COPY neural_net/vehicle-yolov3_last.weights /usr/src/app/darknet/vehicle-yolov3_last.weights

RUN chmod +x /usr/src/app/darknet/darknet

ENTRYPOINT [ "flask" ]
CMD ["run", "--host=0.0.0.0", "--port=3001"]
