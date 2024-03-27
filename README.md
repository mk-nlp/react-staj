# iWeather React Staj Submission

This is a submission for the iWeather React Staj. It is a simple weather application that uses the Open-Meteo API to fetch weather data for a given city. The application is built using React and shadcn components.

## Screenshots

## Live Demo

You can view the live demo of the application [here](https://iweather-react-staj.vercel.app/).

## Features

- Fetch weather data for a given city.
- Display the weather data on a seperate page.
- Display the weather data in a card with details.
- Dynamically changing background based on the time data.
- Dynamically changing icon based on the weather data.
- Responsive design.
- Animated transitions between pages.
- Does NOT require an API key for fetching data thanks to the Open-Meteo API.
- 10.000 per day request limit, again, thanks to the Open-Meteo API.

## Technologies

- React
- Shadcn Components
- Tailwind CSS
- Axios ( will migrate, currently using fetch)
- Framermotion (for animations)
- Open-Meteo API
- react-svg-curve (for the curve in the background in the landing page)

## Why I chose Open-Meteo API

I chose the Open-Meteo API because it does not require an API key to fetch data. It is not the biggest reason, but it is a big plus since
I do not have to worry about the API key being exposed in the client-side code, or environment variables.

The real reason I chose the Open-Meteo API is that it provides a lot of data for free. I can fetch the current weather data, hourly forecast, daily forecast, and even the weather data for the next 14 days. This, along with the 10.000 requests per day limit, makes it a great API for a weather application.

Altough I must say openweathermap API is significantly better structured, and easier to bootstrap an application with, I chose Open-Meteo API because of the reasons I mentioned above.

## Requirements

- Node.js
- NPM
- Git (gud\*)
- A modern web browser

\*Git gud is a meme in the gaming community. See [here](https://knowyourmeme.com/memes/git-gud) for more information.

## Installation

To run the application, you need to have Node.js installed on your machine. You can download it from [here](https://nodejs.org/).

After installing Node.js, you can clone the repository using the following command:

```bash
git clone
```

Then, navigate to the project directory and install the dependencies using the following command:

```bash
npm install
```

After installing the dependencies, you can run the application using the following command:

```bash
npm run dev
```

The application by default, will be running on [http://localhost:5173](http://localhost:5173).

To build the application, you can use the following command:

```bash
npm run build
```

The build files will be located in the `build` directory.

## Usage

To use the application, you can enter the name of a city in the input field and click on name you want to get the weather data for. The application will then fetch the weather data for the given city and display it on a seperate page with details.

## License

[MIT](https://choosealicense.com/licenses/mit/)

# Limitations

- The application responsiveness is not perfect. It is not optimized for bigger screens as I am writing this.
- The application does not have sufficient error handling.
