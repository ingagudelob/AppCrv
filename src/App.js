import LoginPage from './components/pages/logins/LoginPage.jsx'
import EmisoraProvider from './contexts/emisoraContext/EmisoraProvider.js';
import UserProvider from './contexts/users/UserProvider.js';
import AppRouter from './Routers/AppRouter';

function App() {
  return (
    <div>
      {/*<LoginPage/>*/}
      <UserProvider>
        <EmisoraProvider>
          <AppRouter/>
        </EmisoraProvider>
      </UserProvider>
    </div>

  );
}

export default App;
 