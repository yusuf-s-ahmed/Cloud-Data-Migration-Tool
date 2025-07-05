# Cloud Database Backup & Replication Tool Using Python, SQL, Django, FastAPI, and React

Inspired by my databases coursework at university, I developed a Cloud-Based SQL to NoSQL Data Migration Tool to simplify and automate the transfer of data from MySQL databases to MongoDB. This project addresses common migration challenges by offering a scalable solution that minimises downtime and preserves data integrity.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Technology Stack](#technology-stack)
- [Implementation Details](#implementation-details)
- [Challenges and Solutions](#challenges-and-solutions)
- [Impact](#impact)

## Overview

This project was designed to streamline the process of migrating structured SQL data into NoSQL environments. By automating the transformation and transfer process, the tool allows developers and database administrators to execute efficient, accurate migrations between MySQL and MongoDB systems with minimal manual effort.

## Features

- Automates the migration of specific datasets from MySQL to MongoDB with high accuracy.
- Supports transformation of hundreds of records within seconds.
- User interface allows users to input credentials, select tables, and define target collections.
- Built-in validation and error handling for schema mismatches, nulls, and nested data types.
- Prototyped with a focus on UX using Figma.

## System Architecture

The project follows a modular, cloud-based architecture:

- Frontend: React.js SPA for database selection and user input.
- API Gateway: FastAPI layer to interface with the backend logic.
- Backend: Django + Django REST Framework to handle parsing, transformation, and migration.
- Cloud Infrastructure: AWS EC2 instance with Nginx and Uvicorn for deployment and routing.

## Technology Stack

| Component              | Tools and Libraries                          |
|------------------------|---------------------------------------------|
| Backend Framework      | Python, Django, Django REST Framework        |
| API Interface          | FastAPI                                      |
| Database Drivers       | MySQL Connector, PyMongo                     |
| Frontend               | React.js, Axios                              |
| Cloud Infrastructure   | AWS EC2, Ubuntu 22.04, Nginx, Uvicorn        |
| UI/UX Design           | Figma                                        |
| Version Control        | GitHub                                       |

## Implementation Details

- Backend Logic: Wrote Django scripts to handle parsing of SQL schemas and transformation into MongoDB-compatible JSON structures.
- API Middleware: FastAPI layer routes requests between React frontend and Django backend, ensuring smooth communication and error handling.
- Cloud Deployment: Deployed to an AWS EC2 instance running Ubuntu. Configured Elastic IPs and Security Groups for reliable access. Nginx handles reverse proxy duties, while Uvicorn runs the asynchronous FastAPI service.
- Frontend: Designed a React.js interface where users can enter database credentials, select tables, and trigger the migration. Axios is used for async API calls.
- UX Prototyping: Used Figma to sketch out and validate the frontend flow before implementation, ensuring a smooth user experience.

## Challenges and Solutions

| Challenge                               | Solution                                                   |
|----------------------------------------|------------------------------------------------------------|
| Mapping relational to document schema  | Created flexible schema conversion logic with nested JSON  |
| Handling nulls and edge cases          | Implemented validation and fallback rules during parsing   |
| API communication between layers       | Used FastAPI to decouple React from Django backend         |
| Traffic routing and uptime             | Deployed Nginx with Uvicorn for reliable cloud performance |

## Impact

This project taught me how to integrate cloud infrastructure with full-stack engineering and data migration principles. I gained hands-on experience in building scalable backend systems, securing cloud deployments, and designing user-friendly interfaces for technical workflows. The tool reduces time and effort for businesses and developers looking to shift from relational databases to modern NoSQL systems.
