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

  const getCharacterByName = async name => {
    const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
    if (!res.data.results || res.data.results.length === 0) {
      return res.data.results;
    }
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

  const getComicById = async id => {
    const res = await request(`${_apiBase}/comics/${id}?${_apiKey}`);

    return _transformComic(res.data.results[0]);
  };

  const getAllComics = async (offset = _offset) => {
    const res = await request(`${_apiBase}/comics?limit=8&offset=${offset}&${_apiKey}`);
    console.log(res.data.results[0]);
    return res.data.results.map(item => {
      return _transformComic(item);
    });
  };

  const _transformComic = comics => {
    console.log(`${comics.description} + hi `);
    return {
      id: comics.id,
      thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
      title: comics.title,
      description: comics.description || "There is no description",
      prices: comics.prices[0].price + "$",
      pageCount: comics.pageCount ? `${comics.pageCount} p.` : "No information about the number of pages",
    };
  };

  return { loading, error, getAllCharacters, getCharacterById, getAllComics, getComicById, getCharacterByName };
};

export default useMarvelServices;
