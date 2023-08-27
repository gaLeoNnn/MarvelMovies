class MarvelServices {
  _apiKey = "apikey=7f157a115b89c862a033dcc6e5812f12";
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _offset = 210;

  getResource = async url => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getAllCharacters = async (offset = this._offset) => {
    const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
    return res.data.results.map(item => {
      return this._transformCharacter(item);
    });
  };

  getCharacterById = async id => {
    const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);

    return this._transformCharacter(res.data.results[0]);
  };

  _transformCharacter = char => {
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
}

export default MarvelServices;
