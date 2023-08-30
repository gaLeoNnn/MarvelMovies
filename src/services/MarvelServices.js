import { useHttp } from "../hooks/http.hook";

const useMarvelServices = () => {
  const { loading, error, request } = useHttp();

  const _apiKey = "apikey=7f157a115b89c862a033dcc6e5812f12";
  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _offset = 210;

  const getAllCharacters = async (offset = 0) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);

    return res.data.results.map(item => {
      return _transformCharacter(item);
    });
  };

  const getCharacterById = async id => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);

    return _transformCharacter(res.data.results[0]);
  };

  const _transformCharacter = char => {
    return {
      id: char.id,
      name: char.name,
      description: char.description
        ? `${char.description.slice(0, 210)}...`
        : "There is no description for this character",
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };

  return { loading, error, getAllCharacters, getCharacterById };
};

export default useMarvelServices;
