import { clientUrl } from "./ApiClient";

export const basicAuth=() => clientUrl.get("/basicAuth")
export const basicJwtAuth=(username,password) => clientUrl.post("/authenticate",{username,password})