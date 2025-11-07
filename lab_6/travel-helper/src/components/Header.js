function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">Travel Helper</div>
        <nav className="nav">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Catalog</a></li>
            <li><a href="#">Cart</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
