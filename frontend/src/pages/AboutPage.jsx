import React from 'react';
import Navbar from '../components/Navbar';
import '../global.css';

const AboutPage = () => (
  <>
    <Navbar />
    <div className="about-bg">
      <section className="about-section">
        <h1 className="about-title">About CauseHive</h1>
        <p className="about-lead">
          CauseHive is a global platform dedicated to connecting donors, volunteers, and organizations to make a real impact in communities around the world. Our mission is to empower everyone to support causes they care about, track their impact, and inspire others to join the movement.
        </p>
        <div className="about-row">
          <div className="about-block">
            <h2>Our Mission</h2>
            <p>To make giving easy, transparent, and impactful for everyone, everywhere.</p>
          </div>
          <div className="about-block">
            <h2>Our Vision</h2>
            <p>A world where every person can make a difference, and every cause can find support.</p>
          </div>
          <div className="about-block">
            <h2>Our Values</h2>
            <ul>
              <li>Transparency</li>
              <li>Community</li>
              <li>Empowerment</li>
              <li>Impact</li>
            </ul>
          </div>
        </div>
        <div className="about-impact">
          <h2>Our Impact</h2>
          <div className="about-impact-stats">
            <div>
              <h3>12,000+</h3>
              <span>Donors</span>
            </div>
            <div>
              <h3>350+</h3>
              <span>Projects Funded</span>
            </div>
            <div>
              <h3>40</h3>
              <span>Countries Reached</span>
            </div>
            <div>
              <h3>1M+</h3>
              <span>Lives Impacted</span>
            </div>
          </div>
        </div>
        <div className="about-story">
          <h2>Our Story</h2>
          <p>
            Founded in 2025, CauseHive started as a small group of friends passionate about making a difference. Today, we help thousands of donors and volunteers connect with projects that matter most to them. Our journey is one of hope, innovation, and community.
          </p>
        </div>
        <div className="about-how">
          <h2>How It Works</h2>
          <ul>
            <li>Browse and discover verified projects in need of support</li>
            <li>Donate securely and track your contributions</li>
            <li>Share your impact and inspire others</li>
            <li>Connect with a community of changemakers</li>
          </ul>
        </div>
        <div className="about-testimonials">
          <h2>What People Say</h2>
          <div className="about-testimonial-row">
            <div className="about-testimonial">
              <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Testimonial" />
              <blockquote>"CauseHive made it so easy to support a project I care about. I could see the impact of my donation instantly!"</blockquote>
              <span>- Maria, Donor</span>
            </div>
            <div className="about-testimonial">
              <img src="https://randomuser.me/api/portraits/men/77.jpg" alt="Testimonial" />
              <blockquote>"As an organizer, I found more volunteers and donors than ever before. The platform is beautiful and simple."</blockquote>
              <span>- David, Organizer</span>
            </div>
            <div className="about-testimonial">
              <img src="https://randomuser.me/api/portraits/women/12.jpg" alt="Testimonial" />
              <blockquote>"I love the community and the stories. Volunteering through CauseHive changed my life."</blockquote>
              <span>- Aisha, Volunteer</span>
            </div>
          </div>
        </div>
        <div className="about-partners">
          <h2>Our Partners</h2>
          <div className="about-partner-logos">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/UNICEF_Logo.png" alt="UNICEF" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/Red_Cross_Logo.png" alt="Red Cross" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2b/WWF_logo.svg" alt="WWF" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Doctors_Without_Borders_logo.svg" alt="Doctors Without Borders" />
          </div>
        </div>
        <div className="about-team">
          <h2>Meet the Team</h2>
          <div className="about-team-row">
            <div className="about-team-member">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Alex" />
              <div>Alex Kim<br /><span>Founder</span></div>
            </div>
            <div className="about-team-member">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Priya" />
              <div>Priya Patel<br /><span>Community Lead</span></div>
            </div>
            <div className="about-team-member">
              <img src="https://randomuser.me/api/portraits/men/65.jpg" alt="Sam" />
              <div>Sam Lee<br /><span>Tech Lead</span></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </>
);

export default AboutPage;
