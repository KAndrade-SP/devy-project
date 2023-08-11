import { useEffect, useState } from 'react';

import './styles.scss';
import devyLogo from '../../assets/images/devy-logo.png'

export function Home() {

    useEffect(() => {
        const scriptIonic = document.createElement('script');
        const scriptIonicNoModule = document.createElement('script');

        scriptIonic.src = "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js";
        scriptIonic.type = "module";
        scriptIonic.async = true;

        scriptIonicNoModule.src = "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js";
        scriptIonicNoModule.noModule = true;
        scriptIonicNoModule.async = true;
      
        document.body.appendChild(scriptIonic);
        document.body.appendChild(scriptIonicNoModule);
      
        return () => {
          document.body.removeChild(scriptIonic);
          document.body.removeChild(scriptIonicNoModule);
        }
    }, []); 
    
    const [isActive, setIsActive] = useState(false);

    const handleMenu = () => {
        const headerToggle = document.getElementById('header-toggle')

        if(headerToggle){
            setIsActive(current => !current);
        } 
    };

    return (
        <div> 
            <nav className="nav" id="nav">
                <div className="nav__menu containerHome" id="nav-menu">
                    <div onClick={handleMenu} className="nav__close" id="nav-close">
                        <ion-icon name="close-outline"></ion-icon>
                    </div>

                    <div className="nav__data">
                        <div className="nav__mask">
                            <img src={devyLogo} alt="Logo da aplicação" />
                        </div>
                    </div>

                    <ul className="nav__list">
                        <li className="nav__item">
                            <a href="#home" className="nav__link active-link">
                                <ion-icon name="home"></ion-icon>
                                <p>Início</p>
                            </a>
                        </li>                      

                        <li className="nav__item">
                            <a href="#favs" className="nav__link">
                                <ion-icon name="heart"></ion-icon>
                                Section 1
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            <main className={isActive ? "main show-menu" : "main"} id="main">          
                <header className="header" id="header">
                    <nav className="header__nav containerHome">
                        <a href="#" className="header__logo">
                            DevY
                        </a>

                        <div onClick={handleMenu} className="header__toggle" id="header-toggle">
                            <ion-icon name="menu-outline"></ion-icon>
                        </div>
                    </nav>              
                </header>

                <section className="section containerHome" id="home">
                    <div className="section__home-content">
                        <div className="home-logo">
                            <div className="content-img-home">
                                <div className="home-logo-p">
                                    <img src={devyLogo} alt="Logo da aplicação" />
                                    <div className="p-home">
                                        <h2>DevY</h2>
                                        <p>Slogan do programa.</p>
                                    </div>
                                </div>
                            </div>
                        </div>   
                    </div>
                </section>

                <section className="section containerHome" id="favs">
                    <h1>Section 1</h1>
                    <div className="section__favs__content">
                        <div className="fav_images">
                            <p>Conteúdo da section</p>
                        </div>
                    </div>
                </section>

                <footer className="footer" id="footer">
                    <nav className="footer__content containerHome">
                        <a href="#" className="header__logo">
                            DevY
                        </a>
                        <p>by Kaique Viana, Manoela Araújo and Luiz Henrique.</p>
                    </nav>       
                </footer>
            </main>
        </div>
    )
}