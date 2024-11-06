import { useState } from "react";
import {BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./HomePage";
import PostPage from "./PostPage";

const App = () => {
    const[filterCategory, setFilterCategory] = useState<string[]>([]);
    const[filterIncome, setFilterIncome] = useState<number | null>(null);


    return(
        <Router>
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
        </Router>
    )
}

export default App;
                

    
