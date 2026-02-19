# 🏗️ 3D Application — AWS Cloud Architecture

> A highly available, scalable, and secure cloud infrastructure for a 3D application deployed on AWS.

[View Instructions](./Instructions.md)

---

## 📐 Architecture Diagram

![3D Application AWS Architecture](./assets/Design-a-3D-architecture.svg)

---

## 📚 Documentation

| Resource | Description |
|----------|-------------|
| 📖 [Architecture Explanation](./ARCHITECTURE.md) | Full technical write-up of every layer |


---

## 🧱 Architecture Overview

The system is structured across **5 core layers**:

| Layer | Services | Purpose |
|-------|----------|---------|
| 🌐 **Edge & DNS** | Route 53 · CloudFront · WAF | Global routing, CDN, DDoS protection |
| 🔒 **Network (VPC)** | ALB · NAT Gateway · Subnets | Isolation, traffic distribution |
| ⚙️ **Compute** | EC2 Auto Scaling · Lambda | Backend processing, serverless tasks |
| 🗄️ **Database** | RDS (Multi-AZ) · DynamoDB | Relational & NoSQL data storage |
| 📦 **Storage** | S3 | 3D models, assets, backups |
| 📊 **Monitoring** | CloudWatch · IAM | Observability, access control |

---

## ☁️ AWS Services Used

### 🌍 Edge Layer
- ![Route 53](https://img.shields.io/badge/Route_53-DNS-8C4FFF?logo=amazonaws&logoColor=white) **Amazon Route 53** — DNS resolution & health checks
- ![CloudFront](https://img.shields.io/badge/CloudFront-CDN-FF9900?logo=amazonaws&logoColor=white) **Amazon CloudFront** — Global content delivery network
- ![WAF](https://img.shields.io/badge/AWS_WAF-Security-DD344C?logo=amazonaws&logoColor=white) **AWS WAF** — Web Application Firewall

### 🔗 Network Layer
- 🏠 **VPC** — Multi-AZ Virtual Private Cloud
- ⚖️ **Application Load Balancer (ALB)** — Traffic distribution
- 🌿 **NAT Gateway** — Secure outbound internet access

### ⚙️ Compute Layer
- ![EC2](https://img.shields.io/badge/EC2-Auto_Scaling-FF9900?logo=amazonaws&logoColor=white) **Amazon EC2** — Auto Scaling Group across AZs
- ![Lambda](https://img.shields.io/badge/Lambda-Serverless-FF9900?logo=awslambda&logoColor=white) **AWS Lambda** — Event-driven, serverless processing

### 🗄️ Database Layer
- ![RDS](https://img.shields.io/badge/RDS-Multi--AZ-527FFF?logo=amazonaws&logoColor=white) **Amazon RDS** — Relational DB with automatic failover
- ![DynamoDB](https://img.shields.io/badge/DynamoDB-NoSQL-4053D6?logo=amazondynamodb&logoColor=white) **Amazon DynamoDB** — Low-latency NoSQL

### 📦 Storage Layer
- ![S3](https://img.shields.io/badge/S3-Object_Storage-569A31?logo=amazons3&logoColor=white) **Amazon S3** — 3D models, media, backups (11 9's durability)

### 📊 Monitoring & Security
- ![CloudWatch](https://img.shields.io/badge/CloudWatch-Monitoring-FF4F8B?logo=amazonaws&logoColor=white) **Amazon CloudWatch** — Metrics, logs, and alerts
- ![IAM](https://img.shields.io/badge/IAM-Access_Control-DD344C?logo=amazonaws&logoColor=white) **AWS IAM** — Role-based access & least privilege

---

## ✅ Key Design Principles

- 🔁 **High Availability** — Multi-AZ deployment with automatic failover
- 📈 **Scalability** — Auto Scaling + DynamoDB on-demand capacity
- 🔐 **Security** — WAF + private subnets + encryption at rest & in transit
- 💸 **Cost Efficiency** — Serverless Lambda + Auto Scaling + S3 lifecycle policies
- 🌍 **Global Performance** — CloudFront edge locations worldwide

---

## 📄 License

MIT © 2025 — Your Organization
