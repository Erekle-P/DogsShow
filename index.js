// Select elements from HTML
const banner = document.querySelector('#banner');
const dogDetail = document.querySelector('#dog-detail');
const detailImg = dogDetail.querySelector('.detail-image');
const detailName = dogDetail.querySelector('.name');
const detailBreed = document.querySelector('#breed-display');
const detailWeight = document.querySelector('#weight-display');
const dogForm = document.querySelector('#new-dog');
const sortBySelect = document.querySelector('#sortBy');
const dogListDiv = document.querySelector('#dogList');

// Fetch dog data from db.json
const fetchDogs = async () => {
  try {
    const response = await fetch('db.json');
    const data = await response.json();
    return data.dogs;
  } catch (error) {
    console.error("Error fetching dog data:", error);
  }
};

// Function to handle click event and display dog details
const handleClick = (dog) => {
  detailImg.src = dog.image;
  detailName.textContent = dog.breed;
  detailBreed.textContent = dog.breed;
  detailWeight.textContent = dog.weight;
};

// Function to create a new dog card and append to the banner
const createDogCard = (dog) => {
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card');
  cardDiv.innerHTML = `
    <div id="child-div" class="card">
        <img src="${dog.image}" alt="${dog.breed}" />
    </div>
  `;

  cardDiv.addEventListener('click', () => handleClick(dog));
  banner.appendChild(cardDiv);
};

// Function to display all dogs
const displayDogs = (dogs) => {
  banner.innerHTML = ''; // Clear existing dogs
  dogs.forEach((dog) => createDogCard(dog));
  if (dogs.length > 0) {
    handleClick(dogs[0]); // Display the first dog as default
  }
};

// Function to handle form submission for adding new dogs
const handleFormSubmit = (e) => {
  e.preventDefault();

  const newDog = {
    id: dogs.length + 1, // Unique ID for the new dog
    breed: dogForm['new-breed'].value,
    weight: dogForm['new-weight'].value,
    image: dogForm['new-image'].value,
    lifespan: dogForm['new-life-span'].value,
    coat_type: dogForm['new-size'].value,
    size: dogForm['new-size'].value,
  };

  // Assuming you can push the new dog data to the array or DB
  dogs.push(newDog);

  createDogCard(newDog);
  dogForm.reset();
};

// Function to sort dogs by selected criteria (weight or age)
const sortDogs = () => {
  const sortedDogs = [...dogs]; // Copy dogs array to not mutate original
  const sortBy = sortBySelect.value;

  sortedDogs.sort((a, b) => {
    if (sortBy === 'weight') {
      return parseFloat(a.weight.split('-')[0]) - parseFloat(b.weight.split('-')[0]); // Sort by weight (lower end of the range)
    } else if (sortBy === 'age') {
      return parseFloat(a.lifespan.split('-')[0]) - parseFloat(b.lifespan.split('-')[0]); // Sort by lifespan (lower end of the range)
    }
    return 0;
  });

  displayDogs(sortedDogs);
};

// Initialize the app
const initializeApp = async () => {
  // Fetch and display dogs from db.json
  dogs = await fetchDogs();

  // Display dogs on page
  displayDogs(dogs);

  // Attach form submit listener
  dogForm.addEventListener('submit', handleFormSubmit);

  // Attach sort change listener
  sortBySelect.addEventListener('change', sortDogs);
};

// Start the application
initializeApp();
