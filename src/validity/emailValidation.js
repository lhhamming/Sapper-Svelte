

export default function(email){
    if(email.includes("@")){
        if(validTextBefore(email)){
            if(validTextAfter(email)){
                if(validEmailAddress(email))
                return true;
            }
        }
    }
    return false;
}

function validTextBefore(email) {
    if(email.charAt(0) != "@"){
        return true
    }
    return false;
}

function validTextAfter(email) {
    const splittedEmailString = email.split("");
    for (let i = 0; i < splittedEmailString.length; i++) {
        if(splittedEmailString[i] === "@"){
            if(!((i+1) >= splittedEmailString.length)){
                return true;
            }
        }
    }
    return false;
}

function validEmailAddress(email) {
    if(email.includes("nl") || email.includes('.com')){
        return true;
    }
    return false;
}
