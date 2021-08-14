import React from 'react'
import Typography from '@material-ui/core/Typography';

const Contact = () => {
    return (
        <div class="contact">
            <div style={{ padding: '2rem 1rem 1rem 1rem' }}>
                <Typography variant="h3" align="center">
                    Contact
                </Typography>
            </div>
            <div class="form-div">
                <form id="my-form">
                    <div>
                        <div>
                            <div>
                                <label>Name *</label>
                                <input type="text" className="w-input" dataName="Name" id="Name"
                                    required="" />
                            </div>
                            <div>
                                <label>Email *</label>
                                <input type="email" className="w-input" dataName="Email" id="Email"
                                    required="" />
                            </div>
                        </div>
                        <div>
                            <label>Message</label>
                            <textarea data-name="Message" id="Message" className="w-textarea"></textarea>
                        </div>
                        <input type="submit" value="SUBMIT" data-wait="Please wait..." className="submit-button" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Contact
