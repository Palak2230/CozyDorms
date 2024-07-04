const BASE_URL = "http://localhost:5000";

export const PGS_URL = BASE_URL + '/api/pgs';
export const LOCALITIES_URL = PGS_URL + '/localities';
export const PGS_BY_CITY_URL = PGS_URL + '/search?q=';
export const LOCALITIES_BY_CITY_URL = LOCALITIES_URL + '/search?q=';

export const USER_LOGIN_URL = BASE_URL + '/api/users/login';
export const USER_SIGNUP_URL = BASE_URL + '/api/users/signup';


