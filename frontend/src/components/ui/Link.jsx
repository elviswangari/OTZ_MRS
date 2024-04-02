/* eslint-disable react/prop-types */
function Link({ to, children, className }) {
  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = to;
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

export {Link};
