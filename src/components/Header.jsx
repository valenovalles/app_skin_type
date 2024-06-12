import logo from "../images/skin_logo.png"

function Header() {
  return (
    <div>
        <a href="/"><img className= "logo" src={logo} alt="" /></a>
    </div>
  )
}

export default Header