import React from "react";

function Hero() {
  return (
    <div>
      <section id="hero" className="d-flex flex-column justify-content-center align-items-center">
        <div className="hero-container" data-aos="fade-in">
          <h1>Selamat datang</h1>
          <p>
            <span className="typed" data-typed-items="Software Engineering"></span>
          </p>
          <div className="jumbotron">
            <h1 className="display-4">Chatbot pendaftaran E-KTP</h1>
            <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            <hr className="my-4" />
            <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
            <p className="lead">
              <a className="btn btn-primary btn-lg" href="/chat" role="button">
                Chatbot
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
