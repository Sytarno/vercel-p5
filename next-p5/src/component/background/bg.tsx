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

    class star{
        x: number;
        y: number;
        impulse: number;
        lifespan: number;
        priority: boolean;
        dr: number;
        size: number = 10;
        det_delay: number = 10;

        constructor(x=0, y=0){
            this.x = x;
            this.y = y;
            this.impulse=10
            this.lifespan = 300; //duration in frames, stable value
            this.priority = false;
            this.dr = 1;
            this.det_delay = this.lifespan;
        }
        
        update(){
            p5.push();

            //show last placed
            if(this.priority){p5.fill(p5.color('#f5d742'))}else{p5.fill(p5.color(200,255))}
            
            //spawn effect
            if(this.impulse<0.1){this.impulse=0}else{this.impulse/=1.1}
            this.lifespan-=this.dr;

            //decay effect
            if(this.det_delay<0){
                this.lifespan=0;
            }
            this.det_delay--;
            
            if(this.lifespan<10){
                p5.circle(this.x-xof, this.y-yof, this.lifespan+this.impulse)
            }else{
                p5.circle(this.x-xof, this.y-yof, 10+this.impulse)
            }

            p5.pop();
        }
    }

    class line{
        circle_id: number;
        circle_id2: number;
        stroke: number;
        lifespan: number;
        delay: number;

        constructor(circle_id:number, circle_id2:number, delay:number=0){
            this.circle_id=circle_id;
            this.circle_id2=circle_id2;
            this.stroke=15;
            this.lifespan=10;
            this.delay=delay;
        }

        update(){
            if(this.delay){ this.delay--; }else{
                p5.push();

                p5.stroke(p5.color(200,255));
                p5.strokeWeight(this.stroke*this.lifespan/15);
                p5.line(circ[this.circle_id].x-xof, circ[this.circle_id].y-yof, circ[this.circle_id2].x-xof, circ[this.circle_id2].y-yof)

                this.lifespan--;

                p5.pop();
            }
        }
    }

    //finish class def --------------------

    //global variables
    const circ: star[] = [];
    const lines: line[] = [];

    let path: number[] = [];
    let initHit: number = -1;
    let hit: boolean = true;
    let strike_delay: number = 60*2;

    const max_attachment_radius = 300;
    const break_speed = 5; //duration between creating links

    //for priority functions
    function updateColor(){
        for (var i = circ.length - 1; i>=0; i--){
            circ[i].priority=false;
        }
        circ[circ.length-1].priority=true;
    }

    function updateGraph(){
        if(circ.length<1){ return; }
    
        let cur = circ.length-1;
        for (var i = circ.length - 1; i>=0; i--){
            circ[i].priority=false;
        }
        circ[cur].priority=true;
    }

    function init_branch(){
        //console.log("start branch", p5.frameCount);
        let vis: number[] = [];
        let cur = circ.length-1;
        for (var i = circ.length - 1; i>=0; i--){
            vis[i]=0;
        }
        circ[cur].priority=true;
        vis[cur]=1;

        //build adj matrix
        let dist: number[][] = [];
        for (var x = circ.length - 1; x>-1; x--){
            dist[x]=[]
            for (var y = circ.length - 1; y>-1; y--){
                if(y!=x){
                    let d = Math.round(p5.dist(circ[x].x, circ[x].y, circ[y].x, circ[y].y));
                    dist[x][y]=d;
                }else{
                    dist[x][y]=0;
                }
            }
        }
        
        //This is the traveling salesman problem. 
        //There are a myriad of ways to solve this, but nearest neighbor is probably the fastest approach.
        //If we cannot find a node that will survive long enough, abandon it
        path = [cur];

        function find(){
            let min=p5.windowWidth*2;
            let select=-1;
            for (var i = 0; i < circ.length; i++){
                if(vis[i]==0 && dist[cur][i] < max_attachment_radius 
                    && dist[cur][i] < min 
                    && dist[cur][i] != 0 
                    && (path.length+5)*break_speed < circ[i].lifespan
                    ){
                    min=dist[cur][i];
                    select=i;
                }
            }
            if(select>-1){
                vis[select]=1;
                path.push(select);
                cur=select;
            }
            return select;
        }

        while(find()>-1){}

        //console.log(p5.frameCount, "firing", path)
        circ[path[0]].lifespan = 20;
        for (var i = 0; i<path.length-1; i++){
            lines.push(new line(path[i], path[i+1], break_speed*i));
            circ[path[i+1]].det_delay = break_speed*(i+1);
        }
    }

    p5.draw = () => {
        p5.background('#1D1D1D');
        p5.normalMaterial();
        p5.push();
        p5.rotateZ(p5.frameCount * 0.01);
        p5.rotateX(p5.frameCount * 0.01);
        p5.rotateY(p5.frameCount * 0.01);
        p5.plane(100);
        p5.pop();

        for (var i = circ.length - 1; i>-1; i--){
            circ[i].update();
            if(circ[i].lifespan<0){
                circ.splice(i,1);
                updateGraph();
            }
        }
        
        for (var i = lines.length - 1; i>-1; i--){
            lines[i].update();
            if(lines[i].lifespan<0){
                lines.splice(i,1);
            }
        }

        if(p5.frameCount-initHit > strike_delay && hit == false){
            updateGraph();
            init_branch();
            hit = true;
        }
    };

    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
      xof = p5.windowWidth/2.0, yof = p5.windowHeight/2.0;
    }

    p5.mouseClicked = () => {
        circ.push(new star(p5.mouseX, p5.mouseY));
        initHit=p5.frameCount;
        hit=false;
        updateColor();
    }
};

export default function Background() {
    return (
        <NextReactP5Wrapper sketch={sketch}/>
    )
}