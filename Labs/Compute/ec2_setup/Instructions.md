---
title: Amazon EC2 Setup Instructions
description: Step-by-step guide for launching and managing an EC2 instance.
type: content
path: /Labs/Compute/ec2_setup/Instructions.md
tags: [ec2, compute, aws, tutorial]
---

# 📖 Introduction to Amazon EC2

## 🔗 Navigation

- [⬆ Parent](./index.md)
- [🏠 Root](../../../index.md)
- [🖥️ Compute Hub](../../index.md)

---

## Overview
architectural diagram

This lab provided me with a basic overview of launching, resizing, managing, and monitoring an [Amazon EC2](../../../Labs/Compute/index.md) instance.

[Amazon EC2](../../../Labs/Compute/index.md) is a web service that provides resizable compute capacity in the cloud. It is designed to make web-scale cloud computing easier for developers.

Amazon EC2's simple web service interface allowed me to obtain and configure capacity with minimal friction. It provided me with complete control of my computing resources and let me run on Amazon's proven computing environment. Amazon EC2 reduced the time required to obtain and boot new server instances to minutes, allowing me to quickly scale capacity, both up and down, as my computing requirements changed.

Amazon EC2 changes the economics of computing by allowing you to pay only for capacity that you actually use. Amazon EC2 provides developers the tools to build failure resilient applications and isolate themselves from common failure scenarios.

## Topics covered
By the end of this lab, I was able to:

- Launch a web server with termination protection enabled
- Monitor My EC2 instance
- Modify the security group that my web server is using to allow HTTP access
- Resize my Amazon EC2 instance to scale
- Test termination protection
- Terminate my EC2 instance

## Duration
This lab took approximately 45 minutes to complete.

## Accessing the AWS Management Console
Instructions I followed to access the AWS Management Console and interpret lab status indicators.

## Task 1: Launching my EC2 instance
Steps I followed to launch an EC2 instance with termination protection and user data to deploy a simple web server.

Includes steps I performed:
- Naming the instance
- Choosing an AMI
- Choosing an instance type
- Configuring key pairs
- Configuring network settings & security group
- Adding storage
- Configuring advanced details with user data script
- Launching and verifying instance state

User Data script I used:
```
#!/bin/bash
yum -y install httpd
systemctl enable httpd
systemctl start httpd
echo '<html><h1>Hello From Your Web Server!</h1></html>' > /var/www/html/index.html
```

## Task 2: Monitor My Instance
Instructions I followed to monitor EC2 instance via Status checks, Monitoring (CloudWatch), and viewing console screenshot.

## Task 3: Update My Security Group and Access the Web Server
Steps I completed to open HTTP access on port 80 and view the web page served by the instance.

## Task 4: Resize My Instance: Instance Type and EBS Volume
Instructions I followed to stop the instance, change instance type, modify EBS volume, and start the instance again.

## Task 5: Test Termination Protection
Steps I took to attempt instance termination, disable termination protection, and terminate successfully.

## Lab Complete
Actions I took to end the lab.

## Additional Resources
List of AWS resource documentation links (text only).

© 2023 Amazon Web Services, Inc. and its affiliates.
