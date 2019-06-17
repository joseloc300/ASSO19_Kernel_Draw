import { Kernel } from './model/Kernel';
import { UI } from './view/UI';
import * as UIs from './view';
import { Controller } from './controller/Controller';
import { Problem } from './model/Problem';
import { Rectangle, Path, Color, Point, Size } from 'paper';
import * as Shapes from './model/shapes';

//PARA JA NAO É PRECISO, MAS NUNCA SE SABE NO FUTURO COM COISAS EM FICHEIROS DIFERENTES
//paper.install(window); // Make the paper scope global, by injecting it into window (É importante fazer quando a apalicaçao abre)

var model: Kernel = new Kernel();
var controller: Controller;

window.onload = () => {
    console.log("BOASSSS");

    //paper.project.clear();  //so faz clear do canvas atual (nest caso myCanvas2)
    
    //PARA JA NAO É PRECISO, MAS NUNCA SE SABE NO FUTURO COM COISAS EM FICHEIROS DIFERENTES
    //paper.view.draw()

    var drawCanvas = <HTMLCanvasElement>document.getElementById('drawCanvas');
    var problemCanvas = <HTMLCanvasElement>document.getElementById('problemCanvas');
    var currentProblem = <HTMLLabelElement>document.getElementById('currentProblem');

    var compileButton = <HTMLElement>document.getElementById('compile');
    var nextButton = <HTMLElement>document.getElementById('step');
    var runButton = <HTMLElement>document.getElementById('run');
    var nextProblemButton = <HTMLElement>document.getElementById('nextProblem');
    var infoZone = <HTMLElement>document.getElementById('info');
    
    console.log("compileButton", compileButton);
    console.log("info zone", infoZone);
    var view: UI = new UIs.PaperUI(drawCanvas, problemCanvas, currentProblem, compileButton, nextButton, runButton, nextProblemButton, infoZone);
    controller = new Controller(model, view);

    var problems: Array<Problem> = defineProblems();
    model.setProblems(problems); //TO DO: passar os problems pelo construtor do Kernel
    view.updateProblem(model.getProblemIterator(), model.getProblems());
    controller.drawProblem(); 

    let core1 = <HTMLTextAreaElement> document.getElementById('core1_instructions');
    let core2 = <HTMLTextAreaElement> document.getElementById('core2_instructions');
    let core3 = <HTMLTextAreaElement> document.getElementById('core3_instructions');

    if(compileButton) 
        compileButton.onclick = controller.compile.bind(controller);

    if(nextButton)
        nextButton.onclick = controller.next.bind(controller);

    if(runButton)
        runButton.onclick = controller.run.bind(controller);

    if(nextProblemButton)
        nextProblemButton.onclick = controller.nextProblem.bind(controller);

    if(core1 && core2 && core3) {
        core1.onkeydown = controller.coreChanged.bind(controller);
        core2.onkeydown = controller.coreChanged.bind(controller);
        core3.onkeydown = controller.coreChanged.bind(controller);
    }
}

function defineProblems(): Array<Problem> {
    return [problem1(), problem2(), problem3(), problem4()];
}

function problem1(){
    let square = new Shapes.Square("square", 0, 0, 50);
    let circle = new Shapes.Circle("circle", 25, 25, 25);
    return new Problem(15, square, circle);
}

function problem2(){
    let triangle1 = new Shapes.Triangle("triangle1", 100, 100, 400, 100, 100, 450);
    let triangle2 = new Shapes.Triangle("triangle1", 150, 450, 450, 450, 450, 100);
    let square = new Shapes.Square("square", 200, 200, 150);
    let inter = new Shapes.Intersection("inter", [square, triangle1]);
    return new Problem(15, inter);
}

function problem3(){
    let square1 = new Shapes.Square("square1", 100, 100, 150);
    let square2 = new Shapes.Square("square2", 300, 100, 150);
    let circle = new Shapes.Circle("circle", 275, 175, 25);
    return new Problem(15, square1, square2, circle);
}

function problem4(){
    let circle1 = new Shapes.Circle("circle1", 275, 275, 100);
    let circle2 = new Shapes.Circle("circle2", 275, 175, 75);
    let triangle = new Shapes.Triangle("triangle", 100, 350, 450, 350, 275, 50);
    let inter = new Shapes.Intersection("inter", [circle1, circle2, triangle]);
    return new Problem(50, inter);
}

//EXAMPLE PAPER STUFF FOR QUICK ACCESS
/*
paper.setup('drawCanvas'); // É importante fazer quando a apalicaçao abre, para o paperjs saber em que canvas vai desenhar

var rectangle = new Rectangle(new Point(0, 0), new Size(50, 50));
var path = new Path.Rectangle(rectangle);
path.strokeColor = 'black';

var myCircle = new Path.Circle(new Point(100, 70), 50);
myCircle.strokeColor = 'black';
myCircle.selected = true;

paper.setup('problemCanvas');

var path = new Path();
path.strokeColor = new Color('black');
var start = new Point(100, 100);
path.moveTo(start);
path.lineTo(start.add(new Point(200, -50 )));
*/