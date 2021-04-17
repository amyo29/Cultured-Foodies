# DOCKER
docker-build:
	docker build -t culturedfoodies-backend .

docker-run:
	docker run -p 5000:5000 culturedfoodies-backend

docker-compose:
	docker-compose up --build --force-recreate

# FORMAT
format:
	python3 -m black ./backend/*.py

# BACKEND
setup-backend:
	pip install -r backend/requirements.txt
	pip install psycopg2

run-backend:
	cd backend && python3 app.py

# FRONTEND
setup-frontend:
	cd frontend && npm install 

run-frontend:
	cd frontend && npm start

build-frontend:
	cd frontend && npm build

# BOTH FRONTEND AND BACKEND
setup:
	pip install -r backend/requirements.txt
	pip install psycopg2
	cd frontend && npm install

run-website:
	python ./backend/app.py
	echo "Running backend..."
	cd frontend && npm start
	echo "Running frontend..."

# TESTS
python-unit-tests:
	echo "Running Python unit tests..."
	python3 backend/tests.py

python-mock-db-unit-tests:
	echo "Running Python mock db unit tests..."
	python3 backend/mockdbtests.py

selenium-tests:

	echo "Running Selenium tests..."
	python3 frontend/selenium_tests.py

postman-tests:
	echo "Running Postman tests..."
	newman run Postman.json

jest-tests:
	echo "Running Jest tests..."
	cd frontend && npm run test

