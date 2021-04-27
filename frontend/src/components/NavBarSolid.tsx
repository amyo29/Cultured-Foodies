import { useState } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "../styles/NavBarSolid.css";

function NavBarSolid() {
  const [searchQuery, setSearchQuery] = useState("");
  const history = useHistory();
  let handleSearchQuery = (event: any) => {
    setSearchQuery(event.target.value);
  };

  let handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      window.location.assign("/search/query=" + searchQuery);
      // history.push("/search/query=" + searchQuery);
      // window.location.assign("/search/query=" + searchQuery);
    }
  };
  let searchResults = () => {
    window.location.assign("/search/query=" + searchQuery);
  };

  return (
    <div>
      <Navbar expand="lg" className="navbar-custom">
        <Navbar.Brand href="/" className="nav-link">
          <b>Cultured Foodies</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/about" className="a-custom">
              About Us
            </Nav.Link>
            <Nav.Link href="/cuisines" className="a-custom">
              Cuisines
            </Nav.Link>
            <Nav.Link href="/cities" className="a-custom">
              Cities
            </Nav.Link>
            <Nav.Link href="/restaurants" className="a-custom">
              Restaurants
            </Nav.Link>
            <Nav.Link href="/visualizations" className="a-custom">
              Our Visualizations
            </Nav.Link>
            <Nav.Link href="/provider-visualizations" className="a-custom">
              Provider Visualizations
            </Nav.Link>
          </Nav>
          <Form
            inline
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              onChange={handleSearchQuery}
              // onKeyPress={handleKeyPress}
              onKeyPress={(event: any) => {
                if (event.key === "Enter") {
                  window.location.assign("/search/query=" + searchQuery);
                }
              }}
            />
            <Button bsPrefix="search-button" variant="outline-success" onClick={searchResults}>
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavBarSolid;
