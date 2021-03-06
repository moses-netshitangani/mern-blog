import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './navbar.css';
import axios from 'axios';
const bcrypt = require('bcryptjs');

const Navbar = props => {
    // menu variable to hold state for the burger-bar
    let [menu, setMenu] = useState(false);

    // classes for different css animations of the burger-menu
    const [burger_classes, setClasses] = useState("burger-bar");
    const [slide_classes, setSlideClasses] = useState("drawer");
    
    // switch burger-menu classes when clicked
    const updateBurgerBar = menu => {
        if (menu) {
            setClasses("burger-bar x");
        }
        else {
            setClasses("burger-bar bars");
        }
    }

    // switch slide classes when clicked
    const updateSlide = menu => {
        if(menu){
            setSlideClasses("drawer long");
        }
        else{
            setSlideClasses("drawer short");
        }
    }

    // the onclick method
    const updateMenu = () => {
        setMenu(menu = !menu);
        updateBurgerBar(menu);
        updateSlide(menu);
    }

    // display the login component in mobile
    let mobileLogin = () => {
        updateMenu();
        openLogin();
    }

    // logout
    let logout = () => {
        updateMenu();
        localStorage.clear();
        window.location.href = "/";
    }

    // admin login variables
    let [username, setName] = useState("");
    let [password, setPassword] = useState("");
    let [status, setStatus] = useState("login-grey-inactive");
    let [loginPage, setLoginPage] = useState("login-page");
    let [failStatus, setFail] = useState("hide");

    // capturing username and password
    const changeName = e => {
        setName(e.target.value.trim());
    }

    const changePassword = e => {
        setPassword(e.target.value.trim());
    }

    // opening the admin login page
    const openLogin = () =>
    {
        setStatus("login-grey");
    }

    // closing the admin login page
    const closeLogin = () => {
        setStatus("login-grey-inactive");
        setLoginPage("login-page");
        setFail("hide");
    }

    // closing the failed login page
    const closeFailLogin = () => {

        // close pop up
        setFail("hide");

        // show login page
        setLoginPage("login-page");
    }

    // login icon state
    const [login_icon, setLoginIcon] = useState("login-icon");

    // add blog state
    const [add_icon, setAddIcon] = useState("hide");

    // navigate to the admin page
    const navAdmin = () => {
        window.location.href = "/admin";
    }


    // hide login icon in admin page
    useEffect(() => 
    {
        if(window.location.href.includes("admin"))
        {
           setLoginIcon("hide");
           setAddIcon("add");
        }

        let loginComp = document.getElementById("login");
        let logoutComp = document.getElementById("logout");

        // replace admin login option with logout
        if(localStorage.getItem("login") === "true" || localStorage.getItem("login"))
        {
            // replace Admin login option with Sign out option
            loginComp.style.display = "none";
            logoutComp.style.display = "inherit";
        }
        else
        {
            // replace Admin login option with Sign out option
            loginComp.style.display = "inherit";
            logoutComp.style.display = "none";
        }
    }, []);

    // // submitting login details
    // const onSubmit = e => {
    //     e.preventDefault(); 

    //     const user = {
    //         username: username,
    //         password: password
    //     };

    //     axios.post('http://localhost:3000/user/add', user)
    //         .then(res => {
    //             // hide the login icon
    //             document.getElementsByClassName('login-icon')[0].style.display = 'none';
                
    //             // close the login page
    //             closeLogin();
    //         })
    //         .catch(err => console.log(err));
    // }

    // checking admin username and password
    async function onSubmit (e){
        e.preventDefault();

        // admin details
        let admin = {
            username: "",
            password: ""
        }

        // fetch username and pasword
        axios.get('/user')
            .then(res => {
                admin.username = res.data[0].username;
                admin.password = res.data[0].password;

                // check for correctness
                bcrypt.compare(password, admin.password, (err, res) => {
                    if(res && (username === admin.username))
                    {
                        // change login state and send it back to parent
                        props.authComp.login();
                        props.onAuthChange(props.authComp.isAuthenticated());

                        // navigate to /admin
                        setLoginIcon("hide");
                        closeLogin();
                        setAddIcon("add");
                        // window.location.href = "/admin";
                    }
                    else
                    {
                        // close admin details page
                        setLoginPage("hide");

                        // erase entered details
                        document.getElementById("email").value = "";
                        document.getElementById("password").value = "";

                        //display error page
                        setFail("login-page");
                    }
                });
                
            })
            .catch(err => console.log(err));
    }

    return(
        <div style={{width: '100%'}}>

            {/* The navbar with the burger-menu */}
            <div className='nav-container'>
                <nav>
                    <div className='logo-cover'>
                        <Link to="/">
                            <div className="logo"></div>
                        </Link> 
                    </div>
                    
                    {/* login icon superimposing add icon */}
                    <div className="icons">
                        {/* The admin login icon */}
                        <div className={login_icon} onClick={openLogin}>
                        </div>

                        {/* The add post icon */}
                        <div className={add_icon} onClick={navAdmin}>
                        </div>
                    </div>

                    {/* The burger menu */}
                    <div className="burger" onClick={updateMenu}>
                        <div className={burger_classes}></div>
                        <div className={burger_classes}></div>
                        <div className={burger_classes}></div>
                    </div>
                </nav>

                {/* home topics */}
                <div className='topic-outer'>
                    <div className='topic-parent'>
                        <Link to='/topic/News'>
                            <h4 id='topic-child'>News</h4>
                        </Link>
                        <Link to='/topic/Lifestyle'>
                            <h4 id='topic-child'>Lifestyle</h4>
                        </Link>
                        <Link to='/topic/Fashion'>
                            <h4 id='topic-child'>Fashion</h4>   
                        </Link>
                    </div>
                </div>

                {/* login page popup */}
                <div className={status}>
                    <div className={loginPage}>
                        <div className="cancel-btn" onClick={closeLogin}></div>
                        <h3>Admin Login</h3>

                        {/* admin username and password */}
                        <form onSubmit={onSubmit}>
                            <div className='admin-details'>
                                <h4>Username</h4>
                                <input type='text' name='email' placeholder='Type in your username' onChange={changeName} id='email' required />
                                <h4>Password</h4>
                                <input type="text" name="password" placeholder="Type in your password" onChange={changePassword} id="password" required />
                            </div>
                            <input type='submit' className='submit-button' value="Login" />
                        </form>
                    </div>
                    
                     {/* login failed popup */}
                    <div className={failStatus}>
                        <div className="login-fail">
                            <div className="cancel-btn" onClick={closeLogin}></div>
                            <h3>Login failed!</h3>
                            <h3>Username or Password incorrect</h3>
                            <button onClick={closeFailLogin}>Try again</button>
                        </div>
                    </div>
                </div>

            </div>

            {/* The content when burger-menu is clicked */}
            <div className={slide_classes}>
                <Link to="/" onClick={updateMenu}>
                    <h4>Home</h4>
                </Link>
                <Link to="/admin" onClick={updateMenu}>
                    <h4>Create</h4>
                </Link>
                <Link to="/about" onClick={updateMenu}>
                    <h4>About Me</h4>
                </Link>
                <Link id="login" onClick={mobileLogin}>
                    <h4>Admin Login</h4>
                </Link>
                <Link id="logout" onClick={logout}>
                    <h4>Logout</h4>
                </Link>
            </div>
        </div>
    )
}


export default Navbar;