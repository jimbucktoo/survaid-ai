import logo from "../assets/survaid.png";
import "../App.css";

function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          <img className="survaidLogoBrand" src={logo} alt="Survaid Logo" />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-link active" aria-current="page" href="/">
              Chat
            </a>
            <a class="nav-link" href="https://github.com/jimbucktoo/survaid-ai">
              Github
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
