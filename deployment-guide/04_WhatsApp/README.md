
# Integrating your Amazon Lex Bot with WhatsApp

We provide a quick overview of the features and capabilities of integration between WhatsApp Business API and our Amazon Lex Chatbot through Twilio.

*Note:* Twilio and WhatsApp are third-party services subject to additional terms and charges. Amazon Web Services isn’t responsible for any third-party service that you use to send messages with custom channels. 

The following configuration will allow connection to a twilio sandbox to test the functionality for 24 hours. It must always be validated and configured prior to the presentation of the demo. 

## Create a twilio account and integrate it with WhatsApp 

1. Sign up for a [Twilio account](https://www.twilio.com/console). Once you are in your dashboard, write down the following account information: *ACCOUNT SID* and *AUTH TOKEN*

<img width="1783" alt="Dashboard" src="https://user-images.githubusercontent.com/9591455/121612335-d453f100-ca1f-11eb-9096-8dcea40981ab.png">

2. Sign in to the AWS Management Console and open the Amazon Lex console at https://console.aws.amazon.com/lex/. 

    - Choose your Amazon Lex bot.

    - Choose **Channels**.

    - Choose **Twilio SMS** under **Channels**. The console displays the Twilio SMS integration page.

    - On the Twilio SMS integration page, do the following:

        + Type the following name: TwilioWhatsApp.
        + For **Channel Description**, type the following: WhatsApp channel.
        + Select The IAM Role: AWSServiceRoleForLexChannels
        + For **KMS key**, choose **aws/lex**.
        + For **Alias**, choose the bot alias (**prod**).
        + For **Account SID**, type the **ACCOUNT SID** (obtained in the previous step)
        + For **Authentication Token**, type the **AUTH TOKEN** (obtained in the previous step)
        + Choose **Activate**.

  The console creates the bot channel association and returns a callback URL. Write down this URL

<img width="1771" alt="lexsettings" src="https://user-images.githubusercontent.com/9591455/121613450-1da54000-ca22-11eb-9eb1-32e7de4a5b93.png">

3. Return to your Twilio dashboard. On the left menu, click *Programable Messaging*, then *Try it Out* and finally: *Try WhatsApp*. This is the first step in setting up. You can see more details of this configuration in the following [link](https://www.twilio.com/docs/whatsapp/api)

   You must send the code indicated to the WhatsApp number that appears on the screen. Few seconds after you have sent the message, you will see a response on the dashboard indicating that the message has been received and you can continue with the next step: Next: Send a One-Way Message.   

<img width="1790" alt="1  Enroll" src="https://user-images.githubusercontent.com/9591455/121614299-036c6180-ca24-11eb-9f06-89d1939b0b63.png">

4. The second step is explanatory, so after reading, you can click: *Next: Two-Way Messaging*

<img width="1788" alt="2  Send a One-Way WhatsApp Message" src="https://user-images.githubusercontent.com/9591455/121614788-15023900-ca25-11eb-9884-d61096e90b66.png">

5. The third step, It is also informative and represents an example of the test conversations that will take place from the device. You can test the functionality by sending a reply (optional). For example, you can send by WhatsApp a: Hello. Then you can advance to the next step: "Next: Configure Your Sandbox" 

<img width="1791" alt="3  Two-Way Messaging" src="https://user-images.githubusercontent.com/9591455/121615264-12ecaa00-ca26-11eb-8954-c1efe23fc9d5.png">

6. In our last step, we will take the URL callback (obtained in step 2) and place it as a parameter in the field: *WHEN A MESSAGE COMES IN* and finally click on *Save*.

<img width="1783" alt="Configure  Sandbox" src="https://user-images.githubusercontent.com/9591455/121615897-8511be80-ca27-11eb-89c3-798e584f3a89.png">

7. You can now start a conversation from WhatsApp with your Amazon Lex bot.
