import { mount, createLocalVue } from '@vue/test-utils';
import axios from 'axios';
import Vuex from 'vuex';
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import Component from '@/components/Captcha.vue';

const mockInputResponseInvalid = {
    "data": {
        "valid": false
    },
    "status": 200,
    "statusText": "OK",
    "headers": {
        "access-control-allow-credentials": "true",
        "access-control-allow-headers": "Accept,Authorization,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Requested-With",
        "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
        "access-control-allow-origin": "https://my.gov.bc.ca",
        "access-control-expose-headers": "Authorization",
        "cache-control": "no-store",
        "connection": "close",
        "content-length": "15",
        "content-security-policy": "default-src * data: blob: filesystem: 'unsafe-inline' 'unsafe-eval'",
        "content-type": "application/json; charset=utf-8",
        "date": "Fri, 18 Jun 2021 20:20:26 GMT",
        "etag": "W/\"f-z+y5G3b6F1BDJ1A7U6QoI6VUcbI\"",
        "pragma": "no-cache",
        "server": "nginx",
        "strict-transport-security": "max-age=86400; includeSubDomains",
        "x-content-type-options": "nosniff",
        "x-frame-options": "DENY",
        "x-powered-by": "Express",
        "x-xss-protection": "1"
    },
    "config": {
        "url": "/oop/api/captcha/verify/captcha",
        "method": "post",
        "data": "{\"nonce\":\"3ad3e19a-5fc2-4c28-bffb-13e239f45c06\",\"answer\":\"potato\",\"validation\":{\"protected\":\"eyJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiZGlyIiwia2lkIjoibXlnb3ZiYy1jYXB0Y2hhLXNlcnZpY2UtMSJ9\",\"iv\":\"SZN2YLpLENlD_Ulf\",\"ciphertext\":\"y26PcHyz2dbNeqobpQ5Ls3efASrPXKu7lCzqnll4-DSfRH05yyc0Vvw7zwkEvYh_C1_yV-rhbPkyKO_ukp5aFbNtIWbEr34VzLeYjeZFz4rcJXOPqvGyUI0\",\"tag\":\"Dsp8-0rsC6lkqg6xJNF9ug\"}}",
        "headers": {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json;charset=utf-8"
        },
        "transformRequest": [
            null
        ],
        "transformResponse": [
            null
        ],
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "maxBodyLength": -1
    },
    "request": {}
}

