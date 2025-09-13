const handleLogout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('refreshToken');
  window.location.reload();
};

export default handleLogout;