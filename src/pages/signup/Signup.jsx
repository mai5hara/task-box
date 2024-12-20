import React, { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [thumbnail, settThumbnail] = useState(null);
  const [thumbnailError, settThumbnailError] = useState(null);
  const { signup, isPending, error } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName, thumbnail);
  };

  const handleFileChange = (e) => {
    settThumbnail(null);
    let selected = e.target.files[0];

    if (!selected) {
      settThumbnailError('Please select a file');
      return;
    }

    if (!selected.type.includes('image')) {
      settThumbnailError('selected file must be an image');
      return;
    }

    if (selected.size > 100000) {
      settThumbnailError('Image file size must be less than 100kb');
      return;
    }

    settThumbnailError(null);
    settThumbnail(selected);
  };

  return (
    <div className="page-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Sign up</h2>
        <label>
          <span>email:</span>
          <input
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="input"
          />
        </label>
        <label>
          <span>password:</span>
          <input
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="input"
          />
        </label>
        <label>
          <span>display name:</span>
          <input
            required
            type="text"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
            className="input"
          />
        </label>
        <label>
          <span>profile thumbnail:</span>
          <input required type="file" onChange={handleFileChange} />
          {thumbnailError && <div className="error">{thumbnailError}</div>}
        </label>
        <div className="auth-btn-wrap">
          {!isPending && <button className="btn">Sign up</button>}
          {isPending && (
            <button className="btn" disabled>
              loading
            </button>
          )}
        </div>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Signup;
