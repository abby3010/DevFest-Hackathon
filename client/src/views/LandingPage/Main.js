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
                        <li className="list-heading">
                            <Typography variant="h5">
                                Online Forums
                            </Typography>
                        </li>
                        <li>With communication everything is easier. We have created an online discussion in-site
                            forum where people can hold conversations in the form of posted messages. </li>
                    </ul>
                    <ul>
                        <li className="list-heading">
                            <Typography variant="h5">
                                Infographics
                            </Typography>
                        </li>
                        <li>Infographics are a valuable tool for visual communication. The most visually unique,
                            creative infographics are often the most effective, because they grab our attention and don’t let go.</li>
                    </ul>
                    <ul>
                        <li className="list-heading">
                            <Typography variant="h5">
                                Epidemics' info
                            </Typography>
                        </li>
                        <li>All the data represented is astonishingly true. The past epidemic data like Ebola, Malaria, H1N1, etc.
                            have been shown through our archives. Nevertheless, the Corona related data is live and upto date. </li>
                    </ul>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <a className="submit-button" href="/app/portals">Explore Portals &gt;</a>
                </div>
            </div>
        </>
    )
}

export default Main
