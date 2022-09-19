import React, { useState } from 'react'

function Contact() {
    const [values, setValues] = useState({
        name: "",
        email: "",
    });

    const [isSubcribed, setIsSubscribed] = useState(false)

    function handleChange(e) {
        setValues({ ...values, [e.target.id]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        let headers = {
            method: 'POST',
            headers: { Accept: "application/json", "Content-Type": "application/json" },
            body: JSON.stringify(values),
        };

        fetch('http://127.0.0.1:8000/api/validation-for-newsletter/', headers)
            .then((response) => toSetSubscribed(response.status));
    }

    function toSetSubscribed(status_code) {
        if (status_code === 201) {
            setIsSubscribed(true);
        }
    }
    

    let p_newsletter;
    if (isSubcribed) {
        p_newsletter = <p>Thanks!</p>;
    } else {
        p_newsletter = <p>Subscribe our newsletter to receive news!</p>;
    }

    return (
        <div className="contact">
            <div className="whatsapp container">
                <i className="fa-brands fa-whatsapp logo"></i>
                <p>Contact us on Whatsapp!</p>
                <div className='button__container'>
                    <button>
                        <a href='https://api.whatsapp.com/'>
                            Access <i className="fa-solid fa-angle-right"></i>
                        </a>
                    </button>
                </div>
            </div>
            <div className="newsletter container">
                <i className="fa-solid fa-inbox logo"></i>
                {p_newsletter}
                <form onSubmit={(e) => handleSubmit(e)}>
                    <p>
                        <label>Your name:</label>
                        <input id='name' type="text" placeholder='Ex.: Charlotte Walker' onChange={(e) => handleChange(e)} />
                    </p>
                    <p>
                        <label>Your e-mail:</label>
                        <input id='email' type="email" placeholder='Ex.: charlotte@gmail.com' onChange={(e) => handleChange(e)} />
                    </p>
                    <button type='submit'>Subscribe <i className="fa-solid fa-pen" style={{ marginLeft: '0.5rem' }}></i></button>
                </form>
            </div>
        </div>
    )
}

export default Contact