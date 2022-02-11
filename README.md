
# README - RTFMT Demo [Real Time Flood Monitoring Tool]

Live Demo Available -
- AWS - [Live Demo Hosted on AWS Instance](http://18.169.158.177/)

<img src="https://github.com/shez1461/rtfmt/blob/main/frontend/images/white_rt.png" width="250" height="250">
<img src="https://github.com/shez1461/rtfmt/blob/main/frontend/images/dark_rt.png" width="250" height="250">

Folders:
```sh
frontend/    # Frontend server uses live-server
```

### Initial setup & Environment used
`OS - Ubuntu 20.04 LTS`
`Editor - Visual Studio Code`
`Chromium: 91.0.4472.164`
`Node.js: 14.16.0`


## Data from Environment Agency GOV UK
A tool built using JavaScript/jQuery framework - User interface with an input to select station, plot (mASD)Readings in a line graph as stated in the test request and display data in associated table.


### Prerequisites
```sh
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt update
sudo apt-get install -y nodejs
```


### Setting up environment
To run this demo you must serve it from a server rather than the file system.
This demo requires webpack to build and run. To install webpack (and other dependencies) run:
```sh
> npm install
```
To run the demo, install and run Live Server:
```sh
> npm install live-server
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
