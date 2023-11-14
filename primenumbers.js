listPrimesUntil(100000);

function listPrimesUntil(limit) {
    let counter = 3;

    if (limit >= 1) console.log("Found a prime: 1");
    if (limit >= 2) console.log("Found a prime: 2");

    let halfDivisorsObj = {1: [1,2,3]};
    let halfDivisorLimit = 1;

    while (counter <= limit) {
        [halfDivisorsObj, halfDivisorLimit] = updateDivisors(halfDivisorsObj, halfDivisorLimit);
        if (!isThereADivisorFor(counter, halfDivisorsObj)) console.log("Found a prime: " + counter);
        counter++;
    }
}

function updateDivisors(obj, hd) {
    let n = obj[1][obj[1].length - 1];
    let newHd = hd;

    //add new half-divisor on the object
    if (obj[1][obj[1].length - 1] / 2 !== Math.floor(obj[1][obj[1].length - 1] / 2)) {
        let arr = [hd + 1];
        obj[hd + 1] = arr;
        newHd++;
    }

    //update all the half-divisors
    Object.values(obj).forEach(arr => {
        while (arr[arr.length - 1] <= n) {
            if (arr[arr.length - 1] + arr[0] > n + 1) {
                break;
            } else {
                arr.push(arr[arr.length - 1] + arr[0]);
            }
        }
    })

    return [obj, newHd];
}

function isThereADivisorFor(x, obj) {
    let bool = false;

    Object.keys(obj).every(key => {
        if (Number(key) !== 1) {
            //see if the last element of the given array equals to x
            if (obj[key][obj[key].length - 1] === x) {
                bool = true;
                return false;
            }
        }

        return true;
    })

    return bool;
}
