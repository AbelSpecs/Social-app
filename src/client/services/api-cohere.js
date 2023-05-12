const BASE_URL = 'https://feedlikeserver.onrender.com';
// const BASE_URL = 'http://localhost:3000';
const textCohere = async ({params, credentials, text}) => {
    console.log(text);
    try {
        let response = await fetch('/api/ai/cohere', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.divineMole
            },
            body: JSON.stringify(text)
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

export { textCohere };