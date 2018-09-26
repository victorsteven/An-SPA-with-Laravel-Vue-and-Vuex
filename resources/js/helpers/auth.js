export function login(credentials){
    return new Promise((res, rej) => {
        axios.post("/api/auth/login", credentials)
             .then((response) => {
                 res(response.data);
             })
             .catch((err) => {
                 rej("Wrong email or password");
             });
    })
}

export function getLocalUser(){
    const userStr = localStorage.getItem("user");

    //if we dont have a user, the current user should be null
    if(!userStr){
        return null;
    }

    return JSON.parse(userStr); //we want to get the actual object
}