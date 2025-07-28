import { Outlet } from "react-router-dom" //Componente especial que redirige el contendio de los elements de los Route
import { Header } from "./Header"
export function Home(){
    return <div>
            <Header />
            <Outlet />
        </div>


}