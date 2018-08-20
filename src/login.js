import Hapi from 'hapi';

const config = require('../config.json');

const parser = require('body-parser');

const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
const Amplify = require('aws-amplify');

// Initialize the Amazon Cognito credentials provider
// AWS.config.region = 'ap-south-1'; // Region
global.fetch = require('node-fetch');
// var Cookies2 = require('js-cookie');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

// const poolData = {
// 	Region: config.cognito.region,
// 	UserPoolId: config.cognito.userPoolId,
// 	ClientId : config.cognito.clientId,
// 	IdentityPoolId: config.cognito.identityPoolId
// }

// const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)



const AuthCookie = require('hapi-auth-cookie')


const AWS = require('aws-sdk');

AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'ap-south-1:8991be0a-81af-4c75-9714-05e840fffd12',
});


const routes = [
	{
		method: 'GET',
		path: '/login',
		handler: function(request, reply){
			return reply.view('login')
		}
	},
	{
		method: 'POST',
		path: '/login/user',
		handler: function(request, reply){

			var authenticationData = {
			        Username : request.payload.email,
			        Password : request.payload.password,
			    };
			    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
			    var poolData = { 
			    	UserPoolId : 'ap-south-1_LhaZuFfwe',
			        ClientId : '84ol5cprjqur8om0hs7ua3sho'
			    };
			    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
			    var userData = {
			        Username : request.payload.email,
			        Pool : userPool
			    };
			    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
			    cognitoUser.authenticateUser(authenticationDetails, {
			        onSuccess: function (result) {
			        	console.log(result)
			            var accessToken = result.getAccessToken().getJwtToken();

			            /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer */
			            var idToken = result.idToken.jwtToken;
			            console.log(idToken)
			        },

			        onFailure: function(err) {
			            reply(err)
			        },

			});
			// // console.log(request)
			// const loginDetails = {
			// 	Username: 'aslam17@navgurukul.org',
			// 	Password: 'AslamDesusa123#'
			// }
			// const authenticationDetails = new AmazonCogintoIdentity.AuthenticationDetails(loginDetails)

			// const userDetails = {
			// 	Username: 'aslam17@navgurukul.org',
			// 	Pool: userPool
			// }
			// const cognitoUser = new AmazonCogintoIdentity.CognitoUser(userDetails)
			// console.log(cognitoUser)
			// cognitoUser.authenticateUser(authenticationDetails, {
			// 	onSuccess: function (session) {
			// 		const tokens = {
			// 			// console.log(cognitoUser)
			// 			accessToken: session.getAccessToken().getJwtToken(),
			//             IdToken: session.getIdToken().getJwtToken(),
			//             RefreshToken: session.getRefreshToken().getToken(),
			//             // console.log(result)
		 //        	};
		 //        	cognitoUser['tokens'] = tokens;
		 //        	resolve(cognitoUser)
		 //        },
		 //        onFailure: function (err) {
		 //        	console.error(err.message)
		 //        	// return reply(err)
		 //        }
			// });
		}
	}
	
]
export default routes;