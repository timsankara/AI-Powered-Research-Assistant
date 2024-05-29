import React, { Component } from 'react';

class Loader extends Component {
    render() {
        return (
            <div className="text-center mt-4">
                <div className="text-blueGray-500 p-3 magic-hat2 text-center w-12 h-3 shadow-lg rounded-full mx-2 bg-green inline-flex items-center justify-center"></div>
                <div className="text-blueGray-500 p-3 magic-hat2 text-center w-12 h-3 shadow-lg rounded-full mx-2 bg-green inline-flex items-center justify-center"></div>
                <div className="text-blueGray-500 p-3 magic-hat2 text-center w-12 h-3 shadow-lg rounded-full mx-2 bg-green inline-flex items-center justify-center"></div>
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
