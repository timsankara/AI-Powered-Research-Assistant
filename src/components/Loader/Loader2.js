import React, { Component } from 'react';

class Loader extends Component {
    render() {
        return (
            <div className="text-center mt-4">
                <div className='loader'></div>
                <br />
                {this.props.color ?
                    <h5 className='text-dark text-xl font-bold rubik-font'>{this.props.message}</h5>
                    :
                    <h5
                        className='text-white text-xl font-bold rubik-font'
                    >{this.props.message}</h5>
                }
            </div>
        );
    }
}

export default Loader;
