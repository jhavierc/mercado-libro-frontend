import httpService from "../../services/httpService";
import setLocalStorageItem from "../../utils/setStorage";
import Home from "../Home";
import { useLocation } from "react-router-dom";


const getToken = async (provider: string, code:string) => {
    /*post request to backend*/
    try{
        const response = await httpService.post(`http://localhost:8080/v1/api/auth/oauth/${provider}?code=${code}`
        , {provider, code});
        const user = response.data.user;
        setLocalStorageItem("token", response.data.token);
        localStorage.setItem(
            "user",
            JSON.stringify({ name: user.name, lastName: user.lastName })
          );
        localStorage.setItem("isLogged", "true");
        // Get last url from local storage
        const lastUrl = localStorage.getItem("lastUrl");
        // Redirect to last url
        window.location.href = lastUrl ? lastUrl : "/";
        
    }
    catch(error){
        console.log(error);
    }
  }

const Oauth = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const provider = queryParams.get("state") ?? '';
    const code = queryParams.get("code") ?? '';
    getToken(provider, code);


  return (
    <div>
    </div>
  );
};

export default Oauth;