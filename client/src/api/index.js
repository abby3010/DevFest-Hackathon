import axios from 'axios';

const API = axios.create({ baseURL: "http://localhost:5000", });

API.interceptors.request.use(function (req) {
    let storage = localStorage.getItem('profile');
    if (storage) {
        req.headers.Authorization = `Bearer ${JSON.parse(storage).token}`;
    }
    return req;
});

// Auth routes
export const login = (formData) => API.post('/auth/login', formData);
export const signUp = (formData) => API.post('/auth/signUp', formData);
export const googleAuth = (formData) => API.post('/auth/googleAuth', formData);

export const contactForm = (formData) => API.post('/contact', formData);

// Get the list of all the hashtags
export const getHashTags = () => API.post('/user/gethashtags');

// Fetch user's projects
export const getUserProjects = (userData) => API.post('/user/getuserprojects', userData);

// Creates a new project for the user
export const createNewProject = (formData) => API.post('/user/createnewproject', formData);

// Fetch user's data for profile page
export const fetchUserData = (data) => API.post('/user/fetchuserdata', data);

// Update the user profile
export const updateProfile = (data) => API.post('/update/updateprofile', data);
export const updateProfileDetails = (data) => API.post('/update/profileDetails', data);
export const updateProfileImage = (data) => API.post('/update/profileImage', data);

export const getCoronaDataCountrywise = async () => {
    var options = {
        method: 'GET',
        url: 'https://corona-virus-world-and-india-data.p.rapidapi.com/api',
        headers: {
            'x-rapidapi-key': '81a9989238msh4456f74fed95fd7p11285bjsn5fd1c38f6143',
            'x-rapidapi-host': 'corona-virus-world-and-india-data.p.rapidapi.com'
        }
    };

    var returnData = { data: null, message: "Country wise Data not found, refresh the page" };
    await axios.request(options).then(function (response) {
        returnData.data = response.data;
        returnData.message = "";
    }).catch(function (err) {
        console.log(err);
    });
    return returnData;
}