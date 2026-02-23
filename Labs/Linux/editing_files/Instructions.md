# Editing Files

> **Note**\
> All labs rely on previous courseware and lab information.

---

## Objectives

After completing this lab, you will be able to:

- Use the `vimtutor` executable to conduct tasks 1--4\
- Copy content from the `/var/log/secure` file, and edit it with
  `nano`

---

## Duration

This lab requires approximately **1 hour** to complete.

---

## AWS Service Restrictions

In this lab environment, access to AWS services and service actions
might be restricted to the ones that are needed to complete the lab
instructions. You might encounter errors if you attempt to access other
services or perform actions beyond the ones that are described in this
lab.

---

## Accessing the AWS Management Console

1.  Choose **Start Lab** to launch your lab.\
2.  Wait until you see **Lab status: ready**, then close the panel.\
3.  Choose **AWS** to open the AWS Management Console in a new browser
    tab.

> **Tip:** If a new browser tab does not open, allow pop-ups in your
> browser.

Arrange the AWS Management Console tab so that it displays alongside
these instructions.

This lab launches an Amazon EC2 instance named **Command Host**. You
will connect to this instance to run Linux commands.

---

## Task 1: Use SSH to Connect to an Amazon Linux EC2 Instance

### Windows Users

1.  Open **Details → Show** and download `labsuser.ppk`.\
2.  Note the **PublicIP** address.\
3.  Download and open **PuTTY**.\
4.  Configure PuTTY using AWS instructions.

---

### macOS and Linux Users

1.  Open **Details → Show** and download `labsuser.pem`.\

2.  Note the **PublicIP** address.\

3.  Open a terminal and navigate to the file location:

    ```bash
    cd ~/Downloads
    ```

4.  Change permissions:

    ```bash
    chmod 400 labsuser.pem
    ```

5.  Connect via SSH:

    ```bash
    ssh -i labsuser.pem ec2-user@<public-ip>
    ```

---

## Task 2: Exercise -- Run the Vim Tutorial

Run:

```bash
vimtutor
```

If Vim is not installed:

```bash
sudo yum install vim
```

Complete lessons **1--3**, then exit:

```vim
:q!
```

---

## Task 3: Exercise -- Edit a File in Vim

Create and open a file:

```bash
vim helloworld
```

Enter insert mode and add:

    Hello World!
    This is my first file in Linux and I am editing it in Vim!

Save and quit:

```vim
:wq
```

Reopen the file and add:

    I learned how to create a file, edit and save them too!

Exit **without saving**:

```vim
:q!
```

Analyze what happened.

---

### Additional Challenge

- Delete a line: `dd`\
- Undo last action: `u`\
- Save without quitting: `:w`

---

## Task 4: Exercise -- Edit a File in Nano

Create and open a file:

```bash
nano cloudworld
```

Enter:

    We are using nano this time! We can simply start typing! No insert mode needed.

Save:

    CTRL + O

Exit:

    CTRL + X

Reopen to confirm:

```bash
nano cloudworld
```

---

## Lab Complete 🎉

Select **End Lab** and confirm.

---

## About the AWS Component

Amazon EC2 provides a wide selection of instance types. You will use a
**t3.micro** instance with:

- 1 vCPU\
- 1 GiB memory

---

## Additional Resources

- Amazon EC2 Instance Types\
- Amazon Machine Images (AMI)\
- Status Checks for Your Instances\
- Amazon EC2 Service Limits\
- Terminate Your Instance

---

© 2022 Amazon Web Services, Inc. and its affiliates. All rights
reserved.
