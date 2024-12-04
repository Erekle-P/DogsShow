// Select elements from HTML
const banner = document.querySelector('#banner');
const dogDetail = document.querySelector('#dog-detail');
const detailImg = dogDetail.querySelector('.detail-image');
const detailBreed = dogDetail.querySelector('#breed-display');
const detailWeight = dogDetail.querySelector('#weight-display');
const detailLifespan = dogDetail.querySelector('#lifespan-display');
const detailCoat = dogDetail.querySelector('#coat-display');
const detailSize = dogDetail.querySelector('#size-display');
const sortBySelect = document.querySelector('#sortBy');
const sortButton = document.querySelector('#sortButton');
const sortedBanner = document.querySelector('#sortedBanner');
const randomButton = document.querySelector('#randomButton');
const randomDogContainer = document.querySelector('#randomDog');
const loader = document.querySelector('#loader');

// Fetch dog data from local server
const fetchDogs = async () => {
  try {
    const response = await fetch('http://localhost:3000/dogs');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching dog data:", error);
    return [];
  }
};

// Function to handle click event and display dog details
const handleClick = (dog) => {
  detailImg.src = dog.image || '';
  detailBreed.textContent = dog.breed || 'Unknown';
  detailWeight.textContent = dog.weight || 'Unknown';
  detailLifespan.textContent = dog.lifespan || 'Unknown';
  detailCoat.textContent = dog.coat_type || 'Unknown';
  detailSize.textContent = dog.size || 'Unknown';
};

// Function to create a new dog card and append to the banner
const createDogCard = (dog, container) => {
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card');
  cardDiv.innerHTML = `
    <div id="child-div" class="card">
        <img src="${dog.image}" alt="${dog.breed}" />
    </div>
  `;
  cardDiv.addEventListener('click', () => handleClick(dog));
  container.appendChild(cardDiv);
};

// Function to display all dogs
const displayDogs = (dogs) => {
  banner.innerHTML = ''; // Clear existing dogs
  dogs.forEach((dog) => createDogCard(dog, banner));
  if (dogs.length > 0) {
    handleClick(dogs[0]); // Display the first dog as default
  }
};

// Function to sort dogs by selected criteria (weight or age)
const sortDogs = (dogs, criteria) => {
  const sortedDogs = [...dogs];
  sortedDogs.sort((a, b) => {
    if (criteria === 'weight') {
      return parseFloat(a.weight) - parseFloat(b.weight);
    } else if (criteria === 'age') {
      return parseFloat(a.lifespan) - parseFloat(b.lifespan);
    }
    return 0;
  });
  return sortedDogs;
};

// Function to display sorted dogs
const displaySortedDogs = (dogs) => {
  sortedBanner.innerHTML = '';
  dogs.forEach((dog) => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('sorted-card');
    cardDiv.innerHTML = `
      <img src="${dog.image}" alt="${dog.breed}" />
      <h4>${dog.breed}</h4>
    `;
    sortedBanner.appendChild(cardDiv);
  });
};

// Function to handle the sorting form submission
const handleSortSubmit = (dogs) => {
  const sortBy = sortBySelect.value;
  const sortedDogs = sortDogs(dogs, sortBy);
  displaySortedDogs(sortedDogs);
};

// Function to handle randomizer with loader effect
const handleRandomizer = async (dogs) => {
  loader.classList.remove('hidden'); // Show loader
  randomDogContainer.innerHTML = ''; // Clear previous content
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading delay

  const randomIndex = Math.floor(Math.random() * dogs.length);
  const randomDog = dogs[randomIndex];

  randomDogContainer.innerHTML = `
    <img src="${randomDog.image}" alt="${randomDog.breed}" />
    <h3>${randomDog.breed}</h3>

    <p> Hi friend \u2764\uFE0F </p>
  `;
  loader.classList.add('hidden'); // Hide loader
};

// Initialize the app
const initializeApp = async () => {
  const dogs = await fetchDogs();
  displayDogs(dogs);
  sortButton.addEventListener('click', () => handleSortSubmit(dogs));
  randomButton.addEventListener('click', () => handleRandomizer(dogs));
};

// Start the application
initializeApp();
