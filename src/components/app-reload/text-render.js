import { Component } from 'react';


class TextRender extends Component {

    renderItems(arr) {
        const items = arr.map((item, i) => {
            return (
                <span
                className='textItem'
                style={{color: item.color, backgroundColor: item.bacground}}
                key={i}>
                    {item.symb}</span>
            )
        })
        return items
    }

    renderFailue(arr) {
        const bad = Math.floor((arr.length - this.props.fail)/arr.length * 100);
        return (
            <>
                <span>{bad}%</span>
            </>
        )
    }


    render() {
        const {text, speed} = this.props;
        const content = this.renderItems(text);
        const failue = this.renderFailue(text);
        return(
            <div className='row mt-5 rounded shadow w-75 m-auto p-5'>
                <div className="col-10 fs-4">
                    {content}
                </div>
                <div className="col-2 text-center">
                    <div className="row mt-2 fs-3">
                        {failue}
                    </div>
                    <div className="row mt-5 fs-3">
                        <span>{speed} <br/> зн/мин</span>
                    </div>
                </div>    
            </div>
        )
        }
};

export default TextRender;