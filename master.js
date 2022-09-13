{
    let i = 1

    function logDiv() {
        console.log('------------' + i + '------------')
        i++
    }
}

function getLog(log) {
    console.log(log)
}
//----------------------------------------//

//Setting up the board

const spots = document.querySelectorAll('.spot')
const map = ['', '', '', '', '', '', '', '', '']
let clicks = 0
let grid = document.querySelectorAll('.line')
let bot = 0

{

    function Start() {
        clicks = 0
        spots.forEach((element, index) => {
            element.style.opacity = 0
            setTimeout(() => {
                element.innerHTML = index + 1
            }, 400);
            element.setAttribute('data-stat', 'off')
            element.setAttribute('data-map', index + 1)
            element.style.color = 'rgba(255, 255, 255, 0.301)'
            element.style.textShadow = '0px 0px 0px transparent'
            element.style.background = 'transparent'
            setTimeout(() => {
                element.style.opacity = 1
            }, 500);
        });
        map.forEach(index => {
            map[index] = ''
        });
        grid.forEach(element => {
            element.style.background = 'rgb(54, 190, 0)'
            element.style.boxShadow = '0px 0px 10px rgb(0, 255, 21)'
        });
        document.getElementById('reset').style.background = 'rgb(0, 216, 18)'
        document.getElementById('reset').style.boxShadow = '0px 0px 20px rgb(0, 255, 21)'
    }


    Start()
}

//reset Button and 
{

    document.getElementById('reset').addEventListener('click', () => {
        Start()
        let tempX = document.querySelectorAll('.X')
        let tempO = document.querySelectorAll('.O')
        tempX.forEach(element => {
            element.classList.remove('X')
        });
        tempO.forEach(element => {
            element.classList.remove('O')
        });
        grid.forEach(element => {
            element.classList.remove('linesStart')
            element.classList.remove('linesReset')
            setTimeout(() => {
                element.classList.add('linesReset')
            }, 100);
            // alert()
        });
    })

}

//Board Click Events

{
    function placeData(where, what) {
        if (where.getAttribute('data-stat') == 'off') {
            where.innerHTML = what
            map[where.getAttribute('data-map') - 1] = what
            where.setAttribute('data-stat', what)
            where.classList.add(what)
            where.style.color = 'white'
            where.style.textShadow = '0px 0px 10px white'
            clicks++
        }
    }


    spots.forEach((element, index) => {
        element.addEventListener('click', () => {

            if (clicks % 2 == 0) {
                placeData(element, 'X')

            } else if (clicks % 2 == 1) {
                placeData(element, 'O')
            }

            // getLog(map)
            if (Judge('O') == 1) {
                getLog('O Has Won!!!')
            } else if (Judge('X') == 1) {
                getLog('X Has Won !!!')
            } else if (Judge('O') == -1) {
                getLog('Its a Tie!!')
                grid.forEach(element => {
                    element.style.background = 'rgb(255, 166, 0)'
                    element.style.boxShadow = '0px 0px 10px rgb(255, 196, 0)'
                });
                document.getElementById('reset').style.background = 'rgb(255, 166, 0)'
                document.getElementById('reset').style.boxShadow = '0px 0px 20px rgb(255, 196, 0)'

            }
            JudgeNod = []

        })

    });
}
//Numpad controll
document.getElementsByTagName('html')[0].addEventListener('keypress', (e) => {

    if (e.which > 48 && e.which < 58) {
        spots[e.which - 49].click()
    } else if (e.which == 114) {
        document.getElementById('reset').click()
    }

})

//winning Rules
const Winner = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]
let JudgeNod = []

function Judge(who) {
    let Player = document.querySelectorAll('.' + who)
    let PlayerMap = []

    Player.forEach((element) => {
        PlayerMap.push(element.getAttribute('data-map'))
    });

    let combo = 0
    let flag = 0
    let wonSpots = []

    Winner.forEach(scenario => {
        wonSpots.push(scenario)
        scenario.forEach(spot => {
            PlayerMap.forEach(played => {
                if (played == spot) {
                    combo++
                    wonSpots.push(played)
                    // getLog(wonSpots)
                }
            });
        });
        if (combo == 3) {
            flag = 1
            if (wonSpots.length == 4) {
                for (i = 1; i < 4; i++) {
                    spots[wonSpots[i] - 1].style.background = 'rgb(27, 95, 0)'
                }
            }
            spots.forEach(element => {
                element.setAttribute('data-stat', '-')
            });
        } else {
            if (combo == 2) {
                wonSpots.forEach(element => {
                    JudgeNod.push(element)
                });
            }
            BotMove()
            combo = 0
            wonSpots = []
        }
    });


    if (clicks == 9 && flag == 0) {
        flag = -1
    }
    return flag
}

//Me VS PC

let botToggle = document.getElementById('PCtoggle')
const botMoves = [5, 1, 3, 7, 9, 8, 4, 6, 2]

function botSwitch(element) {
    bot++
    if (bot % 2 == 1) {
        botToggle.style.background = 'rgb(255, 166, 0)'
        botToggle.style.boxShadow = '0px 0px 20px rgb(255, 196, 0)'
    } else {
        botToggle.style.background = 'rgb(70, 70, 70)'
        botToggle.style.boxShadow = '0px 0px 20px transparent'
    }
}

function BotMove() {
    JudgeNod = JudgeNod.join().split(',')
    getLog(JudgeNod)
    if (clicks % 2 == 1 && bot % 2 == 1) {
        for (i = (JudgeNod.length - 1); i > 0; i--) {
            getLog(i)
            // spots[Number(JudgeNod[i]-1)].click()   Hell danger!!
            placeData(spots[Number(JudgeNod[i] - 1)], 'O')
        }
    }
}