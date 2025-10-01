document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('searchBtn');

  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const bloodGroup = document.getElementById('bloodGroup').value;
      const location = document.getElementById('location').value;

      const params = new URLSearchParams();
      if (bloodGroup) params.set('bloodGroup', bloodGroup);
      if (location) params.set('location', location);

      window.location.href = `donor-list.html${params.toString() ? '?' + params.toString() : ''}`;
    });
  }
});
