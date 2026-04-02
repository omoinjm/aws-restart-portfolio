# Introduction to Amazon DynamoDB

## Lab Overview

Amazon DynamoDB is a fast and flexible NoSQL database service for all applications that need consistent, single-digit millisecond latency at any scale. It is a fully managed database and supports both document and key-value data models. Its flexible data model and reliable performance make it a great fit for mobile, web, gaming, ad-tech, Internet of Things (IoT), and many other applications.

In this lab, you will create a table in DynamoDB to store information about a music library. You will query the music library and then delete the DynamoDB table.

---

## Topics Covered

In this lab, you will:

- Create an Amazon DynamoDB table
- Enter data into an Amazon DynamoDB table
- Query an Amazon DynamoDB table
- Delete an Amazon DynamoDB table

## Duration

This lab requires approximately **35 minutes** to complete.

---

## Accessing the AWS Management Console

1. At the upper-right corner of these instructions, choose **Start Lab**.

   > **Troubleshooting tip:** If you get an Access Denied error, close the error box, and choose **Start Lab** again.

2. The lab status can be interpreted as follows:
   - 🔴 A **red** circle next to AWS indicates the lab has not been started.
   - 🟡 A **yellow** circle next to AWS indicates the lab is starting.
   - 🟢 A **green** circle next to AWS indicates the lab is ready.

3. Please wait for the lab to be ready before proceeding.

4. At the top of these instructions, choose the green circle next to **AWS**. This will open the AWS Management Console in a new browser tab. The system will automatically sign you in.

   > **Tip:** If a new browser tab does not open, a banner or icon at the top of your browser will indicate that your browser is preventing the site from opening pop-up windows. Choose the banner or icon, and choose **Allow pop-ups**.

5. Arrange the AWS Management Console tab so that it displays alongside these instructions. Ideally, you should be able to see both browser tabs at the same time.

> ⚠️ Do not change the lab Region unless specifically instructed to do so.

---

## Task 1: Create a New Table

In this task, you create a new table named **Music** in DynamoDB. Each table requires a partition key (or a primary key) that is used to partition data across DynamoDB servers. A table can also have a sort key. The combination of a partition key and sort key uniquely identifies each item in a DynamoDB table.

1. In the AWS Management Console, choose the **Services** menu. Under **Database**, choose **DynamoDB**.
2. Choose **Create table**.
3. For the **Table name**, enter: `Music`
4. For the **Partition key**, enter: `Artist` and leave **String** selected in the dropdown list.
5. For **Sort key - optional**, enter: `Song` and leave **String** selected.
6. Your table will use the default settings for READMEes and provisioned capacity.
7. Scroll down, and choose **Create table**.

The table will be created in less than 1 minute. Wait for the Music table to be **Active** before moving on to the next task.

---

## Task 2: Add Data

In this task, you will add data to the Music table. A table is a collection of data on a particular topic.

Each table contains multiple **items**. An item is a group of attributes that is uniquely identifiable among all of the other items. Items in DynamoDB are similar in many ways to rows in other database systems. In DynamoDB, there is no limit to the number of items you can store in a table.

Each item consists of one or more **attributes**. An attribute is a fundamental data element, something that does not need to be broken down any further. Attributes in DynamoDB are similar to columns in other database systems, but each item (row) can have different attributes (columns).

When you write an item to a DynamoDB table, only the partition key and sort key (if used) are required. Other than these fields, the table does not require a schema. This means that you can add attributes to one item that may be different than the attributes on other items.

### Item 1

1. Choose the **Music** table.
2. Choose **Actions**, and then choose **Create item**.
3. For the **Artist** value, enter: `Pink Floyd`
4. For the **Song** value, enter: `Money`
5. Choose **Add new attribute** → select **String**, then enter:
   - **Field:** `Album` | **Value:** `The Dark Side of the Moon`
6. Choose **Add new attribute** → select **Number**, then enter:
   - **Field:** `Year` | **Value:** `1973`
7. Choose **Create item**.

### Item 2

| Attribute Name | Attribute Type | Attribute Value |
|----------------|----------------|-----------------|
| Artist         | String         | John Lennon     |
| Song           | String         | Imagine         |
| Album          | String         | Imagine         |
| Year           | Number         | 1971            |
| Genre          | String         | Soft rock       |

> This item has an additional `Genre` attribute, demonstrating that each item can have different attributes without a pre-defined table schema.

### Item 3

| Attribute Name | Attribute Type | Attribute Value            |
|----------------|----------------|----------------------------|
| Artist         | String         | Psy                        |
| Song           | String         | Gangnam Style              |
| Album          | String         | Psy 6 (Six Rules), Part 1  |
| Year           | Number         | 2011                       |
| LengthSeconds  | Number         | 219                        |

> This item introduces a `LengthSeconds` attribute, further demonstrating the flexibility of a NoSQL database.

> **Note:** There are also faster ways to load data into DynamoDB, such as using the AWS CLI, programmatic loading, or free third-party tools.

---

## Task 3: Modify an Existing Item

You now notice that there is an error in your data. In this task, you will modify an existing item.

1. In the DynamoDB dashboard, under **Tables**, choose **Explore Items**.
2. Choose the **Music** table.
3. Choose **Psy**.
4. Change the **Year** from `2011` to `2012`.
5. Choose **Save changes**.

The item is now updated.

---

## Task 4: Query the Table

There are two ways to query a DynamoDB table: **query** and **scan**.

A **query** operation finds items based on the primary key and optionally the sort key. It is fully READMEed, so it runs very fast.

### Using Query

1. Expand **Scan/Query items**, and choose **Query**.
2. Enter the following details:
   - **Artist (Partition key):** `Psy`
   - **Song (Sort key):** `Gangnam Style`
3. Choose **Run**.

The song quickly appears in the list. A query is the most efficient way to retrieve data from a DynamoDB table.

### Using Scan

A **scan** looks through every item in a table. It is less efficient and can take significant time for larger tables.

1. Scroll up and choose **Scan**.
2. Expand **Filters**, and enter the following values:
   - **Attribute name:** `Year`
   - **Type:** `Number`
   - **Value:** `1971`
3. Choose **Run**.

Only the song released in 1971 is displayed.

---

## Task 5: Delete the Table

In this task, you will delete the Music table, which will also delete all the data in the table.

1. In the DynamoDB dashboard, under **Tables**, choose **Update settings**.
2. Choose the **Music** table if it is not already selected.
3. Choose **Actions**, and then choose **Delete table**.
4. On the confirmation panel, enter `delete` and choose **Delete table**.

The table will be deleted.

---

## Conclusion

🎉 **Congratulations!** You have successfully:

- ✅ Created an Amazon DynamoDB table
- ✅ Entered data into an Amazon DynamoDB table
- ✅ Queried an Amazon DynamoDB table
- ✅ Deleted an Amazon DynamoDB table

For more information about DynamoDB, see the [DynamoDB documentation](https://docs.aws.amazon.com/dynamodb/).

---

## Lab Complete

Choose **End Lab** at the top of this page, and then select **Yes** to confirm that you want to end the lab. An *"Ended AWS Lab Successfully"* message will be briefly displayed.

For more information about AWS Training and Certification, see [AWS Training and Certification](https://aws.amazon.com/training/).

---

*© 2022 Amazon Web Services, Inc. and its affiliates. All rights reserved. This work may not be reproduced or redistributed, in whole or in part, without prior written permission from Amazon Web Services, Inc. Commercial copying, lending, or selling is prohibited.*