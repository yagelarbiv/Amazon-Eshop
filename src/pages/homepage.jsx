import Title from '../components/shared/title'
import proptypes from 'prop-types';

function homepage() {
  return (
    <div>
      <Title title="HomePage" />
    </div>
  )
}

export default homepage
homepage.propTypes = {
  title: proptypes.string,
};