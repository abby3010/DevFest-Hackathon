import {
    // primaryColor,
    blackColor,
    hexToRgb
} from "../../style.js";

const userProfileStyle = theme => ({

    image: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 0px",
    },
    profileImage: {
        width: "60%",
        height: "60%",
        objectFit: "contain",
        borderRadius: 0,
        // border: "1px solid grey",
        boxShadow:
            "0 16px 20px -12px rgba(" +
            hexToRgb(blackColor) +
            ", 0.56), 0 4px 25px 0px rgba(" +
            hexToRgb(blackColor) +
            ", 0.12), 0 10px 10px -5px rgba(" +
            hexToRgb(blackColor) +
            ", 0.2)",
    },
    profileBody: {
        padding: "0px 10px",
        display: "flex",
        justifyContent: "center",
        wordBreak: "break-word",
    },
    profileFooter: {
        padding: 0,
        margin: 0,
        display: "flex",
        justifyContent: "center",
        borderTop: "1px solid grey"
    },
    detailCards: {
        padding: "0px 20px",
        [theme.breakpoints.down("sm")]: {
            width: "-webkit-fill-available",
            padding: "0px 0px",
        },
    },
    cardTitle: {
        height: "100%",
        display: "flex",
        alignItems: "center",
    },
    education: {
        borderBottom: "1px solid grey",
    },
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0",
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
    },
});

export default userProfileStyle;
