async function fetchData() {
  try {
    const pokemonName = document.getElementById("pokemonName").value.toLowerCase(); // lowercase fix
    
    if (!pokemonName) {
      throw new Error("Please enter a Pokemon name");
    }

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`); // backticks fix

    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }

    const data = await response.json();
    const pokemonSprite = data.sprites.front_default;
    const imgElement = document.getElementById("pokemonSprite");

    imgElement.src = pokemonSprite;
    imgElement.style.display = "block";

  } catch (error) {
    console.error(error);
    document.getElementById("pokemonSprite").style.display = "none";
    alert(error.message); // show error to user
  }
}