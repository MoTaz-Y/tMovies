import PropTypes from "prop-types";

const Button = (props) => {
  return (
    <button
      onClick={props.onClick ? () => props.onClick() : null}
      className={`btn ${props.className}`}
    >
      {props.children}
    </button>
  );
};
const OutlinedButton = (props) => {
  return (
    <button
      onClick={props.onClick ? () => props.onClick() : null}
      className={`btn-outline ${props.className}`}
    >
      {props.children}
    </button>
  );
};
Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
};
OutlinedButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Button;
