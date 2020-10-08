# Connect Configuration

The first step in setting up your Amazon Connect contact center is to create a virtual contact center instance. Each instance contains all the resources and settings related to your contact center.

If you have already an Amazon Connect instance that you want to use, then please skip this first step and move to the second part of this [lab](https://github.com/andres-lindo/aws-multichannel-customer-engagement/blob/master/labs/01_AmazonConnect/README.md#connect-to-your-amazon-connect-instance)

Search for [Amazon Connect](https://console.aws.amazon.com/connect) in your aws console 

## Setup your Connect Instance

### Step 1

1. Choose Get started. If you have previously created an instance, choose Add an instance instead.

2. Choose one of the following options:
- Store users within Amazon Connect - Use Amazon Connect to create and manage user accounts.
- Link to an existing directory - Use an AWS Directory Service directory to manage your users. You can use each directory with one Amazon Connect instance at a time.
- SAML 2.0-based authentication - Use an existing identity provider (IdP) to federate users with Amazon Connect.

3. If you chose Store users within Amazon Connect or SAML 2.0-based authentication, provide the left-most label for Access URL. This label must be unique across all Amazon Connect instances in all Regions. You can't change the access URL after you create your instance.

4. If you chose Link to an existing directory, select the AWS Directory Service directory for Directory. The directory name is used as the left-most label for Access URL.

5. Choose Next step.


![connect](./images/image%20(3).png)

![connect](./images/image%20(4).png)

### Step 2: Administrator

After you specify the user name of the administrator for the Amazon Connect instance, a user account is created in Amazon Connect and the user is assigned the Admin security profile. Specify the administrator for your instance and choose **to Next step.


![connect](./images/image%20(5).png)

### Step 3: Telephony options

Use the options in this section to choose whether you want your agents to receive calls from customers, make outbound calls, and hear early media audio.

![connect](./images/image%20(6).png)

### Step 4: Data storage

When you create an instance, by default we create an Amazon S3 bucket. Data, such as reports and recordings of conversations, is encrypted using AWS Key Management Service, and then stored in the Amazon S3 bucket.

This bucket and key are used for both recordings of conversations and exported reports. Alternatively, you can specify separate buckets and keys for recordings of conversations and exported reports.

In case you want to customize it - Please see documentation [here](https://docs.aws.amazon.com/connect/latest/adminguide/amazon-connect-instances.html)

Choose **Next step.

![connect](./images/image%20(7).png)

### Step 5: Review and create
When you are finished configuring your instance, you can create it.


## Connect to your Amazon Connect Instance


### Step 1. Import the Contact Flow

Log in to your contact center using your access URL (https://domain.awsapps.com/connect/login).

1. Choose Routing, Contact Flows.

![connect](./images/image%20(11).png)

2. Create a new contact flow of the same type as the one you are importing.

![connect](./images/image%20(12).png)

3. Choose Save, Import flow.

![connect](./images/image%20(13).png)

4. Select the 

- [File in english](../01_Connect/files/[ENGLISH]InboudCallwLex) 

- [Archivo en español](../01_Connect/files/[ENGLISH]InboudCallwLex) 

   to import, and choose Import. When the contact flow is imported into an existing contact flow, the name of the existing contact flow is updated, too.

5. To save the imported flow, choose Save. To publish, choose Save and Publish.

NOTE - After we deploy the Cloudformation in the next step, we will come back to this contact flow to add our Amazon lex bot.


 
![connect](./images/image%20(14).png)

Once created, you should be seeing something similar at this flow


![connect](./images/image%20(16).png)


Please repeat the previous steps and import the following flows as well.

#### For English

- [[ENGLISH]BasicChat](../01_Connect/files/[ENGLISH]BasicChat)
- [BasicChatDisconnectFlow](../01_Connect/files/BasicChatDisconnectFlow)

#### Para Español

- [[SPANISH]BasicChat](../01_Connect/files/[SPANISH]BasicChat)
- [BasicChatDisconnectFlow](../01_Connect/files/BasicChatDisconnectFlow)

### Step 2. Setup Queues

1. Choose Routing, Queues, Edit basic  queue.

2. Assign the queue to the routing profile; for information, see Create a routing profile. The routing profile links the queue and agents together.

![connect](./images/image%20(17).png)

![connect](./images/image%20(18).png)

### Step 3. Configure your phone number

After you create an Amazon Connect instance, you can claim a phone number to use for your contact center. You can use this phone number to place a test call in to your contact center to confirm that it is working correctly. You can also use it in your production environment.

To claim a number for your contact center:

1. Choose **Routing** - **Phone numbers**.

![connect](./images/image%20(39)2.png)

2. Choose **Claim a number**. Select the country and choose a toll free number or a Direct Inward Dialing (DID) number.

3. Enter a description for the number and, attach it to the contact flow created in Step .1 (Probably It's called [ENGLISH]/ [SPANISH]InboudCallwLex, depending on the language you chose)

![connect](./images/image%20(44)2.png)

4. Choose Save.

Now you have a phone number for your customers to contact you.

You are now ready to go to lab 2 : [Deploy CloudFormation](../02_CloudFormation/README.md)
