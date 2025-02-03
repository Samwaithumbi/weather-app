import axios from "axios";
import { useState } from "react";


const SearchBar = (props) => {
  const [location, setLocation] = useState("");
  const [data, setData] = useState({
    name: "",
    temperature: "",
    condition: "",
    image: "",
    advice: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSearch = () => {
    setLoading(true); // Set loading to true when search starts
    const ApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${props.ApiKey}&units=metric`;
    axios.get(ApiUrl)
      .then(res => {
        let imagePath = "";
        let adviceOnWeather = "";
        if (res.data.weather[0].main === "Clouds") {
          imagePath = "/Images/cloudy.jpeg";
          adviceOnWeather = "Carry a sweater";
        } else if (res.data.weather[0].main === "Clear") {
          imagePath = "/Images/sunny.png";
          adviceOnWeather = "Wear light clothes like a T-shirt";
        } else if (res.data.weather[0].main === "Drizzle") {
          imagePath = "/Images/rainy.jpg";
          adviceOnWeather = "Carry an umbrella and avoid potholes";
        } else if (res.data.weather[0].main === "Rain") {
          imagePath = "/Images/rainy.jpg";
          adviceOnWeather = "Carry an umbrella and avoid potholes";
        } else {
          imagePath = "/Images/search.png";
          adviceOnWeather = "Enjoy the day";
        }
        console.log(res.data);
        setData({
          ...data, name: res.data.name,
          temperature: res.data.main.temp,
          condition: res.data.weather[0].description,
          image: imagePath,
          advice: adviceOnWeather
        });
        setError("");
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch(err => {
        console.log(err);
        if (err.response.status === 404) {
          setError("Invalid location");
        } else {
          setError("");
        }
        setData({
          name: "",
          description: "",
          temperature: "",
          image: "",
          advice: ""
        });
        setLoading(false); // Set loading to false in case of error
      });
  };

  return (
    <div>
      <div className='search-container'>
        <input type="text" placeholder='Enter location' onChange={handleChange} className='input' />
        <button className='search' onClick={handleSearch}>Search</button>
      </div>
      <div>
        <p>{error}</p>
      </div>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div>
          <h2 className="place">{data.name}</h2>
          <p className="desc">{data.condition}</p>
          <p>{data.advice}</p>
          <img src={`${import.meta.env.PUBLIC_URL}${data.image}`} alt="" />
          <p className="temp">{Math.round(data.temperature)}°C</p>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
