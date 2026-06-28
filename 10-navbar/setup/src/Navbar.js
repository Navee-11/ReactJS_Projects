import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaTwitter } from "react-icons/fa";
import { links, social } from "./data";
import logo from "./logo.svg";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksRef = useRef(null);
  const linksContainerRef = useRef(null);

  useEffect(() => {
    if (showLinks) {
      const linksHeight = linksRef.current.getBoundingClientRect().height;
      linksContainerRef.current.style.height = `${linksHeight}px`;
    }
    console.log("re-render");
  }, [showLinks]);
  return (
    <nav>
      <div className="nav-black">
        <div className="nav-header">
          <img src={logo} alt="" />
          <button
            className="nav-toggle"
            onClick={() => setShowLinks(!showLinks)}
          >
            <FaBars />
          </button>
        </div>
        {showLinks && (
          // <div className="links-container show-container">
          <div className="links-container" ref={linksContainerRef}>
            {/* Using useRef because the last link in the .links container was missing as the height of the div is 10rem so we fetch the height of the links and then assign this height to the .links container  */}
            <ul className="links" ref={linksRef}>
              {links.map((link) => {
                return (
                  <li key={link.id}>
                    <a href="#">{link.text}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <ul className="social-icons">
          {social.map((item) => {
            return (
              <li key={item.id}>
                <a href={item.url}>{item.icon}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
