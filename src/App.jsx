import { Route, Routes } from 'react-router-dom';
import { TestPage, UserPage } from './pages';
import { AppFooter, AppHeader } from './components';
import { USER_ROUTE } from './pages/user/constants/routes-path/userRoute.constant';
import './App.css';

function App() {
  return (
    <>
      <AppHeader />
      <Routes>
        <Route
          path='/test'
          element={<TestPage />}
        />
        <Route
          path='/user'
          element={<UserPage />}
        >
          {USER_ROUTE.map((route, idx) => {
            return (
              <Route
                key={idx}
                index={route.index}
                path={route.path}
                element={<route.element className={route.className} />}
              />
            );
          })}
        </Route>
      </Routes>
      <AppFooter />
    </>
  );
}

export default App;
