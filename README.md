# Pokédex

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

A Pokédex é um projeto de estudo do curso The Complete 2023 Web Development Bootcamp, a ideia é construir uma lista simples mostrando alguns dados dos pokémons da primeira geração, usando express, axios e ejs.
O projeto irá contar com uma api simples que irá ser responsável por renderizar os arquivos ejs para mostrar os pokémons além de utilizar axios para fazer requisições para a PokeAPI

## 💻 Pré-requisitos

Para executar o projeto é necessário ter:

- A versão de `NodeJS v20.4.0 ou superior`

Outra alternativa é executar o projeto utilizando a ferramenta codespaces do github que já vem com o node pré instalado, então basta prosseguir para a instação

## 🚀 Instalando

Para a instalação do projeto é necessário ter instalado o node. A versão utilizada para a criação foi a v20.4.0.
Use o package manager [npm](https://www.npmjs.com) para a instalação do to do list.

```bash
npm install
```

## ☕ Usando

Para execução do projeto execute o comando

```bash
npm run dev
```

## 🚪 Portas disponíveis

As portas disponíveis para o projeto são:

- `/` Para a lista com todos os pokémons
- `/pokemon` onde é utilizado o método POST para recuperar apenas um pokémon pelo nome

## 🧪 Test

Para executar os testes utilize o comando

```bash
npm run test
```

Para desenvolvimento e execução automática dos testes utilize

```bash
npm run test:watch
```
