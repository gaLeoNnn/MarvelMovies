import "./charInfo.scss";

import { useEffect, useState } from "react";
import useMarvelServices from "../../services/MarvelServices";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../error/error";
import Skeleton from "../skeleton/Skeleton";

function CharInfo(props) {
  const [char, setChar] = useState(null);

  const { loading, error, getCharacterById } = useMarvelServices();

  useEffect(() => {
    updateChar();
  }, []);

  useEffect(() => {
    updateChar();
  }, [props.selectedId]);

  const updateChar = () => {
    const { selectedId } = props;

    if (!selectedId) {
      return;
    }

    getCharacterById(selectedId).then(onChatLoaded);
  };

  const onChatLoaded = chars => {
    setChar(chars);
  };

  const skeleton = char || loading || error ? null : <Skeleton />;
  const loadingMessage = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const content = loading || error || !char ? null : <View char={char} />;

  return (
    <div className="char__info">
      {skeleton}
      {loadingMessage}
      {errorMessage}
      {content}
    </div>
  );
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt="abyss" />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">Homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : "There is no comics with this character"}
        {comics.map((item, index) => {
          if (index <= 9) {
            return (
              <li key={index} className="char__comics-item">
                {item.name}
              </li>
            );
          } else {
            return;
          }
        })}
      </ul>
    </>
  );
};

export default CharInfo;
