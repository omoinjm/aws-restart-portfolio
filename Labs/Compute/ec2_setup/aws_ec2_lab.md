# Introduction to Amazon EC2

## Overview
architectural diagram

This lab provides you with a basic overview of launching, resizing, managing, and monitoring an Amazon EC2 instance.

Amazon Elastic Compute Cloud (Amazon EC2) is a web service that provides resizable compute capacity in the cloud. It is designed to make web-scale cloud computing easier for developers.

Amazon EC2's simple web service interface allows you to obtain and configure capacity with minimal friction. It provides you with complete control of your computing resources and lets you run on Amazon's proven computing environment. Amazon EC2 reduces the time required to obtain and boot new server instances to minutes, allowing you to quickly scale capacity, both up and down, as your computing requirements change.

Amazon EC2 changes the economics of computing by allowing you to pay only for capacity that you actually use. Amazon EC2 provides developers the tools to build failure resilient applications and isolate themselves from common failure scenarios.

## Topics covered
By the end of this lab, you will be able to:

- Launch a web server with termination protection enabled
- Monitor Your EC2 instance
- Modify the security group that your web server is using to allow HTTP access
- Resize your Amazon EC2 instance to scale
- Test termination protection
- Terminate your EC2 instance

## Duration
This lab takes approximately 45 minutes to complete.

## Accessing the AWS Management Console
Instructions on accessing the AWS Management Console and interpreting lab status indicators.

## Task 1: Launching your EC2 instance
Steps to launch an EC2 instance with termination protection and user data to deploy a simple web server.

Includes steps for:
- Naming the instance
- Choosing an AMI
- Choosing an instance type
- Configuring key pairs
- Configuring network settings & security group
- Adding storage
- Configuring advanced details with user data script
- Launching and verifying instance state

User Data script:
```
#!/bin/bash
yum -y install httpd
systemctl enable httpd
systemctl start httpd
echo '<html><h1>Hello From Your Web Server!</h1></html>' > /var/www/html/index.html
```

## Task 2: Monitor Your Instance
Instructions to monitor EC2 instance via Status checks, Monitoring (CloudWatch), and viewing console screenshot.

## Task 3: Update Your Security Group and Access the Web Server
Demonstration of opening HTTP access on port 80 and viewing the web page served by the instance.

## Task 4: Resize Your Instance: Instance Type and EBS Volume
Instructions to stop the instance, change instance type, modify EBS volume, and start the instance again.

## Task 5: Test Termination Protection
Instructions to attempt instance termination, disable termination protection, and terminate successfully.

## Lab Complete
Instructions to end the lab.

## Additional Resources
List of AWS resource documentation links (text only).

© 2023 Amazon Web Services, Inc. and its affiliates.
