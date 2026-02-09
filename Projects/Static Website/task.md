# AWS re/Start Portfolio Project



### Project Section 1:

Each group will prepare an AWS Services Presentation. Groups are to decide their group name. The presentation will be towards a fictional or an actual cafe that:

1. Has not migrated to the Cloud

2. Is using the hybrid model – i.e. On premises and Cloud Infrastructure

3. Utilizing another Cloud Platform

Learners are then present to a panel of their choice, about the services, pricing, and benefits of moving to AWS.

---

### Project Section 2:

Learners are required to create a static Amazon S3 website of the above café of their choosing. Website must include:

- Café name

- Minimum of 5 items on the menu

- Description of the business

- Contact information

---

### Groups:

| Group 1:            | Group 2:             | Group 3:             | Group 4:          | Group 5:           |
| ------------------- | -------------------- | -------------------- | ----------------- | ------------------ |
| Sakhalona Mankayi   | Omphemetse Merakeng  | Katlego Gobotlo      | Stacey Munnik     | Ondela Nxitywa     |
| Clifford Morwagae   | Cassey Martinessen   | Khaya Mazibuko       | Khanyisa Ndima    | Oranotse Gaolojwe  |
| Junior Motsoko      | Thania Narker        | Ziyanda Dazana       | Sindisiwe Maseko  | Bongani Tshabalala |
| Tumelo Mathenjwa    | Abongwe Lukakayi     | Nhlanhla Malaza      | Rudi Adams        | Tebogo Mpholo      |
| Phenyo Modise       | Shanti Chaganti      | Ukhona Sibutha       | Busisiwe Nkambule | Bridgette Nkoale   |
| Connie Machiga      | Grace Chilapondwa    | Siphesihle Sephaka   | Aaron Kgaphola    |                    |
 
---

## Problem Statement for FreshlyGround Cafe’s Cloud Migration

FreshlyGround, a beloved local cafe, faces operational challenges due to outdated on-premises systems. The lack of a robust online presence hinders its ability to attract and retain customers in today’s digital landscape.

**Objective:** To overcome these challenges, FreshlyGround aims to migrate its IT infrastructure to the cloud. The primary goals are to enhance operational efficiency, improve customer engagement, and provide a seamless experience for patrons.

### Proposed Solution:

1. Cloud Infrastructure Migration:

    - FreshlyGround plans to migrate its IT systems to a reliable cloud service provider, specifically Amazon Web Services (AWS).

2. Online Presence Enhancement:

    - The cafe will develop a cloud-hosted website to bolster its online presence. This website will allow customers to view the menu and prices conveniently.

### Key Services:

**Amazon S3 (Simple Storage Service):**

- **Benefits:**

    - Highly Scalable: Amazon S3 can handle varying data volumes, from gigabytes to petabytes, without compromising performance.

    - Reliable: Designed for 99.999999999% durability and 99.99% availability, ensuring data safety and accessibility.

    - Secure: Robust security features, including encryption at rest and in transit, access control policies, and integration with AWS Identity and Access Management (IAM).

- **Features:**

    - Easy Integration: Seamlessly integrates with other AWS services.

    - Cost-Effective: Provides cost savings compared to traditional hosting.

    - Custom Domain Support: Allows custom domain names for branding.

**Static Website Hosting:**

- Freshly Ground can directly host static websites from an S3 bucket. This cost-effective approach serves static content (HTML, CSS, JavaScript, and images) without requiring a separate web server.

Certainly! Let’s design an AWS architecture for Freshly Ground Cafe’s cloud migration. I’ll create a high-level architecture that incorporates the specified services:

---

## FreshlyGround Cafe’s AWS Cloud Architecture

### 1. Compute Services

**Amazon EC2 (Elastic Compute Cloud)**

**Purpose:**

- Host Freshly Ground’s applications, web servers, and databases.

- Provide scalable compute capacity.

**Implementation:**

- Create EC2 instances for different application components (e.g., menu management, order processing).

- Use Auto Scaling to handle varying workloads.

**AWS Lambda**

**Purpose:**

- Execute serverless functions in response to events (e.g., new orders, website visits).

**Implementation:**

- Refactor monolithic code into Lambda functions.

