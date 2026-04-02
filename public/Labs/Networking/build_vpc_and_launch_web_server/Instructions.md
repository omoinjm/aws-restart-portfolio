---
title:Build Your VPC and Launch a Web Server Instructions
description: Step-by-step guide for launching an Amazon Elastic Compute Cloud (Amazon EC2) instance into a VPC.
type: content
path: /Labs/Networking/build_vpc_and_launch_web_server/Instructions.md
tags: [networking, aws, ec2, vpc, luanch, web_server]
---

# 📖 Build Your VPC and Launch a Web Server

## 🔗 Navigation

- [⬆ Parent](./README.md)
- [🏠 Root](../../../README.md)
- [🌐 Networking Hub](../../README.md)

---

### Objectives
After completing this lab, you should be able to:
* Create a virtual private cloud (VPC)
* Create subnets
* Configure a security group
* Launch an Amazon Elastic Compute Cloud (Amazon EC2) instance into a VPC

---

### Scenario
In this lab, you use **Amazon Virtual Private Cloud (VPC)** to create a customized network for a Fortune 100 customer. You will also create security groups and configure an EC2 instance to run a web server within this architecture.

> **AWS Service Restrictions:** Access may be restricted to specific services required for this lab. You may encounter errors if attempting to perform actions outside these instructions.

---

### Task 1: Create your VPC
In this task, you use the VPC Wizard to create a VPC, an internet gateway, and two subnets in a single Availability Zone.

1.  In the **AWS Management Console**, search for **VPC**.
2.  Choose **Create VPC** and configure:
    * **Resources to create:** VPC and more
    * **Name tag auto-generation:** Uncheck "Auto-generate"
    * **IPv4 CIDR:** `10.0.0.0/16`
    * **IPv6 CIDR block:** No IPv6 CIDR block
    * **Tenancy:** Default
    * **Number of Availability Zones (AZs):** 1
    * **Number of public subnets:** 1
    * **Number of private subnets:** 1
3.  Expand **Customize subnets CIDR blocks**:
    * **Public subnet CIDR:** `10.0.0.0/24`
    * **Private subnet CIDR:** `10.0.1.0/24`
    * **NAT gateways:** In 1 AZ
    * **VPC endpoints:** None
4.  In the **Preview pane**, name the resources:
    * **VPC:** `Lab VPC`
    * **Public Subnet:** `Public Subnet 1`
    * **Private Subnet:** `Private Subnet 1`
    * **Public Route Table:** `Public Route Table`
    * **Private Route Table:** `Private Route Table`
5.  Choose **Create VPC**, then **View VPC**.

---

### Task 2: Create Additional Subnets
Create two additional subnets in a second Availability Zone for high availability.

1.  In the left pane, choose **Subnets** > **Create subnet**.
2.  **Public Subnet 2:**
    * **VPC ID:** `Lab VPC`
    * **Subnet name:** `Public Subnet 2`
    * **IPv4 CIDR block:** `10.0.2.0/24`
3.  **Private Subnet 2:**
    * **VPC ID:** `Lab VPC`
    * **Subnet name:** `Private Subnet 2`
    * **IPv4 CIDR block:** `10.0.3.0/24`
4.  Choose **Create subnet**.

---

### Task 3: Associate the Subnets and Add Routes
1.  Choose **Route Tables** > **Public Route Table**.
2.  In the **Subnet associations** tab, select **Edit subnet associations**.
3.  Select **Public Subnet 2** and choose **Save associations**.
4.  Repeat for **Private Route Table**, associating it with **Private Subnet 2**.

---

### Task 4: Create a VPC Security Group
1.  Choose **Security Groups** > **Create security group**.
2.  **Details:**
    * **Name:** `Web Security Group`
    * **Description:** `Enable HTTP access`
    * **VPC:** `Lab VPC`
3.  **Inbound rules** > **Add rule**:
    * **Type:** HTTP
    * **Source:** Anywhere IPv4 (`0.0.0.0/0`)
    * **Description:** `Permit web requests`
4.  Choose **Create security group**.

---

### Task 5: Launch a Web Server Instance
1.  Search for **EC2** and choose **Instances** > **Launch instances**.
2.  **Configuration:**
    * **Name:** `Web Server 1`
    * **AMI:** `Amazon Linux 2 AMI (HVM)`
    * **Instance type:** `t3.micro`
    * **Key pair:** `vockey`
3.  **Network settings** (Choose **Edit**):
    * **VPC:** `Lab VPC`
    * **Subnet:** `Public Subnet 2`
    * **Auto-assign public IP:** Enable
    * **Firewall:** Select existing security group (`Web Security Group`)
4.  **Advanced details** > **User data**:
    ```bash
    #!/bin/bash
    yum install -y httpd mysql php
    wget https://aws-tc-largeobjects.s3.us-west-2.amazonaws.com/CUR-TF-100-RESTRT-1/267-lab-NF-build-vpc-web-server/s3/lab-app.zip
    unzip lab-app.zip -d /var/www/html/
    chkconfig httpd on
    service httpd start
    ```
5.  **Launch instance** and wait for "2/2 checks passed."
6.  **Verify:** Copy the **Public IPv4 DNS** and paste it into a web browser.
