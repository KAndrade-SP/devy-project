import { useEffect } from 'react';

import './styles.scss';
import devyLogo from '../../assets/images/devy-logo.png'

export function Home() {

    return (
        <div>
            <nav className="nav" id="nav">
                <div className="nav__menu" id="nav-menu">
                    <div className="nav__close" id="nav-close">
                        <i className="fa-solid fa-xmark"></i>
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

            <main className="main show-menu" id="main">          
                <header className="header" id="header">
                    <nav className="header__nav">
                        <a href="#" className="header__logo">
                            DevY
                        </a>

                        <div className="header__toggle" id="header-toggle">
                            <i className="fa-solid fa-bars fa-lg"></i>
                        </div>
                    </nav>              
                </header>

                <section className="section" id="home">
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

                <section className="section" id="favs">
                    <h1>Section 1</h1>
                    <div className="section__favs__content">
                        <div className="fav_images">
                            <p>Conteúdo da section</p>
                        </div>
                    </div>
                </section>

                <footer className="footer" id="footer">
                    <nav className="footer__content">
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