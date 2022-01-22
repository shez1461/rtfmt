
# README - RTFMT Demo [Real Time Flood Monitoring Tool]
## Data from Environment Agency GOV UK
Technical interview task - A RTFMT tool built in JavaScript/jQuery framework - User interface with an input to select station, plot (mASD)Readings in a line graph as stated in the test request and display data in associated table.


### Prerequisites
```sh
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt update
sudo apt-get install -y nodejs npx
```


### Setting up environment
To run this demo you must serve it from a server rather than the file system.
This demo requires webpack to build and run. To install webpack (and other dependencies) run:
```sh
> npm install
```
To run the demo, install and run Live Server:
```sh
> npm install -g live-server
> npx live-server
```
Live Server will automatically open a new browser tab on your default web browser at:
- http://localhost:8080


### Or Enter URL into web browser manually:

```sh
http://<ip address>:8080
ie;
http://127.0.0.1:8080
or
http://localhost:8080
```


#### Author - [Mohamed Shez](https://github.com/shez1461)
These APIs are provided as open data under the Open Government Licence with no requirement for registration. If you make use of this data please acknowledge this with the following attribution statement - "this uses Environment Agency flood and river level data from the real-time data API (Beta)"