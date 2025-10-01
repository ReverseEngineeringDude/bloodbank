async function loadDonorDetails() {
  const params = new URLSearchParams(window.location.search);
  const donorId = parseInt(params.get('id'));

  if (!donorId) {
    showError();
    return;
  }

  try {
    const response = await fetch('./data/donors.json');
    const donors = await response.json();
    const donor = donors.find(d => d.id === donorId);

    if (!donor) {
      showError();
      return;
    }

    displayDonorDetails(donor);
  } catch (error) {
    console.error('Error loading donor details:', error);
    showError();
  }
}

function getRandomAvatar(gender) {
  const maleCount = 50;   // update according to your male folder files
  const femaleCount = 50; // update according to your female folder files

  if (gender === 'male') {
    const rand = Math.floor(Math.random() * maleCount) + 1; // 1 to 50
    return `./avatar/male/male${rand}.png`;
  } else if (gender === 'female') {
    const rand = Math.floor(Math.random() * femaleCount) + 51; // 50 to 100
    return `./avatar/female/female${rand}.png`;
  } else {
    return null; // fallback to default SVG
  }
}


function displayDonorDetails(donor) {
  const container = document.getElementById('donorDetails');
  const isAvailable = donor.availability === 'Available';
  const avatarURL = getRandomAvatar(donor.gender);
  const whatsappMessage = `Urgent Blood Needed! 🩸
Hi ${donor.name}, I urgently need ${donor.bloodGroup} blood. Please help if you can donate or know someone who can. Contact me ASAP.
Thank you! 🙏`;

  const avatarHTML = avatarURL
    ? `<img src="${avatarURL}" alt="${donor.name}" class="w-24 h-24 rounded-full object-cover mb-4 mx-auto">`
    : `<div class="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-4">
         <svg class="w-12 h-12 text-red-600" fill="currentColor" viewBox="0 0 20 20">
           <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
         </svg>
       </div>`;

  container.innerHTML = `
    <div class="text-center mb-8">
      ${avatarHTML}
      <h2 class="text-3xl font-bold text-gray-800 mb-2">${donor.name}</h2>
      <span class="${isAvailable ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} text-sm font-medium px-4 py-1 rounded-full">
        ${donor.availability}
      </span>
    </div>

    <div class="grid md:grid-cols-2 gap-6 mb-8">
      <div class="bg-gray-50 rounded-lg p-6">
        <div class="flex items-center gap-3 mb-2">
          <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
          <h3 class="text-lg font-semibold text-gray-700">Blood Group</h3>
        </div>
        <p class="text-2xl font-bold text-red-600">${donor.bloodGroup}</p>
      </div>

      <div class="bg-gray-50 rounded-lg p-6">
        <div class="flex items-center gap-3 mb-2">
          <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <h3 class="text-lg font-semibold text-gray-700">Location</h3>
        </div>
        <p class="text-xl text-gray-800">${donor.location}</p>
      </div>
    </div>

    <div class="bg-gray-50 rounded-lg p-6 mb-6">
      <div class="flex items-center gap-3 mb-2">
        <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
        </svg>
        <h3 class="text-lg font-semibold text-gray-700">Contact Number</h3>
      </div>
      <p class="text-xl text-gray-800">${donor.phone}</p>
    </div>

    ${isAvailable ? `
      <div class="flex gap-4">
        <a href="tel:${donor.phone}" class="flex-1 bg-red-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-red-700 transition flex items-center justify-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
          </svg>
          Call Now
        </a>
        <a href="https://wa.me/91${donor.phone}?text=${encodeURIComponent(whatsappMessage)}" target="_blank" class="flex-1 bg-green-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp
        </a>
      </div>
    ` : `
      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
        <p class="text-yellow-800 font-medium">This donor is currently not available for donation.</p>
      </div>
    `}

    <div class="mt-6 text-center">
      <a href="donor-list.html" class="text-red-600 hover:text-red-700 font-semibold">
        ← Back to Donor List
      </a>
    </div>
  `;
}

function showError() {
  document.getElementById('donorDetails').classList.add('hidden');
  document.getElementById('errorMessage').classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', loadDonorDetails);
