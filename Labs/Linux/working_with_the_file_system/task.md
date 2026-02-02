# Working with the File System

## Note

In the previous two labs, you received basic information about Linux and your current sessions. From here on, you will be on a minor adventure that will combine all your previous knowledge to solidify and reinforce your capabilities. You can reference your previous labs to help yourself complete each of the remaining labs.

## Objectives

In this lab, you will:

- Create a folder structure that this lab provides
- Create files
- Copy and move files and directories
- Delete files and directories

## Duration

This lab requires approximately **30 minutes** to complete.

## AWS Service Restrictions

In this lab environment, access to AWS services and service actions might be restricted to only those required to complete the lab instructions. Errors may occur if you attempt actions outside the scope of this lab.

---

## Accessing the AWS Management Console

1. Choose **Start Lab** to launch your lab.
2. Wait until the message **Lab status: ready** appears, then close the panel.
3. Choose **AWS** to open the AWS Management Console in a new browser tab.
4. Ensure pop-ups are allowed if the console does not open automatically.
5. Arrange your browser windows so you can view the instructions and console side by side.

---

## Task 1: Use SSH to Connect to an Amazon Linux EC2 Instance

You will connect to an Amazon Linux EC2 instance using SSH. Instructions differ based on your operating system.

### Windows Users

1. Open the **Details** dropdown and select **Show**.
2. Download the `labsuser.ppk` file and note the **PublicIP** address.
3. Download and install **PuTTY**.
4. Open `putty.exe` and configure it following the AWS guide:
   _Connect to your Linux instance using PuTTY_.

### macOS and Linux Users

1. Open the **Details** dropdown and select **Show**.
2. Download the `labsuser.pem` file and note the **PublicIP** address.
3. Open a terminal and navigate to the directory containing the `.pem` file:

   ```bash
   cd ~/Downloads
   ```

4. Change file permissions:

   ```bash
   chmod 400 labsuser.pem
   ```

5. Connect to the instance:

   ```bash
   ssh -i labsuser.pem ec2-user@<public-ip>
   ```

6. Type `yes` when prompted to confirm the connection.

---

## Task 2: Create a Folder Structure

Create the following structure on the Linux machine:

```
/home/ec2-user/CompanyA/
├── Finance
│   ├── ProfitAndLossStatements.csv
│   └── Salary.csv
├── HR
│   ├── Assessments.csv
│   └── TrialPeriod.csv
└── Management
    ├── Managers.csv
    └── Schedule.csv
```

### Helpful Hints

- Use `pwd` to confirm your current directory.
- Use `ls` to verify file and folder creation.

### Commands Overview

```bash
cd /home/ec2-user
mkdir CompanyA
cd CompanyA
mkdir Finance HR Management

cd HR
touch Assessments.csv TrialPeriod.csv

cd ../Finance
touch Salary.csv ProfitAndLossStatements.csv

cd ..
touch Management/Managers.csv Management/Schedule.csv

ls -laR
```

---

## Task 3: Delete and Reorganize Folders

### New Structure

```
/home/ec2-user/CompanyA/
└── HR
    ├── Finance
    │   ├── ProfitAndLossStatements.csv
    │   └── Salary.csv
    ├── Management
    │   ├── Managers.csv
    │   └── Schedule.csv
    └── Employees
        ├── Assessments.csv
        └── TrialPeriod.csv
```

### Steps

```bash
pwd
cp -r Finance HR
ls HR/Finance

rm Finance/ProfitAndLossStatements.csv Finance/Salary.csv
rmdir Finance

mv Management HR

cd HR
mkdir Employees
mv Assessments.csv TrialPeriod.csv Employees

ls -laR
```

---

## Lab Complete 🎉

Congratulations! You have completed the lab.

To finish:

1. Select **End Lab**.
2. Confirm by selecting **Yes**.
3. Close the confirmation panel.

---

## About the AWS Component

This lab uses a **t3.micro** Amazon EC2 instance:

- 1 vCPU
- 1 GiB memory

Amazon EC2 provides scalable compute capacity in the cloud, enabling flexible resource selection for different workloads.

---

## Additional Resources

- Amazon EC2 Instance Types
- Amazon Machine Images (AMI)
- Status Checks for Your Instances
- Amazon EC2 Service Quotas
- Terminate Your Instance
- AWS Training and Certification

© 2022 Amazon Web Services, Inc. and its affiliates. All rights reserved.
