const axios = require('axios');

export function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function load(key, _default) {
    const str = localStorage.getItem(key);
    if (str) {
        try {
            return JSON.parse(str);
        } catch (e) {
            return str;
        }
    }
    return _default;
}

export function remove(key) {
    localStorage.removeItem(key);
}


export function axiosSetDefault (){
    const HOST = load("HOST-KEY");
    if(!HOST){
        save("HOST-KEY", "localhost");
    }
    axios.defaults.baseURL = `http://${HOST}`;
};
