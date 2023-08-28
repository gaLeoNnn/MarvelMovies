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
    focusId: null,
  };

  setFocusCard = id => {
    this.setState({
      focusId: id,
    });
  };

  marvelServices = new MarvelServices();

  componentDidMount() {
    this.onRequest();
    window.addEventListener("scroll", this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  }

  onScroll = () => {
    if (this.timerScroll) {
      clearTimeout(this.timerScroll);
    }

    this.timerScroll = setTimeout(() => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        this.onRequest(this.state.offset);
      }
    }, 1000);
  };

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
      let focusLi = "char__item";
      if (item.id === this.state.focusId) {
        focusLi = "char__item char__item_selected";
      }

      let imgStyled;
      if (item.thumbnail == "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
        imgStyled = { objectFit: undefined };
      } else {
        imgStyled = { objectFit: "cover" };
      }

      return (
        <li
          onClick={() => {
            this.props.onGetId(item.id);
            this.setFocusCard(item.id);
          }}
          key={item.id}
          ref={this.getElementsCard}
          tabIndex={0}
          style={{ border: "1px solid " }}
          className={focusLi}
        >
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
