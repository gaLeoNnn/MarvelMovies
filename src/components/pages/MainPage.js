import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from "../../resources/img/vision.png";
import { useState } from "react";

const MainPage = () => {
  const [selectedId, setSelectedId] = useState(null);
  const onGetId = id => {
    setSelectedId(id);
  };

  return (
    <>
      <main>
        <RandomChar />
        <div className="char__content">
          <CharList onGetId={onGetId} />
          <CharInfo selectedId={selectedId} />
        </div>
        <img className="bg-decoration" src={decoration} alt="vision" />
      </main>
    </>
  );
};
export default MainPage;
