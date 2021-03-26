# Sets up a python and linux environment
FROM nikolaik/python-nodejs

# Install Curl, Git, OpenSSL (AWS Amplify requirements) 
# RUN apt-get install curl 
# RUN apt-get install git 
# RUN apt-get install openssl 

COPY . /app
RUN ls
WORKDIR /app

# WORKDIR /backend
# COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt
RUN pip3 install psycopg2

EXPOSE 5000
COPY . /app

# EXPOSE 5000
# COPY . .

CMD ["gunicorn", "wsgi:app", "-w 2", "-b 0.0.0.0:5000", "-t 30"]