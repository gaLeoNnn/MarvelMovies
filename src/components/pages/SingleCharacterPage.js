import "./singleCharacterPage.scss";
import AppBanner from "../appBanner/AppBanner";
import { useParams } from "react-router-dom";
import useMarvelServices from "../../services/MarvelServices";
import { useEffect, useState } from "react";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../error/error";

const SingleCharacterPage = () => {
  const [char, setChar] = useState({});

  const res = useParams();

  const { getCharacterById, loading, error } = useMarvelServices();

  useEffect(() => {
    onRequest();
  }, [res.charId]);

  const onRequest = () => {
    getCharacterById(res.charId).then(onCharLoaded);
  };

  const onCharLoaded = char => {
    setChar(char);
  };

  const loadingMessage = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const content = error || loading ? null : <View char={char} />;

  return (
    <>
      <AppBanner />
      <div className="single-character">
        {loadingMessage}
        {errorMessage}
        {content}
      </div>
    </>
  );
};
const View = ({ char }) => {
  return (
    <>
      <img className="single-character__img" src={char.thumbnail} alt={char.thumbnail} />
      <div className="single-character__content">
        <h2 className="single-character__name">{char.name}</h2>
        <p className="single-character__text">{char.description}</p>
      </div>
    </>
  );
};

export default SingleCharacterPage;
