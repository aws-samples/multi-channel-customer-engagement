import json
import boto3
from crhelper import CfnResource
import os

helper = CfnResource()

s3 = boto3.client('s3')
s3_resource = boto3.resource('s3')
sourceBucket = os.environ['s3sourceBucket']
sourcePrefix = os.environ['s3sourcePrefix']
destinationbucket = os.environ['s3destinationBucket']


def lambda_handler(event, context):
    helper(event, context)


@helper.create
@helper.update
def copy_website(event, _):
    bucket = s3_resource.Bucket(sourceBucket)
    for object in bucket.objects.filter(Prefix=sourcePrefix):
        file = object.key
        try:
            copy_source = {'Bucket': sourceBucket, 'Key': file}
            s3_resource.meta.client.copy(
                copy_source, destinationbucket, file.replace(sourcePrefix, ""))
        except:
            print("An exception occurred copying: " + file) 

@helper.delete
def delete_website(_, __):
    for object in s3_resource.Bucket(destinationbucket).objects.all():
        s3.delete_object(Bucket=destinationbucket, Key=object.key)
