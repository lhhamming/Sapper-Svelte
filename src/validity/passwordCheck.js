

export default function(password){
    if(password.length >= 6){
        if(hasUpperCase(password)){
            if(passwordContainsNumber(password)){
                return true;
            }
        }
    }
    return false;
}
function hasUpperCase(password) {
    if(password.toLowerCase() != password){
        return true;
    }
    return false;
}

function passwordContainsNumber(password) {
    var regex = /\d/g;
    return regex.test(password);
}