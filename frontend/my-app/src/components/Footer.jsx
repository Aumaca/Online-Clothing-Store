import React from 'react'

import app_store from '../images/app_store.png'
import play_store from '../images/play_store.png'

function Footer(props) {
    let date = new Date();
    let year = date.getFullYear();

    return (
        <>
            <div className="footer">
                <div className="footer__topics">
                    <div className="footer__item">
                        <h2>About us</h2>
                        <a href="/"><p><span>Our History</span></p></a>
                        <a href="/"><p><span>Our Stores</span></p></a>
                        <a href="/"><p><span>Investors</span></p></a>
                        <a href="/"><p><span>ESG</span></p></a>
                        <a href="/"><p><span>Carrers at CM Store</span></p></a>
                    </div>
                    <div className="footer__item">
                        <h2>Help</h2>
                        <a href="/"><p><span>Contact Us</span></p></a>
                        <a href="/"><p><span>Online Returns & Exchanges</span></p></a>
                        <a href="/"><p><span>Order Status</span></p></a>
                        <a href="/"><p><span>FAQ</span></p></a>
                    </div>
                    <div className="footer__item">
                        <h2>Quick Links</h2>
                        <a href="/"><p><span>Giftcards</span></p></a>
                        <a href="/"><p><span>Privacy Police</span></p></a>
                        <a href="/"><p><span>Terms of Use</span></p></a>
                    </div>
                </div>
                <div className="footer__utils">
                    <div className="footer__utils__social_media">
                        <a href="https://www.facebook.com/CMStore" target={'_blank'}><i className="fa-brands fa-facebook facebook"></i></a>
                        <a href="https://www.instagram.com/CMStore" target={'_blank'}><i className="fa-brands fa-instagram instagram"></i></a>
                        <a href="https://www.twitter.com/CMStore" target={'_blank'}><i className="fa-brands fa-twitter twitter"></i></a>
                        <a href="https://www.pinterest.com/CMStore" target={'_blank'}><i className="fa-brands fa-pinterest pinterest"></i></a>
                    </div>
                    <div className="footer__utils__download">
                        <a href="https://www.apple.com/br/search/CMStore?src=globalnav"><img src={app_store} alt=""/></a>
                        <a href="https://play.google.com/store/apps/details?id=com.MCStore"><img src={play_store} alt=""/></a>
                    </div>
                </div>
                <hr />
                <h2 className='footer__copyright'>© 2022 - {year} CMStore</h2>
            </div>
        </>
    )
}

export default Footer