const mockFetchResponse = {
  "data": {
      "nonce": "f631a1a4-21aa-4a51-a5ce-6004e5f5b0aa",
      "captcha": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"150\" height=\"50\" viewBox=\"0,0,150,50\"><path d=\"M4 10 C65 48,68 18,137 45\" stroke=\"#111\" fill=\"none\"/><path fill=\"#111\" d=\"M14.27 32.91L14.22 32.87L14.21 32.86Q17.42 32.60 20.62 32.72L20.63 32.73L20.66 32.76Q20.61 30.19 20.61 27.80L20.46 27.64L20.59 27.78Q20.46 25.17 20.65 22.62L20.73 22.70L20.70 22.67Q19.57 24.48 14.36 33.01ZM24.28 40.38L24.27 40.36L24.29 40.39Q22.58 40.05 20.79 39.97L20.80 39.98L20.71 39.89Q20.57 37.58 20.45 35.10L20.43 35.08L20.38 35.03Q15.12 34.91 10.40 36.32L10.40 36.32L10.31 36.23Q10.56 35.87 10.75 34.88L10.75 34.88L10.62 34.75Q12.42 31.60 15.99 25.31L16.05 25.37L16.04 25.36Q18.96 20.52 22.39 16.63L22.40 16.65L22.48 16.72Q23.17 16.35 24.85 16.08L24.91 16.14L24.95 16.18Q22.93 22.50 22.93 29.55L23.09 29.70L22.99 29.60Q23.02 31.13 23.10 32.61L23.13 32.64L24.37 32.70L24.32 32.65Q25.03 32.78 25.63 32.90L25.63 32.90L25.64 32.91Q25.78 33.92 26.04 35.86L26.05 35.86L26.08 35.89Q24.74 35.50 23.25 35.31L23.31 35.37L23.39 35.45Q23.61 37.46 24.29 40.39ZM25.98 32.60L25.95 32.57L25.97 32.59Q25.69 32.42 25.49 32.42L25.43 32.35L25.20 32.50L25.14 32.45Q24.95 30.88 24.95 29.47L25.04 29.57L24.95 29.48Q24.95 23.08 27.01 17.06L27.07 17.13L27.12 17.17Q26.26 17.34 24.81 17.72L24.88 17.80L24.78 17.69Q24.99 16.91 25.45 15.51L25.54 15.60L25.64 15.70Q24.32 16.05 22.27 16.28L22.21 16.23L22.19 16.21Q18.31 20.58 13.09 29.95L13.07 29.93L15.07 26.18L15.16 26.27Q14.74 27.30 14.48 27.87L14.37 27.76L10.01 36.88L10.09 36.96Q10.57 36.64 11.71 36.26L11.78 36.32L11.60 36.53L11.63 36.56Q11.54 37.27 11.24 38.53L11.24 38.53L11.16 38.45Q15.33 37.17 20.16 37.36L20.22 37.42L20.24 37.44Q20.27 38.38 20.46 40.36L20.35 40.25L20.33 40.23Q21.50 40.34 22.57 40.45L22.59 40.48L22.58 40.47Q22.63 41.05 22.89 42.42L22.97 42.49L22.98 42.50Q24.76 42.61 27.77 43.52L27.81 43.57L27.89 43.65Q26.87 41.48 25.95 38.20L25.86 38.11L27.38 38.64L27.48 38.74Q28.14 38.95 28.83 39.29L28.77 39.24L28.82 39.28Q28.02 36.77 27.87 35.10L27.73 34.96L27.85 35.08Q27.19 34.83 26.05 34.61L26.10 34.66L26.05 34.61Q25.87 33.36 25.87 32.48ZM17.85 32.31L17.88 32.34L17.86 32.31Q18.57 30.98 20.13 28.43L20.21 28.50L20.11 28.40Q20.30 29.55 20.27 30.50L20.26 30.50L20.11 30.34Q20.25 31.47 20.29 32.42L20.24 32.38L20.21 32.34Q19.63 32.30 19.05 32.30L19.04 32.28L19.10 32.34Q18.60 32.45 17.99 32.45Z\"/><path fill=\"#111\" d=\"M39.05 40.17L39.03 40.15L39.20 40.32Q35.72 40.42 34.08 39.89L34.01 39.81L33.91 39.71Q31.96 39.10 31.66 35.71L31.80 35.86L33.15 34.69L33.25 34.79Q33.93 34.22 34.69 33.72L34.75 33.78L34.62 33.65Q34.39 35.59 35.99 36.81L35.96 36.78L36.01 36.83Q37.38 37.93 39.51 37.74L39.39 37.62L39.37 37.59Q43.69 37.12 43.50 33.58L43.66 33.74L43.50 33.58Q43.46 31.45 40.83 30.23L40.73 30.13L40.77 30.16Q37.90 29.09 35.54 27.87L35.52 27.85L35.58 27.91Q32.96 26.50 31.97 21.82L32.05 21.90L32.04 21.89Q31.97 21.48 31.85 20.72L31.74 20.60L31.79 20.66Q31.77 19.95 31.85 19.38L31.78 19.31L31.91 19.44Q32.07 17.85 33.33 17.39L33.29 17.36L33.34 17.41Q35.61 16.40 39.61 16.59L39.66 16.65L39.54 16.53Q41.47 16.75 42.27 16.82L42.32 16.86L42.36 16.91Q43.65 16.91 44.72 17.36L44.72 17.37L44.87 17.52Q46.98 17.98 47.21 20.46L47.17 20.42L47.11 20.36Q46.08 21.09 43.87 22.42L43.81 22.36L43.98 22.52Q43.44 19.40 39.07 19.40L39.03 19.36L39.09 19.43Q37.13 19.37 36.14 20.05L36.24 20.15L36.11 20.03Q35.04 20.63 35.27 22.42L35.31 22.46L35.20 22.34Q35.55 24.64 38.52 26.17L38.55 26.20L38.44 26.08Q39.01 26.35 43.50 27.98L43.52 28.00L43.45 27.94Q46.12 29.46 46.54 33.84L46.54 33.84L46.60 33.90Q46.48 33.94 46.56 35.19L46.63 35.26L46.61 35.24Q46.64 37.98 45.08 39.09L45.25 39.25L45.24 39.24Q43.27 40.09 39.08 40.20ZM41.48 42.68L41.37 42.57L41.47 42.67Q42.92 42.74 44.90 42.74L44.88 42.72L44.80 42.65Q47.01 42.76 48.27 42.35L48.17 42.25L48.22 42.30Q49.34 41.37 49.27 39.58L49.39 39.70L49.29 39.60Q49.34 38.70 48.96 36.65L48.98 36.66L49.00 36.69Q48.10 32.02 46.01 30.15L45.84 29.98L45.95 30.10Q45.08 28.42 43.75 27.70L43.80 27.75L38.43 25.62L38.57 25.75Q38.19 25.53 37.73 25.30L37.77 25.34L37.69 24.99L37.49 24.45L37.62 24.58Q37.34 23.04 38.48 22.43L38.53 22.48L38.54 22.49Q39.34 21.96 41.05 21.77L41.12 21.83L40.98 21.70Q42.18 21.64 43.32 22.10L43.31 22.08L43.25 22.02Q43.35 22.17 43.54 23.00L43.64 23.10L43.64 23.10Q43.78 22.89 44.27 22.67L44.25 22.64L44.29 22.69Q45.02 23.60 45.13 24.74L45.03 24.64L45.19 24.80Q45.10 24.60 48.76 22.01L48.84 22.09L48.95 22.20Q48.59 19.48 47.14 18.79L47.08 18.73L47.23 18.88Q46.63 17.60 45.19 17.07L45.07 16.95L45.13 17.01Q42.83 16.20 39.63 16.20L39.63 16.20L39.55 16.12Q34.64 16.11 32.77 16.80L32.77 16.80L32.80 16.83Q31.50 17.32 31.39 19.00L31.50 19.10L31.36 18.96Q31.33 19.50 31.75 21.71L31.76 21.72L31.83 21.80Q32.52 25.57 34.69 27.82L34.56 27.69L34.73 27.86Q35.42 29.46 36.92 30.14L36.86 30.08L37.02 30.24Q38.54 30.94 42.46 32.50L42.33 32.37L42.41 32.49L43.01 32.79L42.98 32.80L42.98 32.79Q43.13 33.21 43.17 33.55L43.23 33.61L43.30 33.69Q43.40 37.17 39.48 37.32L39.36 37.20L39.41 37.26Q38.27 37.30 36.98 36.92L36.93 36.87L36.87 36.81Q36.66 36.10 36.66 35.38L36.60 35.33L36.71 35.43Q36.59 35.05 36.63 34.78L36.72 34.87L36.60 34.75Q36.17 34.97 35.37 35.47L35.52 35.61L35.54 35.63Q34.87 34.35 35.02 32.98L35.20 33.16L35.11 33.07Q32.93 34.16 31.33 35.57L31.43 35.67L31.35 35.59Q31.53 36.53 31.60 37.56L31.54 37.50L31.47 37.42Q31.97 39.34 33.27 40.10L33.14 39.97L33.22 40.05Q34.43 41.87 36.98 42.25L36.89 42.16L36.84 42.11Q38.54 42.47 41.47 42.66Z\"/><path fill=\"#222\" d=\"M60.61 19.67L60.59 19.65L58.99 19.73L58.94 19.67Q56.83 19.92 56.60 21.94L56.57 21.91L56.63 21.97Q56.37 22.51 56.41 23.50L56.43 23.53L56.51 23.60Q56.59 25.58 57.84 26.91L57.86 26.93L57.73 26.80Q59.14 28.29 61.04 28.13L61.03 28.12L61.05 28.14Q63.00 27.89 63.76 26.97L63.76 26.97L63.67 26.88Q64.74 25.97 65.01 23.72L65.11 23.83L65.07 23.78Q65.30 21.51 64.05 20.67L64.06 20.68L64.09 20.71Q63.18 19.88 60.51 19.57ZM66.60 28.86L66.71 28.96L65.37 31.20L65.43 31.26Q62.68 36.01 58.91 40.09L58.92 40.10L58.78 39.95Q57.24 40.21 54.54 41.01L54.60 41.07L54.57 41.03Q59.95 34.80 63.11 30.01L62.95 29.85L62.96 29.86Q61.90 30.48 60.27 30.55L60.35 30.64L60.37 30.66Q57.26 30.71 55.73 28.73L55.84 28.83L55.78 28.77Q54.59 27.20 53.49 22.64L53.55 22.70L53.51 22.66Q53.41 22.10 53.25 21.16L53.33 21.24L53.42 21.33Q53.26 20.39 53.26 19.93L53.11 19.78L53.19 19.86Q53.25 18.13 54.31 17.52L54.21 17.42L54.31 17.52Q55.47 16.69 57.33 16.69L57.29 16.65L57.43 16.80Q60.56 16.72 60.56 16.72L60.44 16.60L60.62 16.79Q62.73 16.76 63.98 16.95L63.95 16.91L64.04 17.01Q66.04 17.14 66.95 17.64L67.05 17.73L66.97 17.66Q68.44 18.51 68.63 20.26L68.51 20.14L68.58 20.21Q68.59 20.46 68.40 23.12L68.40 23.12L68.37 23.09Q68.05 25.28 67.82 26.12L67.71 26.01L67.70 26.00Q67.32 27.41 66.56 28.82ZM68.51 31.26L68.58 31.33L68.57 31.33Q69.56 29.11 70.09 24.81L69.98 24.69L70.12 24.84Q70.40 22.64 70.36 21.77L70.37 21.77L70.26 21.66Q70.33 19.91 69.15 19.00L69.01 18.86L68.80 18.84L68.79 18.82Q68.50 18.04 67.58 17.39L67.58 17.39L67.63 17.44Q65.30 16.40 60.50 16.25L60.47 16.22L60.49 16.24Q59.62 16.32 57.19 16.32L57.09 16.23L57.20 16.34Q55.30 16.19 53.81 16.87L53.86 16.92L53.93 16.99Q52.75 17.75 52.83 19.57L52.73 19.48L52.79 19.53Q53.00 20.47 53.19 22.49L53.10 22.40L53.28 22.58Q53.77 25.09 54.04 25.93L54.06 25.94L54.14 26.02Q54.58 27.76 55.53 29.06L55.55 29.08L55.60 29.13Q55.79 29.39 56.17 29.77L56.17 29.77L56.17 29.77Q56.48 30.28 57.13 31.19L57.14 31.20L57.22 31.27Q58.56 32.50 60.50 32.69L60.48 32.68L60.54 32.73Q58.75 35.51 57.19 37.41L57.20 37.42L53.51 41.73L53.44 41.66Q55.69 40.90 57.33 40.56L57.29 40.52L57.29 40.52Q56.68 41.55 55.12 43.26L55.07 43.22L55.11 43.25Q58.23 42.38 61.36 42.34L61.34 42.33L61.19 42.17Q63.48 39.56 67.82 32.32L67.87 32.37L67.94 32.52L68.00 32.57Q68.13 31.72 68.47 31.22ZM62.49 22.01L62.52 22.03L62.45 21.96Q63.19 21.99 63.65 22.10L63.60 22.05L63.55 22.00Q64.20 22.12 64.58 22.23L64.54 22.19L64.65 22.30Q64.63 22.54 64.70 22.96L64.73 22.99L64.89 23.15Q64.96 23.56 64.84 23.94L64.78 23.87L64.82 23.92Q64.73 25.58 63.55 26.69L63.50 26.63L63.55 26.68Q62.57 27.69 60.94 27.65L60.96 27.67L61.05 27.76Q60.58 27.71 59.05 27.40L59.00 27.35L58.96 27.31Q58.72 26.42 58.72 25.69L58.71 25.69L58.79 25.76Q58.61 25.40 58.61 25.17L58.75 25.30L58.72 25.28Q58.63 22.98 60.92 22.18L60.99 22.26L60.97 22.23Q61.65 22.00 62.49 22.00Z\"/><path d=\"M14 18 C64 45,68 13,133 24\" stroke=\"#222\" fill=\"none\"/><path fill=\"#111\" d=\"M91.08 41.62L91.00 41.54L91.04 41.58Q88.94 41.18 86.77 41.03L86.74 41.01L86.81 41.08Q85.23 39.49 82.56 35.65L82.73 35.81L82.73 35.82Q80.36 38.74 77.96 41.17L78.02 41.24L75.88 41.57L75.98 41.67Q74.89 41.84 73.90 42.10L73.82 42.02L73.92 42.12Q78.15 38.05 81.15 33.94L81.08 33.86L81.12 33.90Q77.75 29.62 72.35 24.82L72.38 24.86L72.48 24.96Q74.67 25.66 77.37 26.08L77.27 25.98L77.26 25.97Q80.77 29.13 82.67 31.83L82.74 31.90L82.69 31.86Q84.84 28.83 87.58 26.32L87.47 26.21L87.51 26.25Q90.51 25.85 92.33 25.36L92.36 25.38L92.33 25.36Q87.99 29.20 84.30 33.77L84.18 33.65L84.31 33.78Q87.61 38.38 91.08 41.61ZM93.85 24.66L93.84 24.65L93.94 24.76Q91.00 25.55 87.46 25.89L87.51 25.94L87.54 25.97Q84.58 28.57 82.87 31.05L82.91 31.08L82.82 30.99Q82.06 30.08 80.42 28.10L80.31 27.99L80.14 28.01L80.14 28.01Q79.94 27.93 79.83 27.93L79.78 27.88L79.83 27.93Q79.09 27.12 77.46 25.67L77.40 25.61L77.42 25.63Q73.94 25.20 71.08 23.98L70.96 23.86L71.06 23.96Q76.53 28.70 80.56 33.84L80.63 33.91L80.59 33.87Q77.29 38.56 72.88 42.86L72.77 42.76L72.90 42.89Q73.05 42.69 76.55 41.86L76.56 41.87L76.60 41.91Q75.02 43.18 73.38 44.52L73.39 44.52L73.40 44.54Q76.62 43.64 79.78 43.45L79.77 43.44L79.71 43.38Q82.08 41.11 83.99 38.37L84.04 38.42L83.99 38.37Q85.47 40.19 86.69 41.37L86.73 41.42L86.72 41.41Q86.83 41.40 86.91 41.48L86.92 41.49L87.06 41.45L86.98 41.36Q88.26 42.49 89.60 43.56L89.60 43.56L89.63 43.60Q93.32 44.24 96.22 45.27L96.22 45.28L96.08 45.13Q90.04 40.80 86.34 35.62L86.32 35.59L86.34 35.62Q89.89 30.49 94.46 26.41L94.51 26.47L94.44 26.40Q93.63 26.88 92.64 27.11L92.54 27.02L90.57 27.52L90.53 27.48Q91.73 26.58 93.90 24.72Z\"/><path fill=\"#444\" d=\"M124.17 41.23L124.01 41.08L122.41 41.19L122.27 41.05Q119.01 41.17 118.06 39.04L117.96 38.94L118.04 39.03Q119.13 37.91 120.58 36.80L120.56 36.78L120.74 36.97Q121.22 39.04 124.08 38.89L124.05 38.87L124.10 38.92Q124.96 38.94 125.99 38.71L125.86 38.58L125.84 38.57Q126.72 38.00 126.64 37.05L126.73 37.13L126.72 37.12Q126.57 35.94 124.78 35.26L124.95 35.43L121.00 33.76L121.16 33.93Q118.69 32.44 118.35 28.90L118.39 28.95L118.48 29.04Q118.14 26.75 120.31 26.18L120.44 26.31L120.47 26.34Q121.34 26.03 124.31 26.03L124.23 25.95L124.32 26.05Q129.12 25.97 130.03 28.48L130.11 28.56L130.16 28.61Q129.50 29.13 128.78 29.58L128.80 29.61L127.23 30.40L127.36 30.53Q126.91 28.66 123.67 28.44L123.50 28.27L123.60 28.37Q122.93 28.31 121.90 28.73L121.91 28.73L121.96 28.78Q121.35 29.08 121.35 30.19L121.42 30.26L121.45 30.29Q121.74 31.30 123.57 31.99L123.60 32.03L123.66 32.08Q124.58 32.32 127.24 33.42L127.35 33.53L127.29 33.46Q129.13 34.32 129.32 36.87L129.30 36.85L129.34 36.88Q129.47 37.58 129.39 38.57L129.40 38.58L129.43 38.61Q129.34 39.44 128.77 40.09L128.67 39.99L128.80 40.12Q127.21 41.23 124.17 41.23ZM128.83 43.72L128.85 43.75L128.85 43.74Q129.65 43.67 131.02 43.37L131.05 43.40L131.16 43.50Q132.19 42.78 132.00 41.56L132.08 41.64L132.10 41.66Q132.00 41.07 131.70 39.47L131.66 39.43L131.60 39.38Q131.10 36.48 129.31 35.26L129.31 35.26L129.34 35.29Q128.77 33.85 127.52 33.12L127.52 33.12L127.47 33.07Q126.15 32.59 123.67 31.64L123.69 31.65L123.71 31.67Q123.84 31.20 124.11 31.08L124.17 31.15L124.15 31.12Q124.77 30.67 125.41 30.64L125.39 30.61L125.44 30.67Q126.31 30.70 127.08 30.97L126.92 30.82L127.14 31.11L127.08 30.93L127.38 31.05L127.30 31.01L127.28 30.98Q128.49 31.58 128.68 32.84L128.68 32.84L128.56 32.72Q129.84 31.91 131.75 30.23L131.78 30.26L131.72 30.20Q131.46 29.49 130.47 28.31L130.62 28.46L130.57 28.41Q129.34 25.61 124.23 25.50L124.32 25.58L124.29 25.55Q121.09 25.47 119.11 26.04L119.13 26.07L119.07 26.01Q117.69 26.61 117.92 28.71L118.04 28.82L117.90 28.69Q118.14 30.06 119.05 32.16L118.96 32.07L118.93 32.03Q119.57 33.24 120.60 33.97L120.57 33.94L120.57 33.94Q121.21 35.38 122.51 36.07L122.50 36.06L122.48 36.04Q123.53 36.40 124.48 36.78L124.56 36.86L126.37 37.53L126.43 37.60Q126.07 38.68 124.13 38.56L124.08 38.52L124.12 38.55Q123.75 38.68 122.53 38.38L122.44 38.29L122.33 38.02L122.21 38.13L122.22 38.14Q121.32 37.74 120.67 36.25L120.67 36.25L120.73 36.30Q118.60 37.87 117.49 39.01L117.55 39.07L117.45 38.97Q117.84 39.97 118.87 40.77L118.85 40.75L118.62 40.82L118.67 40.88Q120.11 43.00 124.33 43.38L124.26 43.30L124.39 43.43Q125.68 43.58 128.91 43.81Z\"/><path fill=\"#444\" d=\"M105.24 32.16L95.90 22.05L96.02 22.18Q96.81 25.83 96.81 29.56L96.88 29.63L96.81 29.55Q96.83 35.55 94.78 41.11L94.73 41.06L94.86 41.20Q93.74 41.41 91.50 42.17L91.46 42.13L91.52 42.19Q94.31 36.38 94.31 29.68L94.37 29.74L94.33 29.70Q94.20 20.93 89.71 13.51L89.77 13.56L89.85 13.64Q90.15 13.68 90.84 14.10L90.84 14.10L90.92 14.18Q102.96 25.35 110.80 34.60L110.75 34.55L110.84 34.63Q110.60 32.26 110.60 29.83L110.45 29.68L110.55 29.78Q110.48 22.48 112.99 16.27L113.07 16.35L112.95 16.23Q115.42 15.84 117.01 15.15L116.96 15.10L116.92 15.05Q113.60 21.22 113.30 28.38L113.37 28.45L113.42 28.50Q113.10 35.83 116.07 42.00L116.00 41.93L115.96 41.89Q115.43 41.85 115.01 41.66L114.99 41.64L115.12 41.77Q110.42 37.68 105.20 32.12L105.25 32.17ZM118.63 45.13L118.71 45.21L118.67 45.17Q119.19 45.38 119.60 45.57L119.57 45.54L120.44 45.91L120.32 45.79Q115.28 38.97 115.28 29.60L115.28 29.60L115.14 29.46Q115.11 22.20 118.42 15.95L118.47 16.00L118.46 15.99Q117.95 16.36 116.54 16.96L116.37 16.79L116.41 16.83Q116.94 16.15 117.78 14.59L117.69 14.50L117.64 14.45Q115.27 15.43 112.84 16.00L112.78 15.94L112.80 15.96Q110.13 22.40 110.13 29.82L110.13 29.81L110.19 29.88Q110.17 31.72 110.36 33.70L110.35 33.69L110.41 33.75Q105.63 27.94 100.87 23.34L100.90 23.37L90.88 13.73L90.90 13.75Q90.34 13.45 89.12 12.88L89.16 12.92L89.08 12.84Q93.99 20.60 93.99 29.70L94.03 29.74L93.96 29.68Q93.96 36.79 90.87 42.80L90.90 42.83L90.83 42.76Q91.06 42.57 92.70 41.96L92.83 42.09L92.70 41.96Q92.45 42.82 91.61 44.31L91.56 44.25L91.72 44.41Q93.07 43.90 96.53 43.10L96.52 43.09L96.43 42.99Q98.74 36.85 98.74 29.66L98.70 29.62L98.76 29.68Q98.68 27.50 98.45 25.37L98.46 25.38L98.56 25.48Q110.05 38.31 118.66 45.16Z\"/></svg>",
      "validation": {
          "protected": "eyJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiZGlyIiwia2lkIjoibXlnb3ZiYy1jYXB0Y2hhLXNlcnZpY2UtMSJ9",
          "iv": "y5_DSVmMaYbYuWBu",
          "ciphertext": "STBbExKvNIH-D2VkGzZ1oK2C8hD2tp-UuYgMm2rcuCgeQUO_TKsm-clknxIiR3V0wg2mQ5eLyJ9aftUuGBN4Ybf0s7HxrzDrLqHuj-lUQkGsKYOA59Kw2JA",
          "tag": "48NfVr7w8LBE44xk_sDTWA"
      }
  },
  "status": 200,
  "statusText": "OK",
  "headers": {
      "access-control-allow-credentials": "true",
      "access-control-allow-headers": "Accept,Authorization,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Requested-With",
      "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
      "access-control-allow-origin": "https://my.gov.bc.ca",
      "access-control-expose-headers": "Authorization",
      "cache-control": "no-store",
      "connection": "close",
      "content-length": "14593",
      "content-security-policy": "default-src * data: blob: filesystem: 'unsafe-inline' 'unsafe-eval'",
      "content-type": "application/json; charset=utf-8",
      "date": "Thu, 17 Jun 2021 21:35:01 GMT",
      "etag": "W/\"3901-c1ug5ljjIz5FoL9j4HT4X73GK54\"",
      "pragma": "no-cache",
      "server": "nginx",
      "strict-transport-security": "max-age=86400; includeSubDomains",
      "x-content-type-options": "nosniff",
      "x-frame-options": "DENY",
      "x-powered-by": "Express",
      "x-xss-protection": "1"
  },
  "config": {
      "url": "/oop/api/captcha/captcha",
      "method": "post",
      "data": "{\"nonce\":\"f631a1a4-21aa-4a51-a5ce-6004e5f5b0aa\"}",
      "headers": {
          "Accept": "application/json, text/plain, */*",
          "Content-Type": "application/json;charset=utf-8"
      },
      "transformRequest": [
          null
      ],
      "transformResponse": [
          null
      ],
      "timeout": 0,
      "xsrfCookieName": "XSRF-TOKEN",
      "xsrfHeaderName": "X-XSRF-TOKEN",
      "maxContentLength": -1,
      "maxBodyLength": -1
  },
  "request": {}
}

