import "../styles/app.css";
import { useEffect, useRef, useState } from "react";
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
      type: "Dog",
    },
    {
      id: 2,
      name: "Max",
      age: "3 mo",
      location: "Lahug",
      image: "/images/dog2.jpg",
      type: "Dog",
    },
    {
      id: 3,
      name: "Mochi",
      age: "1 year",
      location: "Guadalupe",
      image: "/images/dog3.jpg",
      type: "Dog",
    },
    {
      id: 4,
      name: "Buddy",
      age: "4 years",
      location: "Mandaue",
      image: "/images/dog4.jpg",
      type: "Dog",
    },
    {
      id: 5,
      name: "Nala",
      age: "8 mo",
      location: "Lapu-Lapu",
      image: "/images/dpg1.jpg",
      type: "Dog",
    },
  ];

  const stats = [
    { label: "Pets Available", value: "560+", icon: "🐾", subtext: "Adoptable" },
    { label: "Missing Pets Reunited", value: "200+", icon: "🔍", subtext: "Missing Pets" },
    { label: "Pets Successfully Adopted", value: "180+", icon: "❤️", subtext: "Successfully" },
  ];

  const steps = [
    { number: "1", icon: "🔍", title: "Find Your Pet", description: "Browse listings of available pets and use filters to find your match." },
    { number: "2", icon: "💬", title: "Connect with the Owner", description: "Chat directly with the pet owner to ask questions and discuss adoption details." },
    { number: "3", icon: "🏠", title: "Bring Your Pet Home", description: "Complete the adoption process and welcome your new furry friend." },
  ];

  const [selectedFilter, setSelectedFilter] = useState("All");
  const carouselRef = useRef(null);

  const partnerBrands = [
    "Pet Express", "Ayala Malls", "Cebu Pacific", "Philippine Airlines", "Chips Delight", "Krispy Kreme",
  ];

  const actionCards = [
    { title: "Donate", description: "Support rescue care, medical needs, and better shelter conditions for pets in need.", button: "Help save a life" },
    { title: "Adopt", description: "Find your next companion through PawHaven's trusted adoptable pet listings.", button: "Find your forever friend" },
    { title: "Sponsor", description: "Sponsor pets in our care and help provide ongoing support for rescues.", button: "Sponsor a rescue" },
  ];

  const visiblePets = selectedFilter === "All" ? pets : pets.filter((pet) => pet.type === selectedFilter);

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;
    const width = carouselRef.current.offsetWidth * 0.7;
    carouselRef.current.scrollBy({ left: direction * width, behavior: "smooth" });
  };

  const handleProtectedNavigation = (path) => {
    if (!isLoggedIn) { navigate("/login"); return; }
    navigate(path);
  };

  useEffect(() => {
    const fadeElements = document.querySelectorAll(".fade-section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
        });
      },
      { threshold: 0.15 }
    );
    fadeElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="petconnect-landing">

      {/* ── Hero — navy gradient, no image ── */}
      <section
        className="petconnect-hero hero-full fade-section"
        id="home"
        style={{
          background: "linear-gradient(180deg, rgba(30,58,110,0.95) 0%, rgba(15,37,70,0.98) 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <div className="hero-full-inner">
            <p className="hero-badge">Welcome to PawHaven</p>
            <h1 className="hero-title">Find Your New Best Friend in Cebu City</h1>
            <p className="hero-copy">
              Connecting pets with loving homes through safe adoption, missing pet alerts, and community support.
            </p>
            <button
              className="btn btn-primary hero-cta"
              onClick={() => handleProtectedNavigation("/adoption")}
            >
              Browse Adoptable Pets
            </button>
          </div>
        </div>
      </section>

      {/* ── Partner Strip ── */}
      <section className="partner-strip fade-section">
        <div className="container">
          <div className="partner-scroll">
            {partnerBrands.map((brand) => (
              <div className="partner-logo" key={brand}>{brand}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="petconnect-stats fade-section">
        <div className="container">
          {stats.map((stat) => (
            <div className="petconnect-stat-card" key={stat.label}>
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <h3>{stat.value}</h3>
                <p><strong>{stat.label.split(" ")[0]}</strong></p>
                <p className="stat-subtext">{stat.subtext}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Pets ── */}
      <section className="petconnect-featured fade-section">
        <div className="container">
          <div className="section-header">
            <span className="section-pill">Say Laban Sila!</span>
            <h2>Featured Pets</h2>
            <p>Discover pets waiting for a warm home today.</p>
          </div>

          <div className="pet-grid">
            {visiblePets.map((pet) => (
              <div className="petconnect-pet-card" key={pet.id}>
                <img src={pet.image} alt={pet.name} />
                <span className="pet-tag">Ready for Adoption</span>
                <div className="petconnect-pet-info">
                  <h3>{pet.name}</h3>
                  <p>{pet.age} · 📍 {pet.location}</p>
                  <button className="btn btn-secondary" onClick={() => handleProtectedNavigation("/pet")}>
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="filter-pill-group">
            <button className={`filter-btn ${selectedFilter === "All" ? "active" : ""}`} onClick={() => setSelectedFilter("All")}>All Pets</button>
            <button className={`filter-btn ${selectedFilter === "Dog" ? "active" : ""}`} onClick={() => setSelectedFilter("Dog")}>Dogs</button>
            <button className={`filter-btn ${selectedFilter === "Cat" ? "active" : ""}`} onClick={() => setSelectedFilter("Cat")}>Cats</button>
          </div>

          {visiblePets.length === 0 && (
            <div className="empty-carousel-message">No matching pets found. Try another filter.</div>
          )}
        </div>
      </section>

      {/* ── How PawHaven Helps ── */}
      <section className="petconnect-actions fade-section">
        <div className="container">
          <div className="section-header">
            <h2>How PawHaven Helps</h2>
            <p>Three simple ways to make a strong impact for rescue pets and families in Cebu City.</p>
          </div>
          <div className="action-cards">
            {actionCards.map((item, index) => (
              <div className="action-card" key={item.title}>
                <div className="action-icon">
                  {index === 0 ? "💝" : index === 1 ? "🏠" : "🤝"}
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <button className="btn btn-primary" onClick={() => handleProtectedNavigation("/adoption")}>
                  {item.button}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="petconnect-how-it-works fade-section">
        <div className="container">
          <h2>How It Works</h2>
          <p>Check out the steps to adopt a pet or report a missing pet in Cebu City.</p>
          <div className="petconnect-steps">
            {steps.map((step) => (
              <div className="step-item" key={step.number}>
                <span className="step-number">{step.number}</span>
                <div className="step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="petconnect-testimonials fade-section">
        <div className="container">
          <span className="section-label">TESTIMONIALS</span>
          <h2>Happy Tails from Cebu City</h2>
          <p>Families share how PawHaven helped reconnect them with a loving companion.</p>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <img className="author-avatar" src="/images/dog2.jpg" alt="Julia Santos" />
              <div className="testimonial-content">
                <div className="star-rating">★★★★★</div>
                <p>"Thanks to <strong>PawHaven</strong>, we found our beloved dog Max who went missing in Lahug. The community response was amazing!"</p>
                <div className="author-info">
                  <strong>Julia Santos</strong>
                  <span>📍 Lahug, Cebu City</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <img className="author-avatar" src="/images/dog4.jpg" alt="Carlos Dela Cruz" />
              <div className="testimonial-content">
                <div className="star-rating">★★★★★</div>
                <p>"Adopting a pet has never been easier! Buddy has brought so much joy to our home. Thank you PawHaven!!"</p>
                <div className="author-info">
                  <strong>Carlos Dela Cruz</strong>
                  <span>📍 Guadalupe, Cebu City</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <img className="author-avatar" src="/images/dog3.jpg" alt="Ana Lopez" />
              <div className="testimonial-content">
                <div className="star-rating">★★★★★</div>
                <p>"The whole PawHaven experience was thoughtful, safe, and heartwarming. Our new family member settled in beautifully."</p>
                <div className="author-info">
                  <strong>Ana Lopez</strong>
                  <span>📍 Cebu City</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Community ── */}
      <section className="petconnect-community fade-section">
        <div className="container">
          <div className="community-content">
            <div className="community-image">
              <img src="/images/dog1.jpg" alt="Community" />
            </div>
            <div className="community-text">
              <span className="community-pill">🐾 Join the Community</span>
              <h2>Join Our Caring Community!</h2>
              <p>PawHaven partners with trusted shelters and volunteers in Cebu City to help pets find loving homes and reunite missing pets with their families.</p>
              <ul className="community-list">
                <li>✅ Safe &amp; verified adoption listings</li>
                <li>✅ Community-driven missing pet alerts</li>
                <li>✅ Trusted by 500+ Cebu families</li>
              </ul>
              <div className="community-buttons">
                <button className="btn btn-primary" onClick={() => handleProtectedNavigation("/adoption")}>Adopt a Pet</button>
                <button className="btn btn-outline" onClick={() => handleProtectedNavigation("/missing")}>Report Missing Pet</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="petconnect-footer">
        <div className="footer-main container">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-icon">🐾</span>
              <div className="brand-info">
                <h3>PawHaven</h3>
                <p className="footer-tagline">Adopt. Care. Connect.</p>
              </div>
            </div>
            <p className="footer-description">
              PawHaven connects rescued pets with loving families across Cebu City. We work with trusted shelters, volunteers, and the community to make adoption safe and simple.
            </p>
            <div className="footer-social-row">
              <a href="#facebook" aria-label="Facebook">f</a>
              <a href="#twitter" aria-label="Twitter">𝕏</a>
              <a href="#instagram" aria-label="Instagram">📷</a>
            </div>
          </div>

          <div className="footer-column">
            <p className="footer-column-title">Explore</p>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#adoption">Adoption Listings</a></li>
              <li><a href="#missing">Missing Pets</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <p className="footer-column-title">Support</p>
            <ul>
              <li><a href="#guide">User Guide</a></li>
              <li><a href="#support">Contact Support</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#report">Report an Issue</a></li>
            </ul>
          </div>

          <div className="footer-column footer-contact">
            <p className="footer-column-title">Get in Touch</p>
            <ul className="contact-list">
              <li>📍 Cebu City, Philippines</li>
              <li>✉️ hello@pawhaven.ph</li>
              <li>📞 +63 912 345 6789</li>
            </ul>
            <span className="footer-badge">🐾 Proudly serving Cebu City</span>
            <div className="newsletter-form">
              <label htmlFor="newsletter-email">Get adoption updates</label>
              <div className="newsletter-input-row">
                <input id="newsletter-email" type="email" placeholder="Enter your email" />
                <button type="button">Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom container">
          <p>© 2025 PawHaven. All rights reserved. Made with 🐾 in Cebu City.</p>
          <div className="footer-bottom-links">
            <a href="#privacy">Privacy Policy</a>
            <span>·</span>
            <a href="#terms">Terms of Service</a>
            <span>·</span>
            <a href="#sitemap">Sitemap</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;