import "./footer.css";

import InfoIcon from '@mui/icons-material/Info';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <section className="sec_1">
            <div className="part_1">
              <h1>We're Always Here To Help</h1>
              <p>Reach out to us through any of these support channels</p>
            </div>
            <div className="part_2">
              <div className="box">
                <div className="icon">
                  <InfoIcon />
                </div>
                <div className="texts">
                  <p>
                    Customer happiness center
                  </p>
                  <p>
                    help.eshopapp.com
                  </p>
                </div>
              </div>
              <div className="box">
                <div className="icon">
                  <AlternateEmailIcon />
                </div>
                <div className="texts">
                  <p>
                    Email support
                  </p>
                  <p>
                    care@eshopapp.com
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </footer>
    </>
  );
}

export default Footer;
