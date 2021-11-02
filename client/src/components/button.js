
export const Button = ({children, type}) => {
    if(type === 'danger') type = 'bg-teal-900 rounded p-2'
    return (
        <button className = {type}>{children}</button>
    )
}