const mockCaptchaError = {data: {}}

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(() => {
   
    return Promise.resolve();
  })

}));

const localVue = createLocalVue();
localVue.use(Vuex);
Vue.use(Vuelidate);

describe('Captcha.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      localVue,  propsData: {
        apiBasePath: '/oop/api/captcha',
        nonce: 'f631a1a4-21aa-4a51-a5ce-6004e5f5b0aa',
      }, 
      data: () => {
        return {
          isLoadingNewCaptcha: true,
          isLoadingCaptchaVerification: false,
          isLoadingAudio: false,
          captchaSVG: null,
          captchaValidation: null,
          inputAnswer: null,
          isInputValid: null,
          audio: null,
          errorMessage: null,
        }
      },
    });
    axios.post.mockImplementationOnce(() => Promise.resolve(mockFetchResponse));
    expect(wrapper.element).toBeDefined();
  });
});

describe('Captcha.vue fetchNewCaptcha()', () => {
  it('changes captchaSVG and captchaValidation on function call', async () => {
    const wrapper = mount(Component, {
      localVue,  propsData: {
        apiBasePath: '/oop/api/captcha',
        nonce: 'f631a1a4-21aa-4a51-a5ce-6004e5f5b0aa',
      }, 
      data: () => {
        return {
          isLoadingNewCaptcha: true,
          isLoadingCaptchaVerification: false,
          isLoadingAudio: false,
          captchaSVG: null,
          captchaValidation: null,
          inputAnswer: null,
          isInputValid: null,
          audio: null,
          errorMessage: null,
        }
      },
    });
    axios.post.mockImplementationOnce(() => Promise.resolve(mockFetchResponse));
    axios.post.mockImplementationOnce(() => Promise.resolve(mockFetchResponse));
    
    await wrapper.vm.fetchNewCaptcha();

    expect(wrapper.vm.captchaSVG).not.toEqual(null);
    expect(wrapper.vm.captchaValidation).not.toEqual(null);
  });

  it('emits captchaLoaded signal on function call', async () => {
    jest.useFakeTimers()
    const wrapper = mount(Component, {
      localVue,  propsData: {
        apiBasePath: '/oop/api/captcha',
        nonce: 'f631a1a4-21aa-4a51-a5ce-6004e5f5b0aa',
      }, 
      data: () => {
        return {
          isLoadingNewCaptcha: true,
          isLoadingCaptchaVerification: false,
          isLoadingAudio: false,
          captchaSVG: null,
          captchaValidation: null,
          inputAnswer: null,
          isInputValid: null,
          audio: null,
          errorMessage: null,
        }
      },
    });
    
    axios.post.mockImplementationOnce(() => Promise.resolve(mockFetchResponse));
    
    await wrapper.vm.fetchNewCaptcha();

    jest.advanceTimersByTime(5)

    expect(wrapper.emitted().captchaLoaded).toBeTruthy();
  });
});

