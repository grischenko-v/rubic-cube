export function getBoxInitialPositions (sideSize = 1) {
    const arr = [];
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

export const generateRandomIntegerInRange = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomDirection = () => Math.random() < 0.5 ? 'left' : 'right';

export const getRoundPosition = (position) => {
    return {
        x: Math.round(position.x),
        y: Math.round(position.y),
        z: Math.round(position.z),
    }
}