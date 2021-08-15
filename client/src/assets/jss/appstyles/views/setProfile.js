import {
    // primaryColor,
    blackColor,
    hexToRgb
} from "../../style.js";

const setProfileStyle = () => ({
    root: {
        margin: "0 20px !important",
    },
    image: {
        display: "grid",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 0px",
        alignText: "center"
    },
    profileImage: {
        width: "150px",
        height: "150px",
        objectFit: "contain",
        borderRadius: 100,
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
    expImage: {
        width: "200px",
        height: "200px",
        objectFit: "contain",
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
    profileFooter: {
        padding: 0,
        margin: 0,
        display: "flex",
        justifyContent: "flex-end",
        borderTop: "1px solid grey"
    },

    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    },
    selectImage: {
        marginTop: "10px",
        border: "1px solid #DEDEDE",
        borderRadius: "5px",
        padding: "10px",
    },
    imagePreview: {
        display: "block",
        width: "100%",
        height: "150px",
        objectFit: "contain",
    },
    cardTextField: {
        margin: '10px 0',
    },
    cardRadioLabel: {
        color: '#000'
    }
    // projectName: {
    //     color: "black",
    //     fontWeight: "bold",
    // },
    // tagline: {
    //     color: "black",
    // },
    // section: {
    //     alignItems: "center",
    //     justifyContent: "center"
    // },
    // newProjectBtn: {
    //     marginLeft: "5%"
    // },
    // margin: {
    //     zIndex: "4",
    //     margin: "0"
    // },
    // searchWrapper: {
    //     [theme.breakpoints.down("sm")]: {
    //         width: "-webkit-fill-available",
    //         margin: "10px 15px 0"
    //     },
    //     display: "inline-block",
    //     float: "left",
    // },

    // datalistInput: {
    //     marginTop: "10px",
    //     width: "100%",
    // },
    // textfield: {
    //     marginTop: "10px",
    // },
    // list: {
    //     width: "100%",
    // },
    // listItem: {
    //     borderRadius: 5,
    //     border: "1px solid" + primaryColor[0],
    //     padding: "3px 15px",
    //     marginTop: 2,
    // },
    // imageLabel: {
    //     marginTop: "10px",
    //     fontSize: 15,
    //     fontStyle: "bold"
    // },

});

export default setProfileStyle;