describe('Captcha.vue handleInputChange()', () => {
  it('changes isLoadingCaptchaVerification on function call', async () => {
    const wrapper = mount(Component, {
      localVue,  propsData: {
        apiBasePath: '/oop/api/captcha',
        nonce: 'f631a1a4-21aa-4a51-a5ce-6004e5f5b0aa',
      }, 
      data: () => {
        return {
          isLoadingNewCaptcha: true,
          isLoadingCaptchaVerification: "default",
          isLoadingAudio: false,
          captchaSVG: null,
          captchaValidation: null,
          inputAnswer: null,
          isInputValid: null,
          audio: null,
          errorMessage: null,
        }
      },
    });
    const fakeEvent={target: {value: "potato"}};
    axios.post.mockImplementationOnce(() => Promise.resolve(mockInputResponseInvalid));
    
    expect(wrapper.vm.isLoadingCaptchaVerification).toEqual("default");
    await wrapper.vm.handleInputChange(fakeEvent);
    expect(wrapper.vm.isLoadingCaptchaVerification).toEqual(false);
  });

  it('changes error message and inputAnswer when it receives invalid response', async () => {
    const wrapper = mount(Component, {
      localVue,  propsData: {
        apiBasePath: '/oop/api/captcha',
        nonce: 'f631a1a4-21aa-4a51-a5ce-6004e5f5b0aa',
      }, 
      data: () => {
        return {
          isLoadingNewCaptcha: true,
          isLoadingCaptchaVerification: false,
          isLoadingAudio: false,
          captchaSVG: null,
          captchaValidation: null,
          inputAnswer: "default",
          isInputValid: null,
          audio: null,
          errorMessage: "default",
        }
      },
    });
    const fakeEvent={target: {value: "potato"}};
    axios.post.mockImplementationOnce(() => Promise.resolve(mockInputResponseInvalid));

    await wrapper.vm.handleInputChange(fakeEvent);
    expect(wrapper.vm.inputAnswer).toBeFalsy();
    expect(wrapper.vm.errorMessage).not.toBeTruthy();
  });

  

  xit('changes error message and inputAnswer when it receives valid response', async () => {
    const wrapper = mount(Component, {
      localVue,  propsData: {
        apiBasePath: '/oop/api/captcha',
        nonce: 'f631a1a4-21aa-4a51-a5ce-6004e5f5b0aa',
      }, 
      data: () => {
        return {
          isLoadingNewCaptcha: true,
          isLoadingCaptchaVerification: false,
          isLoadingAudio: false,
          captchaSVG: null,
          captchaValidation: null,
          inputAnswer: "default",
          isInputValid: null,
          audio: null,
          errorMessage: "default",
        }
      },
    });
    const fakeEvent={target: {value: "potato"}};
    axios.post.mockImplementationOnce(() => Promise.resolve(mockInputResponseInvalid));

    await wrapper.vm.handleInputChange(fakeEvent);
    expect(wrapper.vm.inputAnswer).toBeFalsy();
    expect(wrapper.vm.errorMessage).not.toBeTruthy();
  });
});