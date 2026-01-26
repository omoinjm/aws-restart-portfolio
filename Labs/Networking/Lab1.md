# Lab 1: VPC Fundamentals and Subnet Design

## Objective
To understand the basics of Amazon Virtual Private Cloud (VPC) by creating a custom VPC with public and private subnets.

## AWS Services Used
- Amazon VPC
- Subnets
- Route Tables
- Internet Gateway

## Scenario
A company needs a private network in AWS to host its resources securely while allowing controlled internet access.

## Steps Performed
1. Created a custom VPC with a /16 CIDR block
2. Created public and private subnets in different Availability Zones
3. Attached an Internet Gateway to the VPC
4. Configured route tables for public internet access
5. Associated subnets with the correct route tables

## Outcome
- Successfully created a functional VPC
- Public subnet had internet access
- Private subnet remained isolated

## Key Learnings
- Difference between public and private subnets
- Importance of CIDR planning
- Role of route tables and gateways
