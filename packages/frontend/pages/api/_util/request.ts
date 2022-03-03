import { error } from "./error";

type ErrorObj = {
  message: string;
};

const request = async (
  url: string,
  method: string,
  body: any,
  headers: any = {}
) => {
  const options: any = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);

    return await handleResponse(response);
  } catch (e) {
    console.error(`Error requesting ${url}`, method, body, headers, e);
    return Promise.reject(error(500));
  }
};

const handleResponse = async (response: any) => {
  try {
    const json = await response.json();

    if (response.ok) {
      return json;
    } else {
      return Promise.reject(json);
    }
  } catch (e) {
    console.error("Error handling response", e);
    return Promise.reject(error(500));
  }
};

export const postGQL = async (
  query: string,
  variables: any,
  rootKey: string
) => {
  try {
    const requestHeaders = new Headers();
    requestHeaders.set("Content-type", "application/json");
    requestHeaders.set(
      "x-hasura-admin-secret",
      `${process.env.HASURA_ADMIN_SECRET}`
    );

    const res = await fetch(`${process.env.HASURA_GRAPHQL_ENDPOINT}`, {
      headers: requestHeaders,
      method: "post",
      body: JSON.stringify({ query, variables }),
    });
    const json = await res.json();

    if (json.errors) {
      const e = json.errors.map((error: ErrorObj) => ({
        detail: error.message,
      }));

      console.log(e);

      return Promise.reject(error(400, "Bad request", e));
    } else {
      const r = json.data[rootKey];

      return r || json.data;
    }
  } catch (err) {
    console.error("Error POSTing to GraphQL endpoint", err);
    console.error("GraphQL query:", query);

    return Promise.reject(error(500));
  }
};

export const post = async (url: string, body: any = {}, headers: any = {}) => {
  try {
    return await request(url, "POST", body, headers);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const get = async (url: string, headers: any = {}) => {
  try {
    return await request(url, "GET", null, headers);
  } catch (e) {
    return Promise.reject(e);
  }
};
