#!/usr/bin/env node
import chalk from 'chalk';
import figlet from 'figlet';
import gradent from 'gradient-string';
import imageToAscii from 'image-to-ascii'


import Pokedex from 'pokedex-promise-v2';

const P = new Pokedex();

const POKE_BLUE = '#2A4B97';
const POKE_YELLOW = '#FCBF18';

const myPokemon = process.argv[2];

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

console.log(chalk.bgHex(POKE_BLUE).hex(POKE_YELLOW)('Pokédex'));

console.log(myPokemon);
const pokemon = await P.getPokemonByName(myPokemon);
// console.log(JSON.stringify(pokemon));

figlet(`${pokemon.name}`, (error, data) => {
  if(error) { 
    console.log('Something went wrong...');
    console.dir(err);
    return;
  }
  console.log(gradent.retro(data));
});

console.log(`National Pokédex Number: #${pokemon.id}
Name: ${pokemon.name}
Weight: ${pokemon.weight}
Types: ${pokemon.types.map(o => o.type.name).join(', ')}
First Four Moves: ${pokemon.moves.slice(0,4).map(o => o.move.name).join(', ')}
`);

const imageUrl = pokemon.sprites.other['official-artwork'].front_default;
// console.log(imageUrl);
imageToAscii(imageUrl, (err, converted) => {
    console.log(err || converted);
});