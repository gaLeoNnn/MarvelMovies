import "./charSearchForm.scss";
import useMarvelServices from "../../services/MarvelServices";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";

const CharSearchForm = () => {
  const [char, setChar] = useState();
  const [disabled, setDisabled] = useState(false);
  console.log(char);
  const { getCharacterByName, loading, error } = useMarvelServices();

  const onRequest = values => {
    setDisabled(true);
    getCharacterByName(values.charName).then(onCharLoaded);
  };

  const onCharLoaded = char => {
    setDisabled(false);
    setChar(char);
  };

  const elem = !char ? null : char.name ? (
    <div className="char__search-result">
      <p className="char__search-name">{`There is! Visit ${char.name} page?`}</p>
      <Link to={`/MarvelMovies/${char.id}`} className="button button__main">
        <div className="inner">TO PAGE</div>
      </Link>
    </div>
  ) : (
    <div className="char__search-result">
      <p className="char__search-name_not">The character was not found. Check the name and try again</p>
    </div>
  );

  return (
    <Formik
      initialValues={{
        charName: "",
      }}
      onSubmit={values => onRequest(values)}
    >
      <Form className="char__search-form">
        <label className="char__search-lable" htmlFor="name">
          Or find a character by name:
        </label>
        <div className="char__search-wrapper">
          <Field id="CharName" name="charName" type="text" placeholder="Enter name" />
          <ErrorMessage className="error" name="charName" component={"div"} />
          <button disabled={disabled} type="submit" className="button button__main">
            <div className="inner">Find</div>
          </button>
        </div>
        {elem}
      </Form>
    </Formik>
  );
};
export default CharSearchForm;
