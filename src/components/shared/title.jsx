import { Helmet } from 'react-helmet-async';
import proptypes from 'prop-types';

const Title = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};
export default Title;

Title.propTypes = {
  title: proptypes.string.isRequired,
};