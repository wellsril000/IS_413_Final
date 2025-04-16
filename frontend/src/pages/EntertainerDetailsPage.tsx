import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Entertainer } from '../types/Entertainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../component/Navbar';

const EntertainerDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [entertainer, setEntertainer] = useState<Entertainer | null>(null);
  const [editMode, setEditMode] = useState(false);
  const fieldLabels: Record<string, string> = {
    entertainerID: 'Entertainer ID',
    entStageName: 'Stage Name',
    entSSN: 'SSN',
    entStreetAddress: 'Street Address',
    entCity: 'City',
    entState: 'State',
    entZipCode: 'Zip Code',
    entPhoneNumber: 'Phone Number',
    entWebPage: 'Web Page',
    entEMailAddress: 'Email Address',
    dateEntered: 'Date Entered',
  };

  const API =
    'https://final-backend-g4gva7dkh4bxh0f9.westus2-01.azurewebsites.net';

  useEffect(() => {
    const fetchEntertainer = async () => {
      try {
        const response = await fetch(
          `${API}/api/Entertainer/Entertainer/${id}`
        );
        const data = await response.json();
        setEntertainer(data);
      } catch (error) {
        console.error('Failed to fetch entertainer:', error);
      }
    };

    fetchEntertainer();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!entertainer) return;
    const { name, value } = e.target;
    setEntertainer({ ...entertainer, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `${API}/api/Entertainer/UpdateEntertainer/${id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(entertainer),
        }
      );
      if (response.ok) {
        setEditMode(false);
      } else {
        console.error('Failed to update entertainer');
      }
    } catch (error) {
      console.error('Error updating entertainer:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const confirmed = window.confirm(
        'Are you sure you want to delete this entertainer?'
      );
      if (!confirmed) return;

      const response = await fetch(
        `${API}/api/Entertainer/DeleteEntertainer/${id}`,
        { method: 'DELETE' }
      );
      if (response.ok) {
        navigate('/entertainers');
      } else {
        console.error('Failed to delete entertainer');
      }
    } catch (error) {
      console.error('Error deleting entertainer:', error);
    }
  };

  if (!entertainer) return <div>Loading...</div>;

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <Navbar />
      <h2>Entertainer Details</h2>

      <div
        className="card mb-3"
        style={{ maxHeight: '60vh', overflowY: 'auto' }}
      >
        <div className="card-body">
          {Object.entries(entertainer)
            .filter(([key]) => key !== 'entertainerID')
            .map(([key, value]) => (
              <div className="mb-3" key={key}>
                <label className="form-label">
                  <label className="form-label">
                    {fieldLabels[key] || key}
                  </label>
                </label>
                <input
                  type={key === 'dateEntered' ? 'date' : 'text'}
                  className="form-control"
                  name={key}
                  value={
                    key === 'entSSN'
                      ? String(value).replace(/\s+/g, '') // Remove spaces for SSN
                      : value || ''
                  }
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
            ))}
        </div>
      </div>

      <div className="d-flex gap-2 sticky-bottom bg-white py-3 pb-4">
        {!editMode ? (
          <button className="btn btn-primary" onClick={() => setEditMode(true)}>
            Edit
          </button>
        ) : (
          <button className="btn btn-success" onClick={handleUpdate}>
            Save
          </button>
        )}
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => navigate('/entertainers')}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default EntertainerDetailPage;
