import {post} from "@/utils/http.js";


export function loginApp(params) {
    return post("/auth/login", params);
}

export function logoutApp() {
    return post("/auth/logout");
}