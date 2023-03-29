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

const remove = async({params, credentials}) => {
    try {
        let response = await fetch('/api/posts/delete' + params.postId, {
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

const like = async({params, credentials, postId}) => {
    try {
        let response = await fetch('/api/posts/like', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.divineMole
            },
            body: JSON.stringify({userId: params.userId, postId: postId})
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

const dislike = async({params, credentials, postId}) => {
    try {
        let response = await fetch('/api/posts/dislike', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.divineMole
            },
            body: JSON.stringify({userId: params.userId, postId: postId})
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

export {postList, loadPostsByUser, create, remove, like, dislike};