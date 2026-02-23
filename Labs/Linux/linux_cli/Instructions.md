# Linux Command Line

> **Note:** All labs rely on previous courseware and lab information.

## Objectives

In this lab, I learned how to:

- Run commands to gain knowledge of my current system and session
- Search and run previous Bash commands

## Duration

This lab took approximately **30 minutes** to complete.

## AWS Service Restrictions

In this lab environment, access to AWS services and service actions were restricted to the ones that I needed to complete the lab instructions.

## Accessing the AWS Management Console

1. I chose **Start Lab**.
2. I waited for **Lab status: ready**.
3. I chose **AWS** to open the console.
4. I arranged windows for easier execution.

## Task 1: Use SSH to Connect to an Amazon Linux EC2 Instance

### Windows Users

1. Download **PPK** key.
2. Note **PublicIP**.
3. Install **PuTTY**.
4. Configure session to connect.

### macOS & Linux Users

```bash
cd ~/Downloads
chmod 400 labsuser.pem
ssh -i labsuser.pem ec2-user@<public-ip>
```

## Task 2: Run Familiar Commands

In this task, I ran the following commands to learn about my system:

```bash
whoami
hostname -s
uptime -p
who -H -a
TZ=America/New_York date
TZ=America/Los_Angeles date
cal -j
cal -s
cal -m
id ec2-user
```

## Task 3: Improve Workflow Through History and Search

I used the following command to access my command history:

```bash
history
```

Reverse search:

- Press **CTRL+R**
- Type term
- Press **Tab**
- Edit as needed

Repeat last command:

```bash
!!
```

## Lab Complete

I selected **End Lab** and confirmed deletion.

## AWS Component

This lab used a **t3.micro** instance (1 vCPU, 1 GiB memory).

## Additional Resources

- AMIs
- Instance Types
- Service Quotas
- Status Checks
- Termination Guide

More training: <https://aws.amazon.com/training/>
