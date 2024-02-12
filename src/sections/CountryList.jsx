import { searchIcon, circleSpinner } from "../assets";
import { CountryCard, Pagination } from "../components";
import useCountry from "../CountryContext";
import { useState, useMemo } from "react"; 

let pageSize = 8;

const CountryList = () =>{

    const regions = ["Africa", "America", "Asia", "Europe", "Oceania"];
    const {countries,  search, regionSearch, loading, updateSearch, updateRegionSearch} = useCountry();
    const [currentPage, setCurrentPage] = useState(1);

  const currentCountries = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return countries.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, countries]);

    const countryOptions = regions.map((region, index) => (
        <option key = {index} value={region}> {region}</option>
    ));
    
    const countryDisplay = loading === "success" 
        ?  currentCountries.map((country ,index) => (
            <CountryCard key = {index} {...country}/>
        )) 
        : <div className="w-full flex justify-center">
            <img src={circleSpinner} alt="spinner gif image" />   
        </div>

    return(
        <section className = "max-container min-h-screen px-5 md:px-10 pt-10 lg:pt-16 bg-light-mode-bg dark:bg-dark-blue-bg">
            <div className="flex justify-between flex-wrap w-full mb-10">
                <div className="relative w-full md:w-2/5 h-16">
                    <input 
                        type="text" 
                        placeholder="Search for a country..." 
                        className="w-full h-full pl-20 font-nunito font-medium text-size-500 capitalize text-light-mode-input dark:text-white dark:bg-dark-blue-el rounded-lg shadow-sm shadow-dark-blue-bg/30 focus-within:input-outline"
                        value = {search}
                        onChange={(e) => updateSearch(e.target.value)}
                    />
                    <img src={searchIcon} alt="search icon" className="w-6 h-6 absolute top-5 left-[1.75rem]"/>
                </div>
                <select 
                    className="dark:text-white dark:bg-dark-blue-el font-nunito font-semibold text-size-500 w-2/3 md:w-2/5 h-16 px-10 md:px-7 max-sm:mt-10 rounded-lg shadow-sm shadow-dark-blue-bg/30 focus-within:input-outline"
                    value={regionSearch}
                    onChange={e => updateRegionSearch(e.target.value)}
                >
                    <option value="">Filter by Region</option>
                    {countryOptions}
                </select>
            </div>
            <div className="w-full pb-8 flex flex-wrap justify-center gap-x-4 gap-y-8 md:gap-y-10">
                {countryDisplay}

                <div className="w-full grid justify-center">
                    <Pagination
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalCount={countries.length}
                        pageSize={pageSize}
                        onPageChange={page => setCurrentPage(page)} 
                    />
                </div>
            </div>
        </section>
    )   
}

export default CountryList;