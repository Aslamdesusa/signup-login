import Hapi from 'hapi';

// global.fetch = require('node-fetch')
const fetch = require('node-fetch');
const config = require('../config.json');

const AmazonCogintoIdentity = require('amazon-cognito-identity-js');

const UserPoolId = config.cognito.userPoolId
const ClientId = config.cognito.clientId
const userPool = new AmazonCogintoIdentity.CognitoUserPool({UserPoolId, ClientId})

const AuthCookie = require('hapi-auth-cookie')

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
		path: '/login',
		// config: {
		// 	auth:{
		// 		strategy: 'session',
		// 	}
		// },
		handler: function(request, reply){
			const loginDetails = {
				Username: request.payload.username,
				Password: request.payload.password
			}
			const authenticationDetails = new AmazonCogintoIdentity.AuthenticationDetails(loginDetails)

			const userDetails = {
				Username: request.payload.username,
				Pool: userPool
			}
			const page = this;

			const cognitoUser = new AmazonCogintoIdentity.CognitoUser(userDetails)
			cognitoUser.authenticateUser(authenticationDetails, {
				onSuccess: function(data) {
					// console.log(data)
					var accessToken = result.getAccessToken().getJwtToken();
		           	page.storage.set('session', accessToken);
		           	page.navCtrl.setRoot('session');
		           	console.log('done')
				},
				onFailure: function(err) {
					console.log(err.message || JSON.stringify(err));
					// request.AuthCookie(err[0]);
					// reply.state('session', err.message)
					// console.log('failed to login.', err);
				}
			});
		}
	}
	
]
export default routes;