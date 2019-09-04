import React from 'react'

const Filter = (props) => {

    return (
     <input value={props.searchText}
            onChange={(e) => props.handleChangeSearchText(e.target.value)}/>
    )
}

export default Filter