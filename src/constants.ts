const localHost = "http://localhost:8571";
const prodHost = "https://chat-bckend.herokuapp.com";
export const apiURL = window.location.origin === 'http://localhost:3000'? localHost : prodHost;