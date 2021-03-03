echo "Deploying Frontend..."
cd frontend
export REACT_APP_API_URL=/api
sudo npm run build
aws s3 sync build/ s3://culturedfoodies-frontend --acl public-read