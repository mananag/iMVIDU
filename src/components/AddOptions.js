import React from 'react'

export default class AddOptions extends React.Component{
    state = {
        error: undefined
    }
    handleAddOption = (e) => {
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        e.target.elements.option.value = '';
        const error = this.props.handleAddOption(option);
        this.setState (() => ({
            error
        }))
    }
    render () {
        return (
            <div>
                {this.state.error && <p className={'addOption-error'}>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption} className={'addOptions'}>
                    <input type={'text'} name={'option'} />
                    <button className={'button'}>Add Option</button>
                </form>
            </div>
        )
    }
}