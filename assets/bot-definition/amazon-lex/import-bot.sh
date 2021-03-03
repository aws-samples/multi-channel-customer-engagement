#!/bin/bash

set -ex
echo $RANDOM

Account=$(aws sts get-caller-identity | jq -r '.Account')
echo $Account

#Only to run out of CodeBuild
#AWS_DEFAULT_REGION=$(aws configure get profile.default.region) 
intentsFile=cloud-bank-$1-us.json
botFile=bot-$1-us.json

sed -i "s/Account/$Account/g" $intentsFile
sed -i "s/region/$AWS_DEFAULT_REGION/g" $intentsFile

zip bot.zip $intentsFile

aws iam get-role --role-name AWSServiceRoleForLexBots || true 

if [[ $? -eq 254 ]]; then aws iam create-service-linked-role --aws-service-name lex.amazonaws.com; echo 'Lex Linked Role created'; else echo 'Lex Linked Role already exists'; fi

sleep 60; echo -n '.'

aws lambda add-permission \
    --region $AWS_DEFAULT_REGION \
    --function-name multichannel-lex-bot \
    --statement-id $RANDOM \
    --action lambda:InvokeFunction \
    --principal lex.amazonaws.com \
    --source-arn "arn:aws:lex:$AWS_DEFAULT_REGION:$Account:intent:startSession:*"

aws lambda add-permission \
    --region $AWS_DEFAULT_REGION \
    --function-name multichannel-lex-bot \
    --statement-id $RANDOM \
    --action lambda:InvokeFunction \
    --principal lex.amazonaws.com \
    --source-arn "arn:aws:lex:$AWS_DEFAULT_REGION:$Account:intent:callRequest:*"

aws lambda add-permission \
    --region $AWS_DEFAULT_REGION \
    --function-name multichannel-lex-bot \
    --statement-id $RANDOM \
    --action lambda:InvokeFunction \
    --principal lex.amazonaws.com \
    --source-arn "arn:aws:lex:$AWS_DEFAULT_REGION:$Account:intent:welcomeMessage:*"

aws lambda add-permission \
    --region $AWS_DEFAULT_REGION \
    --function-name multichannel-lex-bot \
    --statement-id $RANDOM \
    --action lambda:InvokeFunction \
    --principal lex.amazonaws.com \
    --source-arn "arn:aws:lex:$AWS_DEFAULT_REGION:$Account:intent:creditAdvance:*"

aws lambda add-permission \
    --region $AWS_DEFAULT_REGION \
    --function-name multichannel-lex-bot \
    --statement-id $RANDOM \
    --action lambda:InvokeFunction \
    --principal lex.amazonaws.com \
    --source-arn "arn:aws:lex:$AWS_DEFAULT_REGION:$Account:intent:creditCardBalance:*"

aws lambda add-permission \
    --region $AWS_DEFAULT_REGION \
    --function-name multichannel-lex-bot \
    --statement-id $RANDOM \
    --action lambda:InvokeFunction \
    --principal lex.amazonaws.com \
    --source-arn "arn:aws:lex:$AWS_DEFAULT_REGION:$Account:intent:officeSchedule:*"

aws lambda add-permission \
    --region $AWS_DEFAULT_REGION \
    --function-name multichannel-lex-bot \
    --statement-id $RANDOM \
    --action lambda:InvokeFunction \
    --principal lex.amazonaws.com \
    --source-arn "arn:aws:lex:$AWS_DEFAULT_REGION:$Account:intent:savingsAcctBalance:*"

aws lambda add-permission \
    --region $AWS_DEFAULT_REGION \
    --function-name multichannel-lex-bot \
    --statement-id $RANDOM \
    --action lambda:InvokeFunction \
    --principal lex.amazonaws.com \
    --source-arn "arn:aws:lex:$AWS_DEFAULT_REGION:$Account:intent:creditCardPay:*"

# Import the model
import_id=$(aws lex-models start-import \
    --payload fileb://bot.zip \
    --resource-type BOT \
    --merge-strategy OVERWRITE_LATEST \
    --output text \
    --query 'importId')


while state=$(aws lex-models get-import --import-id $import_id --output text --query 'importStatus'); test "$state" = "IN_PROGRESS"; do
  sleep 5; echo -n '.'
done;

aws lex-models get-import --import-id $import_id

state=$(aws lex-models get-import --import-id $import_id --output text --query 'importStatus')

test "$state" = "COMPLETE"

# Build the model
aws lex-models put-bot-alias --name prod --bot-name multichannel_lex_bot --bot-version "\$LATEST" || true

checksum=$(aws lex-models get-bot --name multichannel_lex_bot --version-or-alias "\$LATEST" --query 'checksum' --output text)

aws lex-models put-bot --name multichannel_lex_bot --cli-input-json file://$botFile --checksum $checksum --detect-sentiment

while state=$(aws lex-models get-bot --name multichannel_lex_bot --version-or-alias "\$LATEST" --output text --query 'status'); test "$state" = "BUILDING"; do
  sleep 5; echo -n '.'
done;

sleep 60; echo -n '.'

state=$(aws lex-models get-bot --name multichannel_lex_bot --version-or-alias "\$LATEST" --output text --query 'status')

test "$state" = "READY"

