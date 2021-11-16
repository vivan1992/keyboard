import {Component} from 'react';
import {Button} from 'react-bootstrap';
import TextLorem from '../../services/text-lorem';
import TextRender from '../app-reload/text-render';



class App extends Component {

    state = {
        text: [''],
        i: 0,
        fail: 0,
        timer: false,
        speed: 0,
        t: 0
    }

    componentDidMount() {
        this.updateText();
        this.renderTimer();
        document.addEventListener('keydown', (e) => {
            if (e.key !== 'Shift' && this.state.i < this.state.text.length) {
                this.checkSymb(this.state.text, e.key)}
            })
           
    }

    textLorem = new TextLorem();

    onTextLoaded = (arr) => {
        this.setState({
            text: arr.map(item => (
                {
                symb: item,
                color: 'gray',
                bacground: 'white'
                }
            ))
        })
          
    } 

    updateText = () => {
        this.textLorem.getText()
        .then(this.onTextLoaded)
    }

    checkSymb = (arr, key) => {
        if (arr[this.state.i].symb === key) {
            this.setState({
                text: arr.map((item, j) => {
                    if (this.state.i === j) {
                        return {...item, color: 'green', bacground: 'white'}
                    }
                    return item
                }),
                i: this.state.i + 1,
                timer: true
            });
        } else {
            this.setState({
                text: arr.map((item, j) => {
                    if (this.state.i === j) {
                        return {...item, bacground: 'red'}
                    }
                    return item
                }),
                fail: this.state.fail + 1
            })
        }

    }
   


    renderTimer = () => {
        this.timerId = setInterval(() => {
            if (this.state.timer && this.state.i < this.state.text.length) {    
                this.setState(({i, t}) => ({
                    speed: Math.floor((i / t) * 60),
                    t: t + 1
                }))
            }  
        }
        ,1000);
    }
   
    startOver = () => {

        
        this.setState({
            text: [''],
            i: 0,
            fail: 0,
            timer: false,
            speed: 0,
            t: 0
        });
        this.updateText();
        this.renderTimer();
        clearInterval(this.timerId);
    }

    componentWillUnmount() {
        console.log('unmount');
    }
    
   
   
    render() {
    const {text, fail, timer, speed} = this.state;

        return (
            <div className='container'>
                <TextRender
                text={text}
                fail={fail}
                timer={timer}
                speed={speed}
                />
                <Button variant="primary"
                        className='my-3 mx-auto d-block'
                        onMouseDown={(e) => {
                            e.preventDefault();
                            this.startOver();
                        }}
                        >Начать заново
                </Button>
            </div>
        );
    }
};

export default App;