import React from 'react'

const SuccessAlert = ({message}) => {

    const successStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 16,
        borderStyle: 'solid',
        borderRadius: 2,
        padding: 10,
        marginBottom:10
    }

    if(message.length > 0){
        return (
         <p style={successStyle}> {message}</p>
        )
    }

    return (
        <> </>
    )

}

export default SuccessAlert