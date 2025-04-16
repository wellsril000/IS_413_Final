import { useState, useEffect } from 'react';
import { Entertainer } from '../types/Entertainer';
import { EntertainerStats } from '../types/EntertainerStats';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../component/Navbar';

const EntertainersPage = () => {
  const [entertainers, setEntertainers] = useState<Entertainer[]>([]);
  const [stats, setStats] = useState<EntertainerStats[]>([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const [newEntertainer, setNewEntertainer] = useState<
    Omit<Entertainer, 'entertainerID'>
  >({
    entStageName: '',
    entSSN: '',
    entStreetAddress: '',
    entCity: '',
    entState: '',
    entZipCode: '',
    entPhoneNumber: '',
    entWebPage: '',
    entEMailAddress: '',
    dateEntered: '',
  });

  const API =
    'https://final-backend-g4gva7dkh4bxh0f9.westus2-01.azurewebsites.net';

  useEffect(() => {
    const fetchEntertainers = async () => {
      try {
        const response = await fetch(`${API}/api/Entertainer/AllEntertainers`);
        const data = await response.json();
        setEntertainers(data);
      } catch (err) {
        console.error('Failed to fetch entertainers:', err);
      }
    };

    const fetchEntertainerStats = async () => {
      try {
        const response = await fetch(`${API}/api/Entertainer/EntertainerStats`);
        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error('Failed to fetch entertainer stats:', err);
      }
    };

    fetchEntertainers();
    fetchEntertainerStats();
  }, []);

  const getStatsForEntertainer = (id: number) =>
    stats.find((s) => s.entertainerID === id);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEntertainer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/api/Entertainer/AddEntertainer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntertainer),
      });

      if (response.ok) {
        const added = await response.json();
        setEntertainers((prev) => [...prev, added]);
        setShowForm(false);
        setNewEntertainer({
          entStageName: '',
          entSSN: '',
          entStreetAddress: '',
          entCity: '',
          entState: '',
          entZipCode: '',
          entPhoneNumber: '',
          entWebPage: '',
          entEMailAddress: '',
          dateEntered: '',
        });
      } else {
        console.error('Failed to add entertainer');
      }
    } catch (err) {
      console.error('Error adding entertainer:', err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h1 className="mb-4">Entertainers</h1>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Stage Name</th>
              <th>Number of Engagements</th>
              <th>Last Engagement</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {entertainers.map((e) => {
              const stat = getStatsForEntertainer(e.entertainerID);
              return (
                <tr key={e.entertainerID}>
                  <td>{e.entStageName}</td>
                  <td>{stat?.engagementCount ?? '–'}</td>
                  <td>
                    {stat?.lastEngagementDate
                      ? new Date(stat.lastEngagementDate).toLocaleDateString()
                      : '–'}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() =>
                        navigate(`/entertainer/${e.entertainerID}`)
                      }
                    >
                      Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Button to add a new entertainer */}
        <button
          className="btn btn-success mt-3"
          onClick={() => setShowForm(true)}
        >
          Add Entertainer
        </button>

        {/* Add a new user form */}
        {showForm && (
          <>
            <div
              className="modal fade show d-block"
              tabIndex={-1}
              role="dialog"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <form onSubmit={handleSubmit}>
                    <div className="modal-header">
                      <h5 className="modal-title">Add Entertainer</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowForm(false)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      {Object.entries(newEntertainer).map(([key, value]) => (
                        <div className="form-group mb-3" key={key}>
                          <label className="form-label">
                            {key.replace('ent', '').replace(/([A-Z])/g, ' $1')}
                          </label>
                          <input
                            type={key === 'dateEntered' ? 'date' : 'text'}
                            name={key}
                            className="form-control"
                            value={value}
                            onChange={handleInputChange}
                            required={
                              key !== 'entWebPage' && key !== 'entEMailAddress'
                            }
                          />
                        </div>
                      ))}
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShowForm(false)}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* Modal backdrop */}
            <div className="modal-backdrop fade show"></div>
          </>
        )}
      </div>
    </>
  );
};

export default EntertainersPage;
