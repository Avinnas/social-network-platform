import axios from 'axios';
import getCurrentUser from "./currentUser";

axios.interceptors.request.use(request => {

    const user = getCurrentUser()
    if (user !== null) {
        request.headers.Authorization = `Bearer ${user.accessToken}`;
    }

    return request;
});
