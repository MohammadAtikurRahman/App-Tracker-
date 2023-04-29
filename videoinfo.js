const axios = require('axios');
const axiosRetry = require('axios-retry');
const csvWriter = require('csv-writer').createObjectCsvWriter;

axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

const vlcUrl = 'http://127.0.0.1:8080';
const password = '1234'; // Replace this with the password you set in VLC settings

const csvWriterInstance = csvWriter({
    path: 'playback_data.csv',
    header: [
        { id: 'startTime', title: 'Start Time' },
        { id: 'endTime', title: 'End Time' },
        { id: 'duration', title: 'Duration' },
        { id: 'fileName', title: 'File Name' },
        { id: 'fileLocation', title: 'File Location' },
    ],
    append: true
});

let videoPlaying = false;
let startTime;
let fileName;
let fileLocation;

const monitorPlayback = async () => {
    try {
        const response = await axios.get(`${vlcUrl}/requests/status.json`, {
            auth: {
                username: '',
                password: password,
            },
        });

        const data = response.data;
        const currentTime = new Date();

        console.log(`Current State: ${data.state}`);

        if (data.state === 'playing' && !videoPlaying) {
            startTime = currentTime;
            fileName = data.information.category.meta.filename;
            fileLocation = data.information.uri;
            videoPlaying = true;
            console.log('Video started playing.');
        } else if (data.state !== 'playing' && videoPlaying) {
            const endTime = currentTime;
            const duration = Math.round((endTime - startTime) / 1000);
            videoPlaying = false;

            await csvWriterInstance.writeRecords([
                {
                    startTime: startTime.toISOString(),
                    endTime: endTime.toISOString(),
                    duration: duration,
                    fileName: fileName,
                    fileLocation: fileLocation || 'Undefined',
                },
            ]);

            console.log(`Recorded: Start Time - ${startTime.toISOString()}, End Time - ${endTime.toISOString()}, Duration - ${duration} seconds, File Name - ${fileName}, File Location - ${fileLocation || 'Undefined'}`);
        }
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled:', error.message);
        } else if (error.code === 'ECONNABORTED') {
            console.log('Request timed out:', error.message);
        } else if (error.response) {
            console.log('Server responded with a non-200 status code:', error.message);
        } else if (error.code === 'ECONNREFUSED') {
            console.log('Player is not running.');

            if (videoPlaying) {
                const endTime = new Date();
                const duration = Math.round((endTime - startTime) / 1000);
                videoPlaying = false;

                await csvWriterInstance.writeRecords([
                    {
                        startTime: startTime.toISOString(),
                        endTime: endTime.toISOString(),
                        duration: duration,
                        fileName: fileName,
                        fileLocation: fileLocation || 'Undefined',
                    },
                ]);

                console.log(`Recorded: Start Time - ${startTime.toISOString()}, End Time - ${endTime.toISOString()}, Duration - ${duration} seconds, File Name - ${fileName}, File Location - ${fileLocation || 'Undefined'}`);
            }
        } else {
            console.error('Error:', error.message);
        }
    }
};

const intervalId = setInterval(monitorPlayback, 1000);



