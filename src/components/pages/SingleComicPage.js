import "./singleComic.scss";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import useMarvelServices from "../../services/MarvelServices";
import { useEffect, useState } from "react";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../error/error";

const SingleComicPage = () => {
  const [comic, setComic] = useState({});

  const res = useParams();

  useEffect(() => {
    onRequest();
  }, [res]);

  const { getComicById, loading, error } = useMarvelServices();

  const onRequest = () => {
    getComicById(res.comicId).then(onComicLoaded);
  };

  const onComicLoaded = comic => {
    setComic(comic);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const loadingMessage = loading ? <Spinner /> : null;
  const content = loading || error ? null : <View comic={comic} />;

  return (
    <div className="single-comic">
      {errorMessage}
      {loadingMessage}
      {content}
    </div>
  );
};

const View = ({ comic }) => {
  return (
    <>
      <img src={comic.thumbnail} alt="x-men" className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{comic.title}</h2>
        <p className="single-comic__descr">{comic.description}</p>
        <p className="single-comic__descr">{comic.pageCount}</p>
        <p className="single-comic__descr">Language: en-us</p>
        <div className="single-comic__price">{comic.prices}</div>
      </div>
      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </>
  );
};

export default SingleComicPage;
