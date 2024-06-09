const phoneRegex = /^(0[35789][0-9]{8}|02[0-9]{9})$/;
const gmailRegex = /([!#-'*+-9=?A-Z^-~-]+(\.[!#-'*+-9=?A-Z^-~-]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([!#-'*+-9=?A-Z^-~-]+(\.[!#-'*+-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
const dateRegex = /^(19|20)\d{2}[-\/](0[1-9]|1[0-2])[-\/](0[1-9]|[12][0-9]|3[01])$/;
module.exports = {
    phoneRegex,
    gmailRegex,
    passwordRegex,
    dateRegex
}