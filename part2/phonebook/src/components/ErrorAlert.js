import React from 'react'

const ErrorAlert = ({message}) => {

    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 16,
        borderStyle: 'solid',
        borderRadius: 2,
        padding: 10,
        marginBottom:10
    }

    if(message.length > 0){
        return (
         <p style={errorStyle}> {message}</p>
        )
    }

    return (
        <> </>
    )

}

export default ErrorAlert