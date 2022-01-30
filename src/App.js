import React, {useEffect, useState} from 'react'
import {Scene} from './components/Scene';
import ColorMaterial from './ColorMaterial';
import {RubikCube} from './components/RubikCube';
import {
    asixNumtoLetter,
    generateRandomIntegerInRange,
    getBoxInitialPositions, getRandomDirection
} from './utils';

const NEXT_ROTATION_TIMEOUT = 1000;

const App = () => {
    const [points, setPoints] = useState(getBoxInitialPositions());
    const [animation, setAnimation] = useState(false);
    const [rotationAxisLetter, setRotationAxisLetter] = useState(asixNumtoLetter(0));
    const [rotationDirection, setRotationDirection] = useState('left');
    const [rotatedFace, setRotatedFace] = useState(-1);
    const [rotationSide, setRoatationSide] = useState(points.filter(point => {
        if (point[rotationAxisLetter] === rotatedFace) {
            return point;
        }
    }));
    const [otherGroup, setOtherGroup] = useState(points.filter(point => {
        if (point[rotationAxisLetter] !== rotatedFace) {
            return point;
        }
    }));

    useEffect(() => {
        if (!animation) {
            setTimeout(startRotate, NEXT_ROTATION_TIMEOUT);
        }
    }, [animation]);

    const startRotate = () => {
        if (animation) {
            return;
        }
        const newRotationNum = generateRandomIntegerInRange(0, 2);
        setRotationAxisLetter(asixNumtoLetter(newRotationNum));
        setRotatedFace(generateRandomIntegerInRange(-1, 1));

        setRoatationSide(points.filter(point => {
            if (point[asixNumtoLetter(newRotationNum)] === rotatedFace) {
                return point;
            }
        }));

        setOtherGroup(points.filter(point => {
            if (point[asixNumtoLetter(newRotationNum)] !== rotatedFace) {
                return point;
            }
        }));
        setRotationDirection(getRandomDirection());
        setAnimation(true);
    }

    return <>
        <Scene>
            <RubikCube animation={animation}
                       setAnimation={setAnimation}
                       setPoints={setPoints}
                       rotationDirection={rotationDirection}
                       rotationSide={rotationSide}
                       otherGroup={otherGroup}
                       rotationAxisLetter={rotationAxisLetter}/>
        </Scene>
    </>;
}

export default App;
