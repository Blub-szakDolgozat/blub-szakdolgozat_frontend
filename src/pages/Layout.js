import { Nav } from "react-bootstrap";
import '../App.css';

const Layout = () => {
    return (
        <>
            <Nav>
                <Nav.Item> {/* Középre igazítás támogatása */}
                    <Nav.Link
                        href="/admin"
                        className="nav-link-black"
                        style={{
                            color: "white",
                        }}
                    >
                        Admin
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        href="/"
                        className="nav-link-black"
                        style={{
                            color: "white",
                        }}
                    >
                        Public
                    </Nav.Link>
                </Nav.Item>
            </Nav>

        </>
    );
};

export default Layout;
