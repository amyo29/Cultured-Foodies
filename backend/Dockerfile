# Sets up a Python and Linux environment
FROM nikolaik/python-nodejs

# Create the Docker directory
COPY . /app
RUN ls
WORKDIR /app

# Install Python packages
RUN pip install -r requirements.txt
RUN pip3 install psycopg2

# Expose port 5000 for Flask app
EXPOSE 5000

COPY . /app

# Run "python app.py"
ENTRYPOINT [ "python" ]
CMD [ "app.py" ]