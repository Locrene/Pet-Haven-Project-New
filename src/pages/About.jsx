function About() {
  const team = [
    { name: "Maria Santos",    role: "Founder & CEO",        emoji: "👩‍💼" },
    { name: "Juan dela Cruz",  role: "Lead Developer",       emoji: "👨‍💻" },
    { name: "Ana Reyes",       role: "Community Manager",    emoji: "👩‍🤝‍👩" },
    { name: "Carlo Mendoza",   role: "Veterinary Advisor",   emoji: "🐾" },
  ];

  const values = [
    { icon: "❤️", title: "Compassion",   desc: "Every pet deserves a safe and loving home." },
    { icon: "🤝", title: "Community",    desc: "We build bridges between pets and caring families." },
    { icon: "🔒", title: "Trust",        desc: "All listings are verified for your peace of mind." },
    { icon: "🌱", title: "Impact",       desc: "Every adoption creates a ripple of positive change." },
  ];

  return (
    <div style={s.page}>

      {/* Hero */}
      <div style={s.hero}>
        <p style={s.heroEyebrow}>About PawHaven</p>
        <h1 style={s.heroTitle}>Connecting Pets with Loving Homes in Cebu City</h1>
        <p style={s.heroSub}>
          PawHaven is a community-driven platform built to make pet adoption safe,
          simple, and accessible for every family in Cebu City.
        </p>
      </div>

      <div style={s.container}>

        {/* Mission */}
        <div style={s.section}>
          <div style={s.sectionLabel}>Our Mission</div>
          <h2 style={s.sectionTitle}>Why PawHaven Exists</h2>
          <p style={s.sectionText}>
            Thousands of pets in Cebu City are waiting for their forever homes. PawHaven
            was created to bridge the gap between animals in need and families ready to
            open their hearts. We believe every pet deserves love — and every family
            deserves the joy a companion brings.
          </p>
        </div>

        {/* Values */}
        <div style={s.valuesGrid}>
          {values.map((v) => (
            <div key={v.title} style={s.valueCard}>
              <span style={s.valueIcon}>{v.icon}</span>
              <h3 style={s.valueTitle}>{v.title}</h3>
              <p style={s.valueDesc}>{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={s.statsRow}>
          {[
            { value: "560+", label: "Pets Available" },
            { value: "200+", label: "Missing Pets Reunited" },
            { value: "180+", label: "Successful Adoptions" },
            { value: "500+", label: "Cebu Families Served" },
          ].map((stat) => (
            <div key={stat.label} style={s.statItem}>
              <strong style={s.statValue}>{stat.value}</strong>
              <p style={s.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Team */}
        <div style={s.section}>
          <div style={s.sectionLabel}>The Team</div>
          <h2 style={s.sectionTitle}>People Behind PawHaven</h2>
          <div style={s.teamGrid}>
            {team.map((member) => (
              <div key={member.name} style={s.teamCard}>
                <div style={s.teamAvatar}>{member.emoji}</div>
                <h3 style={s.teamName}>{member.name}</h3>
                <p style={s.teamRole}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={s.cta}>
          <h2 style={s.ctaTitle}>Ready to Make a Difference?</h2>
          <p style={s.ctaSub}>Join hundreds of Cebu families who have already found their perfect companion.</p>
          <div style={s.ctaButtons}>
            <a href="/adoption" style={s.ctaPrimary}>Browse Adoptable Pets</a>
            <a href="/missing"  style={s.ctaOutline}>Report a Missing Pet</a>
          </div>
        </div>

      </div>
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", background: "#f4f6fb", fontFamily: "'Poppins', sans-serif" },

  hero: {
    background: "linear-gradient(135deg, #1e3a6e 0%, #0f2546 100%)",
    padding: "72px 24px",
    textAlign: "center",
    color: "white",
  },
  heroEyebrow: { margin: "0 0 12px", fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.6)" },
  heroTitle: { margin: "0 auto 16px", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, maxWidth: 640, lineHeight: 1.25 },
  heroSub: { margin: "0 auto", fontSize: 16, color: "rgba(255,255,255,0.75)", maxWidth: 560, lineHeight: 1.7 },

  container: { maxWidth: 1000, margin: "0 auto", padding: "48px 24px", display: "flex", flexDirection: "column", gap: 48 },

  section: {},
  sectionLabel: { fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#f97316", marginBottom: 8 },
  sectionTitle: { margin: "0 0 16px", fontSize: 26, fontWeight: 800, color: "#0f172a" },
  sectionText: { fontSize: 15, color: "#475569", lineHeight: 1.8, maxWidth: 680 },

  valuesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 20 },
  valueCard: {
    background: "white",
    borderRadius: 16,
    padding: "28px 24px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    textAlign: "center",
  },
  valueIcon:  { fontSize: 36 },
  valueTitle: { margin: "12px 0 8px", fontSize: 16, fontWeight: 700, color: "#0f172a" },
  valueDesc:  { margin: 0, fontSize: 13, color: "#64748b", lineHeight: 1.6 },

  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: 0,
    background: "linear-gradient(135deg, #1e3a6e 0%, #0f2546 100%)",
    borderRadius: 20,
    overflow: "hidden",
    boxShadow: "0 8px 24px rgba(30,58,110,0.2)",
  },
  statItem: { padding: "32px 24px", textAlign: "center", borderRight: "1px solid rgba(255,255,255,0.1)" },
  statValue: { display: "block", fontSize: 34, fontWeight: 800, color: "white" },
  statLabel: { margin: "6px 0 0", fontSize: 13, color: "rgba(255,255,255,0.65)" },

  teamGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 20, marginTop: 24 },
  teamCard: {
    background: "white",
    borderRadius: 16,
    padding: "32px 20px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  teamAvatar: { fontSize: 48, marginBottom: 12 },
  teamName: { margin: "0 0 6px", fontSize: 15, fontWeight: 700, color: "#0f172a" },
  teamRole: { margin: 0, fontSize: 13, color: "#64748b" },

  cta: {
    background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
    borderRadius: 20,
    padding: "48px 36px",
    textAlign: "center",
    boxShadow: "0 8px 24px rgba(249,115,22,0.25)",
  },
  ctaTitle:   { margin: "0 0 12px", fontSize: 26, fontWeight: 800, color: "white" },
  ctaSub:     { margin: "0 0 28px", fontSize: 15, color: "rgba(255,255,255,0.85)" },
  ctaButtons: { display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" },
  ctaPrimary: {
    padding: "13px 28px",
    background: "white",
    color: "#ea580c",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 700,
    textDecoration: "none",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
  ctaOutline: {
    padding: "13px 28px",
    background: "transparent",
    color: "white",
    border: "2px solid rgba(255,255,255,0.6)",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 700,
    textDecoration: "none",
  },
};

export default About;
