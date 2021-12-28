import React from 'react'

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({children}) => {
    
    return (
        <div  id="app_wrapper">
            <div id="sidebar_wrapper">
                <ul>
                    <li>fwefew</li>
                </ul>
            </div>
            <div id="content_wrapper">
            {children}
            </div>
          
        </div>
    )
}


export default MainLayout;