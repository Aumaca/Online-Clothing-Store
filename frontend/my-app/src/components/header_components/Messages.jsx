import React, { useState, useEffect } from 'react'

import '../../styles/header_styles/Messages.css'

export default function Messages(props) {
    const { messages } = props;
    const [actualIndex, setActualIndex] = useState(0);
    let seconds_of_apparition = 15 * 1000; // 15 seconds

    function changeMessage() {
        if (actualIndex + 1 > messages.length - 1) {
            setActualIndex(0);
        } else {
            setActualIndex(actualIndex + 1);
        };
    };

    useEffect(() => {
        const interval = setInterval(() => {
            changeMessage();
        }, seconds_of_apparition);

        return () => clearInterval(interval);
    });

    // CONDITIONAL RENDER FOR MESSAGES
    const style = {
        backgroundColor: `${messages[actualIndex].background_color}`,
    };

    return (
        <div className="messages" style={style}>
            <div>
                <a href={messages[actualIndex].url} target='blank' style={{ color: messages[actualIndex].text_color }}>
                    <p>{messages[actualIndex].text_message}</p>
                </a>
            </div>
        </div>
    );
}