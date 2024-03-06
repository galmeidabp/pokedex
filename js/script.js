const pokeName = document.querySelector(".pokeName")
const pokeNumber = document.querySelector(".pokeNumber")
const pokeImg = document.querySelector(".pokemonImg")

const form = document.querySelector(".form")
const input = document.querySelector(".inputSearch")

const buttonPrev = document.querySelector(".btn-prev")
const buttonNext = document.querySelector(".btn-next")

let searchPoke = 1

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  )
  if (APIResponse.status === 200) {
    const data = await APIResponse.json()
    return data
  }
}

const renderPokemon = async (pokemon) => {
  pokeName.innerHTML = "Loading..."
  pokeNumber.innerHTML = ""
  const data = await fetchPokemon(pokemon)

  if (data) {
    pokeImg.style.display = "block"
    pokeName.innerHTML = data.name
    pokeNumber.innerHTML = data.id
    pokeImg.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ]
    input.value = ""
    searchPoke = data.id
  } else {
    pokeName.innerHTML = "Not found :c"
    pokeNumber.innerHTML = ""
    pokeImg.style.display = "none"
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault()
  renderPokemon(input.value.toLowerCase())
})

buttonPrev.addEventListener("click", () => {
  if (searchPoke > 1) {
    searchPoke -= 1
    renderPokemon(searchPoke)
  }
})

buttonNext.addEventListener("click", () => {
  searchPoke += 1
  renderPokemon(searchPoke)
})
