var React = require('react');
var ReactDOM = require('react-dom');

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
    componentDidMount: function() {
        var that = this;
        window.addEventListener('keydown', this.handleAction, false);
        this.refs.hero.addEventListener('webkitAnimationEnd', function(e) {
            that.setState({ heroJump: false });
        }, false);
    },
    render: function() {
        return (
            <div className="stage">
                <div className="bg"></div>
                <div className={this.state.heroJump ? 'hero jump' : 'hero'} ref="hero"></div>
            </div>
        );
    }
});

ReactDOM.render(
    <GameStage />,
    document.getElementById('game-stage')
);
