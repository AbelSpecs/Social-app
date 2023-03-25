const postList = async ({params, credentials, signal}) => {
    try {
        let response = await fetch('/api/posts/feed/' + params.userId, {
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

export {postList};