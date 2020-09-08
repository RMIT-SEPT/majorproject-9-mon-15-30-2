import axios from "axios";

class HandleCustomers 
{
    getUserIDByType(user_type){
        return axios.get("http://localhost:8080/user/" + user_type);
    }

}
export default new HandleCustomers()