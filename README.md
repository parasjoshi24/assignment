# assignment
Implement a program that monitors web sites and reports their availability. This tool is intended as a monitoring tool for web site administrators for detecting problems on their sites.

## Prepare the Installation

Deployment has the following prerequisites:
* Docker insllation on your machine.

## Installation

 1. Clone the repository
    ```sh
    git clone https://github.com/parasjoshi24/assignment.git
    ```


 2. Build and Start the application  
     ```sh
       cd assignment
       docker build -t monitoringtool .
       docker images
       docker run --name monitoringtool -d -it monitoringtool

    ```   

 3. Configuration
 
    Website and page content information could be configured by modifying `parameterfile.js` file.

    ```sh
    docker container exec -it monitoringtool bash
    vi parameterfile.js
    ```

 4. Logs
    ```sh
      docker logs monitoringtool -f
    ```
 5. Check the log files
    ```sh
      docker container exec -it monitoringtool bash
      cat app.log
      cat error.log
    ```

## Without Docker installation

### prerequites

install the node 

### run the application
```sh
node app.js
```
### logs

cat app.log
cat error.log

### configure the Interval from command line

INTERVAL=3000 node app.js

## More Information

Please connect with me at https://www.linkedin.com/in/paras-joshi-00aa21179/