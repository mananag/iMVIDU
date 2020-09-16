import React from 'react'
import Header from "./Header";
import Options from "./Options";
import AddOptions from "./AddOptions";

export default class Imvdu extends React.Component {
    state = {
        options: []
    }

    componentDidMount() {
        try {
            let options = JSON.parse(localStorage.getItem('options'))
            if (options) {
                this.setState(() => ({options}))
            }
        } catch (e) {
            //Do Nothing
        }
    }

    componentDidUpdate(prevProp, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            let json = JSON.stringify(this.state.options)
            localStorage.setItem('options', json)
        }
    }

    handleRemoveAll = () => {
        this.setState(() => ({options: []}))
    }
    handleRemoveOption = (option) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((op) => (!(option === op) && op))
        }))
    }

    handleAddOption = (option) => {
        if (!option) {
            return 'Enter valid value to add item'
        } else if (this.state.options.indexOf(option) > -1) {
            return ('This option already exists')
        }
        this.setState((prevState) => ({options: prevState.options.concat(option)}))
    }

    render() {

        return (
            <div>
                <Header/>
                <div className={'container'}>
                    <div className={'widget'}>
                        <Options options={this.state.options} handleRemoveAll={this.handleRemoveAll}
                                 handleRemoveOption={this.handleRemoveOption}/>
                        <AddOptions handleAddOption={this.handleAddOption}/>
                    </div>
                </div>
            </div>
        )
    }
}