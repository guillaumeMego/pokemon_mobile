import axios from "axios";

export const fetchKantoPokemon = async () => {
    try {
        const response = await axios.get("https://pokebuildapi.fr/api/v1/pokemon/limit/181");
        if (response.status === 200) {
            return response.data.map((pokemon) => ({
                name: pokemon.slug,
                imageUrl: pokemon.image,
            }));
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données Pokémon:", error);
    }
    return [];
};


