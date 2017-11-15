document.getElementById('sE1').onclick = function() {
    const Caption1 = document.getElementById ("inf1");
    const Caption2 = document.getElementById ("inf2");
    const Caption3 = document.getElementById ("inf3");
    const Caption4 = document.getElementById ("inf4");
    Caption2.innerHTML = 'Input an array which you want to be used for diamond: <input  type="text" size="20" id="input" value="yay">';
    Caption3.innerHTML = 'Input Heigth of Diamond: <input  type="text" size="10" id="input2" value="12"><button  id="button">Draw!</button>';
    Caption4.innerHTML = 'I used "Recursive" in this code.'
    const input = document.getElementById("input");
    const heigth = document.getElementById ("input2");


    const printDiamond = function (length, character) {
        if (!(length % 2)) {
            length ++;
            }
        const stringBuilder = function (length, character) {
            let output = '';
            const recursive1 = function (i) {
                if (i <= length) {
                    output += character;
                    recursive1 (i + 1);
                } else {
                    return;
                }
            }
            recursive1 (1);
            return output;
            }
        const modCharacter = function (character) {
            return character + stringBuilder (character.length, ` `);
            }
        const hypotenuse = (length - 1) / 2;
        const recursive2 = function (i) {
            if (i <= hypotenuse) {
                console.log(stringBuilder ((hypotenuse - i + 1) , stringBuilder ((modCharacter (character)).length / 2, ' ')) + stringBuilder (i, modCharacter (character)));
                return recursive2 (i + 1);
            } else {
                return i;
            }
        }
        var i = recursive2 (1);
        console.log(stringBuilder ((hypotenuse - i) , stringBuilder ((modCharacter (character)).length / 2, ' ')) + stringBuilder (i, modCharacter (character)));
            i--;
        const recursive3 = function (j) {
            if ( j >= 1) {
                console.log(stringBuilder ((hypotenuse - j + 1) , stringBuilder ((modCharacter (character)).length / 2, ' ')) + stringBuilder (j, modCharacter (character)));
                recursive3 (j - 1);
            } else {
                return;
            }
        }
        recursive3 (i);
        }
        button.onclick = function() {
            printDiamond (heigth.value, input.value);
        }
    };
