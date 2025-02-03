
const Location = (props) => {
    return ( 
        <div className="weather-container">
         <img src="/Images/cloudy.jpeg" alt="" />
           <h2 className="location">{props.location}</h2>     
           <p className="weather-desc">Weather Condition description</p>
           <p>{props.temperature}</p>
        </div>
     );
}
 
export default Location;