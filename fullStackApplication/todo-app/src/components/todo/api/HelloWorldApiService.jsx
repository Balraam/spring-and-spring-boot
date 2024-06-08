import { clientUrl } from "./ApiClient"

export const retrieveHelloBean=(token) => clientUrl.get("/hello-world-bean",{
    headers: {
        Authorization:token
    }
})

export const retrieveHelloPathvariable=(username) => clientUrl.get(`/hello-world/path-variable/${username}`)
