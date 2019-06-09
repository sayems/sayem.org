import React, {Component} from 'react'
import sayem from '../../content/images/sayem.jpg'

export default class UserInfo extends Component {
    render() {
        return (
            <aside className="note">
                <div className="container note-container">
                    <div className="flex-author">
                        <div className="flex-avatar">
                            <img className="avatar" src={sayem} alt="Syed Sayem"/>
                        </div>
                        <div>
                            <p>
                                <br/>
                                <br/>
                                {`I'm Sayem, a software engineer specializing in automation. I make
              open source coding projects and write free, quality articles and tutorials to help others
              .`}
                            </p>
                        </div>
                    </div>
                </div>
            </aside>
        )
    }
}
