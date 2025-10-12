let allDonors = [];

async function loadDonors() {
  try {
    const response = await fetch('./data/donors.json');
    allDonors = await response.json();
    applyFiltersFromURL();
    filterDonors(); // apply on load
  } catch (error) {
    console.error('Error loading donors:', error);
  }
}

function applyFiltersFromURL() {
  const params = new URLSearchParams(window.location.search);
  const bloodGroup = params.get('bloodGroup');
  const location = params.get('location');

  if (bloodGroup) document.getElementById('filterBloodGroup').value = bloodGroup;
  if (location) document.getElementById('filterLocation').value = location;
}

// 🩸 Blood Type Compatibility Map (Who can receive from whom)
const bloodCompatibility = {
  "O-": ["O-"],
  "O+": ["O-", "O+"],
  "A-": ["A-", "O-"],
  "A+": ["A+", "A-", "O+", "O-"],
  "B-": ["B-", "O-"],
  "B+": ["B+", "B-", "O+", "O-"],
  "AB-": ["AB-", "A-", "B-", "O-"],
  "AB+": ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"]
};

function filterDonors() {
  const bloodGroup = document.getElementById('filterBloodGroup').value;
  const location = document.getElementById('filterLocation').value;
  const availability = document.getElementById('filterAvailability').value;
  const universalChecked = document.getElementById('filterUniversal')?.checked;

  let filtered = allDonors;

  // 🧬 Blood Group Logic
  if (bloodGroup) {
    if (universalChecked) {
      // Show compatible donors (who can donate to selected bloodGroup)
      const compatibleGroups = Object.keys(bloodCompatibility).filter(
        donorGroup => bloodCompatibility[bloodGroup].includes(donorGroup)
      );
      filtered = filtered.filter(donor => compatibleGroups.includes(donor.bloodGroup));
    } else {
      // Show exact blood group only
      filtered = filtered.filter(donor => donor.bloodGroup === bloodGroup);
    }
  }

  // 🌍 Location Filter
  if (location) filtered = filtered.filter(donor => donor.location === location);

  // ⏱️ Availability Filter
  if (availability) filtered = filtered.filter(donor => donor.availability === availability);

  displayDonors(filtered);
}

function displayDonors(donors) {
  const container = document.getElementById('donorContainer');
  const noResults = document.getElementById('noResults');

  if (donors.length === 0) {
    container.innerHTML = '';
    noResults.classList.remove('hidden');
    return;
  }

  noResults.classList.add('hidden');
  container.innerHTML = donors.map(donor => `
    <div class="donor-card bg-white rounded-lg shadow-md p-6 cursor-pointer fade-in" onclick="viewDonor(${donor.id})">
      <div class="flex justify-between items-start mb-4">
        <div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">${donor.name}</h3>
          <div class="flex items-center gap-2">
            <span class="bg-red-100 text-red-800 text-sm font-semibold px-3 py-1 rounded-full">
              ${donor.bloodGroup}
            </span>
            <span class="${donor.availability === 'Available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} text-xs font-medium px-2 py-1 rounded-full">
              ${donor.availability}
            </span>
          </div>
        </div>
      </div>

      <div class="space-y-2 text-gray-600">
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <span class="text-sm">${donor.location}</span>
        </div>
      </div>

      <button class="mt-4 w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition">
        View Details
      </button>
    </div>
  `).join('');
}

function viewDonor(id) {
  window.location.href = `donor-details.html?id=${id}`;
}

document.addEventListener('DOMContentLoaded', () => {
  loadDonors();
  document.getElementById('filterBloodGroup').addEventListener('change', filterDonors);
  document.getElementById('filterLocation').addEventListener('change', filterDonors);
  document.getElementById('filterAvailability').addEventListener('change', filterDonors);
  document.getElementById('filterUniversal').addEventListener('change', filterDonors);
});
