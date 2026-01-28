# Managing Users and Groups

> **Note:** All labs rely on previous courseware and lab information.

---

## Objectives

In this lab, you will:

- Create new users with a default password
- Create groups and assign the appropriate users
- Log in as different users

---

## Duration

⏱️ Approximately **45 minutes**

---

## AWS Service Restrictions

In this lab environment, access to AWS services and service actions might be restricted to only those required to complete the lab. You may encounter errors if you attempt to access other services or perform actions outside the scope of this lab.

---

## Accessing the AWS Management Console

1. At the top of these instructions, choose **Start Lab**.
2. A **Start Lab** panel opens and displays the lab status.

> 💡 **Tip:** If you need more time, choose **Start Lab** again to restart the timer.

3. Wait until you see **Lab status: ready**, then close the panel.
4. Choose **AWS** to open the AWS Management Console in a new browser tab.

> 💡 **Tip:** If a new tab does not open, allow pop-ups in your browser.

5. Arrange the AWS Management Console and these instructions side by side for easier navigation.

---

## Task 1: Use SSH to Connect to an Amazon Linux EC2 Instance

You will connect to an Amazon Linux EC2 instance using SSH. Instructions differ depending on your operating system.

---

### Windows Users (Using PuTTY)

1. Open the **Details** dropdown and select **Show**.
2. Download the **labsuser.ppk** file.
3. Note the **PublicIP** address.
4. Download and open **PuTTY**.
5. Configure PuTTY using the AWS guide:
   - _Connect to your Linux instance using PuTTY_

➡️ Skip ahead to **Task 2** once connected.

---

### macOS and Linux Users

1. Open the **Details** dropdown and select **Show**.
2. Download the **labsuser.pem** file.
3. Note the **PublicIP** address.
4. Open a terminal and navigate to the directory containing the key:

```bash
cd ~/Downloads
```

5. Change permissions on the key:

```bash
chmod 400 labsuser.pem
```

6. Connect using SSH:

```bash
ssh -i labsuser.pem ec2-user@<public-ip>
```

7. Type `yes` when prompted.

---

## Task 2: Create Users

Create the following users with a default password.

### User Table

| First Name | Last Name | User ID   | Job Role             | Password      |
| ---------- | --------- | --------- | -------------------- | ------------- |
| Alejandro  | Rosalez   | arosalez  | Sales Manager        | P@ssword1234! |
| Efua       | Owusu     | eowusu    | Shipping             | P@ssword1234! |
| Jane       | Doe       | jdoe      | Shipping             | P@ssword1234! |
| Li         | Juan      | ljuan     | HR Manager           | P@ssword1234! |
| Mary       | Major     | mmajor    | Finance Manager      | P@ssword1234! |
| Mateo      | Jackson   | mjackson  | CEO                  | P@ssword1234! |
| Nikki      | Wolf      | nwolf     | Sales Representative | P@ssword1234! |
| Paulo      | Santos    | psantos   | Shipping             | P@ssword1234! |
| Sofia      | Martinez  | smartinez | HR Specialist        | P@ssword1234! |
| Saanvi     | Sarkar    | ssarkar   | Finance Specialist   | P@ssword1234! |

> ⚠️ Ensure user IDs are spelled correctly.

### Validate Current Directory

```bash
pwd
```

Expected output:

```text
/home/ec2-user
```

### Create a User Example

```bash
sudo useradd arosalez
sudo passwd arosalez
```

### Verify Users

```bash
sudo cat /etc/passwd | cut -d: -f1
```

Repeat the steps above for all users.

---

## Task 3: Create Groups

### Groups to Create

- Sales
- HR
- Finance
- Shipping
- Managers
- CEO

> ⚠️ Managers are personnel, but not all personnel are managers. Some users belong to multiple groups.

### Create Groups

```bash
sudo groupadd Sales
sudo groupadd HR
sudo groupadd Finance
sudo groupadd Shipping
sudo groupadd Managers
sudo groupadd CEO
```

### Verify Groups

```bash
cat /etc/group
```

---

### Assign Users to Groups

```bash
sudo usermod -a -G Sales arosalez
```

Repeat using the table below:

| Group    | Users                   |
| -------- | ----------------------- |
| Sales    | arosalez, nwolf         |
| HR       | ljuan, smartinez        |
| Finance  | mmajor, ssarkar         |
| Shipping | eowusu, jdoe, psantos   |
| Managers | arosalez, ljuan, mmajor |
| CEO      | mjackson                |

Add **ec2-user** to all groups.

### Verify Membership

```bash
sudo cat /etc/group
```

---

## Task 4: Log In Using the New Users

### Switch User

```bash
su arosalez
```

Password:

```text
P@ssword1234!
```

### Test Permissions

```bash
touch myFile.txt
```

Expected:

```text
Permission denied
```

### Attempt sudo

```bash
sudo touch myFile.txt
```

Expected:

```text
arosalez is not in the sudoers file
```

### Exit User

```bash
exit
```

---

## View sudo Logs

```bash
sudo cat /var/log/secure
```

Example log entry:

```text
sudo: arosalez : user NOT in sudoers ; COMMAND=/bin/touch myFile.txt
```

---

## Lab Complete 🎉

Select **End Lab** and confirm to terminate the environment.

---

## About the AWS Component

This lab uses a **t3.micro** EC2 instance:

- 1 vCPU
- 1 GiB Memory

Amazon EC2 provides scalable compute capacity with a wide range of instance types optimized for different workloads.

---

## Additional Resources

- Amazon EC2 Instance Types
- Amazon Machine Images (AMI)
- Status Checks for Your Instances
- Amazon EC2 Service Limits

For more information, visit **AWS Training and Certification**.

© 2022 Amazon Web Services, Inc. All rights reserved.
