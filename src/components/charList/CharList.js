import "./charList.scss";
import MarvelServices from "../../services/MarvelServices";
import { Component } from "react";
import ErrorMessage from "../error/error";
import Spinner from "../spinner/spinner";

class CharList extends Component {
  state = {
    char: [],
    loading: true,
    err: false,
    disable: false,
    offset: 210,
  };

  marvelServices = new MarvelServices();

  componentDidMount() {
    this.onRequest();
  }

  onRequest = offset => {
    this.onCharLoading();
    this.marvelServices.getAllCharacters(offset).then(this.onCharsLoaded).catch(this.onError);
  };

  onCharLoading = () => {
    this.setState({
      disable: true,
    });
  };

  onCharsLoaded = newChars => {
    this.setState(({ char, offset }) => ({
      char: [...char, ...newChars],
      loading: false,
      disable: false,
      offset: offset + 9,
    }));
  };

  onError = () => {
    this.setState({ err: true });
  };

  render() {
    const { char, err, loading, offset } = this.state;

    const elem = char.map(item => {
      let imgStyled = { objectFit: "cover" };
      if (item.thumbnail == "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
        imgStyled = { objectFit: "contain" };
      }

      return (
        <li onClick={() => this.props.onGetId(item.id)} key={item.id} className="char__item">
          <img src={item.thumbnail} style={imgStyled} alt="abyss" />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });

    const errorMessage = err ? <ErrorMessage /> : null;
    const loadingMessage = loading ? <Spinner /> : null;
    const content = !err && !loading ? elem : null;

    return (
      <div className="char__list">
        <ul className="char__grid">
          {errorMessage}
          {loadingMessage}
          {content}
        </ul>
        <button
          disabled={this.state.disable}
          onClick={() => this.onRequest(offset)}
          className="button button__main button__long"
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
