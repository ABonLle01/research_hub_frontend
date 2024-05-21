// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiKey: '59d17dfeee304c029ba42c393a34e6c0',
  apiUrl: 'https://newsapi.org/v2',

  apiRestUrl: 'http://localhost:3000/api/',

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  firebaseConfig: {
    apiKey: "AIzaSyDL3iJK6TrgmKGqmnqTvkLCoO-3BdP4kS0",
    authDomain: "auth-researchhub.firebaseapp.com",
    projectId: "auth-researchhub",
    storageBucket: "auth-researchhub.appspot.com",
    messagingSenderId: "414867253150",
    appId: "1:414867253150:web:4074fb9d8f2a053decd88f",
    measurementId: "G-DEEPPKTERM"
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
