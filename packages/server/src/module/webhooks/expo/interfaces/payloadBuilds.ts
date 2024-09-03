export interface PayloadBuild {
    "id": string,
    "accountName": string,
    "projectName": string,
    "buildDetailsPageUrl": string,
    "parentBuildId": string, // available for build retries
    "appId": string,
    "initiatingUserId": string,
    "cancelingUserId": null | string, // available for canceled builds
    "platform": "android" | "ios", // or "ios"
    "status": "errored" | "finished" | "canceled", // or: "finished", "canceled"
    "artifacts": {
        "buildUrl": string, // available for successful builds
        "logsS3KeyPrefix": string
    },
    "metadata": {
        "appName": string
        "username": string
        "workflow": string
        "appVersion": string
        "appBuildVersion": string
        "cliVersion": string
        "sdkVersion": string
        "buildProfile": string
        "distribution": string
        "appIdentifier": string
        "gitCommitHash": string
        "gitCommitMessage": string
        "runtimeVersion": string
        "channel": string
        "releaseChannel": string
        "reactNativeVersion": string
        "trackingContext": {
            "platform": string,
            "account_id": string,
            "dev_client": false,
            "project_id": string
            "tracking_id": string
            "project_type": string
            "dev_client_version": string
        },
        "credentialsSource": string,
        "isGitWorkingTreeDirty": boolean,
        "message": string, // message attached to the build
        "runFromCI": boolean
    },
    "metrics": {
        "memory": number
        "buildEndTimestamp": number
        "totalDiskReadBytes": number
        "buildStartTimestamp": number
        "totalDiskWriteBytes": number
        "cpuActiveMilliseconds": number
        "buildEnqueuedTimestamp": number
        "totalNetworkEgressBytes": number
        "totalNetworkIngressBytes": number
    },
    // available for failed builds
    "error": {
        "message": string,
        "errorCode": string
    },
    "createdAt": string
    "enqueuedAt": string
    "provisioningStartedAt": string
    "workerStartedAt": string
    "completedAt": string
    "updatedAt": string
    "expirationDate": string
    "priority": string
    "resourceClass": string
    "actualResourceClass": string
    "maxRetryTimeMinutes": number // max retry time for failed/canceled builds
}