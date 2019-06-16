import { PaperShape } from './PaperShape';
import * as Shapes from '../../../model/shapes';
import * as PaperShapes from './';
import { Shape } from '../../../model/shapes/Shape';
import { Path } from 'paper';

export class PaperIntersection extends PaperShape {
    
    constructor(intersection : Shapes.Intersection) {
        super();
        var shapes : Shape[] = intersection.getIntersectedShapes()
        
        for(var i = 0; i < shapes.length; i++) {
            var temp : PaperShape = new PaperShapes.PaperEmpty();
            if(shapes[i] instanceof Shapes.Circle) {
                temp = new PaperShapes.PaperCircle(<Shapes.Circle>shapes[i]);
            }
            else if(shapes[i] instanceof Shapes.Square) {
                temp = new PaperShapes.PaperSquare(<Shapes.Square>shapes[i]);
            }
            else if(shapes[i] instanceof Shapes.Triangle) {
                temp = new PaperShapes.PaperTriangle(<Shapes.Triangle>shapes[i]);
            }

            if(!(temp instanceof PaperShapes.PaperEmpty)) {
                console.log("temp is valid");
                if(this.shape == null)
                    this.shape = temp.getShape();
                else
                    this.shape = <Path>(this.shape.intersect(temp.getShape()));
            }
            
        }

        this.shape.closed = true;
        this.shape.fillColor = 'blue';
        console.log("Instancing PaperIntersection");
    }
}