import {Navigate, RouterProvider} from "react-router";
import {createBrowserRouter} from "react-router-dom";
import Paths from "../../Paths";
import {TemplatePage} from "../../template/TemplatePage";
import {UsersPage} from "../users/UsersPage";


export default function AppRouter () {

    const router = createBrowserRouter([
        {
            path: Paths.HOME,
            element: <TemplatePage />,
            children: [
                {
                    path: Paths.USERS,
                    element: <UsersPage />
                },
            ]

        },
        {
            path: "*",
            element: <Navigate to={Paths.USERS} />
        },
        {
            path: "",
            element: <Navigate to={Paths.USERS} />
        },
        {
            path: Paths.USER,
            element: <div>TODO</div>
        }
    ])

    return(<RouterProvider router={router} />);
}