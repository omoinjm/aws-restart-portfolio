# Introduction to an Amazon Linux Amazon Machine Image (AMI)

This lab is designed to reinforce your knowledge of the basic command line interface functionality and provide a solid foundation from which you can continue to learn about new commands and capabilities within the Linux shell.

## Duration

This lab requires approximately 30 minutes to complete.

## AWS service restrictions

In this lab environment, access to AWS services and service actions might be restricted to the ones that you need to complete the lab instructions. You might encounter errors if you attempt to access other services or perform actions beyond the ones that this lab describes.

## Scenario

In this lab, you use Secure Shell (SSH) to access an Amazon Linux Amazon Machine Image (AMI) within Vocareum labs. Next, you use the `man` command to access the man pages.

## Objectives

After completing this lab, you will be able to:

- Use SSH to access an Amazon Linux AMI within Vocareum labs
- Understand the purpose of the `man` command
- Demonstrate the search feature of the man pages
- Examine man page headers

### Components Created for You

- **Amazon EC2 - Command Host (public subnet):** You log in to this instance to use the commands listed within this lab.

Other components examined later in the course:

- Public subnet
- Amazon Virtual Private Cloud (Amazon VPC)

## Accessing the AWS Management Console

1. At the top of these instructions, choose **Start Lab** to launch your lab.
2. A Start Lab panel opens, and it displays the lab status.
   - **Tip:** Choose **Start Lab** again if you need more time.
3. Wait for **Lab status: ready**, then close the panel.
4. Choose **AWS** to open the AWS Management Console in a new tab.
5. Arrange both tabs side-by-side for easier navigation.

## Task 1: Use SSH to connect to an Amazon Linux EC2 instance

Instructions vary by operating system.

### Windows Users

1. Select **Details > Show**.
2. Download `labsuser.ppk` and note the `PublicIP`.
3. Download and install **PuTTY** if necessary.
4. Open `putty.exe` and connect as described in AWS docs.
5. Proceed to next task.

### macOS and Linux Users

1. Select **Details > Show**.
2. Download `labsuser.pem` and note the `PublicIP`.
3. Open a terminal and navigate to Downloads:

```bash
cd ~/Downloads
```

4. Change permissions:

```bash
chmod 400 labsuser.pem
```

5. Connect using SSH:

```bash
ssh -i labsuser.pem ec2-user@<public-ip>
```

6. Accept connection when prompted.

## Task 2: Explore the Linux man pages

Open man pages for the `man` program:

```bash
man man
```

Use arrow keys to navigate.

Common headers include:

- NAME
- SYNOPSIS
- DESCRIPTION
- OVERVIEW
- EXAMPLES
- FILES
- OPTIONS
- SEE ALSO

To exit, press `q`.

## Lab Completion

1. Select **End Lab**, then **Yes** to confirm.
2. Close the panel once deletion is initiated.

## AWS Components

Amazon EC2 provides various instance types optimized for different use cases.

This lab uses a `t3.micro` instance:

- 1 vCPU
- 1 GiB memory

> Note: Other instance types may be restricted.

## Additional Resources

- Amazon EC2 Instance Types
- Amazon Machine Images (AMI)
- Status Checks for Your Instances
- Amazon EC2 Service Quotas
- Terminate Your Instance

More AWS training: https://aws.amazon.com/training/

---

© 2022 Amazon Web Services, Inc. and its affiliates. All rights reserved.
Commercial copying, lending, or selling is prohibited.
