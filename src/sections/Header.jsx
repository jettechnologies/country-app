import { moonPhase } from "../assets";
import useCountry from "../CountryContext";

const Header = () =>{

    const { updateTheme} = useCountry();

    return(
        <header className="w-full py-6 px-5 md:px-10 flex justify-between shadow-sm shadow-dark-blue-bg/30 bg-white dark:bg-dark-blue-el">
            <h2 className="text-size-500 lg:text-size-700 text-light-mode-text dark:text-white font-bold">
                Where in the world ?
            </h2>
            <button className="w-fit flex gap-x-2" >
                <img 
                    src= {moonPhase} 
                    alt="moon icon" 
                    className="max-sm:h-4 max-sm:w-4 h-6 w-6 dark:text-white"
                    onClick={() => updateTheme()}
                />
                <p className="text-size-400 lg:text-size-500 font-medium text-light-mode-text dark:text-white capitalize">
                    dark mode
                </p>
            </button>
        </header>
    );
}

export default Header;