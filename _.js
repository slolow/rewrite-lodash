_ = {

    clamp (number, lower, upper) {
        return Math.min(Math.max(number, lower), upper);
    },

    inRange (number, start=0, end=0) {
        const startInRange = Math.min(start, end);
        const endInRange = Math.max(start, end)
        return number >= startInRange && number < endInRange;
    },

    words (string) {
        return string.split(' ');
    }, 

    pad (string='', length=0, chars=' ') {
        if (string.length >= length) {         
            return string;
        }
        const padCharNum = length - string.length; // calc the number of characters to pad in total
        const padCharNumLeft = Math.floor(padCharNum / 2); // calc the number of characters to pad left
        const padCharNumRight = padCharNum - padCharNumLeft; // calc the number of characters to pad right
        const padCharLeft = chars.repeat(padCharNumLeft).slice(0, padCharNumLeft); 
        const padCharRight = chars.repeat(padCharNumRight).slice(0, padCharNumRight); 
        return padCharLeft + string + padCharRight;
    }, 

    has (object, path) {
        if (typeof path === 'string') {
            // logic for input of type single key as string
            const hasKey = object[path] !== undefined;
            if (hasKey) {
                return hasKey;
            }
            // logic for input of type string of nested key
            if (path.includes('.')) {
                path = path.split('.'); // convert 'a.b' to ['a', 'b']
            }
        }
        
        // logic for input of type ['a', 'b'] (array for nested key)
        let count = 0;
        while (count < path.length) {
            const key = path[count];
            if (object[key] === undefined) {
                return false;
            }
            object = object[key];
            count++
        }
        
        return true;
    }, 

    invert (object) {
        const invertedObject = {};
        for (const [key, value] of Object.entries(object)) {
            invertedObject[value] = key;
        }
        return invertedObject;
    }, 

    findKey (object, predicate) {
        for (const [key, value] of Object.entries(object)) {
            if (predicate(value)) {
                return key;
            }
        }
        return undefined;
    }, 

    drop (array, number=1) {
        array.splice(0, number);
        return array;
    },

    dropWhile (array, predicate) {
        const numberOfElementsToDrop = array.findIndex((element, index, array) => !predicate(element, index, array));
        return this.drop(array, numberOfElementsToDrop);
    }, 

    chunk (array, size=1) {
        const newArr = [];
        for (let i=0; i<array.length; i=i+size) {
            const subArr = array.slice(i, i+size);
            newArr.push(subArr);
        }
        return newArr;
    }
}

// Do not write or modify code below this line.
module.exports = _;