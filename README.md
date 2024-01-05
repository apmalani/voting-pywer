# Voting Pywer

Arun Malani

## About

Voting Pywer was developed to improve upon Powerslave Mark II, a similar tool developed by the University of Turku. Mark II was last updated in 2016, and was moved to a virtual server in 2021.
It features a much cleaner user interface, as well as the ability to calculate more than 2000 individual votes and 10 unique parties simultaneously.
Voting Pywer currently calculates two power indices, however more are soon to be implemented. The two currently implemented are the Banzhaf and Shapley-Shubik power indices, which are both commonly used in voting theory.
For other indices, as well as more in-depth explanations of the indices and the math behind them, please visit Mark II's site.

### Indices

The Banzhaf voting power index is calculated for a voter "v" by dividing the number of times "v" is critical by the total number of times all voters are critical.
The Shapley-Shubik voting power index is calculated for a voter "v" by dividing the number of times "v" is pivotal by the total number of sequential coalitions.
The words "critical" and "pivotal" are almost interchangeable. Here, voter "v" is "critical" for a winning coalition if, without "v", the coalition is losing.
Similarly, voter "v" is pivotal if joining a sequential coalition (a coaliton in which each party joins as the sequence is written out) causes the coalition to go from losing to winning.
Essentially, critical/pivotal parties cause losing coalitions to become winning coalitions when they join, and vice versa when they leave.

Note: As mentioned, Voting Pywer currently allows for 10 distinct parties. This number will hopefully go up if I am able to get the site hosted on my university's servers. At the max of 10 parties, calculations may take a few seconds, so please be patient.
Many thanks to the developers of Powerslave and to Professor Kaminski.