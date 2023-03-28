const postList = async ({params, credentials, signal}) => {
    try {
        let response = await fetch('/api/posts/feed/' + params.userId, {
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

const loadPostsByUser = async ({params, credentials, signal}) => {
    try {
        let response = await fetch('/api/posts/postsby/' + params.userId, {
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

const create = async ({params, credentials, post}) => {
    try {
        let response = await fetch('/api/posts/new/' + params.userId, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.divineMole
            },
            body: post
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

export {postList, loadPostsByUser, create};