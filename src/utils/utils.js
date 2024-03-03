import {jwtDecode} from "jwt-decode";

export const localStorageUtils = {
    get: (key) => {
        return localStorage.getItem(key);
    }
}

export const jwtUtils = {
    getFromStorage: () => {
        localStorageUtils.get('jwt')
    },
    decode: (jwt = localStorageUtils.get('jwt')) => {
        try {
            return jwtDecode(jwt);
        } catch (e) {
            return "Unable to decode"
        }

    },
    parse: (decoded) => {
        try {
            return {
                sub: decoded.sub,
                roles: decoded.roles
            }
        } catch (e) {
            return "Unable to parse"
        }
    }
}