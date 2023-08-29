import "./charList.scss";
import MarvelServices from "../../services/MarvelServices";
import { useEffect, useState } from "react";
import ErrorMessage from "../error/error";
import Spinner from "../spinner/spinner";

function CharList(props) {
  const [char, setChar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [disable, setDisable] = useState(false);
  const [offset, setOffset] = useState(210);
  const [focusId, setFocusId] = useState(null);

  const setFocusCard = id => {
    setFocusId(id);
  };

  const marvelServices = new MarvelServices();

  useEffect(() => {
    onRequest();
  }, []);

  useEffect(() => {
    console.log("hi");
    let timerScroll;
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        console.log("timer");
        if (timerScroll) {
          clearTimeout(timerScroll);
        }
        timerScroll = setTimeout(() => {
          onRequest(offset);
        }, 1000);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timerScroll);
    };
  }, [offset]);

  const onRequest = offset => {
    onCharLoading();
    marvelServices.getAllCharacters(offset).then(onCharsLoaded).catch(onError);
  };

  const onCharLoading = () => {
    setDisable(true);
  };

  const onCharsLoaded = newChars => {
    setChar(char => [...char, ...newChars]);

    setLoading(false);
    setDisable(false);
    setOffset(offset => offset + 9);
  };

  const onError = () => {
    setErr(true);
  };

  const elem = char.map(item => {
    let focusLi = "char__item";
    if (item.id === focusId) {
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
          props.onGetId(item.id);
          setFocusCard(item.id);
        }}
        key={item.id}
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
      <button disabled={disable} onClick={() => onRequest(offset)} className="button button__main button__long">
        <div className="inner">load more</div>
      </button>
    </div>
  );
}

export default CharList;
