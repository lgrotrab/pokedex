import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
const app = express();

app.use(express.static("public"));
app.use(bodyParser.json()); //Adicionado para aceitar dados em formato de objeto dos testes
app.use(bodyParser.urlencoded({ extended: true }));

async function fetchPokemonData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados dos Pokémon:", error.message);
    throw error;
  }
}

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=386",
    );

    const pokemonList = response.data.results;
    const pokemonDataPromises = pokemonList.map((pokemon) =>
      fetchPokemonData(pokemon.url),
    );
    const pokemonData = await Promise.all(pokemonDataPromises);
    res.render("index.ejs", { pokemonData });
  } catch (error) {
    console.error("Erro ao buscar dados dos Pokémon:", error.message);
    res.status(404).send("Erro ao buscar dados dos Pokémon");
  }
});

// Rota para receber o nome do Pokémon por meio de um formulário POST
app.post("/pokemon", async (req, res) => {
  if (req.body.pokemonName === "") {
    res.redirect("/");
  } else {
    try {
      const pokemonName = req.body.pokemonName.toLowerCase(); // Transforma o nome para minúsculo
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
      );
      const pokemonData = response.data;

      res.render("index.ejs", { pokemonData });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Se o status 404 for retornado, significa que o Pokémon não foi encontrado
        res.status(404).send("Pokémon não encontrado.");
      } else {
        console.error("Erro ao buscar dados do Pokémon:", error.message);
        res.status(500).send("Erro ao buscar dados do Pokémon");
      }
    }
  }
});

export { app as default, fetchPokemonData };
