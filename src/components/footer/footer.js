import "./footer.css";

import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <section className="sec_1">
            <h1>E-Shop</h1>
            <p>Your one-stop shop for all your needs</p>
          </section>

          <section className="sec_2">
            <div className="footer-links">
              <div className="link-group">
                <h3>About Us</h3>
                <ul>
                  <li>About EShop</li>
                  <li>Careers</li>
                  <li>Press</li>
                  <li>Blog</li>
                </ul>
              </div>

              <div className="link-group">
                <h3>Customer Service</h3>
                <ul>
                  <li>Contact Us</li>
                  <li>Shipping Info</li>
                  <li>Returns</li>
                  <li>FAQ</li>
                </ul>
              </div>

              <div className="link-group">
                <h3>Legal</h3>
                <ul>
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                  <li>Cookie Policy</li>
                  <li>Accessibility</li>
                </ul>
              </div>

              <div className="link-group">
                <h3>Quick Links</h3>
                <ul>
                  <li>My Account</li>
                  <li>Wishlist</li>
                  <li>Track Order</li>
                  <li>Gift Cards</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="sec_3">
            <div className="social-links">
              <h3>Follow Us</h3>
              <div className="social-icons">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookIcon />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <XIcon />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon />
                </a>
              </div>
            </div>
          </section>
        </div>
      </footer>
      <div className="copyright">
        <p>&copy; {new Date().getFullYear()} EShop. All rights reserved.</p>
      </div>
    </>
  );
}

export default Footer;
