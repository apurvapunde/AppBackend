"use strict";

module.exports = {
    randomToken: randomToken,
    decodeBase64Image: decodeBase64Image,
    generateRandomCode: generateRandomCode
};

/**
 * Function is used to return random number between max min
 * @access private
 * @return json
 * Created by sarvesh dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 06-March-2017
 */
function randomToken(length) {
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP1234567890";
    var pass = "";
    for (var x = 0; x < length; x++) {
        var i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
    }
    return pass;
}

/**
 * Function is used to decode base64 images
 * @access private
 * @return json
 * Created by sarvesh dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 06-March-2017
 */

function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    var response = {};
    if (matches) {
        if (matches.length !== 3) {
            res.json({ "code": 401, "message": "Invalid input string" });
        }
        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');
        return response;
    } else {
        return "err";
    }

}

/**
 * Function is used to generate a random 6 digit string
 * @access private
 * @return json
 * Created by sarvesh dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 06-June-2016
 */
function generateRandomCode() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 6; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}