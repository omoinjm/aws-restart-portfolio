# Introduction to Amazon Aurora

## Overview

This lab introduces you to Amazon Aurora and provides you with a basic understanding of how to use Aurora. You will follow the steps to create an Aurora instance and then connect to it.

---

## Topics Covered

After completing this lab, you will be able to:

- Create an Aurora instance
- Connect to a pre-created Amazon Elastic Compute Cloud (Amazon EC2) instance
- Configure the Amazon EC2 instance to connect to Aurora
- Query the Aurora instance

## Duration

This lab requires approximately **40 minutes** to complete.

---

## Icon Key

| Icon | Purpose |
|------|---------|
| 🖥️ **Command** | A command that you must run |
| 📤 **Expected output** | A sample output to verify a command or edited file |
| 📝 **Note** | A hint, tip, or important guidance |
| ⚠️ **Caution** | Information of special interest (could require repeating steps if missed) |
| 💭 **Consider** | A moment to pause and apply a concept to your own environment |
| ✏️ **Copy edit** | A time when copying a command to a text editor to edit variables is recommended |
| ✅ **Task complete** | A conclusion or summary point in the lab |

---

## AWS Service Restrictions

In this lab environment, access to AWS services and service actions might be restricted to the ones needed to complete the lab instructions. You might encounter errors if you attempt to access other services or perform actions beyond what this lab describes.

---

## Prerequisites

To successfully complete this lab, you should have some experience using the **Linux operating system** and have a basic understanding of **structured query language (SQL)**.

---

## Accessing the AWS Management Console

1. At the upper-right corner of these instructions, choose **Start Lab**.

   > 📝 **Note:** If you get an Access Denied error, close the error box, and choose **Start Lab** again.

2. The lab status can be interpreted as follows:
   - 🔴 A **red** circle next to AWS indicates the lab has not been started.
   - 🟡 A **yellow** circle next to AWS indicates the lab is starting.
   - 🟢 A **green** circle next to AWS indicates the lab is ready.

3. Wait for the lab to be ready before proceeding.

4. At the top of these instructions, choose the green circle next to **AWS**. This opens the AWS Management Console in a new browser tab. The system automatically signs you in.

   > 📝 **Note:** If a new browser tab does not open, a banner or icon at the top of your browser indicates that your browser is preventing pop-up windows. Choose the banner or icon, and choose **Allow pop-ups**.

5. Arrange the AWS Management Console tab so that it displays alongside these instructions.

> ⚠️ **Caution:** Do not change the lab Region unless specifically instructed to do so.

It takes a few minutes to provision the resources necessary to complete this lab.

---

## Introducing the Technologies

### Amazon Aurora

Aurora is a fully managed, MySQL-compatible, relational database engine that combines the performance and reliability of high-end commercial databases with the simplicity and cost-effectiveness of open-source databases. It delivers up to **five times the performance of MySQL** without requiring changes to most existing applications that use MySQL databases.

### Amazon Elastic Compute Cloud (Amazon EC2)

Amazon EC2 is a web service that provides resizable compute capacity in the cloud. It is designed to make web-scale cloud computing easier for developers. Amazon EC2 reduces the time required to provision new server instances to minutes, giving you the ability to quickly scale capacity, both up and down, as your computing requirements change.

### Amazon Relational Database Service (Amazon RDS)

Amazon RDS makes it easy to set up, operate, and scale a relational database in the cloud. It provides cost-efficient and resizable capacity while managing time-consuming database administration tasks. Amazon RDS provides six database engines to choose from, including Aurora, Oracle, Microsoft SQL Server, PostgreSQL, MySQL, and MariaDB.

---

## Task 1: Create an Aurora Instance

In this task, you create an Aurora database (DB) instance.

