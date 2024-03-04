import {jwtDecode} from "jwt-decode";

export const localStorageUtils = {
    get: (key) => {
        return localStorage.getItem(key);
    },
    remove: (key) => {
        localStorage.removeItem(key);
    }
}

export const jwtUtils = {
    getFromStorage: () => {
        return localStorageUtils.get('jwt')
    },
    removeFromStorage: () => {
        localStorageUtils.remove('jwt')
    },
    decode: (jwt = localStorageUtils.get('jwt')) => {
        if (jwt === null) return null;
        try {
            return jwtDecode(jwt);
        } catch (e) {
            return "Unable to decode"
        }

    },
    parse: (decoded) => {
        if (decoded === null) return null;
        try {
            return {
                sub: decoded.sub,
                roles: decoded.roles
            }
        } catch (e) {
            return "Unable to parse"
        }
    },
    isAuthorized: (useSelector) => {
        let token = useSelector(state => state.data.token);
        return !!token
    }
}