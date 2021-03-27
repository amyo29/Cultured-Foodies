# Sets up a Python and Linux environment
FROM nikolaik/python-nodejs

# Create Docker directory
COPY . /app
RUN ls
WORKDIR /app

# Install Python packages
RUN pip install -r ./backend/requirements.txt
RUN pip3 install psycopg2

# Run frontend server
RUN cd ./frontend && npm install && npm run build

# Expose port 5000 for Flask app
EXPOSE 5000

COPY . /app

# Runs <python app.py>
ENTRYPOINT [ "python" ]
CMD [ "./backend/app.py" ]
