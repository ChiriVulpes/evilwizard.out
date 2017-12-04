"use strict";
Math.avg = (...n) => {
    return n.reduce((a, b) => a + b, 0) / n.length;
};
