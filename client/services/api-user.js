const create = async (user) => {
    try{
        let response = await fetch('/api/users/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        return await response.json()
    }catch(error) {
        console.log(error);
    }
}

const list = async (signal) => {
    try {
        let response = await fetch('/api/users/', {
            method: 'GET',
            signal: signal
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

const read = async ({params, credentials, signal}) => {
    try {
        let response = await fetch('/api/users/' + params.userId, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.divineMole
            }
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

const update = async ({params, credentials, user}) => {
    try {
        let response = await fetch('/api/users/' + params.userId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.divineMole
            },
            body: user
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

const remove = async ({params, credentials}) => {
    try {
        let response = await fetch('/api/users/' + params.userId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.divineMole
            }
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

const follow = async ({params, credentials, followId}) => {
    try {
        let response = await fetch('/api/users/follow/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.divineMole
            },
            body: JSON.stringify({userId: params.userId, followId})
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

const unfollow = async ({params, credentials, followId}) => {
    try {
        let response = await fetch('/api/users/unfollow/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.divineMole
            },
            body: JSON.stringify({userId: params.userId, followId})
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

const findpeople = async ({params, credentials, signal}) => {
    try {
        let response = await fetch('/api/users/findpeople/' + params.userId, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.divineMole
            },
            
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

const findpeoplebyname = async({params, credentials, signal}) => {
    try {
        const response = await fetch('/api/users/usersbyname/' + params.name, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.divineMole
            },
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

const listfollowers = async({params, credentials, signal}) => {
    try {
        let response = await fetch('/api/users/findfollowers/' + params.userId, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.divineMole
            },
        })
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

export { 
    create, 
    list, 
    update, 
    read, 
    remove, 
    follow, 
    unfollow, 
    findpeople, 
    findpeoplebyname,
    listfollowers
};