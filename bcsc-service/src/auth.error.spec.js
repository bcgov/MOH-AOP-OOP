const { getAuthUrl, getToken, getInfo } = require('./auth');
const axios = require('axios');

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

describe("getToken", () => {
    it('sends the correct POST request and throws the returned error', async () => {
        const code = "CODE";
        await getToken(config, code)
            .catch((err) => {
                expect(err).toEqual(mockError);
            });
        
        expect(axios.post)
            .toHaveBeenCalledWith( config.token_uri,
                `code=${code}` + 
                `&redirect_uri=${config.redirect_uri}` +
                `&client_id=${config.client_id}` +
                `&client_secret=${config.client_secret}` +
                `&grant_type=${config.grant_type}`
            );
    })
})

describe("getInfo", () => {
    it('sends the correct GET request and throws the returned error', async () => {
        const token = "TOKEN";
        await getInfo(config, token)
            .catch((err) => {
                expect(err).toEqual(mockError);
            });
        expect(axios.get)
            .toHaveBeenCalledWith( config.info_uri, {
                headers: { Authorization: 'bearer ' + token }
            });
    })
})
