class Table {
    constructor() {
        this.players = []
        //TODO: create RealEstates (this has to be manually)
        realEstates = [
            new RealEstate({})
        ]
    }

    addPlayer(player) {
        this.players.push(player)
    }
    updateTable() {
        // BE CONSTANTLY ASKING SERVER FOR CHANGES?
        // SERVER WILL NOTIFY CHANGES?
        return
    }
}
class RealEstate {
    constructor(props) {
        this.owner = null;
        this.mortaged = false;
    }

    buy(player) {
        player.money -= this.value;
        player.addCard(this);
        this.owner = player;
    }

    mortage() {
        this.mortaged = true;
        this.owner.money += this.mortageValue;
    }
}
function playDices() {
    //popup para mover dados
    //return { value: value, doubled: true/false}
    return
}
class Player {
    constructor(props) {
        this.name = this.getName();
        this.position = 0;
        this.money = 1500;
        this.cards = [];
        this.prision = false;
        this.outPrisionCard = false;

        this.playingTable = props.playingTable
        props.playingTable.addPlayer(this)
        return
    }
    getName() {
        return 'Player';
    }

    //TODO: Cards update/add/remove
}

class You extends Player {
    constructor(props) {
        super(props)
        this.createMyselfOnServer();
    }
    getName() {
        return this.askForName();
    }
    askForName() {
        do {
            var name = prompt('Como es tu nombre?')
            var confirm = window.confirm(`Tu nombre es ${name}`)
        } while(confirm === false)
        
        return name
    }
    createMyselfOnServer() {
        //TODO: send a resquest to the server creating your player
        return
    }

    move(positions) {
        this.position += positions
        this.playingTable.updateTable()
        var realEstate = this.playingTable.getRealEstate(this.position)
        if (realEstate.forSale) {
            this.askBuy(realEstate)
        } else {
            this.payRent(realEstate)
        }
    }

    askPayOutPrision() {
        return false;
    }

    play() {
        //TODO: double dices 3 times goes to prision
        if(!this.prision){
            var dices = playDices()
            this.move(dices.value)
        } else {
            if(this.outPrisionCard) {
                this.prision = false;
                this.play()
            } else {
                var paidOutPrision = this.askPayOutPrision()
                if(paidOutPrision) {
                    this.prision = false;
                    this.play()
                } else {
                    var dices = playDices()
                    if(dices.doubles) {
                        this.move(dices.doubles)
                    }
                }
            }
        }
        return
    }
    askBuy(realEstate) {
        return
    }
    payRent(realEstate) {
        return
    }
    negotiate() {
        return
    }

    buy() {
        return
    }

    mortage() {
        return
    }
}

class Friend extends Player {
    constructor(props) {
        super(props)
        this.name = props.name;
    }
    move(position) {
        this.position = position;
    }
}

class Game {
    constructor() {
        this.table = new Table()
        this.you = new You({playingTable: this.table})
        this.friends = [];
        this.getFriendsFromServer()
    }

    async getFriendsFromServer() {

        // TODO: get friends from server
        var serverFriends = [
            {
                name: 'Lautaro',
                money: 1500,
                prision: false,
                cards: [],
                position: 0,
            },
            {
                name: 'Marianella',
                money: 1500,
                prision: false,
                cards: [],
                position: 0,
            },
            {
                name: 'Gaby',
                money: 1500,
                prision: false,
                cards: [],
                position: 0,
            }
        ];

        if (serverFriends.length < 3) {
            setTimeout( () => {
                this.getFriendsFromServer()
            }, 500);
        } else {
            this.friends = serverFriends.map(serverFriend => {
                serverFriend.playingTable = this.table;
                return new Friend(serverFriend)
            })

            return this.startGame()
        }
    }

    startGame() {
        console.log(this.table)
        console.log(this.you)
        console.log(this.friends)
    }
}

$(document).ready(() => {
    new Game()
})