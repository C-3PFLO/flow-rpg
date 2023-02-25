/**
* Defines shared utils
*
* @module utils
*/

/**
 * Return a deep copy of an object
 * @public
 * @param {Object} object object to copy
 * @return {Object} a deep copy
 */
function deepCopy(object) {
    return JSON.parse(JSON.stringify(object));
}

export {
    deepCopy,
};
