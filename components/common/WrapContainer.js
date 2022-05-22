const WrapContainer =
  (Component) =>
  ({ ...props }) => {
    return (
      <div className="container">
        <Component {...props} />
      </div>
    );
  };

WrapContainer.displayName = "Wrap";

export default WrapContainer;
