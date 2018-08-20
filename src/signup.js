
import Hapi from 'hapi';

global.fetch = require('node-fetch');

const config = require('../config.json');

const AmazonCogintoIdentity = require('amazon-cognito-identity-js');

const poolData = {
	UserPoolId: config.cognito.userPoolId,
	ClientId : config.cognito.clientId,
}

const userPool = new AmazonCogintoIdentity.CognitoUserPool(poolData)



const routes = [
	{
		method: 'GET',
		path: '/',
		handler: function(req, reply){
			console.log('Hello I am from routes.js')
			return reply.view('index')
		} 
	},
	{
		method: 'GET',
		path: '/signup',
		handler: function(req, reply){
			return reply.view('signup')
		}
	},
	{
		method: 'POST',
		path: '/signup',
		handler: function(request, reply){
			const email = request.payload.email;
			const password = request.payload.password;
			const confirmpassword = request.payload.Confirm_password;

			if (password !== confirmpassword) {
				console.log('password dose not metch')
				// return reply.redirect('/signup?error=passwords')
			}else{
				const emailData = {
					Name: 'email',
					Value: email
				};
				const emailAttribute = new AmazonCogintoIdentity.CognitoUserAttribute(emailData);

				userPool.signUp(email, password, [emailAttribute], null, (err, data) =>{
					if (err) {
						console.log(err)
					}else{
						return reply(data.user);	
					}
				});
			}
		}
	}
]

export default routes;