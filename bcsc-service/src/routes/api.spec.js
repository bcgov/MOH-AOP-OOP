const request = require('supertest');
const apiRoutes = require('./api');
const express = require("express");
const session = require("express-session");
const app = express();

// Set up mock configuration
jest.mock('axios', () => ({
    post: jest.fn((_url, _body) => { 
        return new Promise((resolve) => {
            url = _url;
            body = _body;
            resolve({ data: {access_token: 'TOKEN'} });
        });
    }),
    get: jest.fn((_url, _body) => { 
        return new Promise((resolve) => {
            url = _url;
            body = _body;
            resolve({ data: {testData: 'TEST_DATA'}});
        });
    })
}));

const config = {
    grant_type: 'GRANT_TYPE',
    auth_scope: 'SCOPE',
    redirect_uri: 'REDIRECT_URI',
    client_id: 'CLIENT_ID',
    client_secret: 'CLIENT_SECRET',
    token_uri: 'TOKEN_URI',
    auth_uri: 'AUTH_URI',
    info_uri: 'INFO_URI',
};

// Set up express
app.use(express.urlencoded({ extended: false }));
app.use(session({secret:'Keep it secret'
    ,name:'uniqueSessionID'
    ,saveUninitialized:false}));
app.all('*', function(req, res, next) {
    req.session.token = 'TEST_TOKEN';
    next();
});

// load the routes to be tested
app.use("/api", apiRoutes(config));

describe('api routes', () => {
    it('should return the correct url when get "/api/url" ', async (done) => {
        request(app)
            .get("/api/url")
            .expect({ url: `${config.auth_uri}?response_type=code` +
            `&scope=${config.auth_scope}&client_id=${config.client_id}` +
            `&redirect_uri=${config.redirect_uri}&state=A` })
            .expect(200, done);
    })

    it('should return user info when get "/api/auth/:code" ', async (done) => {
        const code = "CODE";
        request(app)
            .get(`/api/auth/${code}`)
            .expect({testData: 'TEST_DATA'})
            .expect(200, done)
    })

    it('should return user info when get "/api/userinfo" with a token', async (done) => {
        // the token is set in the app setup
        request(app)
            .get(`/api/userinfo`)
            .expect({testData: 'TEST_DATA'})
            .expect(200, done)
    })

    it('should destroy the saved session when post /logout', async (done) => {
        request(app)
            .post(`/api/logout`)
            .expect(204, done)
    })
})