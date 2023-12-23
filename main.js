document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "https://suitmedia-backend.suitdev.com/api/ideas";
  const perPageSelect = document.getElementById("perPageSelect");
  const sortBySelect = document.getElementById("sortBySelect");
  const cardsContainer = document.querySelector('.cards');
  const paginationNumbers = document.getElementById('paginationNumbers');
  const bannerContent = document.getElementById('dynamicBanner');
  const header = document.querySelector('.header');
  let lastScrollTop = 0;

  // Function to update banner content
  function updateBannerContent(data) {
    // Handle the loaded data
    // You can update your banner content here if needed
  }

  // Function to create a card
  function createCard(item) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<img src="${item.attributes.small_image}" alt="Thumbnail">`;
    return card;
  }

  // Function to update cards
  function updateCards() {
    const selectedPerPage = perPageSelect.value;
    const selectedSortBy = sortBySelect.value;
    fetchData(1, selectedPerPage, selectedSortBy);
  }

  // Function to update pagination numbers
  function updatePaginationNumbers(meta) {
    paginationNumbers.innerHTML = "";
    for (let i = 1; i <= meta.totalPages; i++) {
      const pageNumber = document.createElement('span');
      pageNumber.textContent = i;
      pageNumber.addEventListener('click', () => {
        const selectedPerPage = perPageSelect.value;
        const selectedSortBy = sortBySelect.value;
        fetchData(i, selectedPerPage, selectedSortBy);
      });
      paginationNumbers.appendChild(pageNumber);
    }
  }

  // Function to handle scroll event
  window.addEventListener('scroll', function () {
    const currentScrollTop = window.scrollY;

    if (currentScrollTop > lastScrollTop) {
      // Scrolling down
      header.classList.add('header--transparent')
      header.classList.remove('header--scrolled');
    } else {
      // Scrolling up
      header.classList.remove('header--transparent');
      if (!header.classList.contains('header--scrolled')) {
        header.classList.add('header--scrolled');
      }
    }

    lastScrollTop = currentScrollTop;
    
    const parallaxValue = currentScrollTop * 0.5;
    bannerContent.style.transform = 'translateY(' + parallaxValue + 'px)';
  });



  // Function to fetch data
  async function fetchData(pageNumber, pageSize, sortOption) {
    try {
      const response = await fetch(
        `${apiUrl}?page[number]=${pageNumber}&page[size]=${pageSize}&sort=${sortOption}&append[]=small_image&append[]=medium_image`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();
      updateCards(data.data);
      updatePaginationNumbers(data.meta);
    } catch (error) {
      console.error(error.message);
    }
  }

  // Set initial event listeners for select elements
  perPageSelect.addEventListener('change', updateCards);
  sortBySelect.addEventListener('change', updateCards);

  // Fetch initial data
  const initialPerPage = perPageSelect.value;
  const initialSortBy = sortBySelect.value;
  fetchData(1, initialPerPage, initialSortBy);
});



let link = document.getElementsByClassName("link");
let currentValue = 1;

function activeLink(){
  for(l of link){
    l.classList.remove("active");
  }
  event.target.classList.add("active")
  currentValue = event.target.value;
}
function backbtn(){
  if(currentValue > 1){
    for(l of link){
      l.classList.remove("active");
    }
    currentValue--;
    link[currentValue-1].classList.add("active")
  }
}

function nextbtn(){
  if(currentValue < 5){
    for(l of link){
      l.classList.remove("active");
    }
    currentValue++;
    link[currentValue-1].classList.add("active")
  }
}