1. At the top of the AWS Management Console, in the search bar, search for and choose **RDS**.
2. In the left navigation menu, choose **Databases**.
3. Choose **Create database** and configure the following options:
   - For **Choose a database creation method**, choose **Standard create**.
   - For **Engine type**, choose **Aurora (MySQL Compatible)**.
   - For **Engine version**, choose the version specified as the default for major version **8.0**.
   - For **Templates**, choose **Dev/Test**.

4. In the **Settings** section, configure the following:
   - **DB cluster identifier:** `aurora`
   - **Master username:** `admin`
   - **Master password:** `admin123`
   - **Confirm password:** `admin123`

5. In the **Instance configuration** section, choose **Burstable classes (includes t classes)**, and choose **db.t3.medium** from the dropdown list.

6. In the **Availability & durability** section, choose **Don't create an Aurora Replica**.

   > 📝 **Note:** Amazon RDS Multi-AZ deployments provide enhanced availability and durability for DB instances. Since this is a lab environment, a multi-AZ deployment is not required.

7. In the **Connectivity** section, configure the following (leave all others as default):
   - **Virtual private cloud (VPC):** `LabVPC`
   - **Subnet group:** `dbsubnetgroup`
   - **Public access:** `No`
   - **VPC security group:** `Choose existing`
   - **Existing VPC security groups:** Remove the **default** security group, then choose **DBSecurityGroup**

   > 📝 **Note:** A DB subnet group is a collection of subnets (typically private) that you create in a VPC and designate for your DB instances. The aurora subnet group was pre-created using AWS CloudFormation.

   > 💭 **Consider:** You can use Amazon VPC to launch AWS resources into a virtual network that closely resembles a traditional data center network, with the benefits of AWS's scalable infrastructure.

8. In the **Monitoring** section, clear the check box for **Enable Enhanced monitoring**.

9. Expand **Additional configuration**. For **Initial database name**, enter `world`.

10. In the **Encryption** section, clear the check box for **Enable encryption**.

    > 📝 **Note:** You can encrypt RDS instances and snapshots at rest by enabling the encryption option. Encrypted data includes the underlying storage, automated backups, read replicas, and snapshots.

11. In the **Maintenance** section, clear the check box for **Enable auto minor version upgrade**.

12. Scroll to the bottom and choose **Create database**.

    > 📝 **Note:** Your Aurora DB instance may take up to 5 minutes to launch. You can continue to the next task while it provisions. If a **Suggested add-ons** pop-up appears, choose **Close**.

Once complete, you will see:

```
Successfully created database aurora.
```

> ✅ **Task complete:** You have successfully created an Aurora instance.

---

## Task 2: Connect to an Amazon EC2 Linux Instance

In this task, you log into your Amazon EC2 Linux instance, which was launched automatically when you started the lab using CloudFormation.

1. At the top of the AWS Management Console, search for and choose **EC2**.
2. In the left navigation menu, choose **Instances**.
3. Select the check box next to the instance labelled **Command Host**, and then choose **Connect**.

   > 📝 **Note:** If you do not see the **Command Host** instance, the lab may still be provisioning, or you may be in a different Region.

4. For **Connect to instance**, choose **Session Manager**.
5. Choose **Connect** to open a terminal window.

   > 📝 **Note:** If the **Connect** button is not available, wait a few minutes and try again.

> ✅ **Task complete:** You have successfully connected to the Amazon EC2 instance named Command Host.

---

## Task 3: Configure the Amazon EC2 Linux Instance to Connect to Aurora

In this task, you use the `yum` package manager to install the MariaDB client, then configure the EC2 instance to connect to the Aurora database.

### Step 1: Install the MariaDB Client

🖥️ **Command:** Run the following command to install the MariaDB client:

```bash
sudo yum install mariadb -y
```

📤 **Expected output** *(truncated)*:

```
Install  1 Package

Total download size: 8.8 M
Installed size: 49 M
...
Installed:
  mariadb.x86_64 1:5.5.68-1.amzn2.0.1

Complete!
```

### Step 2: Get the Aurora Endpoint

