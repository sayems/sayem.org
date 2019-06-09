import React, {Component} from 'react'

export default class Contact extends Component {
    render() {
        return (
            <>
                <h1>Stay in Touch</h1>

                <p>You can also contact me via email or find me around the web.</p>
                <ul>
                    <li>
                        <strong>Email</strong>: <a href="mailto:syed@sayem.org">syed@sayem.org</a>
                    </li>
                    <li>
                        <strong>GitHub</strong>:{' '}
                        <a target="_blank" rel="noopener noreferrer" href="https://github.com/sayems">
                            sayems
                        </a>
                    </li>
                    <li>
                        <strong>Twitter</strong>:{' '}
                        <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/sayems">
                            sayems
                        </a>
                    </li>
                    <li>
                        <strong>LinkedIn</strong>:{' '}
                        <a target="_blank" rel="noopener noreferrer" href="https://linkedin.com/in/sayems">
                            sayems
                        </a>
                    </li>
                    <li>
                        <strong>Feed</strong>: <a href="https://www.sayem.org/rss.xml">RSS</a>
                    </li>
                </ul>
            </>
        )
    }
}
