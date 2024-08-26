import React from 'react';
import HeaderComponent from './HeaderComponent';
import './AboutPage.css';

const AboutPage = () => {
    return (
        <div className='AboutPage'>
            <HeaderComponent />
            <div className="about-content">
                <h3>About Voting Pywer</h3>
                <p>
                    Voting Pywer was developed to enhance the functionality of <a href="http://powerslave.utu.fi/">Powerslave Mark II</a>, a similar tool created by the University of Turku. 
                    Mark II, last updated in 2016 and moved to a virtual server in 2021, has been improved with a cleaner user interface and the ability to handle more than 2000 individual votes and up to 10 unique parties simultaneously.
                </p>
                <p>
                    Currently, Voting Pywer calculates two power indices: the Banzhaf and Shapley-Shubik power indices, both widely used in voting theory. Future updates will include additional indices and features.
                </p>
                <h5>Indices</h5>
                <p>
                    The <strong>Banzhaf voting power index</strong> for a voter "v" is calculated by dividing the number of times "v" is critical by the total number of times all voters are critical.
                </p>
                <p>
                    The <strong>Shapley-Shubik voting power index</strong> for a voter "v" is determined by dividing the number of times "v" is pivotal by the total number of sequential coalitions.
                </p>
                <p>
                    In this context, "critical" and "pivotal" are used interchangeably. A voter "v" is "critical" in a winning coalition if removing "v" makes the coalition losing. Similarly, "v" is pivotal if joining a sequential coalition (where each party joins in the sequence specified) changes the coalition from losing to winning.
                </p>
                <p>
                    In essence, critical or pivotal parties shift coalitions from losing to winning and vice versa when they join or leave.
                </p>
                <p>
                    Note: Voting Pywer currently supports up to 10 distinct parties. This number might increase if the site gets hosted on university servers. For the maximum of 10 parties, calculations may take a few seconds.
                </p>
                <p>
                    Special thanks to the developers of Powerslave and to Professor Kaminski for their contributions.
                </p>
            </div>
        </div>
    );
};

export default AboutPage;
