# Cafena Café Website Redesign and AWS Deployment Demonstration

[View Instructions](./task.md)

[View Project Code](https://github.com/omoinjm/local-coffee-shop)

---

## Abstract

This project presents the redesign of the Cafena Café website alongside the migration of its hosting infrastructure from a local cloud provider to Amazon Web Services (AWS). The objective is to improve performance, availability, scalability, and cost efficiency through the adoption of a cloud-native, serverless architecture. The solution utilises Amazon S3 for static website hosting, CloudFront for content delivery, Route 53 for domain management, IAM for access control, and CloudWatch for basic monitoring. The project evaluates both technical and financial considerations and demonstrates that AWS provides a viable and economical hosting platform for static web workloads within small-to-medium business contexts.

---

## 1. Introduction

Cafena Café is a locally established business operating within the food and hospitality sector. The business context used in this project is representative of a typical small-to-medium enterprise (SME) seeking to improve its digital presence through modern web infrastructure.

As the business expanded, limitations in the existing website hosting environment became increasingly apparent, particularly in relation to scalability, reliability, and operational cost. These constraints highlighted the need for a more flexible and resilient hosting solution.

This project aims to redesign the Cafena Café website and modernise its hosting infrastructure using AWS services. The focus is on delivering a reliable, scalable, and cost-effective solution that supports current operational needs while remaining adaptable to future digital expansion.

---

## 2. Problem Statement

The existing hosting environment presented several challenges:

* Performance degradation during peak traffic periods
* Limited scalability combined with inflexible pricing models
* Inconsistent availability and uptime guarantees
* Difficulty integrating advanced cloud-native services

These challenges negatively affected user experience, operational efficiency, and the ability to support future growth.

---

## 3. Business and Technical Impact

### 3.1 Hosting Model Comparison

| Factor            | AWS (Amazon S3)          | Local Cloud Provider | On-Premises             |
| ----------------- | ------------------------ | -------------------- | ----------------------- |
| Monthly cost      | Low / usage-dependent    | Fixed monthly fee    | Fixed + operating costs |
| Pricing model     | Usage-based              | Fixed plan           | Capital + maintenance   |
| Scalability       | Automatic                | Plan-based           | Manual                  |
| HTTPS             | Managed via AWS services | Varies               | Complex                 |
| Maintenance       | Minimal                  | Minimal              | High                    |
| Disaster recovery | Built-in                 | Limited              | Manual                  |

This comparison indicates that AWS is the most cost-effective and scalable solution for static website hosting in an SME context.

---

## 4. Project Deliverables

### 4.1 Static Website

A fully functional static website hosted on Amazon S3, consisting of the following components:

* Home page
* Menu section
* Booking section
* Order submission form

### 4.2 AWS Migration Presentation

A structured presentation addressing:

* Existing technical and business challenges
* Market-based cost comparisons
* Detailed hosting cost analysis
* Proposed AWS architecture
* Support and operational considerations
* Key benefits of cloud migration

---

## 5. AWS Architecture and Implementation

### 5.1 Services Used

| Requirement       | AWS Service | Purpose                                   |
| ----------------- | ----------- | ----------------------------------------- |
| Website hosting   | Amazon S3   | Static website hosting and asset storage  |
| Domain management | Route 53    | Custom domain configuration               |
| Content delivery  | CloudFront  | Global caching and reduced latency        |
| Access control    | IAM         | Secure identity and permission management |
| Monitoring        | CloudWatch  | Basic metrics and operational visibility  |

The selected services collectively provide a serverless architecture that minimises operational overhead while ensuring reliability and scalability.

---

## 6. Cost Analysis

### 6.1 Monthly Cost Scenarios (ZAR)

| Scenario                   | Estimated Monthly Cost | Notes                                              |
| -------------------------- | ---------------------- | -------------------------------------------------- |
| S3 only                    | Effectively negligible | Suitable for low-traffic static hosting            |
| S3 + CloudFront            | Effectively negligible | Improved performance through caching               |
| S3 + CloudFront + Route 53 | ~R9.50 – R20.00        | Includes hosted zone and minimal DNS query charges |
| CloudWatch                 | Effectively negligible | Basic monitoring within AWS free usage limits      |

**Estimated Monthly Cost:** **~R9.50 – R20.00**, depending on traffic volume and DNS query usage.

### 6.2 Cost Justification

* Route 53 hosted zone: **$0.50 per month (≈ R9.50)**
* DNS query charges may marginally increase monthly costs based on usage
* Domain registration fees (**≈ $12 per year ≈ R228 annually**) are billed separately

Overall, the AWS-based solution represents a substantial cost reduction when compared to fixed-cost local cloud hosting alternatives.

---

## 7. Deployment Methodology

The deployment process followed a structured and repeatable approach:

1. Website assets uploaded to an Amazon S3 bucket
2. Static website hosting enabled on the S3 bucket
3. Bucket policies configured to allow controlled public access
4. CloudFront distribution configured to enable global content delivery
5. Custom domain integrated using Route 53

---

## 8. Testing and Validation

Testing and validation activities were conducted to ensure the solution met functional and operational requirements:

* Functional testing to confirm correct rendering, navigation, and media loading
* Form submission testing to validate expected client-side behaviour
* Availability and performance observation using basic CloudWatch metrics

These validation steps confirmed that the deployed solution satisfied the project objectives for reliability and usability.

---

## 9. Conclusion

This project demonstrates that migrating a static business website from a local cloud provider to AWS can significantly reduce hosting costs while improving reliability, scalability, and operational resilience. By leveraging managed AWS services, Cafena Café is able to focus on core business activities while benefiting from enterprise-grade infrastructure with minimal administrative effort. The implemented architecture provides a strong foundation for future digital growth.

---

## 10. Future Work

Potential future enhancements include:

* Online payment and e-commerce functionality
* Customer loyalty and engagement features
* Advanced analytics and reporting capabilities
* Automated deployment pipelines using AWS CI/CD services

---
