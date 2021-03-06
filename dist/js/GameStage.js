webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(35);
	var SCREEN_WIDTH = 800;
	var SCREEN_HEIGHT = 480;
	var HIDE_CACHE = 25;
	var Tick = null;
	var time = 0;

	var GameStage = React.createClass({
	    displayName: 'GameStage',

	    getInitialState: function getInitialState() {
	        return {
	            gameState: 1,
	            heroJump: false,
	            monsterType: 'monster0',
	            monsterAni: {
	                animation: 'monsterMove 2s linear infinite'
	            }
	        };
	    },
	    handleAction: function handleAction(e) {
	        var state = this.state;
	        if (state.gameState) {
	            switch (e.keyCode) {
	                // space
	                case 32:
	                    this.setState({ heroJump: true });
	                    break;
	                // left
	                case 37:
	                    break;
	                // right
	                case 39:
	                    break;
	            }
	        } else if (e.keyCode === 13) {
	            // enter
	            this.handleReplay();
	        }
	        // console.log(e.keyCode);
	    },
	    handleReplay: function handleReplay(e) {
	        time = 0;
	        this.setState({
	            gameState: 1
	        });
	        this.gameTick();
	    },
	    gameTick: function gameTick() {
	        var that = this,
	            heroStyle,
	            matrix,
	            heroX,
	            heroY,
	            heroW,
	            heroH,
	            monsStyle,
	            monsX,
	            monsY,
	            monsW,
	            monsH,
	            type;
	        Tick = window.setInterval(function () {
	            that.refs.debug;
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

	            if (monsX <= heroX + heroW && monsX >= heroX - heroW && heroY <= monsY + monsH) {
	                // console.log('collision', monsX, heroY)
	                // game over
	                that.gameOver();
	            }

	            that.refs.debug.innerHTML = '\n                Debug info<br />\n                heroX: ' + heroX + ', heroY: ' + heroY + '<br />\n                monsX: ' + monsX + ', monsH: ' + monsH + '<br />\n                ' + time / 1000 + '\n                ';

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
	    gameOver: function gameOver() {

	        // clear cache data
	        this.setState({
	            gameState: 0
	        });
	        window.clearInterval(Tick);
	        // Tick = null;
	    },
	    componentDidMount: function componentDidMount() {
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
	    render: function render() {
	        var state = this.state;
	        return React.createElement(
	            'div',
	            { className: 'stage' },
	            React.createElement('div', { className: state.gameState ? 'bg bgmove' : 'bg' }),
	            React.createElement('div', { className: state.heroJump ? 'hero jump' : 'hero', ref: 'hero' }),
	            React.createElement('div', { className: 'monster ' + state.monsterType,
	                style: state.gameState ? state.monsterAni : {},
	                ref: 'monster' }),
	            React.createElement(
	                'div',
	                { className: 'debug', ref: 'debug' },
	                React.createElement(
	                    'div',
	                    null,
	                    'mypos: '
	                ),
	                React.createElement(
	                    'div',
	                    null,
	                    'mspos: '
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: state.gameState ? 'hide' : 'game-over' },
	                React.createElement(
	                    'div',
	                    { className: 'replay', onClick: this.handleReplay },
	                    'Replay'
	                )
	            )
	        );
	    }
	});

	ReactDOM.render(React.createElement(GameStage, null), document.getElementById('game-stage'));

/***/ }
]);