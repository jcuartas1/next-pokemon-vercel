import React, { useState, useEffect } from 'react'

import { NextPage, GetStaticProps, GetStaticPaths } from 'next'

import { Pokemon, PokemonListResponse } from '../../interfaces/';
import pokeApi from '../../api/pokeApi';
import { Grid, Card, Button, Container, Text, Image } from '@nextui-org/react';
import confetti from 'canvas-confetti';
import { Layout } from '../../components/layouts';
import { localFavorites } from '../../utils';
import { getPokemonInfo } from '../../utils/getPokemonInfo';

interface Props {
  pokemon: Pokemon;
} 

const PokemonByNamepage: NextPage<Props> = ({ pokemon }) => {
  
  const [isInFavorites, setIsInFavorites] = useState(
    false 
    );
    
   useEffect(() => {
    localFavorites.existInFavorites(pokemon.id) 
   }, [pokemon.id])


  const onToogleFavorite = () => {
    localFavorites.toogleFavorite( pokemon.id );
    setIsInFavorites(!isInFavorites);

    if( isInFavorites) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0
      }
    });

  }
  
  return (
    // @ts-ignore
    <Layout title={ pokemon.name }>
      <Grid.Container css={{ marginTop: '5px' }} gap={ 2 } >
        <Grid  xs={12} sm={4}  >
          <Card hoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image 
                src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                alt={ pokemon.name }
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text h1 transform="capitalize">{pokemon.name}</Text>
              <Button
              color="gradient"
              ghost={ !isInFavorites }
              onClick={onToogleFavorite} >
                { isInFavorites ? 'En Favoritos' : 'Guardar en favoritos' }
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction="row" display="flex">
                <Image
                  src={pokemon.sprites.front_default} 
                  alt={pokemon.name}
                  width={ 100 }
                  height= { 100 }
                />
                <Image
                  src={pokemon.sprites.back_default} 
                  alt={pokemon.name}
                  width={ 100 }
                  height= { 100 }
                />
                <Image
                  src={pokemon.sprites.front_shiny} 
                  alt={pokemon.name}
                  width={ 100 }
                  height= { 100 }
                />
                <Image
                  src={pokemon.sprites.back_shiny} 
                  alt={pokemon.name}
                  width={ 100 }
                  height= { 100 }
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>

      </Grid.Container>
    </Layout>
  )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
  
  const pokemonsName: string[]  = data.results.map(pokemon => pokemon.name);

  return {
    paths: pokemonsName.map(name => ({
      params: { name }
    })), 
    // [
    //   {
    //     params: {
    //       id: '1'
    //     }
    //   }
    // ],
    fallback: false
  }

}

export const getStaticProps: GetStaticProps = async ({params}) => {
  //const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const { name } = params as { name: string };

  return {
    props:{
      pokemon: await getPokemonInfo( name )
    }
  }
}

export default PokemonByNamepage;
