# User API web application

It is a basic NodeJS web application exposing REST API that creates and stores user parameters in [Redis database](https://redis.io/).

## Functionality

1. Start a web server
2. Create a user
2. Get a user

## Installation

This application is written on NodeJS and it uses Redis database.

1. [Install NodeJS](https://nodejs.org/en/download/)

2. [Install Redis](https://redis.io/download)

3. Install application

Go to the root directory of the application (where `package.json` file located) and run:

```
npm install 
```

## Usage

1. Start a web server

From the root directory of the project run:

```
npm start
```

It will start a web server available in your browser at http://localhost:8080.

2. Create a user

Send a POST (REST protocol) request using terminal:

```bash
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"sergkudinov","firstname":"sergei","lastname":"kudinov"}' \
  http://localhost:3000/user
```

It will output:

```
{"status":"success","msg":"OK"}
```

Another way to test your REST API is to use [Postman](https://www.postman.com/).



## Testing

From the root directory of the project, run:

```
npm test
```
<img width="617" alt="2024-05-17_162820" src="https://github.com/salimus06/DevOps-project-DSTI/assets/148533821/8b18c825-13d9-4d40-8548-34e9b15d2b98">

## CI/CD

/.github/workflows
/main.yml

![image](https://github.com/salimus06/DevOps-project-DSTI/assets/148533821/793850d6-6a7e-4e19-8f9d-daf891a6e960)

I have deployed theappication in Azure, here is the link to the application :


## Iac

Provision the VM with Ansible, which includes installing and running:

• language runtime  
• database  
• your application (use sync folders)  
• health check of your application  

To run the task below, i have created a yml file with ansible to create a VM in virtualbox.
Then use **vagant up** to create and provision the VM.

![image](https://github.com/salimus06/DevOps-project-DSTI/assets/148533821/c20985f1-b397-4e64-ab14-a07463e24a40)
![image](https://github.com/salimus06/DevOps-project-DSTI/assets/148533821/9c03f00c-be72-43b0-943f-7e708a3ee311)
![image](https://github.com/salimus06/DevOps-project-DSTI/assets/148533821/c10e3ef4-591d-46ca-b04a-32061a0e0e1f)

To start the application : put in a browser http://localhost:12345/
![image](https://github.com/salimus06/DevOps-project-DSTI/assets/148533821/ee840113-6338-4afb-9b0d-0e82f219f29e)

To check the health of  the application : put in a browser http://localhost:12345/health
![image](https://github.com/salimus06/DevOps-project-DSTI/assets/148533821/7e3323ca-3ef5-43c0-b662-2e2425650f00)

## Docker image

To create an image run this command : **docker build -t aksel .**

the tag the container by running :**docker tag aksel st5740526790/aksel**  
To log in to docker Hub run : **docker login**  
To push the image to Docker Hub run : **docker push st5740526790/aksel**  
 
This the link to the image in Docker Hub: https://hub.docker.com/repository/docker/st5740526790/aksel/general  

![image](https://github.com/salimus06/DevOps-project-DSTI/assets/148533821/10969b09-fc14-480e-a862-018fa400bd79)


## Docker compose

To create a docker compose that will start my application, you can apply this command: **docker-compose up**

![image](https://github.com/salimus06/DevOps-project-DSTI/assets/148533821/a9ced8ed-c9c3-4eb5-821b-6fd33308daf1)

Then you can listen the application locally here : localhost:5000

## docker orchestration using Kubernetes

I assume that minikube is setted up :

To create docker orchestration using kubernetes run these commands:

**minikube start**    
**kubectl apply -f pv.yml**   
**kubectl apply -f pvc.yml**   
**kubectl apply -f service.yaml**    
**kubectl apply -f deployment.yaml**  


To reach the application loccaly  run : **minikube service salimus-service**

![image](https://github.com/salimus06/DevOps-project-DSTI/assets/148533821/ce221ca2-2e5d-44bb-95b1-408e311a4a08)

the permanent storage mounted :

![image](https://github.com/salimus06/DevOps-project-DSTI/assets/148533821/96abffca-049a-4773-8104-94a3ece6c844)

## Make a service mesh using Istio

I assumme that the envirnment to use Istio in configured.

I have created 2 versions of my application and pushed them to dockerhub
https://hub.docker.com/repository/docker/st5740526790/istio/general
![image](https://github.com/salimus06/DevOps-project-DSTI/assets/148533821/de634b91-c537-4125-a421-0f978330a187)

 kubectl apply -f istiodeployment.yml
![image](https://github.com/salimus06/DevOps-project-DSTI/assets/148533821/ca80a032-8614-4867-bcf8-9d31552d245f)
![image](https://github.com/salimus06/DevOps-project-DSTI/assets/148533821/ec9d298b-f577-4bee-a1f0-7027fe563b31)
![image](https://github.com/salimus06/DevOps-project-DSTI/assets/148533821/9c9a8c65-19e8-48e4-8804-0d677985138c)

To open the applications to the outside traffic, i have created an istion ingress gateway

kubectl apply -f -gateway.yml

![image](https://github.com/salimus06/DevOps-project-DSTI/assets/148533821/1e578e88-9810-4863-b7e2-c4b0bcea691d)

I have created the destination (V1, V2), to configure them run : **kubectl apply -f destination.yml**


![image](https://github.com/salimus06/DevOps-project-DSTI/assets/148533821/ea39c13d-10fe-4078-91b6-abb44e162957)

Then i have configured the traffic shiffting between the 2 version.

**kubectl apply -f virtuals.yaml** (traffic only to V1)  
**kubectl apply -f virtuals1.yaml** (50% V1 & 50 & V2)

to launch the kiali dashboard:

istioctl dashboard kiali

Then open a tunnel to the localhost to access the application from the outside.  by running :**minikube tunnel**

Then, to create the traffic, open a browser and put : **http://127.0.0.1/**

After, you can apply virtuals1.yaml, you will have this traffic routing.

![image](https://github.com/salimus06/DevOps-project-DSTI/assets/148533821/1392962a-4b72-4c9f-aa9d-c61d7957f25a)

 ## Implement Monitoring to your containerized application

 Run this commande docker-compose up

![image](https://github.com/salimus06/DevOps-project-DSTI/assets/148533821/2d55e968-564e-4b64-b601-9d712e8c0c41)
go to prometheus and chech the status of the application:
![image](https://github.com/salimus06/DevOps-project-DSTI/assets/148533821/4eaf1d17-60dc-4e59-9d18-fa67923d98cf)

After linking Prometheus to Grafana, i created a dashboard  and an  alert to track the application status:
![image](https://github.com/salimus06/DevOps-project-DSTI/assets/148533821/e8620cdb-e416-4b95-baee-fe6101049fce)


![image](https://github.com/salimus06/DevOps-project-DSTI/assets/148533821/74a6e767-c182-446d-81fc-d426f20048c9)
![image](https://github.com/salimus06/DevOps-project-DSTI/assets/148533821/7c3a9857-0ba4-4a42-94ea-82b71addbeee)
![image](https://github.com/salimus06/DevOps-project-DSTI/assets/148533821/132f20f4-3150-4b01-9ba9-5640688bb788)

After running down the application i get an alert:

![image](https://github.com/salimus06/DevOps-project-DSTI/assets/148533821/187b0e2b-0344-4a00-b836-2d31bdcfcc0a)








