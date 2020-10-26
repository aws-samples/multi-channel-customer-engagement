# Cleaning Up

## Delete your Amazon Connect instance

If you no longer want to use an instance, you can delete it. When you delete an instance, the phone number claimed for the instance is released back to inventory. You lose all settings, data, metrics, and reports associated with the instance. When customers call the phone number you've released, they'll get a message that it's not a working phone number.

> Important: You cannot undo the deletion of an instance or restore settings or data from the instance after it is deleted.

To delete an instance

- Open the Amazon Connect console at https://console.aws.amazon.com/connect/
- Select the check box for the instance and choose **Remove**.
- When prompted, type the name of the instance and choose **Remove**.


## Delete the AWS CloudFormation stack

To delete a stack
    
- Open the AWS CloudFormation console at https://console.aws.amazon.com/cloudformation
- On the Stacks page in the CloudFormation console, select the stack that you want to delete. The stack must be currently running.
- In the stack details pane, choose **Delete**.
- Select **Delete stack** when prompted.

> Note: After stack deletion has begun, you cannot abort it. The stack proceeds to the DELETE_IN_PROGRESS state.

After the stack deletion is complete, the stack will be in the **DELETE_COMPLETE** state. Stacks in the **DELETE_COMPLETE** state are not displayed in the AWS CloudFormation console by default.