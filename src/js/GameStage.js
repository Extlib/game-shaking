var React = require('react');
var ReactDOM = require('react-dom');
const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 480;
var Tick;

var GameStage = React.createClass({
    getInitialState: function() {
        return {
            gameState: 1,
            heroJump: false
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
        }
        console.log(e.keyCode);
    },
    gameTick: function() {
        var that = this;
        Tick = window.setInterval(function() {
            //that.refs.debug
            var heroStyle = window.getComputedStyle(that.refs.hero, null);
            var matrix = heroStyle.transform.split(',');
            var heroY = parseInt(matrix[matrix.length - 1]) || 0;
            var heroX = heroStyle.left;

            var monsStyle = window.getComputedStyle(that.refs.monster, null);
            matrix = monsStyle.transform.split(',');
            var monsX = SCREEN_WIDTH + (parseInt(matrix[matrix.length - 2]) || 0);
            var monsY = monsStyle.bottom;

            that.refs.debug.innerHTML = 
                `
                Debug info<br />
                heroX: ${heroX}, heroY: ${-heroY}px<br />
                monsX: ${monsX}px, monsY: ${monsY}<br />
                <span class="collision">collision!</span>
                `;
        }, 20);
    },
    componentDidMount: function() {
        var that = this;
        window.addEventListener('keydown', this.handleAction, false);
        this.refs.hero.addEventListener('webkitAnimationEnd', function(e) {
            that.setState({ heroJump: false });
        }, false);
        this.gameTick();
    },
    render: function() {
        return (
            <div className="stage">
                <div className="bg"></div>
                <div className={this.state.heroJump ? 'hero jump' : 'hero'} ref="hero"></div>
                <div className="monster monster1" ref="monster"></div>
                <div className="debug" ref="debug">
                    <div>mypos: </div>
                    <div>mspos: </div>
                </div>
            </div>
        );
    }
});

ReactDOM.render(
    <GameStage />,
    document.getElementById('game-stage')
);
