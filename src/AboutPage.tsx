import React from 'react';
import HeaderComponent from './HeaderComponent';

const AboutPage = () => {
    return (
        <div className='AboutPage'>
            <HeaderComponent></HeaderComponent>
            <h3 style={{marginLeft: '0px', marginTop: '10px'}}>About</h3>

            <div style={{marginLeft: '0px'}}>
                <p>
                    Pywerslave was developed to improve upon <a href="http://powerslave.utu.fi/">Powerslave Mark II</a>, a similar tool developed by the University of Turku.
                    Mark II was last updated in 2016, and was moved to a virtual server in 2021.
                    <br/>
                    It features a much cleaner user interface, as well as the ability to calculate more than 2000 individual votes and 10 unique parties simultaneously.
                    <br/>
                    Pywerslave currently calculates two power indices, however more are soon to be implemented. The two currently implemented are the Banzhaf and Shapley-Shubik power indices,
                    which are both commonly used in voting theory.
                    <br/>
                    For other indices, as well as more in-depth explanations of the indices and the math behind them, please visit Mark II's site.
                    <br/>
                </p>
                <h5>Indices</h5>
                <p>
                    The Banzhaf voting power index is calculated for a voter "v" by dividing the number of times "v" is critical by
                    the total number of times all voters are critical.
                    <br/>
                    The Shapley-Shubik voting power index is calculated for a voter "v" by dividing the number of times "v" is pivotal
                    by the total number of sequential coalitions.
                    <br/>
                    The words "critical" and "pivotal" are almost interchangeable. Here, voter "v" is "critical" for a winning coalition if,
                    without "v", the coalition is losing. 
                    <br/>
                    Similarly, voter "v" is pivotal if joining a sequential coalition (a coaliton in which each party joins
                    as the sequence is written out) causes the coalition to go from losing to winning. 
                    <br/>
                    Essentially, critical/pivotal parties cause losing coalitions to become winning coalitions when they join, and vice versa when they leave.
                    <br/>
                    <br/>
                    Note: As mentioned, Pywerslave currently allows for 10 distinct parties. This number will hopefully go up if I am able to get the site hosted on my university's servers.
                    At the max of 10 parties, calculations may take a few seconds, so please be patient.
                    <br/>
                    Many thanks to the developers of Powerslave and to Professor Kaminski.
                
                </p>
            </div>
        </div>
    );
};

export default AboutPage;