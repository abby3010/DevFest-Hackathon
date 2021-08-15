const expReducer =  (exps = [], action) => {
    switch (action.type) {
        case 'LIKE':
            return exps.map((exp) => (exp._id === action.payload._id ? action.payload : exp));
        default:
            return exps;
    }
}

export default expReducer