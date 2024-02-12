import { Outlet } from "react-router-dom";
import { Header } from "../sections";
import useCountry from "../CountryContext";

const Layout = () =>{

    const { theme } = useCountry();

    return(
        <>
            <main className= {`max-container min-h-screen font-nunito bg-light-mode-bg ${theme ? "dark" : ""} dark:bg-dark-blue-bg `}>
                <Header />
                <Outlet />
            </main>
        </>
    );
}

export default Layout;