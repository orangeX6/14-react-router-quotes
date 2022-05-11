import { useRef, useState, Fragment } from 'react';
import { Prompt } from 'react-router-dom';

import Card from '../ui/Card';
import LoadingSpinner from '../ui/LoadingSpinner';
import classes from './QuoteForm.module.css';

const QuoteForm = (props) => {
  const authorInputRef = useRef();
  const textInputRef = useRef();
  const [isFormFocused, setIsFormFocused] = useState(false);

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    // optional: Could validate here

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }

  const formFocusHandler = () => {
    // console.log('Focus!!');
    setIsFormFocused(true);
  };

  const dataEnteredHandler = () => {
    setIsFormFocused(false);
  };

  return (
    <Fragment>
      <Prompt
        when={isFormFocused}
        message={() => {
          // console.log(location);
          return 'Are you sure you want to leave? All the entered data will be lost';
        }}
      />
      <Card>
        <form
          className={classes.form}
          onSubmit={submitFormHandler}
          onFocus={formFocusHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button onClick={dataEnteredHandler} className="btn">
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default QuoteForm;
