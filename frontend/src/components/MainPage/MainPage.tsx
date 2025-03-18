import { Outlet } from "react-router-dom";
import WalletStatus from "../WalletStatus/WalletStatus";




const MainPage = () => {


    return (

        <div className="w-full h-full flex flex-col items-center">
            <WalletStatus />
            <Outlet />
        </div>
    );
}


export default MainPage;
