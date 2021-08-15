const expReducer =  (exps = [], action) => {
    switch (action.type) {
        case 'LIKE':
            return exps.map((exp) => (exp._id === action.payload._id ? action.payload : exp));
        case 'DELETE':
            return exps.filter((exp) => exp._id !== action.payload)    
        default:
            return exps;
    }
}

export default expReducer