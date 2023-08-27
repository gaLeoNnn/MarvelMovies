import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import { Component } from "react";
import MarvelServices from "../../services/MarvelServices";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../error/error";

class RandomChar extends Component {
  constructor() {
    super();
  }

  state = {
    char: {},
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.getRandomChar();
  }

  marvelCharacters = new MarvelServices();

  onChangeChar = () => {
    this.setState({
      loading: true,
    });

    this.getRandomChar();
  };

  onChatLoaded = char => {
    this.setState({ char: char, loading: false });
  };

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  getRandomChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    this.marvelCharacters.getCharacterById(id).then(this.onChatLoaded).catch(this.onError);
  };

  render() {
    const { char, loading, error } = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const loadMessage = loading ? <Spinner /> : null;
    const content = !error && !loading ? <View char={char} /> : null;

    return (
      <div className="randomchar">
        <div className="randomchar__block">
          {errorMessage}
          {loadMessage}
          {content}
        </div>
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button className="button button__main">
            <div onClick={this.onChangeChar} className="inner">
              try it
            </div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char;

  return (
    <>
      <img src={thumbnail} alt="Random character" className="randomchar__img" />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">wiki</div>
          </a>
        </div>
      </div>
    </>
  );
};

export default RandomChar;
