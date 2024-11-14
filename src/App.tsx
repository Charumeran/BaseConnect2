import { useState } from "react";
import { Route, Routes, Link, BrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";
import PostPage from "./PostPage";

const App = () => {
    const[filterCategory, setFilterCategory] = useState<string[]>([]);
    const[filterIncome, setFilterIncome] = useState<number | null>(null);


    return(
        <BrowserRouter basename={ process.env.NODE_ENV === "production" ? "/" : "/"}>
            <div>
                <nav>
                    <Link to = "/search"></Link>
                </nav>
                <Routes>
                    <Route 
                    path="/" 
                    element = {
                        <HomePage 
                            
                            filterCategory={filterCategory}
                            filterIncome={filterIncome}
                            setFilterCategory={setFilterCategory}
                            setFilterIncome={setFilterIncome}
                        />
                    } />                  
                    <Route 
                    path="/post" 
                    element = {<PostPage />}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;
                

    
