import uterus from "../assets/3.png";
import hand from "../assets/4.png";

const Home = () => {
  return (
    <div className="Home">
      <header className="header">
        <h1>KNOW YOUR RIGHTS</h1>
        <div className="main-content">
          <p>
            Welcome to our website, your comprehensive resource for exploring
            reproductive rights, access to healthcare, and services tailored to
            each state's regulations.
          </p>
        </div>
        <h2>Where Your Journey Matters</h2>
        <div className="image-container">
          <img src={uterus} alt="Uterus Logo" className="image" />
          <img src={hand} alt="Image of hand" className="image" />
        </div>
      </header>
    </div>
  );
};
export default Home;
