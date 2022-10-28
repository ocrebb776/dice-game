let cl = document.getElementById('cl')
let roll = document.getElementById('roll')
let img = ['1.svg', '2.svg', '3.svg', '4.svg', '5.svg', '6.svg']
let dice = [
    document.getElementById('1'),
    document.getElementById('2')
]
let summa = [
    document.getElementById('popup'),
    document.getElementById('winner'),
    document.getElementById('wscore'),
    document.getElementById('looser'),
    document.getElementById('lscore'),
    document.getElementById('diff')
]
let rolled = false
let scores = [0, 0]
let rs = []
let p = 0
let round = 1
scoreb = [
    [
        document.getElementById('pl1'),
        document.getElementById('pl2')
    ],
    [
        document.getElementById('pl1s'),
        document.getElementById('pl2s')
    ]
]

let rolld = function() {
    if (round != 6) {
        roll.innerHTML = "Roll"
            //random number
        rs = [Math.trunc(Math.random() * 5), Math.trunc(Math.random() * 5)]
        dice[0].src = 'img/dice.png'
            // shakes first dice this takes 1000ms
        shake(0)
            // after 1000ms it will change the face of the  first dice to the random number genarated (aysinc waits until animation is finished)
        setTimeout(function() {
            dice[0].src = `img/${img[rs[0]]}`
        }, 1000)
        dice[1].src = 'img/dice.png'
            // shakes second dice
        shake(1)
            //same as before but for second dice aysinc
        setTimeout(function() {
            dice[1].src = `img/${img[rs[1]]}`
        }, 1000)
        setTimeout(function() { //completed after both aysinc things(2000 ms delay)
            rs[0] += 1 //0-5 to 1-6 
            rs[1] += 1

            scores[p] += rs[0] + rs[1] //adds score

            if ((rs[0] + rs[1]) % 2 == 0) {
                scores[p] += 10 //bonus for total being even
            } else {
                scores[p] -= 5 // penalty for it being odd
            }

            if (scores[p] < 0) {
                scores[p] = 0 //makes sure that score is never negative
            }

            if (rs[0] == rs[1]) {
                roll.innerHTML = "roll again" //if it is a double rolled it will roll again option 
                rres() //reenables button

            } else {
                scoreb[0][p].classList.remove("act"); //removes border on player
                if (p == 0) {
                    p = 1
                } else {
                    round += 1
                    document.getElementById('round').innerHTML = round
                    p = 0
                } //swaps playeer



            }
            scoreb[0][p].classList.add("act"); //add border on new player


            rres() //re enables button
            updatescores() // updates scores


        }, 2000)

    } else {
        if (scores[0] != scores[1]) {
            summa[0].style.display = "block" // enables new screen
            winner() // calculates winner
        }
    }
}

function rdis() {
    roll.disabled = true
    rolled = false
    rolld();
}

function rres() {
    checkFlag()
    roll.disabled = false
}
//  loop for button presses
function checkFlag() {
    if (rolled === false) {
        window.setTimeout(checkFlag, 100);
    } else {
        rdis()
    }
}
checkFlag()
    // viusal
function shake(dice) {
    var direct = ['left', 'right']
    $(`#${dice+1}`).effect("shake", {
        times: 4,
        direction: direct[dice]
    }, 1000);

}
// updates scores either side of the play area
function updatescores() {
    scoreb[1][0].innerHTML = scores[0]
    scoreb[1][1].innerHTML = scores[1]
}
// displays who the winner is
function winner() {
    if (scores[0] > scores[1]) {
        summa[1].innerHTML = 1
        summa[2].innerHTML = scores[0]
        summa[3].innerHTML = 2
        summa[4].innerHTML = scores[1]
        summa[5].innerHTML = scores[0] - scores[1]
    } else {
        summa[1].innerHTML = 2
        summa[2].innerHTML = scores[1]
        summa[3].innerHTML = 1
        summa[4].innerHTML = scores[0]
        summa[5].innerHTML = scores[1] - scores[0]
    }
}
cl.oninput = function() {
    document.getElementById('col').innerHTML = `<style>:root {--accent: ${cl.value};}</style>`

}