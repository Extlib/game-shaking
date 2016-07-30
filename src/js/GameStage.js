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
                    state.setState({ heroJump: true });
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
        window.addEventListener('keydown', this.handleAction, false);
    },
    render: function() {
        return (
            <div className="stage">
                <div className="bg"></div>
                <div className="hero"></div>
            </div>
        );
    }
});

ReactDOM.render(
    <GameStage />,
    document.getElementById('game-stage')
);
