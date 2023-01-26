import './page-header.scss'
const bg = require('../../assets/footer-bg.jpg')

type Props = {
    children: string;
}

export function PageHeader(props: Props){
    return (
        <div className="page-header" style={{backgroundImage: `url(${bg})`}}>
            <h2>{props.children}</h2>
        </div>
    )
}