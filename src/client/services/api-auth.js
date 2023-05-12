const BASE_URL = 'https://feedlikeserver.onrender.com';
// const BASE_URL = 'http://localhost:3000';
const signin = async (user) => {
    console.log(BASE_URL);
    try {
        let response = await fetch(BASE_URL+'/auth/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            credentials : 'include',
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

const signout = async () => {
    try {
        let response = await fetch(BASE_URL+'/auth/signout', {
            method: 'GET'
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

export { signin, signout };