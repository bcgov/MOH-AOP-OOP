const { getAuthUrl, getToken, getInfo } = require('./auth');
const axios = require('axios');
jest.mock('axios', () => ({
    post: jest.fn(),
    get: jest.fn()
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

describe("getAuthUrl", () => {
    it('Returns the correctly built URL', () => {
        const returnedUrl = getAuthUrl(config);
        expect(returnedUrl)
            .toBe(`${config.auth_uri}?response_type=code` +
            `&scope=${config.auth_scope}&client_id=${config.client_id}` +
            `&redirect_uri=${config.redirect_uri}&state=A`);
    })
})

describe("getToken", () => {
    it('sends the correct POST request and returns the correct data', async () => {
        const code = "CODE";
        const data = { data: {access_token: 'TOKEN'} };
        axios.post.mockImplementationOnce(() => Promise.resolve(data));
        await expect(getToken(config, code)).resolves.toEqual('TOKEN');
        expect(axios.post).toHaveBeenCalledWith( config.token_uri,
            `code=${code}` + 
            `&redirect_uri=${config.redirect_uri}` +
            `&client_id=${config.client_id}` +
            `&client_secret=${config.client_secret}` +
            `&grant_type=${config.grant_type}`);
    })
})

describe("getInfo", () => {
    it('sends the correct POST request and returns the correct data', async () => {
        const token = "TOKEN";
        const res = { data: {testData: 'TEST_DATA'}};
        axios.get.mockImplementationOnce(() => Promise.resolve(res));
        await expect(getInfo(config, token)).resolves.toEqual(res.data);
        expect(axios.get).toHaveBeenCalledWith( config.info_uri, {
            headers: { Authorization: 'bearer ' + token }
        });
    })
})
