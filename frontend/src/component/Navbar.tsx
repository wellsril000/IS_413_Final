import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top"
      style={{
        backgroundColor: '#0d6efd',
        color: 'white',
        padding: '0.75rem 1rem',
        width: '100%',
        zIndex: 1000, // ensures it sits above other content
      }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <span className="navbar-brand text-white mb-0 h1">
          🎤 <strong>StageSync</strong> — Your Entertainer Scheduler
        </span>
        <div>
          <button
            className="btn btn-outline-light me-2"
            onClick={() => navigate('/')}
          >
            Home
          </button>
          <button
            className="btn btn-outline-light"
            onClick={() => navigate('/entertainers')}
          >
            Entertainers
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
