import { useNavigate, useParams } from "react-router-dom";
import { backArrow } from "../assets";
import useCountry from "../CountryContext";
// alpha3Code
const SingleCountry = () =>{
    const navigate = useNavigate();
    const { countryId } = useParams();
    const {showCountryById, showBorderCountries} = useCountry(); 

    const country = showCountryById(countryId);

    return(
        <section className="max-container min-h-screen px-5 md:px-10 pt-10 lg:pt-16 bg-light-mode-bg dark:bg-dark-blue-bg">
            <button 
                className="flex items-center py-4 px-6 rounded-md shadow-sm shadow-dark-blue-bg/30 capitalize font-nunito font-normal text-light-mode-text dark:text-white bg-white dark:bg-dark-blue-el text-size-500"
                onClick={() => navigate(-1)}
            >
                <img src={backArrow} alt="back arrow icon"  className="w-5 h-5 mr-4"/>
                back
            </button>
            <div 
                className="flex w-full lg:h-[23rem] h-fit flex-col lg:flex-row lg:items-center mt-14"

            >
                <img src={country.flag} alt="country flag image" className="w-full lg:w-[40%] h-[15rem] lg:h-full object-cover lg:mr-10 max-md:mb-10"/>
                <div className="w-full lg:flex-1 h-fit flex flex-wrap gap-y-8 text-light-mode-text dark:text-white">
                    <div className="w-full lg:w-[45%] grid gap-y-3 mr-8">
                        <h3 className="font-bold text-size-600 lg:text-size-700 ">{country.name}</h3>
                        <p className="font-normal text-size-500 capitalize"><span className="font-semibold mr-3">native name:</span>{country.nativeName}</p>
                        <p className="font-normal text-size-500 capitalize"><span className="font-semibold mr-3">population:</span>{country.population}</p>
                        <p className="font-normal text-size-500 capitalize"><span className="font-semibold mr-3">region:</span>{country.region}</p>
                        <p className="font-normal text-size-500 capitalize"><span className="font-semibold mr-3">sub region:</span>{country.subRegion}</p>
                        <p className="font-normal text-size-500 capitalize"><span className="font-semibold mr-3">captial:</span>{country.capital}</p>
                    </div>
                    <div className="w-full lg:w-[45%] h-fit grid gap-y-3  justify-self-end self-center">
                        <p className="font-normal text-size-500 capitalize"><span className="font-semibold mr-3">top level domain:</span>{country.topLevelDomain}</p>
                        <p className="font-normal text-size-500 capitalize"><span className="font-semibold mr-3">currencies:</span>{country.currencies[0].name}</p>
                        <div className="w-full flex">
                            <span className="font-semibold mr-3 text-size-500 capitalize">languages:</span>
                            {country.languages.map(language => <p className="font-normal text-size-500 capitalize mr-1" key={language.iso639_1}>{language.name}</p>)}
                        </div>
                    </div>
                    <div className="w-full max-h-fit lg:flex gap-4 lg:items-center text-light-mode-text dark:text-white">
                        <h4 className="font-semibold text-size-600 max-md: mb-5 xl:mt-[1.2rem]">Border Countries:</h4>
                        <div className="flex gap-4 w-full lg:flex-1 flex-wrap">
                            {
                                country.borders 
                                    ? 
                                    country?.borders.map(border =>{
                                        const borderCountry = showBorderCountries(border)[0];
                                        return <button 
                                            className="text-center h-10 py-2 px-4 shadow-md shadow-dark-blue-bg/30 capitalize font-nunito font-normal bg-white dark:bg-dark-blue-el text-light-mode-text dark:text-white text-size-500"
                                            key={borderCountry.id}
                                            onClick={() => navigate(`/country/${borderCountry.id}/`)}
                                        >
                                            {borderCountry.name}
                                        </button>
                                    }) 
                                    : <p className="font-normal text-size-500">No border countries</p>
                            }
                        </div>
                        </div>
                </div>
            </div>
        </section>
    )
}

export default SingleCountry;