import https from 'https';

export class HttpService {

    async get(url) {

        return new Promise((resolve, reject) => {

            try {
                https.get(url, (res) => {

                    // console.log(`statusCode: ${res.statusCode}`);

                    res.on('error', (err) => {
                        console.log("error", err)
                        reject("Error")
                    })

                    let data = [];

                    res.on('data', (chunk) => {
                        data.push(chunk);
                    })

                    res.on('end', () => {
                        try {
                            const serverData = JSON.parse(Buffer.concat(data).toString());
                            // console.log({ serverData })
                            resolve(serverData);
                        } catch (error) {
                            console.log("error", error)
                            reject(error);
                        }
                    })

                })
            } catch (error) {
                console.log("error", error)
                reject(error);
            }

        })

    }
}