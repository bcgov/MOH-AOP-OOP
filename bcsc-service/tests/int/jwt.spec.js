const { decrypt, createKeyPair, getKey } = require('../../src/jwt.js');

const jwk = { "p": "1geqPyF8-XxSZZBhIKgiu3XPofi7HIOd7aJ9Y-mSXF8rvgefMsVlPt-0TmbB8qFUg753ezZvseGNt_4mW1bUZqRKozMKSQrWwLcThP7pKXFEG7vbCHpol1HorTIZ-VviXUpJhYWnbbtR7FnTZ0bXL9K9iyeUO_ioT3NOE2UA0jM", "kty": "RSA", "q": "pku2Vb3cFHM7PYFwL75lH5CRTs_7itb9xwaEH_Fzcpb293hvN8SZUtjJs0qDpG1jCYGGDkC-Ggh2Cn6sSmSoo18CuSzgqmjL9x-f1yBze-bphekSy-dWE9ZZKklJgq-yAS_dk2wfwkP0SEYlHTCYRko2YUEg7TVl_Y84dpQA98E", "d": "b13geDcMLiHOek_9AlFvG6uXD7I-zFXreVvEU2FxIzJRgZyk6PUA5-w9sbHQSv8KZ12cVoaAgLAnuikpHzowRC3pfUe1YheD9OQDnhbHjT9ZbB6wMVLTJXzxWR8zMR_U3euNWyoIidx9UgLCZdBdn-KU7UkmEL0PIOf1Qysbhav1dIZXrCWCafko1YLlHLbqp1Hr325OsTdlts-iepvhmolY67e6rDGRFJOtFP8WATW-4KCqvtEVF0UF36Y2ILqW4f5ZS2_MNtXIX7kILlUpaEXRLjClCyTq17zwQZls2h0bTDYYFEPlcmqTrnjGuR90xr_8Qhq6y-eD3-GJ4-q4AQ", "e": "AQAB", "use": "enc", "kid": "kO5IyKMkhMiva4FzHWrb3sz-1DYNFnX3AUsRJFwrqgg", "qi": "TlHtYvIVilbxIeEE-s3XaJomfjaS_ugoFz3TQmo5sIcyZPJL0auYfD9LCwtg3TfXDlNIGi7ggvookgg-2AKURU0IjVoTFWlkv_CZEDt6XS3gEDurBWSziP9SnkWzZHwh4aTDT5zY56FzrrfJEaHIW_uddWF1LnpcRfn2aNbera4", "dp": "vnoh3H9cLtiip_rfReX8yyKk_7xSIaVM5tDmkQWtGQIl9r_nwZKFcXg7ik7PKrTDd2AKC6C9tOxMaMQJtN5It3RdbHKfI7Q-vVHxUDpgnV5NQ_VikGAINytRTNo63X4VrfrQBcGV6QV9ej_S8aXNGqWNxIsb1GeOuu6ePIp2OZs", "alg": "RSA1_5", "dq": "U305msyKXL4JpPSCZYX6cSF8wovK50bO_Ig592uaoZJHhbEybVZH__8VLO2hMAE3MsOTkT5R8vICiXxVdbgZroP58wwj84pPtM9syW3ibPdekLuWk0aewbDg7UkEHhelj9D_No-XVkoVr99_rKsEGG4T5Tn0lQM1JFsuZuIhpkE", "n": "iwhFFPKF6oiG9t0UnB7Tqu1JjfkMZihgg23tCSg0dJYQo3QOEmJcDfPbAY7fmqRszE76tueI0BiKd3XpaeVkGR17aX7hsjGnRJ9yUR5hFS2tWXTJEgnaWr5WF1UHffJz7yYNm-4SgstePzNcqFA5-Up1lUCe_DEntG2nut8lJMrEMGbOE7BbfXWKfDkPo0r0N-hoUy3x3ZBZDNNylX6SmfakSAmcGqJoja4ABKlwC-MrDC33ylVL1nrP2kcWvxTBvr5lZTCWKokzORjUtQA5WGiWHbh57ikLvGL2m1kZhFUx-GdpNGRMlcjZYTit6DYuSEeosYn_eAjqgBgabG2tcw" };
const encryptedUserInfo = "eyJraWQiOiJrTzVJeUtNa2hNaXZhNEZ6SFdyYjNzei0xRFlORm5YM0FVc1JKRndycWdnIiwiY3R5IjoiSldUIiwiZW5jIjoiQTI1NkdDTSIsImFsZyI6IlJTQTFfNSJ9.Wbxtg5_GPRIhKLIkQXEPrNH_dGIIzuVjIO6HSsf4ojJldtu6M5HdQFoUJlp3tu3jxIgZTgrDc2Tf7o7ilmpjDEykq0qEjRfWh06EoarQUs3aVUmxDkfAyuSm7o3ZqtsMx3g9ZG3JgUnYzwCLbGderzr2Egn7c1_TVgXGvHbDFzEJis4KP-oy_yjNyYWQBr5TXXDrWmRIomrZPfwkJ6iMAxzrbVlx3hVNKB7TYEqC07cw_QFsu8FsO_LLHbv86QBkVBTdhchynggv1NCmuJSxT6VsrxFHhnfIgUjCqDqqqz3V_TWvQO8K-qszyp98RzBFuLLjLpQ3-D4FTsQvpgb3lA._z1b4cwBKRLJRJtE.sB5XsK3_6ShOhrinBdR5UZpYPtyLOgcQ6M4lMkYMSUULpRXYrU288rD95gDxiZVMb0gIzr7aw_QeqPmtd4yIHPSnK3GWOyt0n4UKQNWAkVOu4OsVSlY7ZsBVy83m15Qp5uLj1spWAsozUyz4wSEDcaHTKTdI820cGj8ZsmP8s1NJl7mTJcuHwH2SmvKIoyOPsGTEP6b_XpMmHqzcThXBq8ikDHEj3G-KpbT2dGq2zMKulNN0HttIVjeBbO9EmTob5e4FbhQu2pGWFUVgmUmLromUWHYZ-oiK3xKMCBhlbS3jU3H_H2Oqj2wqyqSY2KqQOG-E0mu2Hr9Iy8F8j0z_Y9McUUwRmSHyI_dY_wDFAc1iwKl4SsusxXXc7oFMo2RLhoU9LQyl8mks8BUwtkJ1TdH6sRQz3g84JaYfDEyQRdFiSSojRSCdjovP0oHGS2pItEMWkRh9shI3plWZWUWtvJ6V6zgaJqrE81kZ3RiD2nqqPpY43gO5e_yGTrahOWXD982IThBxmMZhozE6c4R3KgC-prnEoIIn9i-BAWCX_NUeeOh5VhvoP47gzmSyvZSyAsZacUlzGTdStafDuqzOtg606q1zjHWwbu-_OqiUcZuOZDpWLwljHgH_Gtq9jnB_ZWSpxDSM5nxHA9_c1DAZnlxhqGVAe-XIfyvpuiBdBkdCTdzCXoiaD32vjdU8XHqG_u-UpIkoaiUbz9RERtQqq3bH7p9jZlm7S5sJKBgu5_pGpEYE-SrR7xB5nkpupYsyALlQCqr12flmb6kLQ7NsPZ2By4Kwx2D1vXN51Hl8PRhUFbypZcvZY5K2uCnNO3khAoSTDICILZ7qLqRS-Fq0N9NvkCajrV2cHKoTrj6uaKWcwkIVRSo7xfyGEB_2WVvVpXrjbSSRJRR7x1KXLbXQ6YvD6iXOtyhqIjWQmnUw7EaZ4hHcIam-ndXik3-yRhnQhiGBCx7ZKKdsqtqxfmd8HpcqB3h-n36_EBzJ4H-CAgxApLFW-v9GOcYgqto3eHDCXFRPaOFL_kRSgwV9sT5dlTWv6Fj9E5KFnxC9LG87Sm_O.cJfhSe8CINObuVqWEpIEgQ";
const decryptedUserInfo = {
    sub: 'NETVICKWWNAEMCL5GEEDLFNQTDQL6CIGOMMJIA524MGCMDJ62TRA',
    aud: 'urn.ca.bc.gov.maximus.aopform.dev',
    transaction_identifier: '34b6aa4b-bf27-4ca6-90a2-2fe1c464fc68',
    iss: 'https://idtest.gov.bc.ca/oauth2/',
    given_name: 'WES',
    family_name: 'ONE',
    iat: 1621273609,
    jti: '46e48ab0-fa5c-4c9a-9b14-75fa5afbddaf'
};

console.log(decrypt(jwk, encryptedUserInfo));

describe("decrypt", () => {
    it('returns a decrypted version of the given data', async () => {
        const decrypted = await decrypt(jwk, encryptedUserInfo)
        console.log(decrypted);
        expect(decrypted)
            .toStrictEqual(decryptedUserInfo);
    })
})