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
    },
    {
      label: "Missing Pets Reunited",
      value: "200+",
      icon: "🔍",
    },
    {
      label: "Pets Successfully Adopted",
      value: "180+",
      icon: "❤️",
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
              <p>{stat.label}</p>
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
    },
    {
      label: "Missing Pets Reunited",
      value: "200+",
      icon: "🔍",
    },
    {
      label: "Pets Successfully Adopted",
      value: "180+",
      icon: "❤️",
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
      <section className="hero-section">
        <div className="hero-copy">
          <span className="hero-badge">Cebu’s trusted pet adoption network</span>
          <h1>Find your next companion with confidence and care.</h1>
          <p>
            PawHaven connects adopters, rescuers, and families through trusted profiles,
            secure messaging, and community support.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => handleProtectedNavigation("/adoption")}>Browse Pets</button>
            <button className="btn btn-outline" onClick={() => handleProtectedNavigation("/missing")}>Report Missing</button>
          </div>

          <div className="hero-highlights">
            <div>
              <strong>Verified Listings</strong>
              <p>Every pet profile is reviewed by our team.</p>
            </div>
            <div>
              <strong>Secure Messaging</strong>
              <p>Talk safely with adopters and pet owners.</p>
            </div>
            <div>
              <strong>Local Support</strong>
              <p>Find pets and reunite owners within Cebu City.</p>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card">
            <img src="/images/dog1.jpg" alt="Featured pet" />
            <div className="hero-card-info">
              <span className="pet-tag">Available</span>
              <h3>Luna</h3>
              <p>Golden Retriever · 2 years · Cebu City</p>
              <p className="hero-card-copy">
                Friendly, gentle, and ready to become a loving family member.
              </p>
              <button className="btn btn-outline" onClick={() => handleProtectedNavigation("/adoption")}>Meet More Pets</button>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <h2>{stat.value}</h2>
            <h4>{stat.label}</h4>
            <p>{stat.description}</p>
          </div>
        ))}
      </section>

      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Pets</h2>
          <p>Handpicked profiles of pets ready to join their forever homes.</p>
        </div>

        <div className="pet-grid">
          {highlightPets.map((pet) => (
            <div className="pet-card" key={pet.id}>
              <img src={pet.image} alt={pet.name} />
              <div className="pet-info">
                <h3>{pet.name}</h3>
                <div className="pet-details">
                  <span>{pet.age}</span>
                  <span>{pet.location}</span>
                </div>
                <button onClick={() => handleProtectedNavigation("/pet")}>View Details</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="steps-section">
        <div className="section-header">
          <h2>How PawHaven Works</h2>
          <p>Adopt, track, and communicate through one trusted local platform.</p>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <span className="step-number">1</span>
            <h3>Browse available pets</h3>
            <p>Filter by location, breed, and adoption status to find a pet that fits your lifestyle.</p>
          </div>
          <div className="step-card">
            <span className="step-number">2</span>
            <h3>Start a safe conversation</h3>
            <p>Use secure messaging to ask questions, meet the owner, and discuss adoption details.</p>
          </div>
          <div className="step-card">
            <span className="step-number">3</span>
            <h3>Bring home your new family member</h3>
            <p>Finalize the adoption and celebrate a successful match with your new companion.</p>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="section-header">
          <h2>Real success stories</h2>
          <p>Hear from families who found their pets through PawHaven.</p>
        </div>

        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p>
              “PawHaven helped us find our dog Maya in just a few days. The adoption process was easy and the support team was amazing.”
            </p>
            <span>Anna / Adoptive parent</span>
          </div>
          <div className="testimonial-card">
            <p>
              “I reported our missing cat and the community started sharing the post right away. We got her back safely.”
            </p>
            <span>Joey / Cebu City</span>
          </div>
          <div className="testimonial-card">
            <p>
              “The pet profiles are clear and the messaging system made it safe to meet the owner and arrange pickup.”
            </p>
            <span>May / Mandaue</span>
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="service-box">
          <h3>Easy Pet Adoption Listings</h3>
          <p>Post your pets for adoption quickly and easily.</p>
        </div>

        <div className="service-box">
          <h3>Report Missing Pets</h3>
          <p>Alert your community and find your missing pet fast.</p>
        </div>

        <div className="service-box">
          <h3>Secure In-App Messaging</h3>
          <p>Chat safely with pet adopters right inside the platform.</p>
        </div>
      </section>

      <section className="about-section">
        <div className="about-container">
          <div className="about-header">
            <h2>About PawHaven</h2>
            <p>Connecting pets with loving families since 2023</p>
          </div>

          <div className="about-grid">
            <div className="about-image">
              <img src="/images/dog1.jpg" alt="Happy pets at PawHaven" />
            </div>

            <div className="about-content">
              <div className="about-mission">
                <h3>Our Mission</h3>
                <p>
                  To create a compassionate community where every pet finds their forever home
                  and every family discovers their perfect companion. We believe that pets are
                  family members, not just animals.
                </p>
              </div>

              <div className="about-values">
                <h3>Our Values</h3>
                <div className="values-grid">
                  <div className="value-item">
                    <h4>🐾 Compassion</h4>
                    <p>Every pet deserves love and care</p>
                  </div>
                  <div className="value-item">
                    <h4>🤝 Trust</h4>
                    <p>Verified listings and secure communication</p>
                  </div>
                  <div className="value-item">
                    <h4>🌟 Community</h4>
                    <p>Supporting local rescues and pet lovers</p>
                  </div>
                </div>
              </div>

              <div className="about-stats">
                <div className="stat-item">
                  <strong>1,200+</strong>
                  <span>Pets Adopted</span>
                </div>
                <div className="stat-item">
                  <strong>320+</strong>
                  <span>Active Listings</span>
                </div>
                <div className="stat-item">
                  <strong>150+</strong>
                  <span>Community Partners</span>
                </div>
              </div>
            </div>
          </div>

          <div className="about-cta">
            <h3>Ready to make a difference?</h3>
            <p>Join our community of pet lovers and help us create a better world for animals.</p>
            <div className="cta-buttons">
              <button className="btn btn-primary" onClick={() => handleProtectedNavigation("/adoption")}>Browse Pets</button>
              <button className="btn btn-outline" onClick={() => handleProtectedNavigation("/missing")}>Report Missing Pet</button>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-icon">🐾</span>
              <div className="brand-text">
                <h3>PawHaven</h3>
                <p>Adopt. Care. Connect.</p>
              </div>
            </div>
            <p className="footer-description">
              Cebu City's trusted pet adoption platform, connecting loving families with pets in need.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#adoption">Browse Pets</a></li>
                <li><a href="#missing">Report Missing</a></li>
                <li><a href="#messages">Messages</a></li>
                <li><a href="#dashboard">Dashboard</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li><a href="#help">Help Center</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#safety">Safety Tips</a></li>
                <li><a href="#guidelines">Community Guidelines</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Contact Us</h4>
              <div className="contact-info">
                <p>📧 hello@pawhaven.ph</p>
                <p>📱 +63 32 123 4567</p>
                <p>📍 Cebu City, Philippines</p>
                <p>🕒 Mon-Fri: 9AM-6PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 PawHaven. All rights reserved. Made with ❤️ for pets and their families.</p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;