import axios from 'axios';
import AuthService from "../services/auth.service";


axios.interceptors.request.use(request => {

    const user = AuthService.getCurrentUser()
    if (user !== null) {
        request.headers.Authorization = `Bearer ${user.accessToken}`;
    }

    return request;
});