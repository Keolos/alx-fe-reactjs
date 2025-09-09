import UserDetails from './UserDetails';
import UserInfo from './UserInfo';
import ProfilePage from './ProfilePage';
import UserContext from './UserContext';

function App() {
  const userData = { name: "Jane Doe", email: "jane.doe@example.com" };

  return (
    <UserContext.Provider value={userData}>
      <ProfilePage />
      <UserContext.Consumer>
        {() => (
          <>
            <UserDetails />
            <UserInfo />
          </>
        )}
      </UserContext.Consumer>
    </UserContext.Provider>
  );
}

export default App;
