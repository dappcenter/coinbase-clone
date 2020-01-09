import React from 'react';
import PortfolioItem from './portfolio_item';

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.portfolio
    }

    componentDidMount() {
        this.props.fetchPortfolio();
        // need cryptos to be loaded into state as well - how?
        // need to fetch price of crypto with external API
    }

    createTableItems() {
        return (Object.values(this.props.portfolio).map((holding, idx) => (
            <PortfolioItem holding={holding} key={idx}/>
        )))
    }

    render() {
        let arrayOfPortfolioItems = "";
        if (Object.values(this.props.portfolio).length === 0) {
            console.log('portfolio is empty object')
            return null;
        } else {
            console.log('portfolio is not undef')
            arrayOfPortfolioItems = this.createTableItems();
        }
        // debugger;
        return (
            <div className='portfolio'>
                <div className='portfolio-header'>
                    <h1>Portfolio</h1>
                    <a href='#'>List</a>
                    <a href='#'>Chart</a>
                </div>
                <div>
                    <table>
                        <tbody>
                            {arrayOfPortfolioItems}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
//tr is each row
//td is
export default Portfolio;