- Trigger functions based on events (e.g., S3 uploads, API Gateway requests).

### 2. Storage Services

**Amazon S3 (Simple Storage Service)**

**Purpose:**

- Store static content (HTML, CSS, images) for the cafe’s website.

- Host the website directly from S3 buckets.

**Implementation:**

- Create S3 buckets for website assets.

- Enable static website hosting.

**Amazon EBS (Elastic Block Store)**

**Purpose:**

- Provide block-level storage volumes for EC2 instances.

- Store data persistently.

**Implementation:**

- Attach EBS volumes to EC2 instances (e.g., for database storage).

- Migrate existing databases by attaching EBS volumes to RDS instances.

### 3. Database Services

**Amazon RDS (Relational Database Service)**

**Purpose:**

- Host relational databases (e.g., menu items, customer orders).

**Implementation:**

- Migrate on-premises databases to RDS instances.

- Use Multi-AZ for high availability.

**Amazon DynamoDB**

**Purpose:**

- Store NoSQL data (e.g., customer profiles, preferences).

**Implementation:**

- Refactor applications to use DynamoDB.

- **Migrate existing NoSQL databases to DynamoDB.

### 4. Security Services

**AWS IAM (Identity and Access Management)**

**Purpose:**

- Control access to AWS resources.

- Set up roles and policies for EC2 instances and Lambda functions.

**Amazon Cognito**

**Purpose:**

- Provide user authentication and management.

**Implementation:**

- Integrate Cognito to secure user authentication.

- Migrate user data to Cognito user pools.

### 5. Migration Services

**AWS Database Migration Service (DMS)**

**Purpose:**

- Replicate data from on-premises databases to RDS or DynamoDB.

- Perform schema conversion if needed.

**AWS Server Migration Service (SMS)**

**Purpose:**

- Migrate VMs from on-premises to EC2 instances.

- **Replicate and launch VMs in AWS.



Remember that this is a high-level architecture. Detailed implementation will depend on FreshlyGround’s specific requirements, workload, and security considerations. Feel free to customize and expand upon this architecture as needed! 😊

Certainly! Let’s estimate the cost for FreshlyGround Cafe’s AWS architecture based on the services we’ve discussed. Keep in mind that actual costs may vary based on usage, region, and specific configurations. I recommend using the [AWS Pricing Calculator](https://calculator.aws/#/) to get a more accurate estimate tailored to your specific needs.

Here’s a high-level breakdown of the estimated costs for each service:

### 1. Compute Services:

- **Amazon EC2 (Elastic Compute Cloud):**

    - Costs depend on the instance type (e.g., t2.micro, m5.large) and usage hours.

    - Consider using reserved instances for cost savings.

- **AWS Lambda:**

    - Billed based on the number of requests and execution time (duration).

    - Typically cost-effective for event-driven workloads.

### 2. Storage Services:

- **Amazon S3 (Simple Storage Service):**

    - Costs depend on storage size, data transfer, and request rates.

    - S3 Standard storage is suitable for static content hosting.

- **Amazon EBS (Elastic Block Store):**

    - Costs vary based on volume type (SSD, HDD) and storage size.

    - Snapshots incur additional charges.

### 3. Database Services:

- **Amazon RDS (Relational Database Service):**

    - Charged based on the database instance type, storage, and data transfer.

    - Includes on-demand and reserved instances.

- **Amazon DynamoDB:**

    - Costs based on provisioned read/write capacity and storage.

### 4. Security Services:

- **AWS IAM (Identity and Access Management):**

    - No direct cost; included with AWS account.

- **Amazon Cognito:**

    - Costs depend on monthly active users (MAUs) and data storage.

### 5. Migration Services:

- **AWS Database Migration Service (DMS):**

    - No additional cost for DMS itself, but consider EC2 instance costs for replication.

- **AWS Server Migration Service (SMS):**

    - No direct cost for SMS; consider EC2 instance costs for migrated VMs.

Remember to configure the details (e.g., instance types, storage sizes, usage patterns) in the [AWS Pricing Calculator](https://calculator.aws/#/?ch=cta&cta=lower-pricing-calc) to get a precise estimate. Feel free to explore different scenarios and adjust parameters as needed. 😊

