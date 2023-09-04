import "./charList.scss";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import useMarvelServices from "../../services/MarvelServices";
import { useEffect, useRef, useState } from "react";
import ErrorMessage from "../error/error";
import Spinner from "../spinner/spinner";

function CharList(props) {
  const [char, setChar] = useState([]);
  const [disable, setDisable] = useState(false);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [focusId, setFocusId] = useState(null);
  const myRef = useRef([]);

  const setFocusCard = id => {
    setFocusId(id);
  };

  const { loading, error, getAllCharacters } = useMarvelServices();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  useEffect(() => {
    let timerScroll;
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
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

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    onCharLoading();
    getAllCharacters(offset).then(res => onCharsLoaded(res));
  };

  const onCharLoading = () => {
    setDisable(true);
  };

  const onCharsLoaded = res => {
    setChar(char => [...char, ...res]);
    setDisable(false);
    setNewItemLoading(newItemLoading => true);
    setOffset(offset => offset + 9);
  };

  const elem = char.map((item, i) => {
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
      <CSSTransition key={i} timeout={500} classNames={focusLi}>
        <li
          ref={el => (myRef.current[i] = el)}
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
      </CSSTransition>
    );
  });

  const errorMessage = error ? <ErrorMessage /> : null;
  const loadingMessage = loading && !newItemLoading ? <Spinner /> : null;

  return (
    <div className="char__list">
      <ul className="char__grid">
        <TransitionGroup component={null}>{elem}</TransitionGroup>
        {errorMessage}
        {loadingMessage}
      </ul>
      <button disabled={disable} onClick={() => onRequest(offset)} className="button button__main button__long">
        <div className="inner">load more</div>
      </button>
    </div>
  );
}

export default CharList;
