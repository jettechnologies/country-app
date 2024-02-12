/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const CountryCard = ({id, name, capital, population, region, flags}) =>{

    return(
       <Link to = {`country/${id}`}>
            <div className="w-[20rem] lg:w-[18rem] xl:w-[18.5rem] h-fit text-light-mode-text dark:text-white rounded-lg shadow-sm shadow-dark-blue-bg/30 bg-white dark:bg-dark-blue-el">
                <img src={flags?.svg} alt="Country flags" className="w-full h-40 object-cover rounded-t-lg"/>
                <div className="w-full px-8 pt-8 pb-12">
                    <h3 className="font-bold text-size-500 mb-5 capitalize">
                        {name}
                    </h3>
                    <p className="text-size-500 font-medium"><span className="font-semibold">Population:</span> {population}</p>
                    <p className="text-size-500 font-medium"><span className="font-semibold">Region:</span> {region}</p>
                    <p className="text-size-500 font-medium"><span className="font-semibold">Capital:</span> {capital}</p>
                </div>
            </div>
       </Link>
    );
}

export default CountryCard;