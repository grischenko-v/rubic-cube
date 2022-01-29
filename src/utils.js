export function getBoxInitialPositions (size = 3) {
    const arr = [];
    const sideSize = 1;
    for (let x = -sideSize; x <= sideSize; x++) {
        for(let y = -sideSize; y <= sideSize; y++) {
            for(let z= -sideSize; z <= sideSize; z++) {
                const name = `${x}_${y}_${z}`;
                arr.push({
                    name: name,
                    x: x,
                    y: y,
                    z: z,
                    rotX: 0,
                    rotY: 0,
                    rotZ: 0,
                });
            }
        }
    }
    return arr;
}

export function asixNumtoLetter(asix) {
    switch (asix) {
        case 0: return 'x';
        case 1: return 'y';
        case 2: return 'z';
        default: throw new Error('wrong value');
    }
}

export function generateRandomIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomDirection() {
    return Math.random() < 0.5 ? 'left' : 'right'
}