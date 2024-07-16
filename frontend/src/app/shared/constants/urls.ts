const BASE_URL = "http://localhost:5000";

export const PGS_URL = BASE_URL + '/api/pgs';
export const CITIES_URL = PGS_URL + '/cities';
export const PGS_BY_CITY_URL = PGS_URL + '/search?q=';
export const PGS_BY_ID_URL = PGS_URL + '/search/id?q=';
export const ADD_PG_URL = PGS_URL + '/add';
export const EDIT_PG_URL = PGS_URL + '/edit?q=';
export const ADD_REVIEW_URL = PGS_URL + '/reviews';
export const USER_LOGIN_URL = BASE_URL + '/api/users/login';
export const USER_REGISTER_URL = BASE_URL + '/api/users/register';
export const USER_UPDATE_URL = BASE_URL + '/api/users/update-password';
export const USER_PG_URL = BASE_URL + '/api/users/userproperty';