1. Switch to the AWS Management Console tab and search for **RDS**.
2. In the left navigation menu, choose **Databases**.
3. Wait for **aurora-instance-1** to display **Available**.
4. Choose **aurora**.
5. Choose the **Connectivity & security** tab.
6. In the **Endpoints** section, copy the **Endpoint name** for the **Writer** instance to your text editor.

The endpoint should look similar to:

```
aurora.cluster-cabcdefghijklm.us-west-2.rds.amazonaws.com
```

> 📝 **Note:** Aurora provides the following endpoint types:
>
> - **Cluster endpoint** — Connects to the current primary DB instance. This is the only endpoint that can perform write operations (DDL statements). Example: `mydbcluster.cluster-123456789012.us-west-2.rds.amazonaws.com:3306`
>
> - **Reader endpoint** — Connects to one of the available Aurora replicas for load-balanced read-only connections. Example: `mydbcluster.cluster-ro-123456789012.us-west-2.rds.amazonaws.com:3306`

### Step 3: Connect to Aurora

✏️ **Copy edit:** Replace `<endpoint_goes_here>` with your copied endpoint, then run the command:

```bash
mysql -u admin --password='admin123' -h <endpoint_goes_here>
```

Your command should look similar to:

```bash
mysql -u admin --password='admin123' -h mydbcluster.cluster-123456789012.us-west-2.rds.amazonaws.com
```

**MySQL Client Switch Reference:**

| Switch | Description |
|--------|-------------|
| `-u` or `--user` | The MySQL username used to connect |
| `-p` or `--password` | The MySQL password used to connect |
| `-h` or `--host` | The host address of the database engine |

📤 **Expected output:**

```
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MySQL connection id is 173
Server version: 8.0.28 Source distribution

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MySQL [(none)]>
```

> ✅ **Task complete:** You have successfully configured the Amazon EC2 Linux instance to connect to Aurora.

---

## Task 4: Create a Table and Insert and Query Records

In this task, you learn how to create a table in a database, load data, and run a query.

### Step 1: List Available Databases

🖥️ **Command:**

```sql
SHOW DATABASES;
```

📤 **Expected output:**

```
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
| world              |
+--------------------+
5 rows in set (0.02 sec)

MySQL [(none)]>
```

### Step 2: Switch to the World Database

```sql
USE world;
```

📤 **Expected output:**

```
Database changed
MySQL [world]>
```

### Step 3: Create a Table

🖥️ **Command:**

```sql
CREATE TABLE `country` (
  `Code` CHAR(3) NOT NULL DEFAULT '',
  `Name` CHAR(52) NOT NULL DEFAULT '',
  `Continent` enum('Asia','Europe','North America','Africa','Oceania','Antarctica','South America') NOT NULL DEFAULT 'Asia',
  `Region` CHAR(26) NOT NULL DEFAULT '',
  `SurfaceArea` FLOAT(10,2) NOT NULL DEFAULT '0.00',
  `IndepYear` SMALLINT(6) DEFAULT NULL,
  `Population` INT(11) NOT NULL DEFAULT '0',
  `LifeExpectancy` FLOAT(3,1) DEFAULT NULL,
  `GNP` FLOAT(10,2) DEFAULT NULL,
  `GNPOld` FLOAT(10,2) DEFAULT NULL,
  `LocalName` CHAR(45) NOT NULL DEFAULT '',
  `GovernmentForm` CHAR(45) NOT NULL DEFAULT '',
  `Capital` INT(11) DEFAULT NULL,
  `Code2` CHAR(2) NOT NULL DEFAULT '',
  PRIMARY KEY (`Code`)
);
```

📤 **Expected output:**

```
Query OK, 0 rows affected, 7 warnings (0.02 sec)

MySQL [world]>
```

### Step 4: Insert Records

🖥️ **Command:**

