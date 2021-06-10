
# Integrating your Amazon Lex Bot with Facebook Messenger

## Create a Facebook Application and Facebook Page

On the Facebook developer portal, create a Facebook application and a Facebook page. Follow the steps below to perform this:

1. Enter to the following [Link](https://www.facebook.com/pages/creation/), and fill the page information (you can choose your own page name). Then, click on *Create Page*

<img width="1470" alt="3- Crear pagina facebook" src="https://user-images.githubusercontent.com/9591455/121602058-5c300000-ca0c-11eb-960e-96f3994e7abb.png">


2. Sing in to the [facebook developer portal](https://developers.facebook.com/), enter to your dashboard and click on *Create App*. (The name of the page and the application do not necessarily have to be the same).

<img width="1454" alt="5 - Create App Business" src="https://user-images.githubusercontent.com/9591455/121605236-abc4fa80-ca11-11eb-8c9b-3e121d566b58.png">

3. Once you have created your app, navigate through the app options and once you see the messenger option, click on *Set Up*

<img width="1464" alt="7 - messenger, geststarted" src="https://user-images.githubusercontent.com/9591455/121605837-b16f1000-ca12-11eb-8ff2-6ae259481eae.png">


4. Scroll down into the page, identify the section *Access Tokens*, and click on: *Add or Remove Pages*. You will see a screen like the following one, in which you must select the page created previously in 1. Follow the steps of the wizard until the page is finally linked. 

<img width="1459" alt="8 - addpages2" src="https://user-images.githubusercontent.com/9591455/121606590-0d866400-ca14-11eb-84b6-d39940c9c044.png">


5. Once this procedure is done, notice that in the Access Token section, a token has been generated. Please copy the token, this will be ours: *Page Access Token*, which we will use later in Amazon Lex 

<img width="1456" alt="10 - generateToken " src="https://user-images.githubusercontent.com/9591455/121606996-d8c6dc80-ca14-11eb-9d61-8a8cbc8bc94d.png">


6. Return to the dashboard, and in the left side menu select: Settings, Basic, and then you will see your App ID and the App Secret. Please copy It, this will be ours: *App Secret Key*, which we will use later in Amazon Lex  

<img width="1459" alt="12 - appsecretkey" src="https://user-images.githubusercontent.com/9591455/121607343-7cb08800-ca15-11eb-8bfc-bbb6c3395291.png">


7. Sign in to the AWS Management Console and open the Amazon Lex console at https://console.aws.amazon.com/lex/. 

    - Choose your Amazon Lex bot.

    - Choose **Channels**.

    - Choose **Facebook** under **Chatbots**. The console displays the Facebook integration page.

    - On the Facebook integration page, do the following:
        + Type the following name: CloudBankFacebookAssociation.
        + For **KMS key**, choose **aws/lex**.
        + For **Alias**, choose the bot alias (**prod**).
        + For **Verify token**, type a token. This can be any string you choose (for example, CloudBankToken). You use this token later in the Facebook developer portal when you set up the webhook.
        + For **Page access token**, type the token that you obtained when created the Facebook page. (step 5)
        + For **App secret key**, type the key that you obtained when created the Facebook app. (step 6)
        + Choose **Activate**.

<img width="1462" alt="lex full" src="https://user-images.githubusercontent.com/9591455/121607875-766edb80-ca16-11eb-85e2-4fd525cc2249.png">


8. The console creates the bot channel association and returns a callback URL. Write down this URL

<img width="1458" alt="activate URL Callback" src="https://user-images.githubusercontent.com/9591455/121608085-db2a3600-ca16-11eb-8437-2e3b40f20333.png">


9. Return to the Facebook developer portal and choose your app. On the left menu click (**+**), add the **Messenger** product, scroll down in the page until you will see the **Webhooks** section of the page, then choose: **Add callbak URL**. On the popup page, do the following:

    + For **Callback URL**, type the callback URL provided in the Amazon Lex console earlier in the procedure.

    + For **Verify Token**, type the same token that you used in Amazon Lex.

    + Choose **Verify and Save**. This initiates a handshake between Facebook and Amazon Lex.



<img width="1459" alt="editcallbackURL" src="https://user-images.githubusercontent.com/9591455/121608319-4b38bc00-ca17-11eb-90d8-74a66f1ee4f3.png">

10. In the same section of the page (Webhooks), Click **Add suscription** buttons, check **messages**, **messaging_postbacks**, and **messaging_optins** and click **Save**

![Captura de Pantalla 2021-06-10 a la(s) 6 16 30 p  m](https://user-images.githubusercontent.com/9591455/121608873-5d672a00-ca18-11eb-8598-68f315281278.png)

11. You can now start a conversation from Facebook Messenger with your Amazon Lex bot. Open your Facebook page, and choose Message.

You are now ready to go to step 5: [Using the solution](../05_UserGuide/README.md)
