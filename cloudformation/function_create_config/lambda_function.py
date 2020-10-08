import json
import boto3
from crhelper import CfnResource

helper = CfnResource()

def lambda_handler(event, context):
    print(event)
    helper(event, context)

@helper.create
@helper.update
def create_cofig_file(event, _):
    config = {
        "region": event['ResourceProperties']['region'],
        "siteUrl": 'https://' + event['ResourceProperties']['siteUrl'],
        "cognitoIdentityPoolId": event['ResourceProperties']['cognitoIdentityPoolId'],
        "cognitoUserPoolId": event['ResourceProperties']['cognitoUserPoolId'],
        "cognitoDomain": event['ResourceProperties']['cognitoDomain'],
        "cognitoClientId": event['ResourceProperties']['cognitoClientId'],
        "dataRefreshInterval": 2000,
        "apiGatewayEndpoint": event['ResourceProperties']['apiGatewayEndpoint'],
        "connectInstanceId": event['ResourceProperties']['connectInstanceId'],
        "connectContactFlowId": event['ResourceProperties']['connectContactFlowId'],
        "kinesisStreamName": event['ResourceProperties']['kinesisStreamName'],
        "pinPointAppId": event['ResourceProperties']['pinPointAppId']
    }

    body = "myConfig = " + json.dumps(config)

    bucket_name = event['ResourceProperties']['siteBucketName']
    file_name = "config/config.js"

    s3 = boto3.resource("s3")
    s3.Bucket(bucket_name).put_object(Key=file_name, Body=body)

    helper.Data['config'] = body

@helper.delete
def no_op(_, __):
    pass
