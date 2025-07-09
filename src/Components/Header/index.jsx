import {Link} from 'react-router-dom'
import './style.css'
function Header({profiledata}){
    if(!profiledata) return null
     const initials = profiledata?.name.split(" ").map(word=>word[0]).join('').toUpperCase()
    console.log(initials)
    return(
        
        <div className="header">
            <img className="image" src="https://cdn.prod.website-files.com/6509887b9119507025235a5a/650ada40fd6cf3427547c9d8_Swift%20logo.svg" alt="Logo"/>
            <Link to="./profile" className="profileDetails">
            <div className="initial-container"><p className="initial" >{initials}</p></div>
            <span className="profile-name">{profiledata.name}</span>
            </Link>
        </div>
        
        
    )

}
export default Header