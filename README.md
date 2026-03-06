# Project team members API


## What is Express.js?
Express is a fast, assertive, essential and moderate web framework of Node.js. You can assume express as a layer built on the top of the Node.js that helps manage a server and routes. It provides a robust set of features to develop web and mobile applications.

Let’s see some of the core features of Express framework

* It can be used to design single-page, multi-page and hybrid web applications.
* It allows to setup middleware to respond to HTTP Requests.
* It defines a routing table which is used to perform different actions based on HTTP method and URL.
* It allows to dynamically render HTML Pages based on passing arguments to templates.
<br />

## Express.js Architecture
![](https://s3-eu-west-1.amazonaws.com/jssolutions/Article_Photo/Mobile+app+development+with+Express.js/express+js+mobile+development.jpg)
<br />

## Advantages of Express.js?
* Ultra-fast I/O
* Asynchronous and single threaded
* MVC like structure
* Robust API makes routing easy
<br />

## Pre-requisites
Node.js should be installed. If you haven’t installed them, you can install from the below URLs.
* [Node.js](https://nodejs.org/en/download/package-manager/)
<br />


## Getting started
1. Clone this project to your computer \
2. Navigate to the project folder \
3. npm install
4. node index.js
5. server is running on http://localhost:3000/


## Testing via Postman
Now that everything is now connected, let’s test each of the routes and the respective methods.

## end points
1. Get all team members - /api/teamMembers
2. just one member - '/api/teamMembers/:id', for example - http://localhost:3000/api/teamMembers/12
3. Add a member - '/api/teamMembers', for example - http://localhost:3000/api/teamMembers
    body -  { "memberID": "18",
        "memberName": "Divya J",
        "yearsOfExperience": 6,
        "skillset": ["CSS", "HTML", "TS"],
        "description": "Front end dev",
        "projectStartDate": { "day": 1, "month": 1, "year": 2025 },
        "projectEndDate": { "day": 1, "month": 1, "year": 2026 },
        "allocationPercentage": 67
    }
4. Assign task - '/api/teamMembers/:id/assignTask', for example - http://localhost:3000/api/teamMembers/18/assignTask 
     body - {
        "memberID": "18",
        "taskName" : "test",
        "deliverables": "test del",
        "taskStartDate":  {
            "day": 1,
            "month": 1,
            "year": 2026
        },
        "taskEndDate": {
            "day": 1,
            "month": 3,
            "year": 2026
        }
    }

5. Update allocation percentage  - '/api/teamMembers/:id/allocation'  , http://localhost:3000/api/teamMembers/18/allocation  
    body -  {   "memberID": "18",
        "allocationPercentage": 100
    }
