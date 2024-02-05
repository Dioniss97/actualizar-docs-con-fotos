// Imports //
import axios from 'axios';
// Imports //

export async function getImageBase64(url: string): Promise<string> {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        if (response.status === 200) {
            const imageBuffer = Buffer.from(response.data, 'binary');
            const base64Image = imageBuffer.toString('base64');
            return base64Image;
        } else {
            throw new Error(`Failed to fetch image. Status code: ${response.status}`);
        }
    } catch (error) {
        throw error;
    }
}

export async function getRandomUser(): Promise<User> {

    try {
        const response = await axios.get("https://randomuser.me/api/", { responseType: 'json' });
        if (response.status === 200) {
            let data: RandomUserApiResponse = response.data;
            data.results[0].picture.large = await getImageBase64(data.results[0].picture.large);
            return data.results[0];
        } else {
            throw new Error(`Failed to fetch image. Status code: ${response.status}`);
        }
    } catch (error) {
        throw error;
    }

}

interface Location {
    street: {
        number: number;
        name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: number;
    coordinates: {
        latitude: string;
        longitude: string;
    };
    timezone: {
        offset: string;
        description: string;
    };
}

interface Login {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
}

interface Name {
    title: string;
    first: string;
    last: string;
}

interface Dob {
    date: string;
    age: number;
}

interface Registered {
    date: string;
    age: number;
}

interface Picture {
    large: string;
    medium: string;
    thumbnail: string;
}

interface Id {
    name: string;
    value: string;
}

export interface User {
    gender: string;
    name: Name;
    location: Location;
    email: string;
    login: Login;
    dob: Dob;
    registered: Registered;
    phone: string;
    cell: string;
    id: Id;
    picture: Picture;
    nat: string;
}

interface Info {
    seed: string;
    results: number;
    page: number;
    version: string;
}

interface RandomUserApiResponse {
    results: User[];
    info: Info;
}