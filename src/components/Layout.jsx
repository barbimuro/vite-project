import { Outlet } from "react-router";
import Header from "./Header";

 const Layout=()=>{
return (
    <div className="app-wrapper">
    <Header/>
    <main  >
        <Outlet/>
    </main>
    </div>
)
 }
export default Layout