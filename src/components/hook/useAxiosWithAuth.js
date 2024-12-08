import axiosAuth from '../api/axios-config';
import useAuth from "./useAuth";
import {useEffect} from "react";

const useAxiosWithAuth = () => {
    const {auth} = useAuth();
    console.log(auth);

    useEffect( () => {
        const b64Encode = btoa(`${auth?.principal.username}:${auth?.principal.password}`);

        const requestIntercept = axiosAuth.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Basic ${b64Encode}`;
                }
                return config;
            }, (error) => {
                Promise.reject(error);
            }
        )
        return () => {
            axiosAuth.interceptors.request.eject(requestIntercept);
        }
    }, [auth])

    return axiosAuth;
}

export default useAxiosWithAuth;