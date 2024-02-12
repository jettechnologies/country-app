import { Layout } from "./components";
import { SingleCountry, CountryList } from "./sections";
import { Routes, Route, Navigate } from "react-router-dom";
import { CountryProvider } from "./CountryContext";

const App = () =>{

  return(
      <CountryProvider>
        <Routes>
          <Route path="/" element = {<Layout />}>
            <Route index element = {<CountryList />} />

            <Route path="country/:countryId" element = {<SingleCountry />}/>

            {/* redirect route for any route thats isnt stated for */}
          <Route path="*" element = {<Navigate to = "/" replace/>}></Route>
          </Route>
        </Routes>  
      </CountryProvider>
  )
}

export default App
