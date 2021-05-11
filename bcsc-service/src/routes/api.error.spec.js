const request = require('supertest');
const apiRoutes = require('./api');
const express = require("express");
const session = require("express-session");
const app = express();

// Set up mock configuration
const mockError = { status: 500,
    response: { title: 'mock error',
        description: 'mock error details',
        data: "ERROR_DATA"
    }
};

jest.mock('axios', () => ({
    post: jest.fn((_url, _body) => { 
        return new Promise((resolve) => {
            url = _url;
            body = _body;
            throw(mockError);
        });
    }),
    get: jest.fn((_url, _body) => { 
        return new Promise((resolve) => {
            url = _url;
            body = _body;
            throw(mockError);
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

    it('should return the error data when get "/api/auth/:code" ', async (done) => {
        const code = "CODE";
        request(app)
            .get(`/api/auth/${code}`)
            .expect({ error: mockError.response.data })
            .expect(200, done)
    })

    it('should return user info when get "/api/userinfo" with a token', async (done) => {
        // the token is set in the app setup
        request(app)
            .get(`/api/userinfo`)
            .expect({ err: mockError })
            .expect(200, done)
    })
})