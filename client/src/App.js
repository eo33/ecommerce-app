import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./components/LoginPage/LoginPage";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="min-vh-100">
          <Navbar />
          <LoginPage />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
