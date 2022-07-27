// NOMATCH PAGE USED TO HANLDE WILDCARD ROUTES
const notfound = require('../assets/images/404.png');

const NoMatch = () => {
  return (
    <div className="col-12 mt-4">
      <img src={notfound} alt="404 NOT FOUND" id="notFound"/>
    </div>
  );
};

export default NoMatch;