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
export const createNewExperience = (formData) => API.post('/user/createnewexperience', formData);

// Fetch a particular project with projectID and privatekey(for edit access)
export const fetchProject = (data) => API.post('/user/fetchproject', data);

// Fetch user's data for profile page
export const fetchUserData = (data) => API.post('/user/fetchuserdata', data);

// Update the user profile
export const updateProfile = (data) => API.post('/update/updateprofile', data);
export const updateProfileDetails = (data) => API.post('/update/profileDetails', data);
export const updateProfileImage = (data) => API.post('/update/profileImage', data);

// Update user's Project
export const updateProjectDetails = (data) => API.post('/update/projectDetails', data);
export const updateProjectDescription = (data) => API.post('/update/projectDescription', data);