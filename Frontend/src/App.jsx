import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes/AppRoutes.jsx';
import DefaultLayout from './layout/DefaultLayout';
import NotFound from './pages/NotFound/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

function App() {
    return (
        <Router>
            <div className="app">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        return <Route key={index} path={route.path} element={<Page />} />;
                    })}
                    {privateRoutes.map((route, index) => {
                        const Layout = route.layout;
                        const Page = route.component;
                        return <Route key={index} path={route.path} element={<Layout children={<Page />} />} />;
                    })}
                    <Route path="*" element={<DefaultLayout children={<NotFound />} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
