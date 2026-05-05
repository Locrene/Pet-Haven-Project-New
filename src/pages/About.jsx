import { Link } from "react-router-dom";
import "../styles/app.css";

function About() {
  return (
    <div className="about-page">
      <section
        className="about-hero"
        style={{
          backgroundImage: "linear-gradient(180deg, rgba(30, 58, 110, 0.95) 0%, rgba(30, 58, 110, 0.78) 100%), url('/images/bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="container about-hero-inner">
          <div className="about-hero-copy">
            <span className="hero-badge">About PawHaven</span>
            <h1>About PawHaven</h1>
            <p>Born in Cebu City. Built for every pet that deserves a home.</p>
          </div>
        </div>
      </section>

      <section className="about-story section-block">
        <div className="container about-grid about-story-grid">
          <div className="about-text">
            <h2>Our Story</h2>
            <p>
              PawHaven started in 2022 when a group of animal lovers in Cebu City noticed how hard it
              was to connect rescued pets with caring families. We built this platform to make adoption
              simple, safe, and community-driven — so no pet has to wait too long for a loving home.
            </p>
          </div>
          <div className="about-photo-card">
            <img src="/images/default.jpg" alt="PawHaven volunteers and pets" />
          </div>
        </div>
      </section>

      <section className="mission-vision section-block">
        <div className="container about-grid mission-vision-grid">
          <div className="info-card">
            <h3>Our Mission</h3>
            <p>
              To connect every rescued pet in Cebu City with a safe, loving home through trusted adoption
              listings and community support.
            </p>
          </div>
          <div className="info-card">
            <h3>Our Vision</h3>
            <p>
              A Cebu City where no pet goes homeless and every family that wants a companion can find one easily.
            </p>
          </div>
        </div>
      </section>

      <section className="about-values section-block">
        <div className="container">
          <div className="section-header">
            <h2>Our Values</h2>
            <p>What drives every PawHaven action, from adoption to community support.</p>
          </div>
          <div className="about-grid values-grid">
            <div className="value-card">
              <div className="value-icon">🐾</div>
              <h4>Compassion</h4>
              <p>Every pet deserves kindness and dignity.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h4>Community</h4>
              <p>We work together with shelters, volunteers, and families.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🔒</div>
              <h4>Trust</h4>
              <p>Safe, verified listings and transparent adoption processes.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="meet-team section-block">
        <div className="container">
          <div className="section-header">
            <h2>Meet the Team</h2>
            <p>Experts and volunteers working together for Cebu City’s pets.</p>
          </div>
          <div className="about-grid team-grid">
            <div className="team-card">
              <div className="team-avatar">MS</div>
              <h4>Maria Santos</h4>
              <p>Founder & CEO</p>
              <p>Animal rescue advocate with 10 years of shelter experience in Cebu.</p>
            </div>
            <div className="team-card">
              <div className="team-avatar">CR</div>
              <h4>Carlo Reyes</h4>
              <p>Tech Lead</p>
              <p>Built PawHaven's platform to make pet adoption accessible to everyone.</p>
            </div>
            <div className="team-card">
              <div className="team-avatar">AD</div>
              <h4>Ana Dela Cruz</h4>
              <p>Community Manager</p>
              <p>Coordinates with local shelters and volunteers across Cebu City.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-strip section-block">
        <div className="container stats-banner">
          <div className="stat-item">
            <div className="stat-icon">🐾</div>
            <div>
              <h3>560+</h3>
              <p>Adoptable Pets</p>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">🔍</div>
            <div>
              <h3>200+</h3>
              <p>Missing Reports</p>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">❤️</div>
            <div>
              <h3>180+</h3>
              <p>Successful Adoptions</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-cta section-block">
        <div className="container about-cta-card">
          <h2>Want to Help?</h2>
          <div className="community-buttons">
            <Link to="/adoption" className="btn btn-primary">Adopt a Pet</Link>
            <Link to="/register" className="btn btn-outline">Volunteer with Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
