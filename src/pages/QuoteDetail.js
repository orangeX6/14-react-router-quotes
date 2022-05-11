import { Fragment, useEffect } from 'react';
import { useParams, useRouteMatch, Route, Link } from 'react-router-dom';

import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const QuoteDetail = () => {
  const match = useRouteMatch();
  const params = useParams();
  const { quoteId } = params;

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  // console.log(match);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  // const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);
  // if (!quote) return <h3>No quote found</h3>;

  if (status === 'pending')
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );

  if (status === 'error') return <p className="centered">{error}</p>;

  if (!loadedQuote.text)
    return <h2 className="centered">Error! No quote with that id was found</h2>;

  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      {/* <Route path={`/quotes/${params.quoteId}/comments`}> */}

      <Route exact path={match.path}>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            View Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
