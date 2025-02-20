import https from "https";

import { BaseApiResponse, ErrorResponse } from "../types/client";

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

function makeRequest<T extends BaseApiResponse>(
  apiKey: string,
  endpoint: string,
  method: HTTPMethod,
  body?: unknown,
): Promise<T> {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname: "www.popads.net",
      path: `/apiv2${endpoint}?key=${encodeURIComponent(apiKey)}`,
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const req = https.request(options, (res) => {
      let responseData = "";
      res.on("data", (chunk) => {
        responseData += chunk;
      });
      res.on("end", () => {
        try {
          const parsedData: T | ErrorResponse = JSON.parse(responseData);

          if (parsedData.status === "failed") {
            reject(new Error(`API Error: ${JSON.stringify(parsedData.code)}`));
            return;
          }
          resolve(parsedData);
        } catch (error) {
          reject(new Error("Invalid JSON response"));
        }
      });
    });

    req.on("error", (error) => reject(error));
    if (data) req.write(data);
    req.end();
  });
}

export { makeRequest };
