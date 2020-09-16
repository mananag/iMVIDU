import React from 'react'
import Option from "./Option";

class Options  extends React.Component{
    state ={
        filteredOption : undefined
    }
    handleSearch = (e) => {
        const filteredOption = this.props.options.filter((option) => option.toLowerCase().includes(e.target.value.toLowerCase()))
        this.setState(() => ({
            filteredOption
        }))
    }
    render () {
        return(
                <div>
                    <div className={'widget-header'}>
                        <input type={'text'} name={'search'} placeholder={'Search'} onChange={this.handleSearch} className={'searchInput'} />
                        <button onClick={this.props.handleRemoveAll} className={'button button-link'}>Remove All</button>
                    </div>
                    {console.log(this.state.filteredOption)}
                    {this.props.options.length === 0 && <p className={'widget-message'}>Add options to get Started!!</p>}
                    {this.state.filteredOption?(this.state.filteredOption.map((option, index) => (
                        <Option key={option} optionText={option} handleRemoveOption={this.props.handleRemoveOption}
                                count={index + 1}/>
                    ))):(this.props.options.map((option, index) => (
                        <Option key={option} optionText={option} handleRemoveOption={this.props.handleRemoveOption}
                                count={index + 1}/>
                    )))}
                </div>
            )
    }
}
export default Options