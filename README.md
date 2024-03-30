# iWeather React Staj Submission

This is a submission for the iWeather React Staj. It is a simple weather application that uses the Open-Meteo API to fetch weather data for a given location. The application is built using React and shadcn components.

## Screenshots

<p float="left">
  <img src="https://i.imgur.com/DXgfWcy.png" width="220">
  <img src="https://i.imgur.com/MyEnNHJ.png" width="220">
  <img src="https://i.imgur.com/QpSEh5E.png" width="220">
  <img src="https://i.imgur.com/XTuJsGY.png" width="220">
  <img src="https://i.imgur.com/jm38wJR.png" width="220">
  <img src="https://i.imgur.com/U9VXOhX.png" width="220">
</p>

## Live Demo

[Click here to view the live demo.](https://iweather-react-staj.netlify.app/)

## Features

- Fetch weather data for a given location.
- Display the weather data on a seperate page.
- Display the weather data in a card with details.
- Dynamically changing background based on the time data.
- Dynamically changing icons based on the weather data.
- Responsive design.
- Get user location and display the weather data for the user's location. ( Does not work on iOS and MacOS devices when hosted locally, as the app is not served over HTTPS. Should be fine when hosted on a server with HTTPS.)
- Animated transitions between pages.
- Animated background curves in the landing page.
- Does NOT require an API key for fetching data thanks to the Open-Meteo API.
- 10.000 per day request limit, again, thanks to the Open-Meteo API.
- Local storage caching for previously searched location.
- Local storage caching for user location.
- Option to clear the cache.

## Technologies

- [React](https://reactjs.org/)
- [shadcn](https://ui.shadcn.com/) ui library
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [framer-motion](https://www.framer.com/motion/) (for animations)
- [Open-Meteo API](https://open-meteo.com/)
- [react-svg-curve](https://github.com/pomber/react-svg-curve) (for the animated curves in the background in the landing page)

## Why I chose Open-Meteo API

I chose the Open-Meteo API because it does not require an API key to fetch data. It is not the biggest reason, but it is a big plus since
I do not have to worry about the API key being exposed in the client-side code, or environment variables.

The real reason I chose the Open-Meteo API is that it provides a lot of data for free. I can fetch the current weather data, hourly forecast, daily forecast, and even the weather data for the next 14 days. This, along with the 10.000 requests per day limit, makes it a great API for a weather application.

Altough I must say OpenWeatherMap API is significantly better structured, and easier to bootstrap an application with, I chose Open-Meteo API because of the reasons I mentioned above.

## Requirements

- Node.js
- NPM
- Git (gud\*)
- A modern web browser

\*Git gud is a meme in the gaming community. See [here](https://knowyourmeme.com/memes/git-gud) for more information.

## Installation

Clone the repository to your local machine using the following command:

```bash
git clone git@github.com:mk-nlp/react-staj.git
```

Then, navigate to the project directory and install the dependencies using the following command:

```bash
cd react-staj
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

The build files will be located in the `dist` directory.

## Usage

To use the application, you can enter the name of a city in the input field and click on name you want to get the weather data for. The application will then fetch the weather data for the given city and display it on a seperate page with details.

You can also click on the "Get Current Location" button to get the weather data for your location. The application will ask for permission to get your location. If you allow it, the application will fetch the weather data for your location and display it on a seperate page with details.

# Limitations

- The "Get Current Location" button does not work on iOS and MacOS devices as the app is not served over HTTPS by default. (Should be fine when hosted on a server with HTTPS.)

# License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
