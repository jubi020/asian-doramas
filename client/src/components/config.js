export const API_KEY = `${process.env.REACT_APP_TMDB_API_KEY}`;

export const API_URL = 'https://api.themoviedb.org/3/tv';

export const DISCOVER_API_URL = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&include_null_first_air_dates=false`;

export const baseImageURL = 'https://image.tmdb.org/t/p';

// export const dramaDetailsEndpoint = 'https://api.themoviedb.org/3/tv/133091?api_key=7e10aae68988f9a53b490ed984e5c2e2&language=en-US';
//ja, ko, zh, cn


/* correct one for fetching asian dramas
https://api.themoviedb.org/3/discover/tv?api_key=7e10aae68988f9a53b490ed984e5c2e2&include_null_first_air_dates=false&
language=en-US&with_original_language=ko&page=1
*/


/* trial one 
https://api.themoviedb.org/3/discover/tv?api_key=7e10aae68988f9a53b490ed984e5c2e2&
language=en-US&sort_by=popularity.desc&page=1&include_null_first_air_dates=false&with_original_language=ko
*/