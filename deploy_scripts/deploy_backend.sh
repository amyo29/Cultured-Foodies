# script to deploy backend
cd ../frontend
sudo npm install
sudo npm run build
cd ../backend
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 874974266421.dkr.ecr.us-east-1.amazonaws.com
docker build -t culturedfoodies-backend .
docker tag culturedfoodies-backend:latest 874974266421.dkr.ecr.us-east-1.amazonaws.com/culturedfoodies-backend:latest
docker push 874974266421.dkr.ecr.us-east-1.amazonaws.com/culturedfoodies-backend:latest
pip3 install awsebcli
cd aws_deploy
#eb init (only needed the first time you initialize)
eb deploy