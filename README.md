# A basic 3D model viewer

This is a simple demo app based on ScaffoldVuer developed in the ABI with additional controls.

The purpose of this app is to test out the rendering capabilities and features of ScaffoldVuer.

This app is developed using [VueJS version 2](https://v2.vuejs.org/) with user interface components from [elementUI](https://element.eleme.io/#/en-US). This app

This app has been compiled and tested with node version 12 and 14.

## Accessing information of the models dialog

The models dialog displays information of various 3D models and the information is accessed from a google spreadsheet and to gain access to the google spreadsheet using the API, you are required to create a credential for a service account.

Please see the following link to
[Create a service account](https://cloud.google.com/iam/docs/service-accounts-create) and [create credentials for a service account](https://developers.google.com/workspace/guides/create-credentials).

Once you have created credentials for a service account, you now have the private key and service email to access the spreadsheet.

The top level of the repository should contain a file named .env and in it you will find three environment variables - VUE_APP_GOOGLE_PRIVATE_KEY , VUE_APP_GOOGLE_SERVICE_EMAIL and VUE_APP_GOOGLE_SPREADSHEET_ID.

You should copy and paste the private key and service email to VUE_APP_GOOGLE_PRIVATE_KEY and VUE_APP_GOOGLE_SERVICE_EMAIL respectively.

## Installing Node version 12 and 14 using VM

We recommand using Node Version Manager (NVM) to install different versions of node, the documentation for installing and using NVM can be found [here](https://github.com/nvm-sh/nvm). There are also many tutorials available up on Google.

## To run the app
```bash
npm install
npm run serve
```

