import SearchBar from './Components/search';

function App() {
  const ApiKey="c594810cd674f04e37f477b995e441cd"
  return (
  <div className="App">
    <div className="container">
      <h1 className='title'>Weather App</h1>
        <SearchBar  ApiKey={ApiKey}/>
    </div>
  </div>
  )
}

export default App
