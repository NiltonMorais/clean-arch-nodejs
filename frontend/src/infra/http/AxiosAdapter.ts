import axios from "axios";
import HttpClient from "./HttpClient";

export default class AxiosAdapter implements HttpClient {

    async get(url: string): Promise<any> {
        const response = await axios({ method: "get", url });
        return response.data;
    }

    async post(url: string, data: any): Promise<any> {
        const response = await axios({ method: "post", url, data });
        return response.data;
    }
}