"use client";

import React from "react";
import { type Sketch } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";

const sketch: Sketch = p5 => {
    let xof: number, yof: number;
    p5.setup = () => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL)
        xof = p5.windowWidth/2.0, yof = p5.windowHeight/2.0;
        //initialized framerate is 60
    };

    const maxObj = 10;
    class star{
        x: number;
        y: number;
        lifespan: number;

        constructor(x=0, y=0){
            this.x = x;
            this.y = y;
            this.lifespan = 600; //duration in frames, stable value
        }
    }
    const circ: star[] = [];
    
    p5.draw = () => {
        //console.log(p5.frameRate());
        p5.background('#1D1D1D');
        p5.normalMaterial();
        p5.push();
        p5.rotateZ(p5.frameCount * 0.01);
        p5.rotateX(p5.frameCount * 0.01);
        p5.rotateY(p5.frameCount * 0.01);
        p5.plane(100);
        p5.pop();

        for (const c of circ){
            p5.push();
            p5.circle(c.x-xof, c.y-yof, 10);
            p5.pop();
        }
    };

    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
    }

    p5.mouseClicked = () => {
        //console.log(p5.mouseX, p5.mouseY);
        circ.push(new star(p5.mouseX, p5.mouseY));
    }
};

export default function Background() {
    return (
        <NextReactP5Wrapper sketch={sketch} />
    )
}