import "./comicsList.scss";
import Spinner from "../spinner/spinner";
import useMarvelServices from "../../services/MarvelServices";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ComicsList = () => {
  const [comics, setComics] = useState([]);
  const [offset, setOffset] = useState(210);
  const [disable, setDisable] = useState(false);
  const { loading, error, getAllComics } = useMarvelServices();

  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = offset => {
    setDisable(true);
    getAllComics(offset).then(comics => onComicsLoaded(comics));
  };

  const onComicsLoaded = newChars => {
    setComics([...comics, ...newChars]);
    setDisable(false);
    setOffset(prev => prev + 8);
  };

  const elems = comics.map((item, i) => {
    return (
      <li key={i} className="comics__item">
        <Link to={`/comics/${item.id}`}>
          <img src={item.thumbnail} alt="ultimate war" className="comics__item-img" />
          <div className="comics__item-name">{item.title}</div>
          <div className="comics__item-price">{item.prices}</div>
        </Link>
      </li>
    );
  });

  const loadMessage = loading ? <Spinner /> : null;

  return (
    <div className="comics__list">
      <ul className="comics__grid">
        {elems}
        {loadMessage}
      </ul>
      <button disabled={disable} onClick={() => onRequest(offset)} className="button button__main button__long">
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
