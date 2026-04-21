import "../styles/app.css";
import { useNavigate } from "react-router-dom";

function Landing({ isLoggedIn, userName }) {
  const navigate = useNavigate();

  const pets = [
    {
      id: 1,
      name: "Luna",
      age: "2 years",
      location: "Cebu City",
      image: "/images/dog1.jpg",
    },
    {
      id: 2,
      name: "Max",
      age: "3 mo",
      location: "Lahug",
      image: "/images/dog2.jpg",
    },
    {
      id: 3,
      name: "Mochi",
      age: "1 year",
      location: "Guadalupe",
      image: "/images/dog3.jpg",
    },
    {
      id: 4,
      name: "Buddy",
      age: "4 years",
      location: "Mandaue",
      image: "/images/dog4.jpg",
    },
  ];

  const stats = [
    {
      label: "Pets Available",
      value: "560+",
      icon: "🐾",
      subtext: "Adoptable"
    },
    {
      label: "Missing Pets Reunited",
      value: "200+",
      icon: "🔍",
      subtext: "Missing Pets"
    },
    {
      label: "Pets Successfully Adopted",
      value: "180+",
      icon: "❤️",
      subtext: "Successfully"
    },
  ];

  const handleProtectedNavigation = (path) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    navigate(path);
  };

  return (
    <div className="petconnect-landing">
      {/* Hero Section */}
      <section className="petconnect-hero">
        <div className="petconnect-hero-content">
          <h1>Find Your New Best<br />Friend in Cebu City!</h1>
          <p>Connecting pets with loving homes in Cebu City.</p>
          
          <div className="petconnect-search">
            <input type="text" placeholder="Search Pet Listings..." />
            <button className="btn btn-primary">Search Pet Listings</button>
          </div>
        </div>

        <div className="petconnect-hero-image">
          <img src="/images/dog1.jpg" alt="Happy dog" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="petconnect-stats">
        {stats.map((stat) => (
          <div className="petconnect-stat-card" key={stat.label}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <h3>{stat.value}</h3>
              <p><strong>{stat.label.split(' ')[0]}</strong></p>
              <p className="stat-subtext">{stat.subtext}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Featured Pets Section */}
      <section className="petconnect-featured">
        <h2>Featured Pets • Say Laban Sila!</h2>

        <div className="petconnect-pet-grid">
          {pets.map((pet) => (
            <div className="petconnect-pet-card" key={pet.id}>
              <img src={pet.image} alt={pet.name} />
              <div className="petconnect-pet-info">
                <h3>{pet.name}</h3>
                <p>{pet.age} • 📍 {pet.location}</p>
                <button className="btn btn-secondary" onClick={() => handleProtectedNavigation("/pet")}>View Details</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="petconnect-features">
        <div className="feature-item">
          <div className="feature-icon">👤</div>
          <h3>Easy Pet Adoption Listings</h3>
          <p>Post your pets for adoption quickly and easily.</p>
        </div>

        <div className="feature-item">
          <div className="feature-icon">📣</div>
          <h3>Report Missing Pets</h3>
          <p>Alert your community and find your missing pet fast.</p>
        </div>

        <div className="feature-item">
          <div className="feature-icon">💬</div>
          <h3>Secure In-App Messaging</h3>
          <p>Chat safely with pet adopters right inside the platform.</p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="petconnect-how-it-works">
        <h2>How It Works</h2>
        <p>Check out the steps to adopt a pet or report a missing pet in Cebu City.</p>

        <div className="petconnect-steps">
          <div className="step-item">
            <div className="step-icon">🔍</div>
            <h3>Find Your Pet</h3>
            <p>Browse listings of available pets and use filters to find your match.</p>
          </div>
          <div className="step-item">
            <div className="step-icon">💬</div>
            <h3>Connect with the Owner</h3>
            <p>Chat directly with the pet owner to ask questions and discuss adoption details.</p>
          </div>
          <div className="step-item">
            <div className="step-icon">🏠</div>
            <h3>Bring Your Pet Home</h3>
            <p>Complete the adoption process and welcome your new furry friend.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="petconnect-testimonials">
        <h2>Happy Tails from Cebu City</h2>

        <div className="petconnect-testimonial-grid">
          <div className="testimonial-box">
            <p>
              "Thanks to <strong>PetConnect</strong>, we found our beloved dog Max who went missing in Lahug. The community response was amazing!"
            </p>
            <div className="testimonial-author">
              <img src="/images/dog2.jpg" alt="Julia Santos" />
              <div className="author-info">
                <strong>Julia Santos</strong>
                <p>📍 Lahug, Cebu City</p>
              </div>
            </div>
          </div>

          <div className="testimonial-box">
            <p>
              "Adopting a pet has never been easier! Buddy has brought so much joy to our home. Thank you PetConnect!!"
            </p>
            <div className="testimonial-author">
              <img src="/images/dog4.jpg" alt="Carlos Dela Cruz" />
              <div className="author-info">
                <strong>Carlos Dela Cruz</strong>
                <p>📍 Guadalupe, Cebu City</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="petconnect-community">
        <h2>Join Our Caring Community!</h2>
        <p>PetConnect partners with trusted shelters and volunteers in Cebu City to help pets find loving homes and to reunite missing pets with their families.</p>

        <div className="community-map">
          <img src="/images/dog1.jpg" alt="Community map" />
        </div>

        <div className="community-buttons">
          <button className="btn btn-primary" onClick={() => handleProtectedNavigation("/adoption")}>Adopt a Pet</button>
          <button className="btn btn-outline" onClick={() => handleProtectedNavigation("/missing")}>Report Missing Pet</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="petconnect-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-icon">🐾</span>
            <div className="brand-info">
              <h3>PetConnect</h3>
              <p>Cebu City Pet Adoption</p>
            </div>
            <p className="copyright">© 2024 PetConnect.<br />All rights reserved.</p>
          </div>

          <div className="footer-links">
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#adoption">Adoption Listings</a></li>
                <li><a href="#missing">Missing Pets</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Help & Support</h4>
              <ul>
                <li><a href="#guide">User Guide</a></li>
                <li><a href="#support">Contact Support</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Privacy Policy</h4>
              <ul>
                <li><a href="#privacy">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-social">
            <a href="#facebook">f</a>
            <a href="#twitter">𝕏</a>
            <a href="#instagram">📷</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
