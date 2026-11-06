import type { MouseEvent } from "react";
import { SOCIAL_LINKS } from "../data/menu";

const preventNav = (e: MouseEvent<HTMLAnchorElement>) => e.preventDefault();

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col4">
            <div className="footer-desc">
              <h3>Wekidiくん</h3>
              <p>Wekidiくん Adalah Restoran Yang Paling Enak Di Isekai</p>
            </div>
          </div>
          <div className="col4">
            <h3>Need Help?</h3>
            <ul>
              <li><a href="#" onClick={preventNav}>Franchise</a></li>
              <li><a href="#" onClick={preventNav}>Partnership</a></li>
              <li><a href="#" onClick={preventNav}>Contact</a></li>
            </ul>
          </div>
          <div className="col4">
            <h3>Follow Us On:</h3>
            <div className="social-links">
              {SOCIAL_LINKS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                  <img src={s.icon} alt="" height={32} width={32} loading="lazy" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
