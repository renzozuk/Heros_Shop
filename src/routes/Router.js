import { BrowserRouter, Route, Routes } from "react-router-dom";
import Department from "../pages/Department";
import Homepage from "../pages/Homepage";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />}>
                    <Route path="department" element={<Department />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
