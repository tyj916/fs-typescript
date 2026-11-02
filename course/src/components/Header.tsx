interface HeaderProp {
  name: string,
};

const Header = (props: HeaderProp) => {
  return (
      <h1>{props.name}</h1>
  )
}

export default Header;
