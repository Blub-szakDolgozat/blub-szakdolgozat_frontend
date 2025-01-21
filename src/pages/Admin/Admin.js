import { Link, Outlet } from 'react-router-dom';


export default function Admin() {
  return (
    <div>
      
      <nav>
        <Link to="/admin/vizilenyekurlap">
        Vízilények
        </Link>
        <Link to="/admin/cikkekurlap">
        Cikkek
        </Link>
        <Link to="/admin/esemenyekurlap">
        Események
        </Link>
        <Link to="/admin/videokurlap">
        Videók
        </Link>
      </nav>
      {}
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
