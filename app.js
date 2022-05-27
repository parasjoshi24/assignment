const axios = require('axios');
const fs = require('fs');
const data = require('./parameterfile');
const dotenv = require('dotenv');
dotenv.config();

//default interval is set as 2000 milliseconds , this could changed from the command line terminal using INTERVAL=3000 node app.js
const interval = process.env.INTERVAL;
if (interval) {
  console.log(`Your periodic interval is ${interval}`);
  monitoringtool(data); 
} else {
  console.error(`ERRORS.please check your interval.`);
  process.exit(1);
}

//function will monitor websites and reports their availabilty
function monitoringtool(_data) {

//runs periodically and makes an HTTP request to each page with a given milliseconds delay
setInterval(() => {
for (const i in Object.values(data)){
  console.log(`checking the website ${Object.values(data)[i].name}`);

  //start time
  const start = Date.now()
  //check the endpoints
  axios
  .get(`https://${Object.values(data)[i].name}`)
  .then(response => {

    //finish time
    const finish = Date.now()
    //calculate the response time
    const time = (finish - start) / 1000
    console.log(`Response Time for ${Object.values(data)[i].name} is =======>  ${time}`)

    //check the response 
    if (`${response.status}` == 200) {
      console.log(`${Object.values(data)[i].name} website || statusText || ${response.statusText} statusCode || ${response.status}`)

      //fetch the identifier for the page check from the parameter file
      console.log(`For the website address ${Object.values(data)[i].name} , the content requirement is ======>  ${Object.values(data)[i].content}`)
      //check the page content requirements matches or not
      const pageContentCheck=response.data.includes(`${Object.values(data)[i].content}`);
      console.log(`Checking the website page content requirements pageContentCheck ${pageContentCheck}`)

      if(pageContentCheck){
        console.log(`Content requirements are fulfilled for ${Object.values(data)[i].name}`);
      }else { 
        console.log(`Content requirements are not fulfilled for ${Object.values(data)[i].name}`);
      }
    }else{
      console.error(`The web site is down or have errors due to other reasons,Please check.`)
    }
    try {
      //write to log file
      fs.writeFileSync('./app.log', `statusCode for ${Object.values(data)[i].name} || ${response.status} || Response Time: ${time} \n`, { flag: 'a+' });
    } catch (err) {
      console.error(err);
    }
  }).catch(error => {
    console.error(`${Object.values(data)[i].name} Website not found. Please check the errors in error.log`)
    //write to error log file
    fs.writeFileSync('./error.log', `statusCode for ${Object.values(data)[i].name}| ${error} | ${Date().toString()} \n`, { flag: 'a+' });
 })
}
}, `${interval}`)
}

