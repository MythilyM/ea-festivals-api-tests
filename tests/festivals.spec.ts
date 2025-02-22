import HTTPClient from "../support/httpClient";
import { Band, FestivalsResponse } from "../models/festivalsResponse";
import { Http2ServerRequest } from "http2";

describe('/festivals endpoint tests', () => {
    const client = new HTTPClient();

    test('Verify the response is successful', async () => {
        const response = await client.get(`${process.env.baseUrl}/festivals`);
        expect(response.status).toBe(200);
    });

    test('Verify the response body is not empty', async () => {
        const response = await client.get(`${process.env.baseUrl}/festivals`);
        if(response.status === 200) {
            const respData = JSON.stringify(response.data);
            expect(respData.length).toBeGreaterThanOrEqual(1);
        }
        else { test.failing('response body is empty');
        }
    });

    test('Verify the response data', async () => {
        // using fetWithRetry to retry the requests for 5 times to get a successful response to validate data
        const response = await client.getWithRetry(`${process.env.baseUrl}/festivals`);
        if(response?.status === 200) {
            const respData = JSON.stringify(response.data);
            expect(response.data).not.toBeNull;
            const festivals: FestivalsResponse[] = response.data;
            expect(festivals.length).toBeGreaterThanOrEqual(1);
            festivals.forEach((festival: FestivalsResponse) => {
                expect(festival.bands).not.toBeNull();
                expect(festival.bands.length).toBeGreaterThanOrEqual(1);
            festival.bands.forEach((band: Band) => {
                expect(band.name).toBeDefined();
                if(band.recordLabel) {
                    expect(band.recordLabel).toBeDefined();
                }
            });
            });
        }
    });
})