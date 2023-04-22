# Installation

1. Node.Js version **14.15** is **required !!!**
2. create ```.env``` file from ```.env.example``` file
3. set ```REACT_APP_API_ENDPOINT``` and ```SCHEMA_ENDPOINT``` variables
   to ```https://"__domain_of_laravel_backend_or_ip_with_port"/graphql```
4. set ```REACT_APP_PUSHER_ENV_WSPORT``` and ```REACT_APP_PUSHER_ENV_WSPORT``` variables to the port number of running
   websockets server
5. set ```REACT_APP_PUSHER_ENV_WSHOST``` variable to domain or ip address of running websockets server
6. set ```REACT_APP_PUSHER_ENV_KEY``` and ```REACT_APP_PUSHER_ENV_CLUSTER``` variables equivalent to
   the ```PUSHER_APP_KEY``` and ```PUSHER_APP_CLUSTER``` variables in your laravel backend ```.env```
7. run ```npm install``` to install dependencies from package.json
8. run ```npm run generate``` to generate graphql queries mutation hooks and types
9. run ```npm run start``` for local development or ```npm run build``` for production
10. if build failed, check if Node.Js version is 14.15
11. if it failed on allocated memory try to increase memory with command ```NODE_OPTIONS=–max-old-space-size=5048```
12. in production don't forget set vhost on /build folder of your built application