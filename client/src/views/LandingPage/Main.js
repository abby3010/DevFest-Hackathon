import React from 'react'
import Typography from '@material-ui/core/Typography';
import vec from '../../assets/img/backgrounds/wallpaper6.png';

const Main = () => {
    return (
        <>
            <main className="wrapper">
                <div className="image">
                    <img src={vec} alt="im"></img>
                </div>
                <div>
                    <div className="title">
                        <Typography variant="h3" align="center">
                            Epidemics
                        </Typography>
                    </div>
                    <blockquote>
                        Really, however, it is doubtful if this could be called a victory. All that could be said was that the disease seemed to be leaving us as unaccountably as it had come. Our strategy had not changed, but whereas yesterday it had obviously failed, today it seemed triumphant. Indeed one’s chief impression was that the epidemic had called a retreat after reaching all its objectives; it had, so to speak, achieved its purpose.
                        <cite>Albert Camus, The Plague</cite>
                    </blockquote>
                </div>
            </main>
            <div className="about">
                <Typography variant="h3" align="center">
                    About Us
                </Typography>
                <div className="table">
                    <ul>
                        <li className="list-heading">Lorem Ipsum</li>
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                            molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                            numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                            optio, eaque rerum!</li>
                    </ul>
                    <ul>
                        <li className="list-heading">Lorem Ipsum</li>
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                            molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                            numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                            optio, eaque rerum!</li>
                    </ul>
                    <ul>
                        <li className="list-heading">Lorem Ipsum</li>
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                            molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                            numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                            optio, eaque rerum!</li>
                    </ul>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <a className="submit-button" href="/">Explore Portals &gt;</a>
                </div>
            </div>
        </>
    )
}

export default Main
