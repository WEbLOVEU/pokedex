import { useReducer, useState, useEffect } from 'react';
import pokemonContext from './pokemonContext';
import pokemonReducer from './pokemonReducer';
import axios from 'axios';

import {
    OBTENER_POKEMONS,
    BUSCAR_POKEMON,
    FILTRAR_POKEMON
} from '../../types/index';

const PokemonState = props => {

    // Crear el state del Context
    const [ pokemons, guardarPokemons ] = useState([]);
    const [ cargando, guardarCargando ] = useState(false)

    // Ejecutar el llamado al API
    useEffect(() => {
        const obtenerPokemons = async (limit) => {
            const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}`;

            const response = await axios.get(url);

            guardarCargando(true);

            setTimeout(() => {
                guardarCargando(false);
                guardarPokemons(response.data.results);
            }, 10000);

        }
        obtenerPokemons(898);
        // eslint-disable-next-line
    }, [])

    const initialState = {
        catchemall : [],
        prueba : false,
        busqueda : ''
    }

    const [ state, dispatch ] = useReducer( pokemonReducer, initialState );

    const obtenerPokemons = pokes => {
        dispatch({
            type: OBTENER_POKEMONS,
            payload: pokes
        })
    }

    const buscarPokemon = nombre => {
        dispatch({
            type: BUSCAR_POKEMON,
            payload: nombre
        })
    }

    const filtrarPokemon = busqueda => {
        dispatch({
            type: FILTRAR_POKEMON,
            payload: busqueda
        })
    }

    return (
        <pokemonContext.Provider
            value={{
                busqueda: state.busqueda,
                catchemall: state.catchemall,
                pokemons,
                cargando,
                obtenerPokemons,
                buscarPokemon,
                filtrarPokemon
            }}
        >
            { props.children }
        </pokemonContext.Provider>
    )

}

export default PokemonState;