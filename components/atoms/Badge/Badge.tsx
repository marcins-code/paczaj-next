import React from 'react'

interface BadgePropsTypes {
    type: 'success' | 'warning' | 'info' | 'danger' | undefined;
    message: string | undefined;
}

const Badge: React.FC<BadgePropsTypes> = ({type, message}) => {
    return (
        <div className={`badge ${type}`}>
            <span>{message}</span>
        </div>
    )
}

export default Badge;