```sql
INSERT INTO `country` VALUES ('GAB','Gabon','Africa','Central Africa',267668.00,1960,1226000,50.1,5493.00,5279.00,'Le Gabon','Republic',902,'GA');

INSERT INTO `country` VALUES ('IRL','Ireland','Europe','British Islands',70273.00,1921,3775100,76.8,75921.00,73132.00,'Ireland/Éire','Republic',1447,'IE');

INSERT INTO `country` VALUES ('THA','Thailand','Asia','Southeast Asia',513115.00,1350,61399000,68.6,116416.00,153907.00,'Prathet Thai','Constitutional Monarchy',3320,'TH');

INSERT INTO `country` VALUES ('CRI','Costa Rica','North America','Central America',51100.00,1821,4023000,75.8,10226.00,9757.00,'Costa Rica','Republic',584,'CR');

INSERT INTO `country` VALUES ('AUS','Australia','Oceania','Australia and New Zealand',7741220.00,1901,18886000,79.8,351182.00,392911.00,'Australia','Constitutional Monarchy, Federation',135,'AU');
```

📤 **Expected output** *(per insert)*:

```
Query OK, 1 row affected (0.00 sec)

MySQL [world]>
```

### Step 5: Query the Table

🖥️ **Command:**

```sql
SELECT * FROM country WHERE GNP > 35000 and Population > 10000000;
```

📤 **Expected output:**

```
+------+-----------+-----------+---------------------------+-------------+-----------+------------+----------------+-----------+-----------+--------------+------------------------------------+---------+-------+
| Code | Name      | Continent | Region                    | SurfaceArea | IndepYear | Population | LifeExpectancy | GNP       | GNPOld    | LocalName    | GovernmentForm                     | Capital | Code2 |
+------+-----------+-----------+---------------------------+-------------+-----------+------------+----------------+-----------+-----------+--------------+------------------------------------+---------+-------+
| AUS  | Australia | Oceania   | Australia and New Zealand |  7741220.00 |      1901 |   18886000 |           79.8 | 351182.00 | 392911.00 | Australia    | Constitutional Monarchy, Federation|     135 | AU    |
| THA  | Thailand  | Asia      | Southeast Asia            |   513115.00 |      1350 |   61399000 |           68.6 | 116416.00 | 153907.00 | Prathet Thai | Constitutional Monarchy            |    3320 | TH    |
+------+-----------+-----------+---------------------------+-------------+-----------+------------+----------------+-----------+-----------+--------------+------------------------------------+---------+-------+
2 rows in set (0.00 sec)

MySQL [world]>
```

The query returns two records: **Australia** and **Thailand**.

> ✅ **Task complete:** You have successfully created a table named `country`, inserted data, and queried records returning two results.

---

## Conclusion

🎉 **Congratulations!** You have now successfully:

- ✅ Created an Aurora instance
- ✅ Connected to a pre-created Amazon EC2 instance
- ✅ Configured the Amazon EC2 instance to connect to Aurora
- ✅ Queried the Aurora instance

---

## Lab Complete

Choose **End Lab** at the top of this page, and then select **Yes** to confirm that you want to end the lab. An *"Ended AWS Lab Successfully"* message will be briefly displayed.

---

## Additional Resources

- [Amazon RDS Multi-AZ Deployments](https://aws.amazon.com/rds/features/multi-az/)
- [Working with an Amazon RDS DB Instance in a VPC](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_VPC.WorkingWithRDSInstanceinaVPC.html)
- [What Is Amazon VPC?](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html)
- [Encrypting Amazon RDS Resources](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html)
- [Enhanced Monitoring](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Monitoring.OS.html)
- [Amazon EC2 Key Pairs](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html)
- [AWS Training and Certification](https://aws.amazon.com/training/)

---

*© 2022 Amazon Web Services, Inc. and its affiliates. All rights reserved. This work may not be reproduced or redistributed, in whole or in part, without prior written permission from Amazon Web Services, Inc. Commercial copying, lending, or selling is prohibited.*