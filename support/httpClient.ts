import axios, { AxiosResponse } from "axios";
import * as dotenv from "dotenv";

dotenv.config();

export default class HTTPClient {
    async get(url: string): Promise<AxiosResponse> {
        const response = await axios({
            url,
            method: "get",
        });
        console.log(`\n URL :: ${url}`);
        console.log(`\n RESPONSE :: ${JSON.stringify(response.data)}`);
        return response;
    }

    async getWithRetry(url: string, retries = 5, delay = 1000) {
        while(retries > 0) {
            try {
                const response = await this.get(url);
                if(response.status !== 429) {
                    return response;
                }
            } catch (error) {
                if(
                    retries === 1 || (error.response && error.response.status !== 429)
                ) {
                    console.log(`Error Response ${error.response.status}`);
                }
            }
            //Wait before trying again to avoid throttling error
            await new Promise((res) => setTimeout(res, delay));
            retries--;
        }
    }
}