import React from 'react';

const MessageBox = (props) => {
    return (
        <div className={"alert alert-danger text-center my-5 py-5"}>
            {props.children}
        </div>
    );
};

export default MessageBox;
