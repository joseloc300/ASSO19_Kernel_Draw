import { Command } from '../commands/Command';
import { Expression } from './Expression';

export class DrawExpression extends Expression {
    constructor(private rootExpression: Expression){ super(null); }

    public interpret(context: string): boolean {
        // atraves do id da shape, ir buscar objeto shape ao kernel
        //algures rootExpression.addError()
        //rootExpression.setCommand()
        return false;
    }
}