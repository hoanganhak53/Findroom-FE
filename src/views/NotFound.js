import React from 'react';
import { Link } from 'react-router-dom';
import notfound from "../assets/not-found.png";

const NotFound = () => (
  <div style={styles.container}>
    <img
      src={notfound}
      alt="not-found"
    />
    <div>Hãy thử đăng nhập để sử dụng chức năng này</div>
    <Link to="/" className="link-home">
      Go Home
    </Link>
  </div>
);

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export default NotFound;