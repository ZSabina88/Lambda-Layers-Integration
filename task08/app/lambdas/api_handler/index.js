const axios = require('axios');

class OpenMeteoApi {
    constructor() {
        this.baseUrl = 'https://api.open-meteo.com/v1/forecast';
    }

    async getWeatherForecast(latitude, longitude) {
        try {
            const response = await axios.get(this.baseUrl, {
                params: {
                    latitude: latitude,
                    longitude: longitude,
                    hourly: 'temperature_2m'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching weather forecast:', error);
            throw error;
        }
    }
}

exports.handler = async (event) => {
    const latitude = event.latitude || 52.52;
    const longitude = event.longitude || 13.4050;

    const api = new OpenMeteoApi();
    try {
        const weatherData = await api.getWeatherForecast(latitude, longitude);
        return {
            statusCode: 200,
            body: JSON.stringify(weatherData)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: 'Error fetching weather data'
        };
    }
};