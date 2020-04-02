import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import PhoneIcon from '@vkontakte/icons/dist/28/phone_outline';
import VkIcon from '@vkontakte/icons/dist/28/logo_vk_outline';
import EMailIcon from '@vkontakte/icons/dist/28/mail_outline';
import InstagramIcon from '@vkontakte/icons/dist/28/logo_instagram';

const useStyles = makeStyles(theme => ({
    stickToBottom: {
        backgroundColor: grey[100],
        textAlign: 'center',
        minHeight: '19px',
        padding: '17px',
        flexShrink: 0
    },
    footerItem: {
        margin: '5px',
    }
}))

const Footer = ({
    phoneNumber,
    email,
    instagram,
    vk
}) => {
    const classes = useStyles();

    const VkButton = () => {
        if (vk !== "") {
            return (
            <IconButton 
                color="inherit"
                onClick={() => window.location.href = vk}
            >
                <VkIcon width={30} height={30}/>
            </IconButton>
            )
        }
        return null
    }

    const InstagramButton = () => {
        if (instagram !== "") {
            return (
            <IconButton 
                color="inherit"
                onClick={() => window.location.href = instagram}
            >
                <InstagramIcon width={30} height={30}/>
            </IconButton>
            )
        }
        return null
    }

    return (
        <footer className={classes.stickToBottom}>
            <Grid
                container
                direction="column"
                alignItems="center"
            >
                <Grid 
                    container 
                    direction="row"
                    justify="center"
                    className={classes.footerItem}
                >
                    <PhoneIcon />
                    <Typography style={{paddingLeft: '5px'}}>
                        {phoneNumber}
                    </Typography>
                </Grid>
                <Grid 
                    container 
                    direction="row" 
                    justify="center"
                    className={classes.footerItem}
                >
                    <EMailIcon />
                    <Typography style={{paddingLeft: '5px'}}>
                        {email}
                    </Typography>
                </Grid>
                <Grid 
                    container 
                    direction="row" 
                    justify="center"
                >   
                    <VkButton/>
                    <InstagramButton/>
                </Grid>
            </Grid>
        </footer>
    )
}

const mapStateToProps = state => {
    return ({
        phoneNumber: state.get('config').get('contact_info').get('phone_number'),
        email: state.get('config').get('contact_info').get('email'),
        instagram: state.get('config').get('contact_info').get('instagram'),
        vk: state.get('config').get('contact_info').get('vk')
    })
}

export default connect(mapStateToProps)(Footer)