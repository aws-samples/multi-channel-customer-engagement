
# Integrating your Amazon Lex Bot with Facebook Messenger

## Create a Facebook Application

On the Facebook developer portal, create a Facebook application and a Facebook page.

Write down the following:

- The App Secret for the Facebook App
- The Page Access Token for the Facebook page

## Integrate Facebook Messenger with the Amazon Lex Bot 

After you complete this step, the console provides a callback URL. Write down this URL.

1. - Sign in to the AWS Management Console and open the Amazon Lex console at https://console.aws.amazon.com/lex/

    - Choose your Amazon Lex bot.

    - Choose **Channels**.

    - Choose **Facebook** under **Chatbots**. The console displays the Facebook integration page.

    - On the Facebook integration page, do the following:
        + Type the following name: CloudBankFacebookAssociation.
        + For **KMS key**, choose **aws/lex**.
        + For **Alias**, choose the bot alias.
        + For **Verify token**, type a token. This can be any string you choose (for example, CloudBankToken). You use this token later in the Facebook developer portal when you set up the webhook.
        + For **Page access token**, type the token that you obtained from Facebook in Step 2.
        + For **App secret key**, type the key that you obtained from Facebook in Step 2.
        + Choose **Activate**.

        The console creates the bot channel association and returns a callback URL. Write down this URL

2. On the Facebook developer portal, choose your app.

3. Choose the **Messenger** product, and choose **Setup webhooks** in the **Webhooks** section of the page.

4. On the **webhook** page of the subscription wizard, do the following:

    + For **Callback URL**, type the callback URL provided in the Amazon Lex console earlier in the procedure.

    + For **Verify Token**, type the same token that you used in Amazon Lex.

    + Choose **Subscription Fields (messages, messaging_postbacks, and messaging_optins)**.

    + Choose **Verify and Save**. This initiates a handshake between Facebook and Amazon Lex.

5. Enable Webhooks integration. Choose the page that you created, and then choose **subscribe**.

6. You can now start a conversation from Facebook Messenger with your Amazon Lex bot. Open your Facebook page, and choose Message.




