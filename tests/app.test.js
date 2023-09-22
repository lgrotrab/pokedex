import request from "supertest";
import app, { fetchPokemonData } from "../public/app.js";
import axios from "axios";
import axiosMock from "axios-mock-adapter";

const axiosMockInstance = new axiosMock(axios);

describe("Testes para fetchPokemonData", () => {
  afterEach(() => {
    axiosMockInstance.reset(); // Limpa as chamadas de mock entre os testes
  });

  test("Deve retornar os dados do Pokémon quando a solicitação é bem-sucedida", async () => {
    // Configurar o mock para responder com os dados simulados
    const mockUrl = "https://pokeapi.co/api/v2/pokemon/bulbasaur";
    const mockData = { name: "bulbasaur", id: 1 };
    axiosMockInstance.onGet(mockUrl).reply(200, mockData);

    const result = await fetchPokemonData(mockUrl);

    expect(result.name).toEqual(mockData.name);
    expect(result.id).toEqual(mockData.id);
    expect(result).toHaveProperty("name");
    expect(result).toHaveProperty("id");
  });

  test("Deve lançar um erro quando a solicitação falha", async () => {
    // Configurar o mock para simular um erro na solicitação
    const mockUrl = "https://pokeapi.co/api/v2/pokemon/bulbasaur";
    const errorMessage = "Network Error";
    axiosMockInstance.onGet(mockUrl).networkError();

    try {
      await fetchPokemonData(mockUrl);
    } catch (error) {
      // Verificar se o erro contém a mensagem esperada
      expect(error.message).toBe(errorMessage);
    }
  });
});

describe("Testa as portas / com protocolo GET", () => {
  afterEach(() => {
    axiosMockInstance.reset(); // Limpa as chamadas de mock entre os testes
  });

  test("deve retornar status 200 e dados válidos", async () => {
    // Configura o mock para responder com os dados simulados
    const mockUrl = "https://pokeapi.co/api/v2/pokemon?limit=386";
    const mockBulbasaurUrl = "https://pokeapi.co/api/v2/pokemon/1/";
    const mockIvisaurUrl = "https://pokeapi.co/api/v2/pokemon/2/";
    const mockData = {
      results: [
        {
          name: "bulbasaur",
          url: "https://pokeapi.co/api/v2/pokemon/1/",
        },
        { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
      ],
    };
    const mockBulbasaur = {
      name: "bulbasaur",
      sprites: {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png",
      },
      height: 1,
      weigth: 1,
      types: [
        {
          type: {
            name: "test",
          },
        },
      ],
    };
    const mockIvisaur = {
      name: "Ivisaur",
      sprites: {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png",
      },
      height: 1,
      weigth: 1,
      types: [
        {
          type: {
            name: "test",
          },
        },
      ],
    };
    axiosMockInstance.onGet(mockUrl).reply(200, mockData);
    axiosMockInstance.onGet(mockBulbasaurUrl).reply(200, mockBulbasaur);
    axiosMockInstance.onGet(mockIvisaurUrl).reply(200, mockIvisaur);

    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });

  test("deve lidar com erros ao buscar dados de Pokémon", async () => {
    const mockUrl = "https://pokeapi.co/api/v2/pokemon/bulbasaur";
    // Simula um erro no axios.get
    axiosMockInstance.onGet(mockUrl).networkError();
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(404);
  });
});

describe("Testa a porta /pokemon com método POST", () => {
  afterEach(() => {
    axiosMockInstance.reset(); // Limpa as chamadas de mock entre os testes
  });
  let data = { pokemonName: "bulbasaur" };
  const mockUrl = `https://pokeapi.co/api/v2/pokemon/${data.pokemonName}`;
  const mockData = {
    name: "bulbasaur",
    sprites: {
      front_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png",
    },
    height: 1,
    weigth: 1,
    types: [
      {
        type: {
          name: "test",
        },
      },
    ],
  };

  test("Caso de sucesso onde é enviado um pokemonName válido, deve retornar status 200", async () => {
    // Configura o mock para responder com os dados simulados
    axiosMockInstance.onGet(mockUrl).reply(200, mockData);

    const response = await request(app).post("/pokemon").send(data);
    expect(response.status).toBe(200);
  });

  test("Caso de sucesso onde é enviado um pokemonName vazio, deve retornar status 302", async () => {
    data = { pokemonName: "" };
    // Configura o mock para responder com os dados simulados
    axiosMockInstance.onGet(mockUrl).reply(200, mockData);

    const response = await request(app).post("/pokemon").send(data);
    expect(response.status).toBe(302);
  });

  test("Caso de sucesso onde é enviado um pokemonName inválido, deve retornar status 404", async () => {
    data = { pokemonName: "aabsdaod" };
    // Configura o mock para responder com os dados simulados
    axiosMockInstance.onGet(mockUrl).reply(200, mockData);

    const response = await request(app).post("/pokemon").send(data);
    expect(response.status).toBe(404);
  });
});
