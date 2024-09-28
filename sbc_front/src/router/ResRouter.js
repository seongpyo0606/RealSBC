import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading . . .</div>
const ResGuidePage = lazy(() => import("../pages/reservation/ResGuidePage"))
const RealTimeResPage = lazy(() => import("../pages/reservation/RealTimeResPage"))

const ResRouter = () => {
    return[
        {
            path: "info",
            element : <Suspense fallback={Loading}><ResGuidePage/></Suspense>
        },
        {
            path: "realtime",
            element : <Suspense fallback={Loading}><RealTimeResPage/></Suspense>
        },
        {
            path: "*",
            element : <Navigate replace to="info"/>
        },
    ]
}

export default ResRouter;