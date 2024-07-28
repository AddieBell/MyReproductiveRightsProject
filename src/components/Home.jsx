import uterus from "../assets/3.png";
import hand from "../assets/4.png";

const Home = () => {
  return (
    <div className="Home container-fluid">
      <section className="middle-row row align-items-center">
        <div className="col-12 col-md-6 text-center text-md-left mb-3 mb-md-0">
          <img src={uterus} alt="Uterus Logo" className="img-fluid" />
        </div>
        <div className="col-12 col-md-6 text-center text-md-right">
          <h1 className="display-7">
            KNOW
            <br />
            YOUR
            <br />
            RIGHTS
          </h1>
        </div>
      </section>
      <section className="bottom-row row align-items-center">
        <div className="col-12 col-md-4 text-center text-md-left mb-3 mb-md-0">
          {/* <h2>Where Your Journey Matters</h2> */}
          <h2 display-6>Where Your Journey Matters</h2>
        </div>
        <div className="col-12 col-md-4 text-center">
          <img src={hand} alt="Image of hand" className="img-fluid" />
        </div>
        <div className="col-12 col-md-4 text-center text-md-right">
          <p className="lead">
            Welcome to our website, your comprehensive resource for exploring
            reproductive rights, access to healthcare, and services tailored to
            each state&apos;s regulations.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
