declare namespace NodeJS {
  export interface ProcessEnv {
    REACT_APP_AUTH0_DOMAIN: string,
    REACT_APP_AUTH0_CLIENT_ID: string,
    REACT_APP_ENDPOINT: string,
    REACT_APP_AUTH0_AUDIENCE: string
  }
}