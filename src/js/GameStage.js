var React = require('react');
var ReactDOM = require('react-dom');
const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 480;
const HIDE_CACHE = 25;
var Tick = null;
var time = 0;

var GameStage = React.createClass({
    getInitialState: function() {
        return {
            gameState: 1,
            heroJump: false,
            monsterType: 'monster0',
            monsterAni: {
                animation: 'monsterMove 2s linear infinite'
            }
        };
    },
    handleAction: function(e) {
        var state = this.state;
        if (state.gameState) {
            switch(e.keyCode) {
                // space
                case 32:
                    this.setState({ heroJump: true });
                    break;
                // left
                case 37: break;
                // right
                case 39: break;
            }
        } else if (e.keyCode === 13) {
            // enter
            this.handleReplay();
        }
        // console.log(e.keyCode);
    },
    handleReplay: function(e) {
        time = 0;
        this.setState({
            gameState: 1
        });
        this.gameTick();
    },
    gameTick: function() {
        var that = this, heroStyle, matrix, heroX, heroY, heroW, heroH, monsStyle, monsX, monsY, monsW, monsH, type;
        Tick = window.setInterval(function() {
            that.refs.debug
            // heroStyle = window.getComputedStyle(that.refs.hero, null);
            // matrix = heroStyle.transform.split(',');
            // heroW = parseInt(heroStyle.width);
            // heroH = parseInt(heroStyle.height);
            // heroY = Math.abs(parseInt(matrix[matrix.length - 1]) || 0);
            // heroX = parseInt(heroStyle.left);
            //
            // monsStyle = window.getComputedStyle(that.refs.monster, null);
            // matrix = monsStyle.transform.split(',');
            // monsW = parseInt(monsStyle.width);
            // monsH = parseInt(monsStyle.height);
            // monsX = SCREEN_WIDTH + (parseInt(matrix[matrix.length - 2]) || 0);
            // monsY = parseInt(monsStyle.bottom);
            heroStyle = window.getComputedStyle(that.refs.hero, null);
            heroW = parseInt(heroStyle.width);
            heroH = parseInt(heroStyle.height);
            heroX = parseInt(heroStyle.left);
            heroY = parseInt(heroStyle.bottom);

            monsStyle = window.getComputedStyle(that.refs.monster, null);
            monsW = parseInt(monsStyle.width);
            monsH = parseInt(monsStyle.height);
            monsX = parseInt(monsStyle.left);
            monsY = parseInt(monsStyle.bottom);

            if (monsX < -monsW - HIDE_CACHE) {
                type = 'monster' + Math.floor(Math.random() * 3);
                that.setState({ monsterType: type });
            }

            if ((monsX <= (heroX + heroW)) && ((monsX >= (heroX - heroW))) && (heroY <= monsY + monsH)) {
                // console.log('collision', monsX, heroY)
                // game over
                that.gameOver();
            }

            that.refs.debug.innerHTML =
                `
                Debug info<br />
                heroX: ${heroX}, heroY: ${heroY}<br />
                monsX: ${monsX}, monsH: ${monsH}<br />
                ${time/1000}
                `;

            time += 20;

            if (time / 1000 > 10) {
                that.setState({ 
                    monsterAni: {
                        animation: 'monsterMove 1.5s linear infinite'
                    }
                });
            }
        }, 20);
    },
    gameOver: function () {

        // clear cache data
        this.setState({
            gameState: 0
        });
        window.clearInterval(Tick);
        // Tick = null;
    },
    componentDidMount: function() {
        var that = this;
        window.addEventListener('keydown', this.handleAction, false);
        this.refs.hero.addEventListener('webkitAnimationEnd', function (e) {
            that.setState({ heroJump: false });
        }, false);
        window.addEventListener('touchstart', function (e) {
            if (that.state.gameState) {
                that.setState({ heroJump: true });
            }
            // console.log('move')
        }, false);
        this.gameTick();
    },
    render: function() {
        var state = this.state;
        return (
            <div className="stage">
                <div className={state.gameState ? 'bg bgmove' : 'bg'}></div>
                <div className={state.heroJump ? 'hero jump' : 'hero'} ref="hero"></div>
                <div className={'monster ' + state.monsterType}
                    style={state.gameState ? state.monsterAni : {}}
                    ref="monster">
                </div>
                <div className="debug" ref="debug">
                    <div>mypos: </div>
                    <div>mspos: </div>
                </div>

                {/* other component */}
                <div className={state.gameState ? 'hide' : 'game-over'}>
                    <div className="replay" onClick={this.handleReplay}>Replay</div>
                </div>
            </div>
        );
    }
});

ReactDOM.render(
    <GameStage />,
    document.getElementById('game-stage')
);
