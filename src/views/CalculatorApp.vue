<template>
    <div class="container-fluid">
        <ActionBar v-bind:title="'Calculator'"/>
        <div class="container mt-3 home" style="max-width: 500px;">
            <div class="calculatorBase">
                <div class="form-group">
                    <input type="text" readonly placeholder="0" class="form-control" 
                    v-model="result"/>
                </div>
                <ul class="calculatorButtons btn-group">
                    <div>
                        <button 
                            class="btn btn-default operation" 
                            v-for="(button, index) in calcButtons.operation" 
                            v-bind:key="`operation_${index}`"
                            v-on:click="onInput(button)">
                            {{button.title}}
                        </button>
                        <button 
                            class="btn btn-default operand" 
                            v-for="(button, index) in calcButtons.operand" 
                            v-bind:key="`operand_${index}`" 
                            v-bind:style="{flexBasis: button.name === 'zero'?'65%':'30%'}"
                            v-on:click="onInput(button)">
                            {{button.title}}
                        </button>
                    </div>
                    <div>
                        <button 
                            class="btn btn-default operator" 
                            v-for="(button, index) in calcButtons.operator" 
                            v-bind:key="`operator_${index}`"
                            v-on:click="onInput(button)"
                            v-bind:class="[{active: button.name === currentOperator}]">
                            {{button.title}}
                        </button>
                    </div>
                </ul>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { buttons } from '../assets/json/calculatorButtons';
import { CalcButtonTypes } from '../interface/CalcButtonTypes';
import { CalcButtonProps } from '../interface/CalcButtonProps';
import ActionBar from '../components/ActionBar.vue';

@Component({
    components: {ActionBar}
})
export default class CalculatorApp extends Vue{
    calcButtons: CalcButtonTypes = {
        operation: [],
        operator: [],
        operand: []
    };
    currentOperand: string = "";
    currentOperator: string = "";
    result: string = "";
    operands: Array<number> = new Array<number>();

    created(){
        this.calcButtons.operation = buttons.filter((button: CalcButtonProps)=>button.type === "operation");
        this.calcButtons.operator = buttons.filter((button: CalcButtonProps)=>button.type === "operator");
        this.calcButtons.operand = buttons.filter((button: CalcButtonProps)=>button.type === "operand");
        this.calcButtons.operand = this.calcButtons.operand.reverse();
    }
    onInput(input: CalcButtonProps){
        console.log(input.title);
        switch(input.type){
            case "operation":this.performOperation(input);break;
            case "operator":this.addOperator(input);break;
            case "operand":this.appendOperand(input);break;
        }
    }
    performOperation(input: CalcButtonProps){
        switch(input.name){
            case "percentage": 
            if(this.currentOperator == "divide" || this.currentOperator == "multiply"){
                let nextOperand: number = parseInt(this.currentOperand);
                this.operands.push(nextOperand);
                if(this.currentOperator == "divide"){
                    nextOperand = this.calculate(this.operands, 'percentageBy');
                }
                else if(this.currentOperator == "multiply"){
                    nextOperand = this.calculate(this.operands, 'percentageOf');
                }
                this.result = nextOperand+"";
                this.operands = [];
                this.operands.push(nextOperand);
                this.currentOperand = "";
            }
            break;
            case "negate": 
            this.result = this.currentOperand = (parseFloat(this.result) * -1)+"";
            break;
            case "clear": 
            this.result = ""; 
            this.operands = []; 
            this.currentOperand = ""; 
            this.currentOperator = "";
            break;
        }
    }
    addOperator(input: CalcButtonProps){
        console.log(this.currentOperand);
        if(this.currentOperand !== ""){
            const nextOperand: number = parseInt(this.currentOperand);
            this.operands.push(nextOperand);
        }
        if(this.operands.length > 1){
            if(this.currentOperator !== ""){
                const nextOperand: number = this.calculate(this.operands, this.currentOperator);
                this.result = nextOperand+"";
                this.operands = [];
                this.operands.push(nextOperand);
            }
        }
        if(input.name !== "equal"){
            this.currentOperator = input.name;
            this.currentOperand = "";
        }
        else{
            this.currentOperator = "";
            this.currentOperand = this.result;
            this.operands = [];
        }
    }
    calculate(values: Array<number>, operator: string):number{
        console.log(values[0], values[1], operator);
        switch(operator){
            case "add": return values[0] + values[1];
            case "subtract": return values[0] - values[1];
            case "multiply": return values[0] * values[1];
            case "divide": return values[0] / values[1];
            case "percentageBy": return (values[0] / values[1]) * 100;
            case "percentageOf": return (values[0] * values[1]) / 100;
            case "equal": console.log(values[0], values[1], operator); break;
        }
        return 0;
    }
    appendOperand(input: CalcButtonProps){
        this.currentOperand += input.title;
        this.result = this.currentOperand;
    }
}
</script>
<style lang="scss" scoped>
.calculatorBase{
    .form-group{

        .form-control{
            font-size: 2rem;
            text-align: right;
            border: none;
            color: #222;
        }
    }
}
.calculatorButtons{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0;
}
.calculatorButtons>div{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    flex-direction: row-reverse;

    .btn{
        cursor: pointer;
        width: 4rem;
        height: 4rem;
        text-align: center;
        margin-bottom: 0.5rem;
        font-size: 2rem;
        font-weight: 600;
        box-shadow: 0 4px 0 #444;
        transition: all 1s ease;
    }
}
.calculatorButtons>div:first-child{
    flex-basis: 75%;
    .btn{
        flex-basis: 30%;
    }
}
.calculatorButtons>div:last-child{
    flex-basis: 25%;
    .btn{
        flex-basis: 90%;
    }
}
.operator{
    background-color: rgb(255, 192, 17);
    color: #222;
}
.operator.active,
.operator:focus{
    box-shadow: inset 0 0 0 4px rgb(161, 118, 0) !important;
    transition: all 1s ease !important;
}
.operand{
    background-color: rgb(48, 48, 48);
    color: white;
}
.operand:focus{
    box-shadow: inset 0 0 0 4px rgb(20, 20, 20);
    transition: all 1s ease !important;
}
.operation{
    background-color: rgb(148, 148, 148);
    color: black;
}
.operation:focus{
    box-shadow: inset 0 0 0 4px rgb(85, 85, 85);
    transition: all 1s ease !important;
}
</style>
