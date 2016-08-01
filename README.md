# Intersiter

Intersiter orchestrates multi-site ACI fabrics by extending local EPGs to each multiple remote sites.

## How to install and run your own local version

As this is a client side application you need very little to host your own version:

- A web server (e.g. apache, nginx)

Expecting more? Not here! 

- Grab a copy of this repository (use Git to clone or download the .zip file) 

## Developing

First ensure that NodeJS and the node package manager (npm) are installed in your environment

`node --version`


`npm --version`

Clone the repository and change to labmanual directory

`git clone https://github.com/amney/intersiter.git`

`cd intersiter`

Install the required dependencies

`npm install`

Launch the development server

`npm run start`

Navigate to `http://127.0.0.1:8080`

## Building

The default gulp task does not produce production javascript.

To produce a production, minified version, run the following task

`npm run production`
