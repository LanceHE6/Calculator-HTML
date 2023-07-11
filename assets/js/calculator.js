function addStr(str){
    const ops = ["+", "-", "X", "÷"];
    const inputText = document.getElementsByClassName("inp")[0].value;
    const lastStr = inputText.slice(-1); // 获取最后一个字符 
    const firstStr = inputText.slice(0, 1);// 获取第一个字符
    // 运算符数量
    const pointNum = (inputText.match(/[.]/g) || []).length; //使用||[]将返回值转换为数组，避免在null情况下使用length属性出错。
    // 小数点数量
    let opsNum = (inputText.match(/[+\-X÷]/g) || []).length;
    // 判断一个数输入多个小数点
    if (firstStr === "-") opsNum--; // 第一个数为负数时忽略
    if(pointNum - opsNum === 1 && str === ".") return;
    
    if(lastStr === "." && ops.indexOf(str) > -1) return;
    // 第一个数字为0，第二个字符不为.时， 去掉0
    if(lastStr === "0" && !ops.indexOf(str) > -1 && str !== "." && inputText.length === 1){
        document.getElementsByClassName("inp")[0].value = str;
        return;
    }
    // 判断第一个数字重复输入0
    if(lastStr === "0" && inputText.length === 1 && str === 0) return;
    // 判断重复输入运算符
    if(ops.indexOf(lastStr) > -1 && ops.indexOf(str) > -1) return;
    if(document.getElementsByClassName("result")[0].value !== '' &&
        inputText === '' &&
        ops.indexOf(str) > -1){
        document.getElementsByClassName("inp")[0].value =
            document.getElementsByClassName("result")[0].value + str;
        return;
    }
    // 如果未输入数字，直接输入运算符或者小数点，会在前面加上一个0
    if((inputText === '' || ops.indexOf(lastStr) > -1) 
        && (ops.indexOf(str) > -1 || str === ".") 
        && str !== "-"){
        document.getElementsByClassName("inp")[0].value += "0"
    }
    document.getElementsByClassName("inp")[0].value += str
    document.getElementsByClassName("inp")[0].scrollLeft 
        = document.getElementsByClassName("inp")[0].scrollWidth;// 自动滚动到最右边
    
}

function calculate(){
    let expression = document.getElementsByClassName("inp")[0].value
        .replace("X", "*").replace("÷", "/").replace("=", "")
    document.getElementsByClassName("result")[0].value = eval(expression)
    document.getElementsByClassName("inp")[0].value = ''
}

function clean(){
    document.getElementsByClassName("inp")[0].value = ''
    document.getElementsByClassName("result")[0].value = ''
}

function backspace(){
    document.getElementsByClassName("inp")[0].value = document.getElementsByClassName("inp")[0].value.slice(0, -1)
}

// 监听键盘输入
window.onkeydown= function (ev) {
    const validInput = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", "-", "*", "/", "=", ".", "Enter" , "Backspace"];
    if(validInput.indexOf(ev.key) > -1){
        if(ev.key === "=" || ev.key === "Enter"){
            calculate();
        }
        else if(ev.key === "Backspace"){
            backspace();
        }
        else if(ev.key === "*"){
            addStr("X");
        }
        else if(ev.key === "/"){
            addStr("÷");
        }
        else {
            addStr(ev.key);
        }
    }
}