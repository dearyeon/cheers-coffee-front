const WrapContainer =
  (Component) =>
  ({ ...props }) => {
    return (
      <div className="container">
        <Component {...props} />
      </div>
    );
  };

export default WrapContainer;
