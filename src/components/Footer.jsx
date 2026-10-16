
function Footer() {
  return (
    <footer className="footer">
      <a href="#home" className="footer-logo">
        ML<span>.</span>
      </a>

      <p className="footer-description">
        Building creative digital experiences with design and technology.
      </p>

      <div className="footer-links">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#portfolio">Portfolio</a>
        <a href="#contact">Contact</a>
      </div>


<div className="footer-socials">
  <a
    href="https://www.linkedin.com/in/mohammed-lababneh-757b82199/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Visit my LinkedIn profile"
  >
    LinkedIn ↗
  </a>

  <a
    href="https://github.com/mohammad-lababneh0"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Visit my GitHub profile"
  >
    GitHub ↗
  </a>
</div>


      <div className="footer-divider"></div>

      <p className="footer-copyright">
        © {new Date().getFullYear()} Mohammad Lababneh. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
