import axios from 'axios';

export async function authorize() {

    if (isAuthorized()) {
        return true;
    }

    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    if (!clientId) {
        throw new Error("No client ID set");
    }

    const scopes = 'user-modify-playback-state user-read-playback-state';

    try {

        const promise = waitForAuthorize();
        window.open('https://accounts.spotify.com/authorize' +
            '?response_type=token' +
            '&client_id=' + clientId +
            '&scope=' + encodeURIComponent(scopes) +
            '&redirect_uri=' + encodeURIComponent(window.location),
            "_blank");

        await promise;


        return true;

    } catch (e) {
        console.log(e);
        return false;
    }
}

export function onCallback() {
    const fragment = window.location.hash;
    if (!fragment) {
        throw new Error("No hash fragment. Access denied.");
    }

    const token = JSON.parse('{"' + decodeURI(fragment.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
    token.expires_in = parseInt(token.expires_in);
    token.valid_until = (new Date().getTime() / 1000) + token.expires_in;
    localStorage.setItem('spotify', JSON.stringify(token));

    window.close();
}

export async function getSong() {
    // Check if authorized
    if (!isAuthorized()) {
        throw new Error("Not authorized");
    }

    // Call API
    const response = await axios.get('https://api.spotify.com/v1/me/player', {
        headers: { 'Authorization': 'Bearer ' + getTokenFromStorage().access_token }
    });
    console.log(response);
    if (response.status === 200 && response.data && response.data.item) {
        const data = response.data;
        const artist = data.item.artists
            ? data.item.artists.map((a) => a.name).join(' & ')
            : 'Unknown';
        const song = data.item.name;
        return artist + " - " + song;
    }

    return "Nothing playing";
}

async function waitForAuthorize() {
    return await new Promise((resolve, reject) => {
        window.localStorage.onChange = (object, areaName) => {
            console.log("Done");
            if (areaName === 'local' && object.spotify && object.spotify.newValue) {
                resolve(true);
            }
        };
    });
}

function isAuthorized() {
    const token = getTokenFromStorage();
    console.log(token);

    if (!token) {
        return false;
    }

    if ((new Date().getTime() / 1000) > token.valid_until) {
        console.log("Expired");
        return false;
    }

    return true;
}

function getTokenFromStorage() {
    return JSON.parse(localStorage.getItem('spotify'));
}